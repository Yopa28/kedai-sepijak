// ============================================
// Main Application File
// Kedai Sepijak Backend
// ============================================

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Import routes
const feedbackRoutes = require("./routes/feedbackRoutes");
const pollingRoutes = require("./routes/pollingRoutes");
const menuRoutes = require("./routes/menuRoutes");
const waitersRoutes = require("./routes/waitersRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");

// Import database
const { testConnection } = require("./config/database");

// Create Express app
const app = express();

// ============================================
// Middleware Setup
// ============================================

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || [
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Cookie parser middleware
app.use(cookieParser());

// Body parser middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Request logging middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); 
});

// ============================================
// Routes
// ============================================

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Kedai Sepijak API Server",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    status: "running",
  });
});

// API health check
app.get("/api/health", async (req, res) => {
  const dbStatus = await testConnection();

  res.status(200).json({
    success: true,
    message: "API is healthy",
    database: dbStatus ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/auth", adminAuthRoutes);
app.use("/api/dashboard", adminDashboardRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/polling", pollingRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/waiters", waitersRoutes);

// ============================================
// Error Handling Middleware
// ============================================

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors,
      timestamp: new Date().toISOString(),
    });
  }

  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry",
      error: "Resource already exists",
      timestamp: new Date().toISOString(),
    });   
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message: message,
    error:
      process.env.NODE_ENV === "production" ? "An error occurred" : err.stack,
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// Export App
// ============================================

module.exports = app;
