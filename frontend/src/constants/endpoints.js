/**
 * API Endpoints Configuration
 * 
 * Centralized definition of all API endpoints used throughout the application.
 * Makes it easy to update endpoints in one place.
 */

import { apiConfig } from '../authConfig';

export const API_ENDPOINTS = {
  // Public endpoints
  PUBLIC: {
    HEALTH: `${apiConfig.baseUrl}/api/public`,
  },

  // Protected endpoints
  PROTECTED: {
    USERS: `${apiConfig.baseUrl}/api/users`,
    PRODUCTS: `${apiConfig.baseUrl}/api/products`,
    DASHBOARD: `${apiConfig.baseUrl}/api/dashboard`,
  },
};

export default API_ENDPOINTS;
