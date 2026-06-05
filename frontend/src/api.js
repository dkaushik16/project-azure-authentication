// src/api.js
import { msalInstance } from "./main.jsx";
import { apiRequest, API_BASE_URL } from "./authConfig";

/**
 * Acquires a token silently (cache) or via popup fallback,
 * then calls the given API endpoint with Authorization: Bearer header.
 */
export async function callApi(endpoint) {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0)
    throw new Error("No signed-in account. Please login.");

  let tokenResponse;
  try {
    tokenResponse = await msalInstance.acquireTokenSilent({
      ...apiRequest,
      account: accounts[0],
    });
  } catch {
    // Token expired or not in cache — show popup
    tokenResponse = await msalInstance.acquireTokenPopup(apiRequest);
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${tokenResponse.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `${res.status} ${res.statusText}`);
  }

  return res.json();
}

/** Public endpoint — no token needed */
export async function callPublicApi() {
  const res = await fetch(`${API_BASE_URL}/api/public`);
  return res.json();
}

/** Returns the raw access token string for inspection */
export async function getAccessToken() {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) throw new Error("Not signed in");
  const response = await msalInstance.acquireTokenSilent({
    ...apiRequest,
    account: accounts[0],
  });
  console.log("Response access token:", response);
  return response.accessToken;
}
