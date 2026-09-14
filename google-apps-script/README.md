# RJV Studio — Google Apps Script & Google Drive Backend Setup Guide

This guide explains how to set up the **Google Apps Script Web App** to securely receive customer photos from the RJV Studio React website, save them into a dedicated **Google Drive** folder with auto-sequenced filenames (`RJV_Studio_YYYYMMDD_0001.jpg`), and return the Drive URL to open in WhatsApp.

---

## Step 1: Create the Google Drive Folder

1. Open [Google Drive](https://drive.google.com).
2. Click **+ New** → **New folder**.
3. Name the folder: `RJV Studio Submissions`.
4. Open the created folder in your browser.
5. Look at your browser address bar URL. It will look like this:
   `https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j_EXAMPLE`
6. Copy the string after `/folders/` — this is your **Folder ID** (e.g. `1a2b3c4d5e6f7g8h9i0j_EXAMPLE`).

---

## Step 2: Create the Google Apps Script Project

1. Open [Google Apps Script](https://script.google.com).
2. Click **+ New Project**.
3. Rename the project at the top left to: `RJV Studio Submissions Backend`.
4. Clear any default code in `Code.gs` and copy-paste all code from [`google-apps-script/Code.gs`](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/photography-studio/google-apps-script/Code.gs).

---

## Step 3: Configure Script Properties (Secrets & Config)

1. In Google Apps Script, click the **Project Settings** (gear icon ⚙️) on the left sidebar.
2. Scroll down to **Script Properties** and click **Edit script properties**.
3. Add the following two properties:

| Property | Value | Description |
| :--- | :--- | :--- |
| `FOLDER_ID` | `YOUR_GOOGLE_DRIVE_FOLDER_ID` | The Google Drive Folder ID from Step 1 |
| `TIMEZONE` | `Asia/Kolkata` | India Timezone for `YYYYMMDD` date generation |

4. Click **Save script properties**.

---

## Step 4: Deploy as a Web App

1. In the top right corner of the Google Apps Script editor, click **Deploy** → **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment options **EXACTLY** as shown below:

   - **Description**: `RJV Studio Photo Submission API`
   - **Execute as**: `Me (your-google-email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial so the React website can send requests)*

4. Click **Deploy**.
5. Google will prompt you to **Authorize access**:
   - Click **Authorize access** → Select your Google account.
   - Click **Advanced** → Click **Go to RJV Studio Submissions Backend (unsafe)**.
   - Click **Allow**.
6. Copy the **Web App URL** generated (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

## Step 5: Add Web App URL to React Frontend `.env`

In your React project root directory (`photography-studio`), update `.env`:

```env
# Studio WhatsApp number (international format)
VITE_WHATSAPP_NUMBER=917598382584

# Google Apps Script Web App URL from Step 4
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
```

Save `.env` and deploy the React website using:
```bash
npm run deploy
```

---

## How It Works (Security & Features)

- **Zero Credentials exposed**: Frontend only calls the Apps Script Web App URL. Google Drive folder ID, passwords, and service credentials remain 100% hidden inside Google Apps Script.
- **Concurrency Locking**: Uses Google Apps Script `LockService` so simultaneous submissions from multiple users never generate duplicate sequence numbers.
- **Daily Reset**: Filename resets to `0001` every day at midnight IST (`Asia/Kolkata`).
- **Filename Format**: `RJV_Studio_20260914_0001.jpg`, `RJV_Studio_20260914_0002.jpg`, etc.
- **WhatsApp Integration**: After upload, WhatsApp opens with the customer's Name, Address, Filename, and Google Drive URL.
