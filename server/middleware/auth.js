/**
 * Authentication Middleware
 * Kedai Sepijak Server
 */

// Check if user is authenticated
export const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Unauthorized. Please login first.'
  });
};

// Check if user is admin
export const requireAdmin = (req, res, next) => {
  if (req.session && req.session.userId && req.session.userRole) {
    const allowedRoles = ['super_admin', 'admin'];

    if (allowedRoles.includes(req.session.userRole)) {
      return next();
    }
  }

  return res.status(403).json({
    success: false,
    message: 'Forbidden. Admin access required.'
  });
};

// Check if user is guest (not logged in)
export const requireGuest = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.status(400).json({
      success: false,
      message: 'Already logged in.'
    });
  }

  return next();
};

// Optional auth - doesn't require login but adds user info if logged in
export const optionalAuth = (req, res, next) => {
  // User info will be available in req.session if logged in
  next();
};

// Validate session
export const validateSession = (req, res, next) => {
  if (!req.session) {
    return res.status(500).json({
      success: false,
      message: 'Session configuration error'
    });
  }

  next();
};
