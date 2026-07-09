"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultSiteContent, isSiteContent, type SiteContent } from "@/lib/content";
import { useSiteContent } from "@/components/ContentProvider";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
const TOKEN_KEY = "kryvazent-admin-token";

type AdminContextValue = {
  draft: SiteContent;
  setDraft: React.Dispatch<React.SetStateAction<SiteContent>>;
  token: string;
  user: AdminUser | null;
  ready: boolean;
  notice: string;
  setNotice: (notice: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  publish: () => Promise<void>;
  importContent: (file: File) => Promise<void>;
  exportContent: () => void;
  restoreDefaults: () => void;
};
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  team: "marketing" | "maintenance" | "project_management" | "administrative";
  active: boolean;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { refreshContent, updateContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(defaultSiteContent);
  const [token, setToken] = useState("");
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  const loadAdminContent = async (authToken: string) => {
    const response = await fetch(`${API_URL}/api/admin/content`, { headers: { Authorization: `Bearer ${authToken}` } });
    if (!response.ok) throw new Error("Unable to load admin content");
    const parsed: unknown = await response.json();
    if (!isSiteContent(parsed)) throw new Error("The API returned invalid content");
    setDraft(parsed);
  };
  const loadCurrentUser = async (authToken: string) => {
    const response = await fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${authToken}` } });
    if (!response.ok) throw new Error("Unable to load staff account");
    const currentUser = await response.json() as AdminUser;
    setUser(currentUser);
    return currentUser;
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_KEY) || "";
    if (!storedToken) {
      setReady(true);
      return;
    }
    setToken(storedToken);
    loadCurrentUser(storedToken)
      .then((currentUser) => {
        if (currentUser.role === "admin" || currentUser.team === "administrative" || currentUser.team === "maintenance") return loadAdminContent(storedToken);
      })
      .catch(() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setUser(null);
      })
      .finally(() => setReady(true));
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json() as { token?: string; message?: string; user?: AdminUser };
    if (!response.ok || !result.token) throw new Error(result.message || "Login failed");
    sessionStorage.setItem(TOKEN_KEY, result.token);
    setToken(result.token);
    const currentUser = result.user || await loadCurrentUser(result.token);
    setUser(currentUser);
    if (currentUser.role === "admin" || currentUser.team === "administrative" || currentUser.team === "maintenance") await loadAdminContent(result.token);
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setUser(null);
    setNotice("");
  };

  const publish = async () => {
    const response = await fetch(`${API_URL}/api/admin/content`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(draft),
    });
    const result: unknown = await response.json();
    if (!response.ok) {
      const message = result && typeof result === "object" && "message" in result
        ? String(result.message)
        : "Publishing failed";
      throw new Error(message);
    }
    if (!isSiteContent(result)) throw new Error("The API saved an invalid content payload");
    setDraft(result);
    updateContent(result);
    await refreshContent();
    setNotice("Changes published to MongoDB.");
  };

  const importContent = async (file: File) => {
    const parsed: unknown = JSON.parse(await file.text());
    if (!isSiteContent(parsed)) throw new Error("Invalid Kryvazent content file");
    setDraft(parsed);
    setNotice("Content imported. Publish when ready.");
  };

  const exportContent = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "kryvazent-content.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const restoreDefaults = () => {
    setDraft(defaultSiteContent);
    setNotice("Defaults restored as a draft. Publish to save them.");
  };

  const value = useMemo(() => ({ draft, setDraft, token, user, ready, notice, setNotice, login, logout, publish, importContent, exportContent, restoreDefaults }), [draft, token, user, ready, notice]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const value = useContext(AdminContext);
  if (!value) throw new Error("useAdmin must be used inside AdminProvider");
  return value;
}
