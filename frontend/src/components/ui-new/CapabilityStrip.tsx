"use client";

/**
 * CapabilityStrip — the scrolling marquee banner between Hero and Services.
 * Mirrors the `.strip` + `.strip-track` block from kryvazent-preview.html.
 */

const ITEMS = [
  "Web Applications",
  "Mobile Apps",
  "AI Systems",
  "Cloud & DevOps",
  "Backend & APIs",
  "UI/UX Engineering",
];

function Group() {
  return (
    <div className="flex items-center flex-shrink-0" aria-hidden="true">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-[26px] px-[26px] font-syncopate font-bold text-[13.5px] tracking-[0.22em] uppercase text-subtle whitespace-nowrap after:content-['✦'] after:text-primary after:text-[11px]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function CapabilityStrip() {
  return (
    <div
      className="border-y border-line bg-surface-strong py-5 overflow-hidden w-full"
      aria-hidden="true"
    >
      <div
        className="overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right,transparent,black 10%,black 90%,transparent)",
          maskImage: "linear-gradient(to right,transparent,black 10%,black 90%,transparent)",
        }}
      >
        <div
          className="flex w-max hover:[animation-play-state:paused]"
          style={{ animation: "marquee-strip 30s linear infinite" }}
        >
          <Group />
          <Group />
        </div>
      </div>
      <style>{`@keyframes marquee-strip{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
