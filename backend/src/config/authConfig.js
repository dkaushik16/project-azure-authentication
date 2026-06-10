/**
 * Application Configuration
 * 
 * Centralized configuration for the Express server including:
 * - Azure AD / Entra ID settings
 * - CORS settings
 * - JWT validation settings
 */

import 'dotenv/config';

/**
 * Environment Variables
 */
const TENANT_ID = process.env.TENANT_ID || 'common';
const API_CLIENT_ID = process.env.API_CLIENT_ID;
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * Validation: Ensure all required environment variables are set
 */
if (!API_CLIENT_ID) {
  console.error('Missing required environment variable: API_CLIENT_ID');
  process.exit(1);
}

/**
 * CORS Configuration
 * Controls which origins can access the API
 */ 
export const corsConfig = {
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
};

/**
 * JWT Configuration
 * Settings for Microsoft Entra ID JWT validation
 */
export const jwtConfig = { 
  tenantId: TENANT_ID,
  clientId: API_CLIENT_ID,
  issuerPatterns: [
    /^https:\/\/login\.microsoftonline\.com\/[0-9a-f-]{36}\/v2\.0$/i,
    /^https:\/\/sts\.windows\.net\/[0-9a-f-]{36}\/$/i,
    /^https:\/\/login\.microsoftonline\.com\/common\/v2\.0$/i,
    /^https:\/\/login\.microsoftonline\.com\/consumers\/v2\.0$/i,
  ],
  audience: [
    `api://${API_CLIENT_ID}`, // v1.0 format
    API_CLIENT_ID, // v2.0 format (bare GUID)
  ],
  algorithms: ['RS256'],
  jwksUri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys',
};

/**
 * Server Configuration
 */
export const serverConfig = {
  port: PORT,
  env: NODE_ENV,
  isDevelopment: NODE_ENV === 'development',
  isProduction: NODE_ENV === 'production',
};

export default {
  corsConfig,
  jwtConfig,
  serverConfig,
  TENANT_ID,
  API_CLIENT_ID,
};
