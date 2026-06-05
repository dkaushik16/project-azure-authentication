/**
 * JWT Middleware
 * 
 * Validates Bearer tokens from Microsoft Entra ID before allowing access
 * to protected endpoints
 */

import { expressjwt as expressJwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { jwtConfig } from '../config/authConfig.js';

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
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    algorithms: jwtConfig.algorithms,
  });
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
  jwtErrorHandler,
};
