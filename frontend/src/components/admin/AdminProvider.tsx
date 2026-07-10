"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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
  saveStatus: "idle" | "dirty" | "saving" | "saved" | "error";
  hasUnsavedChanges: boolean;
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
  const [saveStatus, setSaveStatus] = useState<AdminContextValue["saveStatus"]>("idle");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const lastSavedDraft = useRef(JSON.stringify(defaultSiteContent));
  const lastLoaded = useRef(false);

  const loadAdminContent = async (authToken: string) => {
    const response = await fetch(`${API_URL}/api/admin/content`, { headers: { Authorization: `Bearer ${authToken}` } });
    if (!response.ok) throw new Error("Unable to load admin content");
    const parsed: unknown = await response.json();
    if (!isSiteContent(parsed)) throw new Error("The API returned invalid content");
    setDraft(parsed);
    lastSavedDraft.current = JSON.stringify(parsed);
    lastLoaded.current = true;
    setHasUnsavedChanges(false);
    setSaveStatus("saved");
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

  const canSaveContent = useCallback((currentUser = user) =>
    Boolean(token && currentUser && (currentUser.role === "admin" || currentUser.team === "administrative" || currentUser.team === "maintenance")),
  [token, user]);

  const saveContent = useCallback(async (content: SiteContent) => {
    if (!canSaveContent()) return;
    setSaveStatus("saving");
    const response = await fetch(`${API_URL}/api/admin/content`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(content),
    });
    const result: unknown = await response.json();
    if (!response.ok) {
      setSaveStatus("error");
      const message = result && typeof result === "object" && "message" in result
        ? String(result.message)
        : "Saving failed";
      throw new Error(message);
    }
    if (!isSiteContent(result)) {
      setSaveStatus("error");
      throw new Error("The API saved an invalid content payload");
    }
    setDraft(result);
    lastSavedDraft.current = JSON.stringify(result);
    setHasUnsavedChanges(false);
    setSaveStatus("saved");
    updateContent(result);
    await refreshContent();
    setNotice("Changes saved to MongoDB.");
  }, [canSaveContent, refreshContent, token, updateContent]);

  useEffect(() => {
    if (!ready || !canSaveContent() || !lastLoaded.current) return;
    const serialized = JSON.stringify(draft);
    const dirty = serialized !== lastSavedDraft.current;
    setHasUnsavedChanges(dirty);
    setSaveStatus(dirty ? "dirty" : "saved");
  }, [canSaveContent, draft, ready]);

  useEffect(() => {
    const warnIfUnsaved = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnIfUnsaved);
    return () => window.removeEventListener("beforeunload", warnIfUnsaved);
  }, [hasUnsavedChanges]);

  const publish = async () => saveContent(draft);

  const importContent = async (file: File) => {
    const parsed: unknown = JSON.parse(await file.text());
    if (!isSiteContent(parsed)) throw new Error("Invalid Kryvazent content file");
    setDraft(parsed);
    setNotice("Content imported. Please save before leaving this page.");
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
    setNotice("Defaults restored. Please save before leaving this page.");
  };

  const value = useMemo(() => ({ draft, setDraft, token, user, ready, notice, saveStatus, hasUnsavedChanges, setNotice, login, logout, publish, importContent, exportContent, restoreDefaults }), [draft, token, user, ready, notice, saveStatus, hasUnsavedChanges, saveContent]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const value = useContext(AdminContext);
  if (!value) throw new Error("useAdmin must be used inside AdminProvider");
  return value;
}
