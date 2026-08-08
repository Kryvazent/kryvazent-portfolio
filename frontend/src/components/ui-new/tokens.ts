/**
 * ui-new design tokens — mirrors the CSS custom properties in kryvazent-preview.html.
 * Import from here instead of repeating long Tailwind strings across components.
 */

export const NAV_H = "h-[74px]";

/** Gradient used on primary buttons and accent text */
export const GRAD_CLASS =
  "bg-gradient-to-br from-[#FF4757] via-[#D62133] to-[#A31527]";

/** Eyebrow label that sits above section titles */
export const eyebrowCls =
  "inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] uppercase text-primary font-syncopate " +
  "before:block before:w-[26px] before:h-[2px] before:rounded-full before:bg-gradient-to-r before:from-[#FF4757] before:to-[#9E1424]";

/** Reusable section wrapper */
export const sectionCls =
  "relative scroll-mt-[86px] py-[104px] overflow-hidden";

/** Alternating section background */
export const sectionAltCls =
  "bg-surface-strong border-y border-line";

/** Standard container with responsive padding */
export const containerCls =
  "w-full max-w-[1200px] mx-auto px-[clamp(16px,4vw,24px)]";
