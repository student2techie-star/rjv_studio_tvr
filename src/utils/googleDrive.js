// src/utils/googleDrive.js
// Utility to communicate with Google Apps Script Web App for photo uploads.

const APPS_SCRIPT_URL = (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "").trim();

/**
 * Converts a File object to a Base64 string.
 * @param {File} file 
 * @returns {Promise<string>}
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Uploads a customer photo and details to Google Apps Script.
 * 
 * @param {Object} params
 * @param {string} params.name - Customer Name
 * @param {string} params.address - Customer Address
 * @param {File} params.file - Selected Image File
 * @returns {Promise<{ success: boolean, filename: string, fileId?: string, fileUrl: string, message?: string }>}
 */
export async function uploadToGoogleDrive({ name, address, file }) {
  if (!file) {
    throw new Error("No photo file provided.");
  }

  const base64Data = await fileToBase64(file);

  if (APPS_SCRIPT_URL) {
    try {
      const payload = {
        name: name.trim(),
        address: address.trim(),
        image: base64Data,
        filename: file.name,
        mimeType: file.type || "image/jpeg",
      };

      // Google Apps Script Web App POST handling with text/plain to avoid CORS preflight issues
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json().catch(() => ({}));
        if (json.success) {
          return {
            success: true,
            filename: json.filename,
            fileId: json.fileId,
            fileUrl: json.fileUrl,
            name: json.name || name,
            address: json.address || address,
          };
        } else {
          throw new Error(json.message || "Google Drive upload rejected.");
        }
      }
    } catch (err) {
      console.warn("Google Apps Script upload failed or URL unreached:", err);
      // Fall through to fallback
    }
  }

  // Fallback: Free Cloud Upload (catbox.moe / tmpfiles.org) if Apps Script is not connected yet
  const fallbackUrl = await uploadToFreeCloudFallback(file);
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const fallbackFilename = `RJV_Studio_${dateStr}_${Math.floor(1000 + Math.random() * 9000)}.${getFileExt(file.name)}`;

  return {
    success: true,
    filename: fallbackFilename,
    fileUrl: fallbackUrl,
    name: name,
    address: address,
    isFallback: true,
  };
}

async function uploadToFreeCloudFallback(file) {
  const data = new FormData();
  data.append("reqtype", "fileupload");
  data.append("fileToUpload", file);
  try {
    const res = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: data,
    });
    if (res.ok) {
      const text = await res.text();
      if (text.startsWith("http")) return text.trim();
    }
  } catch (e) {
    console.warn("Catbox fallback failed, trying tmpfiles...", e);
  }

  const tmpData = new FormData();
  tmpData.append("file", file);
  const tmpRes = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: tmpData,
  });
  if (tmpRes.ok) {
    const json = await tmpRes.json();
    if (json?.status === "success" && json?.data?.url) {
      return json.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
    }
  }
  throw new Error("Unable to upload image to storage service.");
}

function getFileExt(filename) {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "jpg";
}
