// src/components/frames/UploadStatus.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Info } from "lucide-react";

export default function UploadStatus({ status = "idle", error = "" }) {
  return (
    <AnimatePresence mode="wait">
      {status === "uploading" && (
        <motion.div
          key="uploading"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3.5 text-sm font-medium text-brand-800"
        >
          <Loader2 size={18} className="animate-spin text-brand-500" />
          Uploading to the studio… this takes a few seconds.
        </motion.div>
      )}

      {status === "success" && (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm font-medium text-emerald-800"
        >
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-500" />
          <div>
            <p>Photo saved successfully.</p>
            <p className="mt-0.5 font-normal text-emerald-700">
              Our team has received your frame. You'll hear from us on WhatsApp.
            </p>
          </div>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          key="error"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm font-medium text-rose-800"
        >
          <XCircle size={20} className="mt-0.5 shrink-0 text-rose-500" />
          <div>
            <p>We couldn't upload your photo.</p>
            <p className="mt-0.5 font-normal text-rose-700">
              {error || "Please try again, or send it directly via WhatsApp."}
            </p>
          </div>
        </motion.div>
      )}

      {status === "ready" && (
        <motion.div
          key="ready"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3.5 text-sm font-medium text-brand-800"
        >
          <Info size={18} className="shrink-0 text-brand-500" />
          Photo validated and ready to send.
        </motion.div>
      )}

      {status === "idle" && status !== "ready" && null}
    </AnimatePresence>
  );
}