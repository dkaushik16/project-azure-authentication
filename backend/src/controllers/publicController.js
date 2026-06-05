/**
 * Public API Controller
 * 
 * Handles public endpoints that don't require authentication
 */

/**
 * Public Health/Status Endpoint
 * 
 * Returns basic information about the API
 */
export const getPublicStatus = (req, res) => {
  res.json({
    message: 'This is a public endpoint — no token required.',
    timestamp: new Date().toISOString(),
    status: 'ok',
  });
};

export default {
  getPublicStatus,
};
