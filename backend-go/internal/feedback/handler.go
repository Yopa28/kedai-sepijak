package feedback

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	Service *Service
}
type UpdateStatusRequest struct {
	Status string `json:"status" binding:"required"`
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		Service: service,
	}
}

func (h *Handler) Create(c *gin.Context) {
	var request CreateFeedbackRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Payload tidak valid",
		})
		return
	}

	result, err := h.Service.Create(request)

	if err != nil {
		status := http.StatusBadRequest

		switch {
		case errors.Is(err, ErrEmployeeNameRequired),
			errors.Is(err, ErrRoleRequired),
			errors.Is(err, ErrInvalidRating),
			errors.Is(err, ErrInvalidDetailRating),
			errors.Is(err, ErrConsentRequired):
			status = http.StatusUnprocessableEntity
		}

		c.JSON(status, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Feedback berhasil dikirim",
		"data":    result,
	})
}

func (h *Handler) GetAll(c *gin.Context) {
	var filter FeedbackFilter

	if value := c.Query("ratingValue"); value != "" {
		var rating int

		if _, err := fmt.Sscanf(value, "%d", &rating); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "ratingValue tidak valid",
			})
			return
		}

		filter.RatingValue = &rating
	}

	filter.RatingType = c.Query("ratingType")
	filter.Date = c.Query("date")

	feedbacks, err := h.Service.FindAll(filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil feedback",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"feedbacks": feedbacks,
		},
	})
}

func (h *Handler) UpdateStatus(c *gin.Context) {
	idParam := c.Param("id")

	var id uint64
	if _, err := fmt.Sscanf(idParam, "%d", &id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID feedback tidak valid",
		})
		return
	}

	var req UpdateStatusRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Payload tidak valid",
		})
		return
	}

	err := h.Service.UpdateStatus(id, req.Status)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Feedback tidak ditemukan",
			})
			return
		}

		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Status feedback berhasil diperbarui",
	})
}
