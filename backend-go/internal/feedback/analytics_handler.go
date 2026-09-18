package feedback

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type AnalyticsHandler struct {
	service *AnalyticsService
}

func NewAnalyticsHandler(service *AnalyticsService) *AnalyticsHandler {
	return &AnalyticsHandler{
		service: service,
	}
}

// GET /api/feedback/analytics/sentiment
func (h *AnalyticsHandler) GetSentimentAnalytics(c *gin.Context) {
	startDate := c.Query("startDate")
	endDate := c.Query("endDate")

	result, err := h.service.GetSentimentAnalytics(
		startDate,
		endDate,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    result,
	})
}

// GET /api/feedback/sentiment/daily-trend
func (h *AnalyticsHandler) GetDailyTrend(c *gin.Context) {
	startDate := c.Query("startDate")
	endDate := c.Query("endDate")

	result, err := h.service.GetDailyTrend(
		startDate,
		endDate,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    result,
	})
}
