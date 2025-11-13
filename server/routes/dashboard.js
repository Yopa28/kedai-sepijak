/**
 * Dashboard Routes
 * Kedai Sepijak Server
 */

import express from 'express';
import { getDashboardStats, getQuickStats } from '../controllers/dashboardController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get complete dashboard statistics
 * @access  Private (Admin)
 */
router.get('/stats', requireAuth, getDashboardStats);

/**
 * @route   GET /api/dashboard/quick-stats
 * @desc    Get quick statistics for widgets
 * @access  Private (Admin)
 */
router.get('/quick-stats', requireAuth, getQuickStats);

export default router;
