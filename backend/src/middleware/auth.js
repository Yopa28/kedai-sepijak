// ============================================
// Authentication Middleware
// Kedai Sepijak Backend
// ============================================

const jwt = require('jsonwebtoken');

// Secret key for JWT (should be in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'kedai-sepijak-secret-key-2024';

/**
 * Middleware to authenticate admin users
 * Verifies JWT token from cookie or Authorization header
 */
exports.authenticate = (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    let token = req.cookies?.admin_token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login.'
      });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user info to request
      req.user = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role
      };

      next();
    } catch (jwtError) {
      // Token invalid or expired
      res.clearCookie('admin_token');
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please login again.',
        error: jwtError.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token'
      });
    }
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

/**
 * Middleware to check if user has required role
 * @param {string|string[]} roles - Required role(s)
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const hasRole = roles.includes(req.user.role);

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions. You do not have access to this resource.'
      });
    }

    next();
  };
};

/**
 * Middleware to ensure current user has at least admin privileges
 */
exports.requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  const allowedRoles = ['admin', 'super_admin'];

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }

  next();
};

/**
 * Middleware to check if user is super admin
 */
exports.requireSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.role !== 'super_admin') {
    return res.status(403).json({
      success: false,
      message: 'Super admin access required'
    });
  }

  next();
};

/**
 * Optional authentication middleware
 * Attaches user info if token exists, but doesn't require it
 */
exports.optionalAuth = (req, res, next) => {
  try {
    let token = req.cookies?.admin_token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
          id: decoded.id,
          username: decoded.username,
          role: decoded.role
        };
      } catch (jwtError) {
        // Token invalid, but continue without user
        req.user = null;
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};
