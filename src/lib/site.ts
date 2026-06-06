const fallbackSiteUrl = "https://taupe-brigadeiros-7b3b57.netlify.app";

const normalizeSiteUrl = (url: string) => url.replace(/\/+$/, "");

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    fallbackSiteUrl
);

export const siteUrlObject = new URL(siteUrl);
