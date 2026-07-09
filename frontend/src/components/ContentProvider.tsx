"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { defaultSiteContent, isSiteContent, type SiteContent } from "@/lib/content";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
const REFRESH_INTERVAL_MS = 60_000;

type ContentContextValue = {
  content: SiteContent;
  isLoaded: boolean;
  isRefreshing: boolean;
  error: string;
  lastUpdated: Date | null;
  refreshContent: () => Promise<void>;
  updateContent: (content: SiteContent) => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(defaultSiteContent);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const requestInFlight = useRef<Promise<void> | null>(null);

  const refreshContent = useCallback(async () => {
    if (requestInFlight.current) return requestInFlight.current;
    const request = (async () => {
      setIsRefreshing(true);
      try {
        const response = await fetch(`${API_URL}/api/content?t=${Date.now()}`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`Content API returned ${response.status}`);
        const parsed: unknown = await response.json();
        if (!isSiteContent(parsed)) throw new Error("Content API returned an invalid payload");
        setContent(parsed);
        setLastUpdated(new Date());
        setError("");
      } catch (refreshError) {
        setError(refreshError instanceof Error ? refreshError.message : "Unable to load website content");
      } finally {
        setIsLoaded(true);
        setIsRefreshing(false);
        requestInFlight.current = null;
      }
    })();
    requestInFlight.current = request;
    return request;
  }, []);

  useEffect(() => {
    void refreshContent();
    const interval = window.setInterval(() => void refreshContent(), REFRESH_INTERVAL_MS);
    const onVisibility = () => {
      if (document.visibilityState === "visible") void refreshContent();
    };
    const channel = "BroadcastChannel" in window ? new BroadcastChannel("kryvazent-content") : null;
    if (channel) channel.onmessage = () => void refreshContent();
    window.addEventListener("focus", onVisibility);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(interval);
      channel?.close();
      window.removeEventListener("focus", onVisibility);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refreshContent]);

  const updateContent = useCallback((next: SiteContent) => {
    setContent(next);
    setLastUpdated(new Date());
    setError("");
    if ("BroadcastChannel" in window) {
      const channel = new BroadcastChannel("kryvazent-content");
      channel.postMessage("published");
      channel.close();
    }
  }, []);

  const value = useMemo(
    () => ({ content, isLoaded, isRefreshing, error, lastUpdated, refreshContent, updateContent }),
    [content, error, isLoaded, isRefreshing, lastUpdated, refreshContent, updateContent],
  );
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useSiteContent must be used inside ContentProvider");
  return value;
}
