const fallbackSiteUrl = "https://www.kryvazent.com/";

const normalizeSiteUrl = (url: string) => url.replace(/\/+$/, "");

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    fallbackSiteUrl
);

export const siteUrlObject = new URL(siteUrl);

export const absoluteUrl = (path = "/") => {
  return new URL(path, `${siteUrl}/`).toString();
};
