/**
 * Azure AD / Entra ID Configuration
 *
 * This file contains all authentication-related configuration for MSAL.
 * All sensitive values are loaded from environment variables.
 *
 * @see https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications
 */

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID;
const redirectUri = import.meta.env.VITE_AZURE_REDIRECT_URI;
const postLogoutRedirectUri = import.meta.env
  .VITE_AZURE_POST_LOGOUT_REDIRECT_URI;
const logLevel = import.meta.env.VITE_LOG_LEVEL || "Info";

/**
 * MSAL Configuration Object
 * Configures the authentication behavior and caching strategy
 */
export const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri,
    postLogoutRedirectUri,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    allowNativeBroker: false,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        console.log(`[MSAL] ${message}`);
      },
      piiLoggingEnabled: false,
      logLevel,
    },
  },
};

/**
 * Login Request Configuration
 * Defines the scopes and prompt behavior for the login flow
 * Using redirect flow instead of popup for better UX
 */
export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "api://1a2f2cbf-3402-4eef-b4a2-70351e21e990/access_as_user",
  ],
  prompt: "select_account",
};

/**
 * Token Request Configuration
 * Used for silent token acquisition during API calls
 */
export const apiRequest = {
  scopes: ["api://1a2f2cbf-3402-4eef-b4a2-70351e21e990/access_as_user"],
};

/**
 * API Configuration
 */
export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
};

/**
 * Validation: Ensure all required environment variables are set
 */
if (!clientId || !tenantId) {
  console.error(
    "❌ Missing required Azure AD configuration. Please check your .env file.",
  );
}
