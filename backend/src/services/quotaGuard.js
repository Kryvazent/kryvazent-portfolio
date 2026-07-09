import { env } from "../config/env.js";
import { UsageQuota } from "../models/UsageQuota.js";

const pacificParts = () => Object.fromEntries(
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZoneName: "shortOffset",
  }).formatToParts(new Date()).map((part) => [part.type, part.value]),
);

const geminiPeriod = () => {
  const parts = pacificParts();
  return `${parts.year}-${parts.month}-${parts.day}`;
};

const nextPacificMidnight = () => {
  const parts = pacificParts();
  const match = parts.timeZoneName.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  const direction = match?.[1] === "-" ? -1 : 1;
  const offsetMinutes = direction * ((Number(match?.[2] || 0) * 60) + Number(match?.[3] || 0));
  return new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day) + 1) - offsetMinutes * 60_000);
};

const definitions = {
  gemini: () => ({ periodKey: geminiPeriod(), limit: env.geminiDailyRequestLimit, unit: "requests", resetAt: nextPacificMidnight() }),
  json2video: () => ({ periodKey: "free-credit-lifetime", limit: env.json2VideoCreditLimit, unit: "estimated credits", resetAt: null }),
};

export const reserveQuota = async (provider, amount = 1) => {
  const definition = definitions[provider]();
  let quota = await UsageQuota.findOne({ provider });
  if (!quota) quota = await UsageQuota.create({ provider, periodKey: definition.periodKey, limit: definition.limit, unit: definition.unit });
  if (quota.periodKey !== definition.periodKey) {
    quota.periodKey = definition.periodKey;
    quota.used = 0;
    quota.hardBlocked = false;
    quota.blockedUntil = null;
    quota.reason = "";
  }
  quota.limit = definition.limit;
  quota.unit = definition.unit;
  if (quota.hardBlocked || (quota.blockedUntil && quota.blockedUntil > new Date())) {
    const retry = quota.blockedUntil ? ` Retry after ${quota.blockedUntil.toISOString()}.` : "";
    throw new Error(`${provider} usage is paused: ${quota.reason || "quota exhausted"}.${retry}`);
  }
  if (quota.used + amount > quota.limit) {
    quota.reason = `Local free-tier guard reached ${quota.limit} ${quota.unit}`;
    if (definition.resetAt) quota.blockedUntil = definition.resetAt;
    else quota.hardBlocked = true;
    await quota.save();
    throw new Error(`${provider} free-tier limit reached. No paid request was sent.`);
  }
  const reserved = await UsageQuota.findOneAndUpdate(
    {
      _id: quota._id,
      hardBlocked: false,
      used: { $lte: quota.limit - amount },
      $or: [{ blockedUntil: null }, { blockedUntil: { $lte: new Date() } }],
    },
    { $inc: { used: amount } },
    { new: true },
  );
  if (!reserved) throw new Error(`${provider} quota was consumed by another request. Try again after the quota resets.`);
  return reserved;
};

export const blockQuota = async (provider, reason, resetAt = null) => {
  const definition = definitions[provider]();
  await UsageQuota.findOneAndUpdate(
    { provider },
    {
      $set: {
        periodKey: definition.periodKey,
        limit: definition.limit,
        unit: definition.unit,
        reason,
        blockedUntil: resetAt,
        hardBlocked: !resetAt,
      },
    },
    { upsert: true },
  );
};

export const getQuotaStates = async () => {
  const states = [];
  for (const provider of Object.keys(definitions)) {
    const definition = definitions[provider]();
    let quota = await UsageQuota.findOne({ provider });
    if (!quota || quota.periodKey !== definition.periodKey) {
      quota = await UsageQuota.findOneAndUpdate(
        { provider },
        { $set: { periodKey: definition.periodKey, used: 0, limit: definition.limit, unit: definition.unit, blockedUntil: null, hardBlocked: false, reason: "" } },
        { new: true, upsert: true },
      );
    }
    states.push(quota);
  }
  return states;
};
