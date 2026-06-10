/* eslint-disable no-useless-assignment */
/**
 * Authentication Service
 * 
 * Handles all authentication-related operations including:
 * - Login with redirect flow
 * - Logout
 * - Error handling
 * 
 * This service abstracts authentication logic from UI components,
 * making it easier to test and maintain.
 */

/**
 * Initiates login using redirect flow
 * User will be redirected to Microsoft login page
 * 
 * @param {Object} instance - MSAL PublicClientApplication instance
 * @param {Object} loginRequest - Login request configuration
 * @returns {Promise<void>}
 * @throws {Error} Authentication error
 */
export const initiateLogin = async (instance, loginRequest) => {
  if (!instance || !loginRequest) {
    throw new Error('Invalid parameters: instance and loginRequest are required');
  }

  try {
    await instance.loginRedirect(loginRequest);
  } catch (error) {
    console.error('❌ Login error:', error);
    throw formatAuthError(error);
  }
};

/**
 * Initiates logout using redirect flow
 * 
 * @param {Object} instance - MSAL PublicClientApplication instance
 * @param {Object} logoutConfig - Logout configuration
 * @returns {Promise<void>}
 */
export const initiateLogout = async (instance, logoutConfig) => {
  if (!instance) {
    throw new Error('Invalid parameter: instance is required');
  }

  try {
    await instance.logoutRedirect(logoutConfig);
  } catch (error) {
    console.error('❌ Logout error:', error);
    throw formatAuthError(error);
  }
};

/**
 * Formats authentication errors into user-friendly messages
 * 
 * @param {Error} error - Authentication error object
 * @returns {Object} Formatted error with code and message
 */
export const formatAuthError = (error) => {
  const errorCode = error?.errorCode || error?.code || 'UNKNOWN_ERROR';
  let userMessage = "An authentication error occurred. Please try again.";

  switch (errorCode) {
    case 'user_cancelled_login':
      userMessage = 'Sign-in was cancelled. Please try again.';
      break;
    case 'timeout':
      userMessage = 'Sign-in request timed out. Please check your network and try again.';
      break;
    case 'AADSTS_0':
      userMessage = 'Authentication server error. Please try again in a few moments.';
      break;
    case 'AADSTS_50058':
      userMessage = 'Silent sign-in request failed. Please sign in again.';
      break;
    case 'invalid_request':
      userMessage = 'Invalid authentication request. Please refresh and try again.';
      break;
    default:
      userMessage = `Authentication error: ${error?.message || errorCode}`;
  }

  return {
    code: errorCode,
    message: userMessage,
    originalError: error,
  };
};

/**
 * Validates if authentication credentials are present
 * 
 * @param {Array} accounts - List of user accounts from MSAL
 * @returns {boolean} True if user is authenticated
 */
export const isUserAuthenticated = (accounts) => {
  return Array.isArray(accounts) && accounts.length > 0;
};

export default {
  initiateLogin,
  initiateLogout,
  formatAuthError,
  isUserAuthenticated,
};
