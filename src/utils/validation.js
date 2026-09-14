// src/utils/validation.js

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const ACCEPTED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

export function isRequired(value = "") {
  return value.trim().length > 0;
}

export function isValidPhone(value = "") {
  return /^[+]?[\d\s()-]{8,16}$/.test(value.trim());
}

export function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function getFileExtension(name = "") {
  return name.split(".").pop()?.toLowerCase() || "";
}

/**
 * Validate an image file.
 * Never trust only the extension — check MIME type too.
 * Returns { valid: true, file } or { valid: false, error }.
 */
export function validateImage(file) {
  if (!file) return { valid: false, error: "Please select one image." };

  const ext = getFileExtension(file.name);
  const mimeOk = ACCEPTED_IMAGE_TYPES.includes((file.type || "").toLowerCase());
  const extOk = ACCEPTED_IMAGE_EXTENSIONS.includes(ext);

  if (!mimeOk || !extOk) {
    return {
      valid: false,
      error: "Only JPG, JPEG, PNG and WEBP images are allowed.",
    };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      error: "Image size must be less than 10 MB.",
    };
  }

  if (file.size === 0) {
    return { valid: false, error: "The selected file appears to be empty." };
  }

  return { valid: true, file };
}

/** Strip path segments and unsafe characters from an uploaded file name. */
export function sanitizeFilename(name = "") {
  const base = name.split(/[\\/]/).pop() || "photo";
  return base.replace(/[^\w.\- ]+/g, "").trim() || "photo";
}

const UNITS = ["B", "KB", "MB", "GB"];

export function formatBytes(bytes = 0) {
  if (!bytes) return "0 B";
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), UNITS.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${UNITS[i]}`;
}