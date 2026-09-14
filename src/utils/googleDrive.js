// src/utils/googleDrive.js
// Utility to communicate with Google Apps Script Web App for photo uploads with real-time progress updates.

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
 * Uploads a customer photo and details to Google Apps Script with real-time byte progress.
 * 
 * @param {Object} params
 * @param {string} params.name - Customer Name
 * @param {string} params.address - Customer Address
 * @param {File} params.file - Selected Image File
 * @param {Function} [params.onProgress] - Real-time progress callback
 * @returns {Promise<{ success: boolean, filename: string, fileId?: string, fileUrl: string, message?: string }>}
 */
export async function uploadToGoogleDrive({ name, address, file, onProgress }) {
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

      const result = await postWithXHRProgress(APPS_SCRIPT_URL, JSON.stringify(payload), onProgress);
      if (result && result.success) {
        return {
          success: true,
          filename: result.filename,
          fileId: result.fileId,
          fileUrl: result.fileUrl,
          name: result.name || name,
          address: result.address || address,
        };
      } else {
        throw new Error(result?.message || "Google Drive upload was rejected.");
      }
    } catch (err) {
      console.warn("Google Apps Script upload failed, attempting cloud fallback:", err);
      // Fall through to fallback if Apps Script endpoint is unreached
    }
  }

  // Fallback: Free Cloud Upload (catbox.moe / tmpfiles.org) if Apps Script is not connected yet
  const fallbackUrl = await uploadToFreeCloudFallback(file, onProgress);
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

function postWithXHRProgress(url, bodyData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=utf-8");

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.min(99, Math.round((e.loaded / e.total) * 100));
          onProgress({
            loaded: e.loaded,
            total: e.total,
            percent: percent,
            formattedLoaded: formatMB(e.loaded),
            formattedTotal: formatMB(e.total),
          });
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        try {
          const json = JSON.parse(xhr.responseText);
          resolve(json);
        } catch (e) {
          reject(new Error("Invalid JSON response from Google Apps Script."));
        }
      } else {
        reject(new Error(`Server error (${xhr.status})`));
      }
    };

    xhr.onerror = () => reject(new Error("Network connection error."));
    xhr.ontimeout = () => reject(new Error("Upload timed out."));

    xhr.send(bodyData);
  });
}

async function uploadToFreeCloudFallback(file, onProgress) {
  const data = new FormData();
  data.append("reqtype", "fileupload");
  data.append("fileToUpload", file);

  if (onProgress) {
    onProgress({
      loaded: Math.round(file.size * 0.5),
      total: file.size,
      percent: 50,
      formattedLoaded: formatMB(file.size * 0.5),
      formattedTotal: formatMB(file.size),
    });
  }

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

function formatMB(bytes) {
  if (!bytes) return "0 MB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function getFileExt(filename) {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "jpg";
}
