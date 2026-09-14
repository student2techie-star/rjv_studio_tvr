# RJV Studio — 3-Minute Google Apps Script Deployment Guide

Your Google Drive Folder ID: **`19-ZybfOLAwEbi-QtamhU8ok_Dz7PxcvN`**

Follow these 5 simple steps to activate your automatic Google Drive photo uploader.

---

### Step 1: Open Google Apps Script
1. Go to [script.google.com](https://script.google.com).
2. Click **+ New Project** (top left).
3. Name your project at the top left: `RJV Studio Uploader`.

---

### Step 2: Paste the Code
1. Erase any default code in the editor.
2. Copy and paste all code from [`google-apps-script/Code.gs`](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/photography-studio/google-apps-script/Code.gs) into the editor.
3. Click the **Save** disk icon (or press `Ctrl + S`).

---

### Step 3: Add your Drive Folder ID to Settings
1. On the left sidebar, click the **Gear Icon** (⚙️ Project Settings).
2. Scroll down to **Script Properties** and click **Edit script properties**.
3. Click **Add script property** and enter:
   - **Property**: `FOLDER_ID`
   - **Value**: `19-ZybfOLAwEbi-QtamhU8ok_Dz7PxcvN`
4. Click **Add script property** again and enter:
   - **Property**: `TIMEZONE`
   - **Value**: `Asia/Kolkata`
5. Click **Save script properties**.

---

### Step 4: Deploy as a Web App
1. At the top right, click the blue **Deploy** button → select **New deployment**.
2. Next to "Select type", click the gear icon ⚙️ → select **Web app**.
3. Set the configuration EXACTLY like this:
   - **Description**: `RJV Studio Photo Submission API`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: must be Anyone so website visitors can upload)*
4. Click **Deploy**.
5. Click **Authorize access**:
   - Select your Google account.
   - Click **Advanced** (small text at bottom left).
   - Click **Go to RJV Studio Uploader (unsafe)**.
   - Click **Allow**.

---

### Step 5: Copy your Web App URL
1. Google will display a **Web App URL** starting with:
   `https://script.google.com/macros/s/AKfycb.../exec`
2. Copy that URL and paste it back here to complete the setup!
