package dashboard

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		service: service,
	}
}

// GET /api/dashboard/stats
func (h *Handler) GetStats(c *gin.Context) {
	stats, err := h.service.GetStatistics()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil statistik dashboard",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"statistics": stats,
		},
	})
}

// GET /api/dashboard/recent-feedback?limit=5
func (h *Handler) GetRecentFeedback(c *gin.Context) {
	limit := 5

	limitParam := c.Query("limit")

	if limitParam != "" {
		parsedLimit, err := strconv.Atoi(limitParam)

		if err != nil || parsedLimit <= 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "Parameter limit tidak valid",
			})
			return
		}

		limit = parsedLimit
	}

	feedback, err := h.service.GetRecentFeedback(limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil feedback terbaru",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    feedback,
	})

}

func (h *Handler) GetActivePolls(c *gin.Context) {
	polls, err := h.service.GetActivePolls()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil polling aktif",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    polls,
	})
}
