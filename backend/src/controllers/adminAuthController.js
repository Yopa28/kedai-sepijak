// ============================================
// Admin Authentication Controller
// Kedai Sepijak Backend
// ============================================

const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// Secret key for JWT (should be in .env)
const JWT_SECRET = process.env.JWT_SECRET || "kedai-sepijak-secret-key-2024";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Login security settings
const MAX_FAILED_ATTEMPTS = parseInt(process.env.MAX_FAILED_ATTEMPTS || "5", 10);
const LOCKOUT_MINUTES = parseInt(process.env.LOCKOUT_MINUTES || "15", 10);
const CAPTCHA_THRESHOLD = parseInt(process.env.CAPTCHA_THRESHOLD || "3", 10);
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || "";
const CAPTCHA_ENABLED = Boolean(RECAPTCHA_SECRET && CAPTCHA_THRESHOLD > 0);

function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (xf && typeof xf === "string") return xf.split(",")[0].trim();
  return req.ip || req.connection?.remoteAddress || "unknown";
}

async function verifyRecaptcha(token) {
  if (!RECAPTCHA_SECRET || !token) return false;
  try {
    const { data } = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: token,
        },
      },
    );
    return data.success;
  } catch (error) {
    console.error("Recaptcha verification failed:", error?.message || error);
    return false;
  }
}

/**
 * Admin Login
 * @route POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    // Tambahkan log ini untuk melihat isi req.body
    console.log("====================================");
    console.log("🚀 Incoming Login Request:");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Headers:", req.headers);
    console.log("Body (raw):", req.body); // Ini sangat penting!
    console.log("Username from body:", req.body.username);
    console.log("Password from body:", req.body.password ? "[PROVIDED]" : "[NOT PROVIDED]");
    console.log("====================================");

    const { username, password } = req.body;
    const clientIp = getClientIp(req);

    // Validation
    if (!username || !password) {
      console.log("❌ Validation failed: username or password is missing");
      return res.status(400).json({
        success: false,
        message: "Username dan password harus diisi",
      });
    }

    // Ensure login attempts table exists (idempotent)
    try {
      await db.query(
        `CREATE TABLE IF NOT EXISTS admin_login_attempts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(191) NOT NULL,
            ip VARCHAR(64) NOT NULL,
            failed_count INT NOT NULL DEFAULT 0,
            last_failed_at DATETIME NULL,
            locked_until DATETIME NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_user_ip (username, ip)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
      );
    } catch (e) {
      console.warn("Could not ensure admin_login_attempts table:", e.message);
    }

    // Check lockout status for this username + IP
    let attempt;
    try {
      [attempt] = await db.query(
        `SELECT failed_count, locked_until FROM admin_login_attempts WHERE username = ? AND ip = ? LIMIT 1`,
        [username, clientIp],
      );
      const now = new Date();
      if (attempt && attempt.locked_until && new Date(attempt.locked_until) > now) {
        return res.status(429).json({
          success: false,
          message: `Terlalu banyak percobaan login. Coba lagi dalam ${LOCKOUT_MINUTES} menit.`,
        });
      }
    } catch (e) {
      console.warn("Lockout check failed:", e.message);
    }

    const failedCount = attempt?.failed_count || 0;
    const captchaRequired = CAPTCHA_ENABLED && failedCount >= CAPTCHA_THRESHOLD;
    if (captchaRequired) {
      const recaptchaToken = req.body.recaptchaToken;
      if (!recaptchaToken) {
        return res.status(422).json({
          success: false,
          message: "Silakan selesaikan captcha sebelum melanjutkan",
          captchaRequired: true,
        });
      }
      const human = await verifyRecaptcha(recaptchaToken);
      if (!human) {
        return res.status(422).json({
          success: false,
          message: "Captcha tidak valid",
          captchaRequired: true,
        });
      }
    }
    // Query admin user
    const users = await db.query(
      "SELECT * FROM admin_users WHERE username = ? AND is_active = 1",
      [username],
    );

    if (users.length === 0) {
      // Generic error + record failed attempt without leaking user existence
      try {
        const [existing] = await db.query(
          `SELECT id, failed_count FROM admin_login_attempts WHERE username = ? AND ip = ? LIMIT 1`,
          [username, clientIp]
        );
        if (existing) {
          const newCount = (existing.failed_count || 0) + 1;
          const lockSql = newCount >= MAX_FAILED_ATTEMPTS
            ? ", locked_until = DATE_ADD(NOW(), INTERVAL ? MINUTE)"
            : "";
          const params = [newCount, username, clientIp];
          if (lockSql) params.unshift(LOCKOUT_MINUTES);
          await db.query(
            `UPDATE admin_login_attempts SET failed_count = ?, last_failed_at = NOW()${lockSql} WHERE username = ? AND ip = ?`,
            params
          );
        } else {
          await db.query(
            `INSERT INTO admin_login_attempts (username, ip, failed_count, last_failed_at) VALUES (?, ?, 1, NOW())`,
            [username, clientIp]
          );
        }
      } catch (e) {
        console.warn("Failed to record login attempt (unknown user):", e.message);
      }
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    const user = users[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Record failed attempt
      try {
        const [existing] = await db.query(
          `SELECT id, failed_count FROM admin_login_attempts WHERE username = ? AND ip = ? LIMIT 1`,
          [username, clientIp]
        );
        const newCount = (existing?.failed_count || 0) + 1;
        const lockSql = newCount >= MAX_FAILED_ATTEMPTS
          ? ", locked_until = DATE_ADD(NOW(), INTERVAL ? MINUTE)"
          : "";
        const params = [newCount, username, clientIp];
        if (lockSql) params.unshift(LOCKOUT_MINUTES);

        if (existing) {
          await db.query(
            `UPDATE admin_login_attempts SET failed_count = ?, last_failed_at = NOW()${lockSql} WHERE username = ? AND ip = ?`,
            params
          );
        } else {
          // If threshold reached in first write, set locked_until too
          const lockValues = newCount >= MAX_FAILED_ATTEMPTS ? ", locked_until = DATE_ADD(NOW(), INTERVAL ? MINUTE)" : "";
          const insertParams = [username, clientIp, newCount];
          if (lockValues) insertParams.push(LOCKOUT_MINUTES);
          await db.query(
            `INSERT INTO admin_login_attempts (username, ip, failed_count, last_failed_at${lockValues ? ", locked_until" : ""}) VALUES (?, ?, ?, NOW()${lockValues ? ", DATE_ADD(NOW(), INTERVAL ? MINUTE)" : ""})`,
            insertParams
          );
        }
      } catch (e) {
        console.warn("Failed to record login attempt (bad password):", e.message);
      }

      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    // Successful login: reset attempts for this username+IP
    try {
      await db.query(
        `DELETE FROM admin_login_attempts WHERE username = ? AND ip = ?`,
        [username, clientIp]
      );
    } catch (e) {
      console.warn("Failed to clear login attempts on success:", e.message);
    }

    // Update last login
    await db.query("UPDATE admin_users SET last_login = NOW() WHERE id = ?", [
      user.id,
    ]);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    // Set token in HTTP-only cookie
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Log activity
    try {
      await db.query(
        "INSERT INTO activity_logs (admin_user_id, action, description) VALUES (?, ?, ?)",
        [user.id, "login", `Admin ${user.username} logged in`],
      );
    } catch (logError) {
      console.error("Error logging activity:", logError);
    }

    // Return user data (without password)
    res.json({
      success: true,
      message: "Login berhasil",
      data: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role,
        email: user.email,
        last_login: user.last_login,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Admin Logout
 * @route POST /api/auth/logout
 */
exports.logout = async (req, res) => {
  try {
    const userId = req.user?.id;

    // Log activity
    if (userId) {
      try {
        await db.query(
          "INSERT INTO activity_logs (admin_user_id, action, description) VALUES (?, ?, ?)",
          [userId, "logout", `Admin logged out`],
        );
      } catch (logError) {
        console.error("Error logging activity:", logError);
      }
    }

    // Clear cookie
    res.clearCookie("admin_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({
      success: true,
      message: "Logout berhasil",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat logout",
    });
  }
};

/**
 * Check Admin Session
 * @route GET /api/auth/session
 */
exports.checkSession = async (req, res) => {
  try {
    const token =
      req.cookies?.admin_token ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.json({
        success: true,
        logged_in: false,
        message: "No active session",
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      // Token invalid or expired
      res.clearCookie("admin_token");
      return res.json({
        success: true,
        logged_in: false,
        message: "Session expired",
      });
    }

    // Get user data
    const users = await db.query(
      "SELECT id, username, full_name, role, email, last_login FROM admin_users WHERE id = ? AND is_active = 1",
      [decoded.id],
    );

    if (users.length === 0) {
      res.clearCookie("admin_token");
      return res.json({
        success: true,
        logged_in: false,
        message: "User not found or inactive",
      });
    }

    res.json({
      success: true,
      logged_in: true,
      data: users[0],
    });
  } catch (error) {
    console.error("Check session error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memeriksa sesi",
    });
  }
};

/**
 * Get Admin Profile
 * @route GET /api/auth/profile
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const users = await db.query(
      "SELECT id, username, full_name, role, email, last_login, created_at FROM admin_users WHERE id = ?",
      [userId],
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: users[0],
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil profil",
    });
  }
};

/**
 * Update Admin Profile
 * @route PUT /api/auth/profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, email } = req.body;

    // Validation
    if (!full_name || !email) {
      return res.status(400).json({
        success: false,
        message: "Nama lengkap dan email harus diisi",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format email tidak valid",
      });
    }

    // Check if email already exists (excluding current user)
    const existingUsers = await db.query(
      "SELECT id FROM admin_users WHERE email = ? AND id != ?",
      [email, userId],
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email sudah digunakan oleh user lain",
      });
    }

    // Update profile
    await db.query(
      "UPDATE admin_users SET full_name = ?, email = ? WHERE id = ?",
      [full_name, email, userId],
    );

    // Log activity
    try {
      await db.query(
        "INSERT INTO activity_logs (admin_user_id, action, description) VALUES (?, ?, ?)",
        [userId, "update_profile", "Admin updated profile"],
      );
    } catch (logError) {
      console.error("Error logging activity:", logError);
    }

    // Get updated user data
    const users = await db.query(
      "SELECT id, username, full_name, role, email, last_login FROM admin_users WHERE id = ?",
      [userId],
    );

    res.json({
      success: true,
      message: "Profil berhasil diperbarui",
      data: users[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui profil",
    });
  }
};

/**
 * Change Admin Password
 * @route PUT /api/auth/password
 */
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { current_password, new_password, confirm_password } = req.body;

    // Validation
    if (!current_password || !new_password || !confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Password baru dan konfirmasi password tidak sama",
      });
    }

    if (new_password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password baru minimal 6 karakter",
      });
    }

    // Get current user
    const users = await db.query(
      "SELECT password FROM admin_users WHERE id = ?",
      [userId],
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      current_password,
      users[0].password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Password saat ini salah",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password
    await db.query("UPDATE admin_users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);

    // Log activity
    try {
      await db.query(
        "INSERT INTO activity_logs (admin_user_id, action, description) VALUES (?, ?, ?)",
        [userId, "change_password", "Admin changed password"],
      );
    } catch (logError) {
      console.error("Error logging activity:", logError);
    }

    res.json({
      success: true,
      message: "Password berhasil diubah",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengubah password",
    });
  }
};
