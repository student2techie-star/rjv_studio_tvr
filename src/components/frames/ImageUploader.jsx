// src/components/frames/ImageUploader.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, Send, ShieldCheck, User, MapPin, AlertCircle, CheckCircle2, RefreshCw, HardDrive } from "lucide-react";
import UploadPreview from "./UploadPreview";
import { validateImage, sanitizeFilename, formatBytes } from "../../utils/validation";
import { uploadToGoogleDrive } from "../../utils/googleDrive";
import { getWhatsAppUrl } from "../../utils/whatsapp";

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [submissionResult, setSubmissionResult] = useState(null); // { filename, fileUrl }
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | ready | uploading | success | error
  const [dragging, setDragging] = useState(false);

  // Real-time Upload Progress State
  const [uploadProgress, setUploadProgress] = useState({
    loaded: 0,
    total: 0,
    percent: 0,
    formattedLoaded: "0 MB",
    formattedTotal: "0 MB",
  });

  // Form State
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const inputRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  const validateForm = () => {
    const errors = {};
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName) {
      errors.name = "Please enter your name.";
    } else if (trimmedName.length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (!trimmedAddress) {
      errors.address = "Please enter your address.";
    } else if (trimmedAddress.length < 5) {
      errors.address = "Address must be at least 5 characters.";
    }

    if (!file) {
      errors.image = "Please select one image.";
    } else {
      const imgCheck = validateImage(file);
      if (!imgCheck.valid) {
        errors.image = imgCheck.error;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const accept = (candidate) => {
    const check = validateImage(candidate);
    if (!check.valid) {
      setError(check.error);
      setFieldErrors((prev) => ({ ...prev, image: check.error }));
      return;
    }

    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = URL.createObjectURL(check.file);
    setPreviewUrl(urlRef.current);
    setError("");
    setFieldErrors((prev) => ({ ...prev, image: "" }));
    setStatus("ready");
    setSubmissionResult(null);
    setFile(check.file);
    setUploadProgress({
      loaded: 0,
      total: check.file.size,
      percent: 0,
      formattedLoaded: "0 MB",
      formattedTotal: (check.file.size / (1024 * 1024)).toFixed(2) + " MB",
    });
  };

  const removeFile = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setPreviewUrl("");
    setFile(null);
    setSubmissionResult(null);
    setStatus("idle");
    setUploadProgress({ loaded: 0, total: 0, percent: 0, formattedLoaded: "0 MB", formattedTotal: "0 MB" });
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) accept(dropped);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "uploading") return;

    if (!validateForm()) {
      return;
    }

    setError("");
    setStatus("uploading");
    setUploadProgress({
      loaded: 0,
      total: file.size,
      percent: 5,
      formattedLoaded: "0.00 MB",
      formattedTotal: (file.size / (1024 * 1024)).toFixed(2) + " MB",
    });

    try {
      const result = await uploadToGoogleDrive({
        name: name.trim(),
        address: address.trim(),
        file: file,
        onProgress: (prog) => setUploadProgress(prog),
      });

      if (result && result.success) {
        setSubmissionResult(result);
        setStatus("success");

        // Automatically open WhatsApp with pre-filled message & Drive link immediately after upload
        const autoWaUrl = getWhatsAppUrl("frames", {
          name: name.trim(),
          address: address.trim(),
          filename: result.filename,
          fileUrl: result.fileUrl,
        });

        setTimeout(() => {
          window.open(autoWaUrl, "_blank", "noopener,noreferrer");
        }, 300);
      } else {
        throw new Error(result?.message || "Unable to upload your photo to Google Drive. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setError(err.message || "Unable to upload your photo. Please check your internet connection and try again.");
    }
  };

  const whatsAppUrl = submissionResult
    ? getWhatsAppUrl("frames", {
        name: name.trim(),
        address: address.trim(),
        filename: submissionResult.filename,
        fileUrl: submissionResult.fileUrl,
      })
    : "#";

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Photo Dropzone & File Input */}
      {!file ? (
        <motion.div
          layout
          className={`relative border-3d-dashed p-8 sm:p-12 text-center bg-white rounded-3xl ${
            dragging ? "!bg-brand-50" : ""
          } ${fieldErrors.image ? "border-rose-400 bg-rose-50/20" : ""}`}
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
            Upload Photo
          </p>
          <p className="text-xs text-brand-500 mt-1">JPG, JPEG, PNG or WEBP · up to 10 MB</p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="btn-primary mt-6 inline-flex items-center gap-2"
          >
            <Upload size={17} /> Choose Image
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

          {fieldErrors.image && (
            <p className="mt-4 text-xs font-semibold text-rose-600 flex items-center justify-center gap-1">
              <AlertCircle size={15} /> {fieldErrors.image}
            </p>
          )}
        </motion.div>
      ) : (
        /* Image Preview & Replace Controls */
        <motion.div layout className="space-y-4">
          <UploadPreview file={file} previewUrl={previewUrl} onRemove={removeFile} />
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={status === "uploading"}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 bg-white border border-brand-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-brand-50 transition-colors disabled:opacity-40"
            >
              <RefreshCw size={13} /> Change Photo
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
          </div>
        </motion.div>
      )}

      {/* Main Submission Form */}
      <motion.div
        layout
        className="rounded-3xl border border-brand-200 bg-white p-6 sm:p-8 shadow-sm space-y-5"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="user-name" className="block text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1.5">
              Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400" />
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Enter your full name"
                disabled={status === "uploading"}
                className={`w-full rounded-xl border bg-brand-50/50 pl-10 pr-4 py-3 text-sm font-medium text-brand-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                  fieldErrors.name
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-brand-200 focus:border-brand-500 focus:ring-brand-100"
                }`}
              />
            </div>
            {fieldErrors.name && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle size={14} /> {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="user-address" className="block text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1.5">
              Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin size={17} className="absolute left-3.5 top-3.5 text-brand-400" />
              <textarea
                id="user-address"
                rows={3}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (fieldErrors.address) setFieldErrors((prev) => ({ ...prev, address: "" }));
                }}
                placeholder="Enter complete address (e.g. Thirukadaiyur, Mayiladuthurai District, Tamil Nadu)"
                disabled={status === "uploading"}
                className={`w-full rounded-xl border bg-brand-50/50 pl-10 pr-4 py-3 text-sm font-medium text-brand-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                  fieldErrors.address
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-brand-200 focus:border-brand-500 focus:ring-brand-100"
                }`}
              />
            </div>
            {fieldErrors.address && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle size={14} /> {fieldErrors.address}
              </p>
            )}
          </div>

          {/* General Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 flex items-start gap-2"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>{error}</div>
            </motion.div>
          )}

          {/* Real-time MB Upload Progress Bar Indicator */}
          {status === "uploading" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-brand-200 bg-brand-50/90 p-5 space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-bold text-brand-900">
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
                  Uploading photo to Google Drive...
                </span>
                <span className="font-mono text-brand-800 bg-white px-2.5 py-0.5 rounded-lg border border-brand-200 shadow-2xs">
                  {uploadProgress.percent || 0}%
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-3 rounded-full bg-brand-200/80 overflow-hidden p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 via-emerald-500 to-brand-500 shadow-sm"
                  initial={{ width: "0%" }}
                  animate={{ width: `${uploadProgress.percent || 5}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>

              {/* Real-time Loaded MB / Total MB Counter */}
              <div className="flex justify-between items-center text-xs font-medium text-brand-700">
                <span className="flex items-center gap-1 font-mono">
                  <HardDrive size={13} className="text-brand-500" />
                  {uploadProgress.formattedLoaded || "0 MB"} / {uploadProgress.formattedTotal || formatBytes(file?.size)}
                </span>
                <span className="text-brand-500 text-[11px]">
                  {uploadProgress.percent < 100 ? "Uploading bytes..." : "Saving to Google Drive..."}
                </span>
              </div>
            </motion.div>
          )}

          {/* Success State & WhatsApp Action */}
          <AnimatePresence>
            {status === "success" && submissionResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-2xl border p-5 space-y-3 ${
                  submissionResult.isFallback
                    ? "border-amber-200 bg-amber-50 text-amber-950"
                    : "border-emerald-200 bg-emerald-50 text-emerald-950"
                }`}
              >
                <div className={`flex items-center gap-2 font-bold text-base ${
                  submissionResult.isFallback ? "text-amber-800" : "text-emerald-800"
                }`}>
                  <CheckCircle2 size={22} className={`shrink-0 ${
                    submissionResult.isFallback ? "text-amber-600" : "text-emerald-600"
                  }`} />
                  {submissionResult.isFallback
                    ? "✓ Photo uploaded (Backup Storage)"
                    : "✓ Photo uploaded to Google Drive!"}
                </div>
                <div className={`text-xs space-y-1 pl-7 ${
                  submissionResult.isFallback ? "text-amber-800" : "text-emerald-800"
                }`}>
                  <p><strong>File:</strong> <code className="bg-white/80 px-2 py-0.5 rounded font-mono text-slate-900">{submissionResult.filename}</code></p>
                  {submissionResult.isFallback ? (
                    <p className="pt-1 text-amber-700 font-medium">
                      ⚠️ Note: Uploaded via backup storage because Google Drive script is not connected yet.
                    </p>
                  ) : (
                    <p className="pt-1">Saved directly in RJV Studio Google Drive folder.</p>
                  )}
                  <p className="pt-0.5">Your submission is ready to send through WhatsApp.</p>
                </div>
                <div className="pt-2">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 text-white rounded-xl shadow-md transition-all ${
                      submissionResult.isFallback
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >
                    <Send size={18} /> Send via WhatsApp
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Submit Button (shown when not yet successful) */}
          {status !== "success" && (
            <button
              type="submit"
              disabled={status === "uploading"}
              className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "uploading" ? (
                <>Uploading photo... Please wait.</>
              ) : (
                <>Submit</>
              )}
            </button>
          )}

          {/* Privacy Notice */}
          <p className="text-[11px] leading-relaxed text-brand-500 text-center pt-1">
            <ShieldCheck size={13} className="inline mr-1 text-emerald-600" />
            By submitting this form, you agree that RJV Studio may receive and store the submitted information and photograph for the requested service.
          </p>
        </form>
      </motion.div>
    </div>
  );
}