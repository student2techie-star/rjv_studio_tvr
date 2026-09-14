// src/components/frames/ImageUploader.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, Send, ShieldCheck, User, Phone, MapPin, FileText, AlertCircle, ExternalLink, Check, Copy, CloudUpload } from "lucide-react";
import UploadPreview from "./UploadPreview";
import UploadStatus from "./UploadStatus";
import { validateImage, sanitizeFilename } from "../../utils/validation";
import { getWhatsAppUrl } from "../../utils/whatsapp";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

// Free cloud image upload helper (No paid backend required)
async function uploadToCatbox(file) {
  const data = new FormData();
  data.append("reqtype", "fileupload");
  data.append("fileToUpload", file);
  const res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: data,
  });
  if (!res.ok) throw new Error(`Catbox upload failed (${res.status})`);
  const text = await res.text();
  if (text.startsWith("http")) return text.trim();
  throw new Error("Unexpected response from Catbox");
}

async function uploadToTmpfiles(file) {
  const data = new FormData();
  data.append("file", file);
  const res = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: data,
  });
  if (!res.ok) throw new Error(`Tmpfiles upload failed (${res.status})`);
  const json = await res.json();
  if (json?.status === "success" && json?.data?.url) {
    return json.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
  }
  throw new Error("Unexpected response from Tmpfiles");
}

async function uploadToImgBB(file, apiKey) {
  const data = new FormData();
  data.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: data,
  });
  const json = await res.json();
  if (json?.data?.url) return json.data.url;
  throw new Error("ImgBB upload failed");
}

async function uploadImageToFreeCloud(file) {
  const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (imgbbKey) {
    try {
      return await uploadToImgBB(file, imgbbKey);
    } catch (err) {
      console.warn("ImgBB upload failed, falling back to Catbox:", err);
    }
  }
  try {
    return await uploadToCatbox(file);
  } catch (err) {
    console.warn("Catbox upload failed, falling back to Tmpfiles:", err);
    return await uploadToTmpfiles(file);
  }
}

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState("");
  const [copied, setCopied] = useState(false);
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
    setUploadedPhotoUrl("");
    setError("");
    setStatus("ready");
    setFile(check.file);
  };

  const removeFile = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setPreviewUrl("");
    setUploadedPhotoUrl("");
    setFile(null);
    setStatus("idle");
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) accept(dropped);
  }, []);

  const handleUploadAndSend = async (autoOpenWhatsApp = true) => {
    if (!file) return;
    if (!validateForm()) {
      setError("Please fill in your Name, Phone Number & Delivery Address first.");
      return;
    }

    setError("");
    let cloudUrl = uploadedPhotoUrl;

    if (!cloudUrl) {
      setStatus("uploading");
      try {
        if (API_BASE) {
          // Send to custom studio backend if configured
          const payload = new FormData();
          payload.append("photo", file, sanitizeFilename(file.name));
          payload.append("name", formData.name.trim());
          payload.append("phone", formData.phone.trim());
          payload.append("address", formData.address.trim());
          payload.append("notes", formData.notes.trim());

          const res = await fetch(`${API_BASE}/api/frames/upload`, { method: "POST", body: payload });
          if (res.ok) {
            const data = await res.json().catch(() => ({}));
            cloudUrl = data.photoUrl || data.url || "";
          }
        }

        if (!cloudUrl) {
          // Use free cloud photo hosting
          cloudUrl = await uploadImageToFreeCloud(file);
        }

        setUploadedPhotoUrl(cloudUrl);
        setStatus("success");
      } catch (err) {
        console.error("Upload error:", err);
        setStatus("error");
        setError("Failed to upload image to cloud. You can still send details via WhatsApp.");
        cloudUrl = "";
      }
    }

    if (autoOpenWhatsApp) {
      const waUrl = getWhatsAppUrl("frames", {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim(),
        filename: sanitizeFilename(file.name),
        photoUrl: cloudUrl,
      });
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  const copyPhotoUrl = () => {
    if (!uploadedPhotoUrl) return;
    navigator.clipboard.writeText(uploadedPhotoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsAppUrl = file
    ? getWhatsAppUrl("frames", {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim(),
        filename: sanitizeFilename(file.name),
        photoUrl: uploadedPhotoUrl,
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

            {/* Upload Status Card */}
            <UploadStatus status={status} error={error} />

            {/* Uploaded Photo Direct Link Banner */}
            {uploadedPhotoUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-emerald-300 bg-emerald-50/90 p-4 sm:p-5 space-y-2 text-emerald-950"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-600" /> Photo Uploaded to Free Cloud
                  </p>
                  <button
                    type="button"
                    onClick={copyPhotoUrl}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={uploadedPhotoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-emerald-700 hover:underline break-all flex items-center gap-1"
                  >
                    {uploadedPhotoUrl} <ExternalLink size={12} className="shrink-0" />
                  </a>
                </div>
                <p className="text-xs text-emerald-700/90">
                  This direct link has been automatically added to your WhatsApp message text below!
                </p>
              </motion.div>
            )}

            {error && file && !uploadedPhotoUrl && (
              <p className="text-sm font-semibold text-rose-600 flex items-center gap-1.5">
                <AlertCircle size={16} /> {error}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleUploadAndSend(false)}
                disabled={status === "uploading"}
                className="btn-dark disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CloudUpload size={18} />
                {status === "uploading"
                  ? "Uploading Photo..."
                  : uploadedPhotoUrl
                  ? "Photo Uploaded!"
                  : "Upload Photo to Cloud"}
              </button>

              <button
                type="button"
                onClick={() => handleUploadAndSend(true)}
                disabled={status === "uploading"}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Send size={17} />
                {status === "uploading" ? "Uploading & Opening WhatsApp..." : "Upload & Send via WhatsApp"}
              </button>
            </div>

            <p className="flex items-start gap-2 text-xs text-brand-500">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-600" />
              100% Free image hosting — your photo is securely uploaded to cloud storage and the direct view link is attached to your WhatsApp message so RJV Studios can view your exact photo immediately.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}