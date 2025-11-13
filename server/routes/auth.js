/**
 * Authentication Routes
 * Kedai Sepijak Server
 */

import express from 'express';
import { login, logout, checkSession, getCurrentUser } from '../controllers/authController.js';
import { requireAuth, requireGuest } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login admin user
 * @access  Public
 */
router.post('/login', requireGuest, login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout admin user
 * @access  Private
 */
router.post('/logout', requireAuth, logout);

/**
 * @route   GET /api/auth/session
 * @desc    Check session status
 * @access  Public
 */
router.get('/session', checkSession);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user info
 * @access  Private
 */
router.get('/me', requireAuth, getCurrentUser);

export default router;
