/**
 * Local Growers Directory — Google Apps Script backend
 * ------------------------------------------------------
 * This script is bound to a Google Sheet that acts as the database.
 * It gives your React site two endpoints via one Web App deployment:
 *
 *   GET  -> returns approved growers as JSON (for the public directory)
 *   POST -> appends a new grower submission with Status = "Pending"
 *           (so it stays hidden until you approve it in the Sheet)
 *
 * SETUP: see apps-script/README.md in this repo for step-by-step instructions.
 *
 * Expected Sheet header row (row 1), in this exact order:
 *   Timestamp | Status | FarmName | ContactName | Email | Phone | Location | Crops | Notes
 */

const SHEET_NAME = "Growers"; // change if you name your sheet tab differently

// Columns, in order, matching the header row above.
const COLUMNS = [
  "Timestamp",
  "Status",
  "FarmName",
  "ContactName",
  "Email",
  "Phone",
  "Location",
  "Crops",
  "Notes",
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
  }
  return sheet;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Public read endpoint. Only returns rows where Status === "Approved".
 *
 * Since the whole point of this site is to connect people, the grower's
 * email is included so visitors can reach out directly. Phone number is
 * left out of the public feed by default (uncomment it below if you'd
 * rather show that instead of/as well as email).
 */
function doGet(e) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const header = values[0];
  const rows = values.slice(1);

  const idx = {};
  header.forEach((name, i) => (idx[name] = i));

  const approved = rows
    .filter((row) => String(row[idx["Status"]]).trim() === "Approved")
    .map((row) => ({
      farmName: row[idx["FarmName"]],
      contactName: row[idx["ContactName"]],
      email: row[idx["Email"]],
      // phone: row[idx["Phone"]],
      location: row[idx["Location"]],
      crops: row[idx["Crops"]],
      notes: row[idx["Notes"]],
    }));

  return jsonResponse_(approved);
}

/**
 * Public write endpoint. Appends a new row with Status = "Pending".
 * Nothing submitted here is shown on the site until you change its
 * Status to "Approved" directly in the Google Sheet.
 */
function doPost(e) {
  try {
    const params = e.parameter;

    const farmName = (params.farmName || "").trim();
    const contactName = (params.contactName || "").trim();
    const email = (params.email || "").trim();

    if (!farmName || !contactName || !email) {
      return jsonResponse_({
        ok: false,
        error: "Farm name, contact name, and email are required.",
      });
    }

    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      "Pending",
      farmName,
      contactName,
      email,
      params.phone || "",
      params.location || "",
      params.crops || "",
      params.notes || "",
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}
