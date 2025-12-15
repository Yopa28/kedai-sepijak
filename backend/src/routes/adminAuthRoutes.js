// ============================================
// Admin Authentication Routes
// Kedai Sepijak Backend
// ============================================

const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');
const { authenticate } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');

/**
 * @route   POST /api/auth/login
 * @desc    Admin login
 * @access  Public (rate-limited)
 */
router.post('/login', loginLimiter, adminAuthController.login);

/**
 * @route   POST /api/auth/logout
 * @desc    Admin logout
 * @access  Private
 */
router.post('/logout', authenticate, adminAuthController.logout);

/**
 * @route   GET /api/auth/session
 * @desc    Check admin session
 * @access  Public (checks session if exists)
 */
router.get('/session', adminAuthController.checkSession);

/**
 * @route   GET /api/auth/profile
 * @desc    Get admin profile
 * @access  Private
 */
router.get('/profile', authenticate, adminAuthController.getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update admin profile
 * @access  Private
 */
router.put('/profile', authenticate, adminAuthController.updateProfile);

/**
 * @route   PUT /api/auth/password
 * @desc    Change admin password
 * @access  Private
 */
router.put('/password', authenticate, adminAuthController.changePassword);

module.exports = router;
