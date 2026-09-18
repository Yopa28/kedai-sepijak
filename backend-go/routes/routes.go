package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"

	"kedai-sepijak-backend/internal/auth"
	"kedai-sepijak-backend/internal/dashboard"
	"kedai-sepijak-backend/internal/feedback"
	"kedai-sepijak-backend/internal/menu"
	"kedai-sepijak-backend/internal/polling"
	"kedai-sepijak-backend/internal/waiter"
	"kedai-sepijak-backend/middleware"
)

func Setup(r *gin.Engine, db *sql.DB, jwtSecret string) {
	// =========================
	// AUTH
	// =========================
	authRepository := auth.NewRepository(db)
	authService := auth.NewService(authRepository, jwtSecret)
	authHandler := auth.NewHandler(authService)

	// =========================
	// FEEDBACK
	// =========================
	feedbackRepository := feedback.NewRepository(db)
	feedbackService := feedback.NewService(feedbackRepository)
	feedbackHandler := feedback.NewHandler(feedbackService)
	feedbackAnalyticsRepository := feedback.NewAnalyticsRepository(db)
	feedbackAnalyticsService := feedback.NewAnalyticsService(
		feedbackAnalyticsRepository,
	)
	feedbackAnalyticsHandler := feedback.NewAnalyticsHandler(
		feedbackAnalyticsService,
	)

	// =========================
	// WAITER
	// =========================
	waiterRepository := waiter.NewRepository(db)
	waiterService := waiter.NewService(waiterRepository)
	waiterHandler := waiter.NewHandler(waiterService)

	// =========================
	// MENU
	// =========================
	menuRepository := menu.NewRepository(db)
	menuService := menu.NewService(menuRepository)
	menuHandler := menu.NewHandler(menuService)

	// =========================
	// POLLING
	// =========================
	pollingRepository := polling.NewRepository(db)
	pollingService := polling.NewService(pollingRepository)
	pollingHandler := polling.NewHandler(pollingService)

	// =========================
	// DASHBOARD
	// =========================
	dashboardRepo := dashboard.NewRepository(db)
	dashboardService := dashboard.NewService(
		dashboardRepo,
		pollingRepository,
	)
	dashboardHandler := dashboard.NewHandler(dashboardService)

	api := r.Group("/api")
	{
		// =========================
		// AUTH
		// =========================
		api.POST("/auth/login", authHandler.Login)

		api.GET(
			"/auth/session",
			middleware.AuthRequired(jwtSecret),
			authHandler.Session,
		)

		api.POST("/auth/logout", authHandler.Logout)

		// =========================
		// FEEDBACK
		// =========================
		api.POST("/feedback", feedbackHandler.Create)

		api.GET(
			"/feedback",
			middleware.AuthRequired(jwtSecret),
			feedbackHandler.GetAll,
		)

		api.GET(
			"/feedback/analytics/sentiment",
			middleware.AuthRequired(jwtSecret),
			feedbackAnalyticsHandler.GetSentimentAnalytics,
		)

		api.GET(
			"/feedback/sentiment/daily-trend",
			middleware.AuthRequired(jwtSecret),
			feedbackAnalyticsHandler.GetDailyTrend,
		)

		api.PATCH(
			"/feedback/:id/status",
			middleware.AuthRequired(jwtSecret),
			feedbackHandler.UpdateStatus,
		)

		// =========================
		// MENU
		// =========================
		// Route spesifik harus sebelum /menu/:id
		api.GET("/menu/by-category", menuHandler.GetItemsByCategory)
		api.GET("/menu/categories", menuHandler.GetAllCategories)
		api.GET("/menu/categories/:id", menuHandler.GetCategoryByID)

		api.GET("/menu", menuHandler.GetAllItems)
		api.GET("/menu/:id", menuHandler.GetItemByID)

		// Admin menu
		api.POST(
			"/menu",
			middleware.AuthRequired(jwtSecret),
			menuHandler.CreateItem,
		)

		api.PUT(
			"/menu/:id",
			middleware.AuthRequired(jwtSecret),
			menuHandler.UpdateItem,
		)

		api.DELETE(
			"/menu/:id",
			middleware.AuthRequired(jwtSecret),
			menuHandler.DeleteItem,
		)

		// Admin category
		api.POST(
			"/menu/categories",
			middleware.AuthRequired(jwtSecret),
			menuHandler.CreateCategory,
		)

		api.PUT(
			"/menu/categories/:id",
			middleware.AuthRequired(jwtSecret),
			menuHandler.UpdateCategory,
		)

		api.DELETE(
			"/menu/categories/:id",
			middleware.AuthRequired(jwtSecret),
			menuHandler.DeleteCategory,
		)

		// =========================
		// POLLING
		// =========================

		// Public polling
		// Route spesifik harus sebelum /polling/:id
		api.GET("/polling/active", pollingHandler.GetActive)

		api.GET("/polling/check-vote", pollingHandler.CheckVote)

		api.GET("/polling", pollingHandler.GetAll)
		api.GET("/polling/:id/votes",
			middleware.AuthRequired(jwtSecret),
			pollingHandler.GetVotes,
		)
		api.GET("/polling/statistics",
			middleware.AuthRequired(jwtSecret),
			pollingHandler.GetStatistics,
		)
		api.GET("/polling/:id/results", pollingHandler.GetResults)
		api.GET("/polling/:id", pollingHandler.GetByID)

		// Public vote
		api.POST("/polling/:pollId/vote", pollingHandler.VoteByPoll)
		api.POST("/polling/vote", pollingHandler.Vote)

		// Admin polling
		api.POST(
			"/polling",
			middleware.AuthRequired(jwtSecret),
			pollingHandler.Create,
		)

		api.PUT(
			"/polling/:id",
			middleware.AuthRequired(jwtSecret),
			pollingHandler.Update,
		)

		api.PATCH(
			"/polling/:id/toggle",
			middleware.AuthRequired(jwtSecret),
			pollingHandler.Toggle,
		)

		api.DELETE(
			"/polling/:id",
			middleware.AuthRequired(jwtSecret),
			pollingHandler.Delete,
		)
		// ACTIVE POLLING

		api.GET(
			"/dashboard/active-polls",
			middleware.AuthRequired(jwtSecret),
			dashboardHandler.GetActivePolls,
		)

		// =========================
		// DASHBOARD
		// =========================
		api.GET(
			"/dashboard/stats",
			middleware.AuthRequired(jwtSecret),
			dashboardHandler.GetStats,
		)

		api.GET(
			"/dashboard/recent-feedback",
			middleware.AuthRequired(jwtSecret),
			dashboardHandler.GetRecentFeedback,
		)

		// =========================
		// WAITERS
		// =========================
		api.GET(
			"/waiters",
			middleware.AuthRequired(jwtSecret),
			waiterHandler.GetAll,
		)
	}

}
