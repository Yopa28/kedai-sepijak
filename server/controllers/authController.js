/**
 * Authentication Controller
 * Kedai Sepijak Server
 */

import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';

/**
 * Login admin user
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find user in database
    const sql = `
      SELECT id, username, password, email, full_name, role, is_active
      FROM admin_users
      WHERE username = ?
      LIMIT 1
    `;

    const users = await query(sql, [username]);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const user = users[0];

    // Check if account is active
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact administrator.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Update last login
    await query(
      'UPDATE admin_users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Create session
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.email = user.email;
    req.session.fullName = user.full_name;
    req.session.userRole = user.role;
    req.session.loginTime = Date.now();

    // Return user data (without password)
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login'
    });
  }
};

/**
 * Logout admin user
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  try {
    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error during logout'
        });
      }

      // Clear cookie
      res.clearCookie('connect.sid');

      return res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during logout'
    });
  }
};

/**
 * Check session status
 * GET /api/auth/session
 */
export const checkSession = async (req, res) => {
  try {
    // Check if session exists and has user
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        success: false,
        logged_in: false,
        message: 'Not logged in'
      });
    }

    // Check session timeout (8 hours)
    const SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    const currentTime = Date.now();
    const loginTime = req.session.loginTime || 0;

    if ((currentTime - loginTime) > SESSION_TIMEOUT) {
      // Session expired
      req.session.destroy();
      return res.status(401).json({
        success: false,
        logged_in: false,
        message: 'Session expired. Please login again.'
      });
    }

    // Session is valid
    return res.status(200).json({
      success: true,
      logged_in: true,
      data: {
        id: req.session.userId,
        username: req.session.username,
        email: req.session.email,
        full_name: req.session.fullName,
        role: req.session.userRole
      }
    });

  } catch (error) {
    console.error('Check session error:', error);
    return res.status(500).json({
      success: false,
      logged_in: false,
      message: 'An error occurred'
    });
  }
};

/**
 * Get current user info
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    // Get user from database
    const sql = `
      SELECT id, username, email, full_name, role, last_login
      FROM admin_users
      WHERE id = ? AND is_active = 1
      LIMIT 1
    `;

    const users = await query(sql, [req.session.userId]);

    if (users.length === 0) {
      // User not found or deactivated
      req.session.destroy();
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        last_login: user.last_login
      }
    });

  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred'
    });
  }
};
