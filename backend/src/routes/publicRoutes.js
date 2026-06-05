/**
 * Public Routes
 * 
 * Routes that don't require authentication
 */

import express from 'express';
import { getPublicStatus } from '../controllers/publicController.js';

const router = express.Router();

/**
 * GET /api/public
 * Returns public endpoint status (no auth required)
 */
router.get('/public', getPublicStatus);

export default router;
