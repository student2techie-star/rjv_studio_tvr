// src/components/frames/UploadPreview.jsx
import React from "react";
import { motion } from "framer-motion";
import { Trash2, FileImage } from "lucide-react";
import { formatBytes, sanitizeFilename } from "../../utils/validation";

export default function UploadPreview({ file, previewUrl, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-brand-200 bg-white p-4"
    >
      <div className="h-24 w-24 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl bg-brand-100">
        {previewUrl ? (
          <img src={previewUrl} alt="Selected photo preview" className="h-full w-full object-cover" />
        ) : (
          <span className="grid h-full w-full place-items-center text-brand-400">
            <FileImage size={26} />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-brand-900">
          {sanitizeFilename(file.name)}
        </p>
        <p className="mt-1 text-xs text-brand-500">{formatBytes(file.size)}</p>
        <p className="mt-0.5 text-xs text-brand-400 uppercase tracking-wide">
          {file.type || "image"}
        </p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
      >
        <Trash2 size={14} /> Remove
      </button>
    </motion.div>
  );
}