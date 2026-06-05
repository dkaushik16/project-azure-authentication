/**
 * Error Handler Middleware
 * 
 * Catches and formats all errors into standardized JSON responses
 */

export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
      code: err.code || 'INTERNAL_SERVER_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

/**
 * 404 Not Found Middleware
 * 
 * Handles requests to non-existent routes
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND',
      path: req.path,
      method: req.method,
    },
  });
};

export default {
  errorHandler,
  notFoundHandler,
};
