package waiter

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	Service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		Service: service,
	}
}

func (h *Handler) GetAll(c *gin.Context) {
	waiters, err := h.Service.FindAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil data waiter",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    waiters,
	})
}

func (h *Handler) Create(c *gin.Context) {
	var req CreateWaiterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Payload tidak valid",
		})
		return
	}

	waiter, err := h.Service.Create(req)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Waiter berhasil ditambahkan",
		"data":    waiter,
	})
}

func (h *Handler) Update(c *gin.Context) {
	idParam := c.Param("id")

	var id uint64

	if _, err := fmt.Sscanf(idParam, "%d", &id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID waiter tidak valid",
		})
		return
	}

	var req UpdateWaiterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Payload tidak valid",
		})
		return
	}

	waiter, err := h.Service.Update(id, req)

	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Waiter tidak ditemukan",
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
		"message": "Waiter berhasil diperbarui",
		"data":    waiter,
	})
}

func (h *Handler) Delete(c *gin.Context) {
	idParam := c.Param("id")

	var id uint64

	if _, err := fmt.Sscanf(idParam, "%d", &id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID waiter tidak valid",
		})
		return
	}

	err := h.Service.Delete(id)

	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Waiter tidak ditemukan",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal menghapus waiter",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Waiter berhasil dihapus",
	})
}
