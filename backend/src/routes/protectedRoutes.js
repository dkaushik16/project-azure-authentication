/**
 * Protected Routes
 * 
 * Routes that require valid JWT authentication
 */

import express from 'express';
import {
  getUsers,
  getProducts,
  getDashboardStats,
} from '../controllers/protectedController.js';

const router = express.Router();

/**
 * GET /api/users
 * Returns list of users (requires auth)
 */
router.get('/users', getUsers);

/**
 * GET /api/products
 * Returns list of products (requires auth)
 */
router.get('/products', getProducts);

/**
 * GET /api/dashboard
 * Returns dashboard statistics (requires auth)
 */
router.get('/dashboard', getDashboardStats);

export default router;
