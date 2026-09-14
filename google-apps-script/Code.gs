/**
 * RJV Studio - Google Apps Script Photo Submission Backend
 * 
 * Handles secure photo uploads from RJV Studio React Frontend to Google Drive.
 * Generates concurrency-safe daily sequential filenames: RJV_Studio_YYYYMMDD_0001.ext
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Drive -> Create folder: "RJV Studio Submissions" -> Copy Folder ID from URL.
 * 2. Open https://script.google.com -> Create new project: "RJV Studio Submissions Backend".
 * 3. Paste this code into Code.gs.
 * 4. Project Settings (gear icon) -> Script Properties -> Add Property:
 *    - FOLDER_ID = your_google_drive_folder_id
 *    - TIMEZONE  = Asia/Kolkata
 * 5. Deploy -> New deployment -> Select type: Web app
 *    - Description: RJV Studio Photo Submission API
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy Web App URL into frontend .env as VITE_GOOGLE_APPS_SCRIPT_URL
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, message: "No payload received." });
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createJsonResponse({ success: false, message: "Invalid JSON format." });
    }

    // 1. Backend Validation
    var name = (data.name || "").toString().trim();
    var address = (data.address || "").toString().trim();
    var base64Data = (data.image || data.base64 || "").toString();
    var originalFilename = (data.filename || "photo.jpg").toString().trim();
    var mimeType = (data.mimeType || "image/jpeg").toString().trim();

    if (!name || name.length < 2) {
      return createJsonResponse({ success: false, message: "Please enter a valid name (at least 2 characters)." });
    }

    if (!address || address.length < 5) {
      return createJsonResponse({ success: false, message: "Please enter a valid address (at least 5 characters)." });
    }

    if (!base64Data) {
      return createJsonResponse({ success: false, message: "No image file provided." });
    }

    // Validate MIME types (JPG, JPEG, PNG, WEBP)
    var allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowedTypes.indexOf(mimeType.toLowerCase()) === -1) {
      return createJsonResponse({ success: false, message: "Only JPG, JPEG, PNG and WEBP images are allowed." });
    }

    // Remove base64 data URI header prefix if present (e.g. data:image/jpeg;base64,)
    if (base64Data.indexOf(",") > -1) {
      base64Data = base64Data.split(",")[1];
    }

    // Decode byte size check (max 10MB approx 10.5 million chars)
    var bytes = Utilities.base64Decode(base64Data);
    if (bytes.length > 10 * 1024 * 1024) {
      return createJsonResponse({ success: false, message: "Image size must be less than 10 MB." });
    }

    // 2. Concurrency Lock using LockService
    var lock = LockService.getScriptLock();
    // Wait up to 30 seconds for other concurrent requests to complete
    if (!lock.waitLock(30000)) {
      return createJsonResponse({ success: false, message: "Server busy processing another upload. Please try again." });
    }

    var resultFilename = "";
    var fileUrl = "";
    var fileId = "";

    try {
      var props = PropertiesService.getScriptProperties();
      var folderId = props.getProperty("FOLDER_ID");
      var timezone = props.getProperty("TIMEZONE") || "Asia/Kolkata";

      if (!folderId) {
        throw new Error("Google Drive FOLDER_ID is not configured in Script Properties.");
      }

      var folder = DriveApp.getFolderById(folderId);
      if (!folder) {
        throw new Error("Target Google Drive folder not found.");
      }

      // 3. Date Formatting (YYYYMMDD) in Asia/Kolkata timezone
      var now = new Date();
      var todayFormatted = Utilities.formatDate(now, timezone, "yyyyMMdd");

      // 4. Concurrency-Safe Daily Sequence (0001, 0002, ...)
      var lastDateKey = "LAST_SEQUENCE_DATE";
      var lastSeqKey = "LAST_SEQUENCE_NUMBER";

      var storedDate = props.getProperty(lastDateKey);
      var currentSeq = 0;

      if (storedDate === todayFormatted) {
        currentSeq = parseInt(props.getProperty(lastSeqKey) || "0", 10);
      } else {
        // Reset sequence for new day
        currentSeq = 0;
        props.setProperty(lastDateKey, todayFormatted);
      }

      currentSeq += 1;
      props.setProperty(lastSeqKey, currentSeq.toString());

      // 5. File Extension Normalization
      var ext = getNormalizedExtension(originalFilename, mimeType);

      // Format sequence number to 4 digits (e.g. 0001)
      var paddedSeq = ("0000" + currentSeq).slice(-4);
      resultFilename = "RJV_Studio_" + todayFormatted + "_" + paddedSeq + ext;

      // 6. Create Blob & Save to Drive
      var blob = Utilities.newBlob(bytes, mimeType, resultFilename);
      var file = folder.createFile(blob);

      // Set description with customer metadata
      file.setDescription("Customer: " + name + "\nAddress: " + address + "\nUploaded: " + now.toISOString());

      fileId = file.getId();
      fileUrl = file.getUrl();

    } finally {
      // Release lock so next request can proceed safely
      lock.releaseLock();
    }

    return createJsonResponse({
      success: true,
      filename: resultFilename,
      fileId: fileId,
      fileUrl: fileUrl,
      name: name,
      address: address
    });

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return createJsonResponse({
      success: false,
      message: "Unable to upload your photo. Please try again."
    });
  }
}

function doGet(e) {
  return createJsonResponse({
    status: "online",
    service: "RJV Studio Photo Submission API",
    time: new Date().toISOString()
  });
}

function getNormalizedExtension(filename, mimeType) {
  var ext = "";
  if (filename && filename.indexOf(".") > -1) {
    ext = "." + filename.split(".").pop().toLowerCase();
  }
  if (!ext || ext.length > 5) {
    if (mimeType.indexOf("png") > -1) ext = ".png";
    else if (mimeType.indexOf("webp") > -1) ext = ".webp";
    else ext = ".jpg";
  }
  if (ext === ".jpeg") ext = ".jpg"; // normalize jpeg to jpg
  return ext;
}

function createJsonResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
