"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultSiteContent, isSiteContent, type SiteContent } from "@/lib/content";

const STORAGE_KEY = "kryvazent-site-content-v1";
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
type ContentContextValue = {
  content: SiteContent;
  isLoaded: boolean;
  updateContent: (content: SiteContent) => void;
  resetContent: () => void;
};
const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(defaultSiteContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${API_URL}/api/content`);
        if (!response.ok) throw new Error();
        const parsed: unknown = await response.json();
        if (isSiteContent(parsed)) setContent(parsed);
      } catch {
        try {
          const stored = window.localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed: unknown = JSON.parse(stored);
            if (isSiteContent(parsed)) setContent(parsed);
          }
        } catch {
          // Defaults keep the public site available if the API is offline.
        }
      } finally {
        setIsLoaded(true);
      }
    };
    void load();
  }, []);

  const updateContent = useCallback((next: SiteContent) => {
    setContent(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);
  const resetContent = useCallback(() => {
    setContent(defaultSiteContent);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);
  const value = useMemo(() => ({ content, isLoaded, updateContent, resetContent }), [content, isLoaded, updateContent, resetContent]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useSiteContent must be used inside ContentProvider");
  return value;
}
