// ============================================
// Rate Limiter Middleware
// Kedai Sepijak Backend
// ============================================

const rateLimit = require("express-rate-limit");

/**
 * Strict limiter for login attempts to mitigate brute-force attacks
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak percobaan login. Coba lagi dalam beberapa menit.",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

/**
 * Generic API limiter (can be reused by other sensitive routes)
 */
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  loginLimiter,
  apiLimiter,
};
