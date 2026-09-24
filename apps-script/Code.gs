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
<<<<<<< HEAD
 *   Timestamp | Status | FarmName | ContactName | Email | Phone | ShowPhone | Location | Crops | Notes
=======
 *   Timestamp | Status | FarmName | ContactName | Email | Phone | Location | Crops | Notes
>>>>>>> 79960d865669a559a8f47735cbb5eb0ea7272e73
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
<<<<<<< HEAD
  "ShowPhone",
=======
>>>>>>> 79960d865669a559a8f47735cbb5eb0ea7272e73
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
<<<<<<< HEAD
  } else {
    // If the script is updated to add new columns (like ShowPhone) after
    // your sheet already has rows in it, add any missing header(s) at the
    // end rather than breaking on existing data.
    const header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const missing = COLUMNS.filter((c) => header.indexOf(c) === -1);
    if (missing.length > 0) {
      sheet.getRange(1, header.length + 1, 1, missing.length).setValues([missing]);
    }
=======
>>>>>>> 79960d865669a559a8f47735cbb5eb0ea7272e73
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
<<<<<<< HEAD
 * email is always included so visitors can reach out directly. Phone
 * number is only included when that grower checked "show my phone number
 * publicly" on the submission form (Status column "ShowPhone" = true).
=======
 * email is included so visitors can reach out directly. Phone number is
 * left out of the public feed by default (uncomment it below if you'd
 * rather show that instead of/as well as email).
>>>>>>> 79960d865669a559a8f47735cbb5eb0ea7272e73
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
<<<<<<< HEAD
    .map((row) => {
      const entry = {
        farmName: row[idx["FarmName"]],
        contactName: row[idx["ContactName"]],
        email: row[idx["Email"]],
        location: row[idx["Location"]],
        crops: row[idx["Crops"]],
        notes: row[idx["Notes"]],
      };

      const showPhone =
        String(row[idx["ShowPhone"]]).trim().toLowerCase() === "true";
      const phone = row[idx["Phone"]];
      if (showPhone && phone) {
        entry.phone = phone;
      }

      return entry;
    });
=======
    .map((row) => ({
      farmName: row[idx["FarmName"]],
      contactName: row[idx["ContactName"]],
      email: row[idx["Email"]],
      // phone: row[idx["Phone"]],
      location: row[idx["Location"]],
      crops: row[idx["Crops"]],
      notes: row[idx["Notes"]],
    }));
>>>>>>> 79960d865669a559a8f47735cbb5eb0ea7272e73

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

<<<<<<< HEAD
    const showPhone = String(params.showPhone || "").toLowerCase() === "true";

=======
>>>>>>> 79960d865669a559a8f47735cbb5eb0ea7272e73
    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      "Pending",
      farmName,
      contactName,
      email,
      params.phone || "",
<<<<<<< HEAD
      showPhone,
=======
>>>>>>> 79960d865669a559a8f47735cbb5eb0ea7272e73
      params.location || "",
      params.crops || "",
      params.notes || "",
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}
