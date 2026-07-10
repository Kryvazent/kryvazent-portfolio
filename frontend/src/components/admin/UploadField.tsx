"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { ImageIcon, LoaderCircle, RotateCcw, Trash2, UploadCloud, X } from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { inputClass, labelClass } from "./EditorUI";
import { deleteUploadedFile, uploadFiles, type UploadEndpoint } from "@/lib/uploadthing";

type UploadFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  endpoint: UploadEndpoint;
  accept?: string;
  preview?: "image" | "file";
  helper?: string;
};

export function UploadField({ label, value, onChange, endpoint, accept = "image/*", preview = "image", helper }: UploadFieldProps) {
  const { token, setNotice } = useAdmin();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const shownImage = selectedFile && previewUrl ? previewUrl : value;
  const selectedLabel = useMemo(() => selectedFile ? `${selectedFile.name} · ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "", [selectedFile]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setError("");
    setProgress(0);
    setSelectedFile(file);
    event.target.value = "";
  };

  const resetSelection = () => {
    setSelectedFile(null);
    setProgress(0);
    setError("");
  };

  const uploadSelected = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError("");
    setProgress(0);
    const previousUrl = value;
    try {
      const [uploaded] = await uploadFiles(endpoint, {
        files: [selectedFile],
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: ({ progress }) => setProgress(progress),
      });
      const nextUrl = uploaded?.ufsUrl || uploaded?.url;
      if (!nextUrl) throw new Error("Upload completed but no file URL was returned");
      onChange(nextUrl);
      resetSelection();
      if (previousUrl && previousUrl !== nextUrl) void deleteUploadedFile(token, previousUrl);
      setNotice("File uploaded. Please save before leaving this page.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeCurrent = async () => {
    const previousUrl = value;
    onChange("");
    resetSelection();
    if (previousUrl) {
      await deleteUploadedFile(token, previousUrl);
      setNotice("File removed. Please save before leaving this page.");
    }
  };

  return (
    <div className="md:col-span-2">
      <span className={labelClass}>{label}</span>
      <div className="rounded-2xl border border-line bg-surface p-4">
        {preview === "image" && shownImage ? (
          <div className="mb-4 h-24 w-36 overflow-hidden rounded-xl border border-line bg-background">
            <img src={shownImage} alt={`${label} preview`} className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="mb-4 flex min-h-24 items-center gap-3 rounded-xl border border-dashed border-line p-4 text-sm text-muted">
            <ImageIcon className="h-5 w-5" />
            <span>{selectedFile ? selectedLabel : value || "No file selected"}</span>
          </div>
        )}
        <input ref={inputRef} type="file" accept={accept} onChange={selectFile} className="hidden" />
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Paste a URL or upload a file" className={inputClass} />
        {helper && <p className="mt-2 text-xs text-muted">{helper}</p>}
        {selectedFile && <p className="mt-3 text-xs text-primary">Selected: {selectedLabel}</p>}
        {uploading && <div className="mt-3 h-2 overflow-hidden rounded-full bg-line"><div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>}
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm hover:border-primary hover:text-primary">
            <UploadCloud className="h-4 w-4" /> {selectedFile ? "Change selected file" : "Select file"}
          </button>
          {selectedFile && <button type="button" onClick={resetSelection} disabled={uploading} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm text-muted hover:text-primary">
            <RotateCcw className="h-4 w-4" /> Reset to previous
          </button>}
          {selectedFile && <button type="button" onClick={() => void uploadSelected()} disabled={uploading} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white">
            {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />} Upload {progress ? `${progress}%` : ""}
          </button>}
          {value && <button type="button" onClick={() => void removeCurrent()} disabled={uploading} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm text-muted hover:text-primary">
            {selectedFile ? <X className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />} Remove current
          </button>}
        </div>
      </div>
    </div>
  );
}
