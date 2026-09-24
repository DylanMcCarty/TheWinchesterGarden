import { APPS_SCRIPT_URL } from "../config";

/**
 * Fetches the list of approved growers from the Google Apps Script backend.
 * The Apps Script doGet() handler only returns rows whose Status is "Approved",
 * so this list is already safe to show publicly.
 */
export async function fetchGrowers() {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("PASTE_YOUR")) {
    throw new Error(
      "The Apps Script URL hasn't been configured yet. See apps-script/README.md."
    );
  }

  const response = await fetch(APPS_SCRIPT_URL, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Unexpected response shape from Apps Script.");
  }
  return data;
}

/**
 * Submits a new grower listing. It lands in the Google Sheet with
 * Status = "Pending" until you (the admin) mark it "Approved".
 */
export async function submitGrower(formData) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("PASTE_YOUR")) {
    throw new Error(
      "The Apps Script URL hasn't been configured yet. See apps-script/README.md."
    );
  }

  // Apps Script web apps handle simple form-encoded POSTs without needing
  // extra CORS configuration, so we send it that way rather than JSON.
  const body = new URLSearchParams();
  Object.entries(formData).forEach(([key, value]) => {
    body.append(key, value === undefined || value === null ? "" : String(value));
  });

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const result = await response.json();
  if (!result.ok) {
    throw new Error(result.error || "Submission failed.");
  }
  return result;
}
