# Setting up the Google Sheet + Apps Script backend

This is the "database" for the site. No server hosting, no monthly cost —
just a Google Sheet and a small script attached to it. Takes about 10 minutes.

## 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new,
   blank spreadsheet.
2. Rename it something like **Local Growers Directory**.
3. Rename **Sheet1** (the tab at the bottom) to **Growers**.
   (If you'd rather keep a different tab name, update `SHEET_NAME` at the
   top of `Code.gs` to match.)
4. You don't need to type the header row yourself — the script creates it
   automatically the first time it runs. But if you want it there right away,
   add this as row 1:

   `Timestamp | Status | FarmName | ContactName | Email | Phone | Location | Crops | Notes`

## 2. Add the script

1. In your Sheet, click **Extensions → Apps Script**.
2. Delete anything in the default `Code.gs` editor and paste in the full
   contents of this repo's `apps-script/Code.gs` file.
3. Click the **Save** icon (or Ctrl/Cmd+S).

## 3. Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: anything, e.g. "Growers directory API"
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
   (This is what allows your React site, and anyone submitting the form,
   to reach it without needing a Google login.)
4. Click **Deploy**.
5. The first time, Google will ask you to authorize the script — click
   through the "Advanced" / "Go to [project name] (unsafe)" prompts. This
   warning appears because it's your own unpublished script, not because
   anything is actually wrong.
6. Copy the **Web app URL** it gives you. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Point the site at it

1. Open `src/config.js` in this repo.
2. Paste the URL into `APPS_SCRIPT_URL`.
3. Save, then run `npm run dev` (or redeploy) to pick up the change.

## 5. Reviewing submissions (the admin workflow)

Every new submission lands as a new row in the **Growers** sheet with
`Status` set to `Pending` — it will NOT show up on the public site yet.

To publish a listing:

1. Open the Google Sheet.
2. Find the row for that grower.
3. Change the **Status** cell from `Pending` to `Approved` (exact spelling,
   case-sensitive).

That's it — the next time someone loads the Directory page, that grower
will appear. To remove a listing later, just change Status back to
anything other than `Approved` (e.g. `Rejected`), or delete the row.

## 6. If you ever change the script

If you edit `Code.gs` later, you need to create a **new deployment version**
for the changes to go live:

1. **Deploy → Manage deployments**.
2. Click the pencil/edit icon on the existing deployment.
3. Under "Version", choose **New version**.
4. Click **Deploy**.

(Just saving the script in the editor is not enough — the live Web App URL
keeps serving the old version until you do this.)

## Notes

- The grower's **email** is included in the public feed by default, since
  that's how visitors actually get in touch. **Phone** is left out (see the
  commented-out line in `doGet` in `Code.gs`) — uncomment it if you'd rather
  show a phone number too. Let growers know, when they submit, that their
  email will be shown publicly to anyone browsing the directory.
- There's no login/authentication on the Web App itself — anyone with the
  URL can call it. That's normal for this kind of simple setup; just don't
  put anything in the Sheet you wouldn't want potentially visible via the
  API (which is only the Approved rows anyway).
