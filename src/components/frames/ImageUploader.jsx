// src/components/frames/ImageUploader.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, Send, ShieldCheck } from "lucide-react";
import UploadPreview from "./UploadPreview";
import UploadStatus from "./UploadStatus";
import { validateImage, sanitizeFilename } from "../../utils/validation";
import { getWhatsAppUrl } from "../../utils/whatsapp";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | ready | uploading | success | error
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  const accept = (candidate) => {
    const check = validateImage(candidate);
    if (!check.valid) {
      setError(check.error);
      setStatus("idle");
      return;
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = URL.createObjectURL(check.file);
    setPreviewUrl(urlRef.current);
    setError("");
    setStatus("ready");
    setFile(check.file);
  };

  const removeFile = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setPreviewUrl("");
    setFile(null);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) accept(dropped);
  }, []);

  const openApiSend = async () => {
    if (!file || !API_BASE) return;
    setStatus("uploading");
    const form = new FormData();
    form.append("photo", file, sanitizeFilename(file.name));
    try {
      const res = await fetch(`${API_BASE}/api/frames/upload`, { method: "POST", body: form });
      if (!res.ok) {
        const detail = await res.json().catch(() => ({}));
        throw new Error(detail.message || `Upload failed (${res.status})`);
      }
      const data = await res.json().catch(() => ({}));
      setStatus(data.success === false ? "error" : "success");
      if (data.success === false) setError(data.message || "Upload failed.");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Network error during upload.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <motion.div
        layout
        className={`relative border-3d-dashed p-10 sm:p-14 text-center ${
          dragging ? "!bg-brand-50" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-600">
          {dragging ? <Upload size={28} /> : <ImagePlus size={28} />}
        </span>
        <p className="mt-4 text-lg font-semibold text-brand-900">
          Drop your photograph here
        </p>
        <p className="text-caption mt-1.5">JPG, PNG or WEBP · up to 15 MB</p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-primary mt-6"
        >
          Choose image
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            const picked = e.target.files?.[0];
            if (picked) accept(picked);
            e.target.value = "";
          }}
        />

        {error && (
          <AnimatePresence>
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-sm font-semibold text-rose-600"
            >
              {error}
            </motion.p>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Preview */}
      <AnimatePresence>
        {file && previewUrl && (
          <motion.div layout className="space-y-5">
            <UploadPreview file={file} previewUrl={previewUrl} onRemove={removeFile} />

            <UploadStatus status={status} error={error} />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={openApiSend}
                disabled={!API_BASE || status === "uploading" || status === "success"}
                className="btn-dark disabled:opacity-40 disabled:cursor-not-allowed"
                title={!API_BASE ? "Backend not connected yet" : "Send to the studio"}
              >
                Upload to studio
              </button>

              <a
                href={getWhatsAppUrl("frames", sanitizeFilename(file.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Send size={17} /> Send via WhatsApp
              </a>
            </div>

            {!API_BASE && (
              <p className="flex items-start gap-2 text-xs text-brand-500">
                <ShieldCheck size={15} className="mt-0.5 shrink-0" />
                The studio backend will be connected soon. Until then, send the
                photo directly on WhatsApp using the button above — your file
                stays on your device and is never uploaded to a third party.
                When live, files go to a secure {`POST /api/frames/upload`} endpoint.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}