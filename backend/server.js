// ============================================
// Server Entry Point
// Kedai Sepijak Backend
// ============================================

const app = require("./src/app");
const { testConnection, closePool } = require("./src/config/database");
require("dotenv").config();

// Server configuration
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

// Start server
const startServer = async () => {
  try {
    // Test database connection
    console.log("🔌 Testing database connection...");
    const isConnected = await testConnection();

    if (!isConnected) {
      console.error(
        "❌ Failed to connect to database. Please check your configuration.",
      );
      process.exit(1);
    }

    // Start Express server
    const server = app.listen(PORT, HOST, () => {
      console.log("");
      console.log("╔════════════════════════════════════════════╗");
      console.log("║   🚀 Kedai Sepijak API Server Started!   ║");
      console.log("╚════════════════════════════════════════════╝");
      console.log("");
      console.log(`📍 Server running on: http://${HOST}:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📊 Database: ${process.env.DB_NAME || "kedai_sepijak"}`);
      console.log("");
      console.log("📚 API Endpoints:");
      console.log(`   - Health Check:  http://${HOST}:${PORT}/api/health`);
      console.log(`   - Feedback:      http://${HOST}:${PORT}/api/feedback`);
      console.log(`   - Polling:       http://${HOST}:${PORT}/api/polling`);
      console.log(`   - Menu:          http://${HOST}:${PORT}/api/menu`);
      console.log("");
      console.log("✨ Ready to accept requests!");
      console.log("");
    });

    // Graceful shutdown handling
    const gracefulShutdown = async (signal) => {
      console.log("");
      console.log(
        `\n🛑 ${signal} signal received. Starting graceful shutdown...`,
      );

      server.close(async () => {
        console.log("✅ HTTP server closed");

        try {
          await closePool();
          console.log("✅ Database connections closed");
          console.log("👋 Server shutdown complete");
          process.exit(0);
        } catch (error) {
          console.error("❌ Error during shutdown:", error);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error("⚠️  Forced shutdown due to timeout");
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Handle uncaught exceptions
    process.on("uncaughtException", (error) => {
      console.error("❌ Uncaught Exception:", error);
      gracefulShutdown("uncaughtException");
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason, promise) => {
      console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
      gracefulShutdown("unhandledRejection");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
