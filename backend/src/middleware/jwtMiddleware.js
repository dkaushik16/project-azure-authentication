/**
 * JWT Middleware
 * 
 * Validates Bearer tokens from Microsoft Entra ID before allowing access
 * to protected endpoints
 */

import { expressjwt as expressJwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { jwtConfig } from '../config/authConfig.js';

const isAllowedIssuer = (issuer = '') => {
  return jwtConfig.issuerPatterns.some((pattern) => pattern.test(issuer));
};

/**
 * Creates and returns the JWT validation middleware
 * 
 * @returns {Function} Express middleware function
 */
export const createJwtMiddleware = () => {
  return expressJwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: jwtConfig.jwksUri,
    }),
    audience: jwtConfig.audience,
    algorithms: jwtConfig.algorithms,
  });
};

/**
 * Validates the token issuer for Microsoft work/school and personal accounts
 * after signature verification has succeeded.
 */
export const validateJwtIssuer = (req, res, next) => {
  const issuer = req.auth?.iss;

  if (!issuer || !isAllowedIssuer(issuer)) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token issuer is not allowed for this API.',
      code: 'INVALID_ISSUER',
    });
  }

  next();
};

/**
 * JWT Error Handler Middleware
 * 
 * Catches JWT validation errors and returns standardized error responses
 * 
 * @param {Error} err - Error object
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next
 */
export const jwtErrorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: err.message,
      code: 'INVALID_TOKEN',
    });
  }
  // Pass other errors to the general error handler
  next(err);
};

export default {
  createJwtMiddleware,
  validateJwtIssuer,
  jwtErrorHandler,
};
