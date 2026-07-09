import { env } from "../config/env.js";
import { blockQuota, reserveQuota } from "./quotaGuard.js";

const fallbackStrategy = (campaign) => ({
  summary: `Build trust with ${campaign.audience} through useful education, credible proof, and clear invitations focused on ${campaign.offer || campaign.name}.`,
  pillars: ["Practical education", "Proof and case studies", "Problems and solutions", "Team perspective"],
  callsToAction: ["Book a discovery call", "Share this with your team", "Tell us what you are building"],
  videoThemes: ["A common problem explained in 60 seconds", "Before-and-after workflow", "Three mistakes to avoid"],
});

const fallbackPosts = (campaign, strategy) => {
  const platforms = campaign.platforms.length ? campaign.platforms : ["linkedin"];
  return platforms.flatMap((platform) => strategy.pillars.slice(0, campaign.postsPerWeek).map((pillar, index) => ({
    platform,
    format: index % 3 === 2 ? "video" : index % 2 ? "carousel" : "text",
    title: `${pillar} — ${platform}`,
    caption: `${pillar}: a practical perspective for ${campaign.audience}.\n\nWe focus on ${campaign.offer || campaign.goal} with clear decisions, realistic scope, and delivery tied to outcomes.\n\n${strategy.callsToAction[index % strategy.callsToAction.length]}.`,
    hashtags: ["#Kryvazent", "#SoftwareDevelopment", "#DigitalProducts"],
    creativeBrief: `Create a clean, high-contrast branded visual about ${pillar}.`,
    videoScript: index % 3 === 2 ? `HOOK: ${pillar}\nPROBLEM: Show the business friction.\nSOLUTION: Explain the practical approach.\nOUTCOME: Show the result.\nCTA: ${strategy.callsToAction[index % strategy.callsToAction.length]}.` : "",
  })));
};

export const generateMarketingPackage = async (campaign) => {
  if (!env.geminiApiKey) {
    const strategy = fallbackStrategy(campaign);
    return { strategy, posts: fallbackPosts(campaign, strategy), provider: "fallback" };
  }
  const prompt = `Create a credible social media campaign as strict JSON.
Business: Kryvazent, a software, AI, cloud, web and mobile engineering company.
Campaign: ${campaign.name}
Goal: ${campaign.goal}
Audience: ${campaign.audience}
Offer: ${campaign.offer}
Tone: ${campaign.tone}
Platforms: ${campaign.platforms.join(", ")}
Create ${campaign.postsPerWeek} posts per platform. Avoid hype and invented claims.
Return: {"strategy":{"summary":"", "pillars":[""], "callsToAction":[""], "videoThemes":[""]},"posts":[{"platform":"","format":"text|image|carousel|video","title":"","caption":"","hashtags":["#"],"creativeBrief":"","videoScript":""}]}`;
  await reserveQuota("gemini", 1);
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.geminiModel)}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": env.geminiApiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
    }),
  });
  const result = await response.json();
  if (response.status === 429) {
    await blockQuota("gemini", "Gemini reported RESOURCE_EXHAUSTED", nextResetFromProvider(result));
  }
  if (!response.ok) throw new Error(result?.error?.message || "Gemini content generation failed");
  const text = result.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("");
  if (!text) throw new Error("Gemini returned no campaign content");
  const generated = JSON.parse(text);
  if (!generated.strategy || !Array.isArray(generated.posts)) throw new Error("Gemini returned an invalid campaign structure");
  return { ...generated, provider: "gemini" };
};

const nextResetFromProvider = (result) => {
  const retryInfo = result?.error?.details?.find((detail) => detail.retryDelay)?.retryDelay;
  const seconds = Number(String(retryInfo || "").replace("s", ""));
  return Number.isFinite(seconds) && seconds > 0 ? new Date(Date.now() + seconds * 1000) : new Date(Date.now() + 60_000);
};
