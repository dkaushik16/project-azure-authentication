/**
 * Logging Utility
 * 
 * Provides formatted logging for development
 */

export const logger = {
  /**
   * Log info message
   */
  info: (message, data) => {
    console.log(`ℹ️  ${message}`, data ? JSON.stringify(data) : '');
  },

  /**
   * Log success message
   */
  success: (message, data) => {
    console.log(`✅ ${message}`, data ? JSON.stringify(data) : '');
  },

  /**
   * Log error message
   */
  error: (message, error) => {
    console.error(`❌ ${message}`, error?.message || error || '');
  },

  /**
   * Log warning message
   */
  warn: (message, data) => {
    console.warn(`⚠️  ${message}`, data ? JSON.stringify(data) : '');
  },

  /**
   * Log debug message (only in development)
   */
  debug: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 ${message}`, data ? JSON.stringify(data, null, 2) : '');
    }
  },
};

export default logger;
