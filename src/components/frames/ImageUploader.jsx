// src/components/frames/ImageUploader.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, Send, ShieldCheck, User, Phone, MapPin, FileText, AlertCircle } from "lucide-react";
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

  // Customer details form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const inputRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.address.trim()) errors.address = "Delivery address is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    setStatus("idle");
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) accept(dropped);
  }, []);

  const handleWhatsAppClick = (e) => {
    if (!validateForm()) {
      e.preventDefault();
      setError("Please complete your details (Name, Phone & Address) before proceeding.");
      return;
    }
    setError("");
  };

  const openApiSend = async () => {
    if (!file) return;
    if (!validateForm()) {
      setError("Please complete your details (Name, Phone & Address) before proceeding.");
      return;
    }
    if (!API_BASE) return;

    setStatus("uploading");
    const payload = new FormData();
    payload.append("photo", file, sanitizeFilename(file.name));
    payload.append("name", formData.name.trim());
    payload.append("phone", formData.phone.trim());
    payload.append("address", formData.address.trim());
    payload.append("notes", formData.notes.trim());

    try {
      const res = await fetch(`${API_BASE}/api/frames/upload`, { method: "POST", body: payload });
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

  const whatsAppUrl = file
    ? getWhatsAppUrl("frames", {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim(),
        filename: sanitizeFilename(file.name),
      })
    : "#";

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

        {error && !file && (
          <AnimatePresence>
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-sm font-semibold text-rose-600 flex items-center justify-center gap-1.5"
            >
              <AlertCircle size={16} /> {error}
            </motion.p>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Preview & Customer Form */}
      <AnimatePresence>
        {file && previewUrl && (
          <motion.div layout className="space-y-6">
            {/* Image Preview Card */}
            <UploadPreview file={file} previewUrl={previewUrl} onRemove={removeFile} />

            {/* Customer Details Form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-brand-200 bg-white p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-brand-900 flex items-center gap-2">
                  <User size={20} className="text-brand-600" />
                  Your Delivery Details
                </h3>
                <p className="text-xs text-brand-500 mt-1">
                  Please share your name and address so RJV Studios can frame &amp; deliver your photo smoothly.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label htmlFor="frame-name" className="block text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400" />
                    <input
                      id="frame-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Anand Kumar"
                      className={`w-full rounded-xl border bg-brand-50/50 pl-10 pr-4 py-2.5 text-sm font-medium text-brand-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                        fieldErrors.name
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-brand-200 focus:border-brand-500 focus:ring-brand-100"
                      }`}
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-rose-600">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="frame-phone" className="block text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1.5">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400" />
                    <input
                      id="frame-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full rounded-xl border bg-brand-50/50 pl-10 pr-4 py-2.5 text-sm font-medium text-brand-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                        fieldErrors.phone
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-brand-200 focus:border-brand-500 focus:ring-brand-100"
                      }`}
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-rose-600">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Delivery Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="frame-address" className="block text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1.5">
                    Delivery Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={17} className="absolute left-3.5 top-3 text-brand-400" />
                    <textarea
                      id="frame-address"
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete street address, area, & city (e.g. 12 South Street, Thiruvarur)"
                      className={`w-full rounded-xl border bg-brand-50/50 pl-10 pr-4 py-2.5 text-sm font-medium text-brand-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                        fieldErrors.address
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-brand-200 focus:border-brand-500 focus:ring-brand-100"
                      }`}
                    />
                  </div>
                  {fieldErrors.address && (
                    <p className="mt-1 text-xs text-rose-600">{fieldErrors.address}</p>
                  )}
                </div>

                {/* Frame Instructions / Notes (Optional) */}
                <div className="sm:col-span-2">
                  <label htmlFor="frame-notes" className="block text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1.5">
                    Frame Instructions <span className="text-brand-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <FileText size={17} className="absolute left-3.5 top-3 text-brand-400" />
                    <textarea
                      id="frame-notes"
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any preference for frame color, glass finish, or size (e.g. 12x18 inches with wooden frame)"
                      className="w-full rounded-xl border border-brand-200 bg-brand-50/50 pl-10 pr-4 py-2.5 text-sm font-medium text-brand-900 transition-colors focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <UploadStatus status={status} error={error} />

            {error && file && (
              <p className="text-sm font-semibold text-rose-600 flex items-center gap-1.5">
                <AlertCircle size={16} /> {error}
              </p>
            )}

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
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="btn-primary"
              >
                <Send size={17} /> Send via WhatsApp
              </a>
            </div>

            {!API_BASE && (
              <p className="flex items-start gap-2 text-xs text-brand-500">
                <ShieldCheck size={15} className="mt-0.5 shrink-0" />
                The studio backend will be connected soon. Fill in your details above and click <strong>Send via WhatsApp</strong> — your details and photo choice will be sent directly to RJV Studios.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}