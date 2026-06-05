/**
 * API Service
 * 
 * Handles all API communication with the backend including:
 * - Making authenticated API requests
 * - Token acquisition
 * - Error handling and logging
 * 
 * This service provides a centralized interface for backend communication.
 */

import { apiRequest } from '../authConfig';
import API_ENDPOINTS from '../constants/endpoints';

/**
 * Acquires an access token for API calls
 * 
 * @param {Object} instance - MSAL PublicClientApplication instance
 * @param {Object} accounts - User accounts array
 * @returns {Promise<string>} Access token
 * @throws {Error} Token acquisition failed
 */
export const getAccessToken = async (instance, accounts) => {
  if (!instance || !accounts || accounts.length === 0) {
    throw new Error('Invalid parameters: instance and accounts are required');
  }

  try {
    const response = await instance.acquireTokenSilent({
      ...apiRequest,
      account: accounts[0],
    });
    return response.accessToken;
  } catch (error) {
    console.error('❌ Failed to acquire access token:', error);
    throw new Error('Failed to acquire access token. Please sign in again.');
  }
};

/**
 * Makes a public API request (no authentication required)
 * 
 * @param {string} endpoint - API endpoint URL
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Object>} API response
 * @throws {Error} API request failed
 */
export const callPublicApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Public API call failed (${endpoint}):`, error);
    throw new Error(formatApiError(error));
  }
};

/**
 * Makes a protected API request (requires authentication)
 * 
 * @param {string} endpoint - API endpoint URL
 * @param {string} accessToken - Access token for authentication
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Object>} API response
 * @throws {Error} API request failed
 */
export const callProtectedApi = async (endpoint, accessToken, options = {}) => {
  if (!accessToken) {
    throw new Error('Access token is required for protected API calls');
  }

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Token may have expired. Please sign in again.');
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Protected API call failed (${endpoint}):`, error);
    throw new Error(formatApiError(error));
  }
};

/**
 * Formats API errors into user-friendly messages
 * 
 * @param {Error} error - Error object
 * @returns {string} Formatted error message
 */
export const formatApiError = (error) => {
  if (error?.message?.includes('Failed to fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  if (error?.message?.includes('Unauthorized')) {
    return 'Your session has expired. Please sign in again.';
  }
  return error?.message || 'An error occurred while calling the API.';
};

/**
 * Fetches data from a specified API endpoint
 * Automatically handles authentication for protected endpoints
 * 
 * @param {string} path - API path (e.g., '/api/users')
 * @param {Object} instance - MSAL instance
 * @param {Array} accounts - User accounts
 * @param {boolean} isProtected - Whether endpoint requires authentication
 * @returns {Promise<Object>} API response
 */
export const fetchFromApi = async (path, instance, accounts, isProtected = false) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const endpoint = `${baseUrl}${path}`;

  try {
    if (isProtected) {
      const token = await getAccessToken(instance, accounts);
      return await callProtectedApi(endpoint, token);
    } else {
      return await callPublicApi(endpoint);
    }
  } catch (error) {
    console.error(`❌ API fetch failed for ${path}:`, error);
    throw error;
  }
};

export default {
  getAccessToken,
  callPublicApi,
  callProtectedApi,
  formatApiError,
  fetchFromApi,
  API_ENDPOINTS,
};
