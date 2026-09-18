package menu

import (
	"database/sql"
	"errors"
	"net/http"
	"strconv"

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

// =========================
// MENU ITEMS
// =========================

// GET /api/menu
func (h *Handler) GetAllItems(c *gin.Context) {
	var categoryID *uint64
	var isAvailable *bool
	var isFeatured *bool

	if value := c.Query("category_id"); value != "" {
		id, err := strconv.ParseUint(value, 10, 64)
		if err != nil || id == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "category_id tidak valid",
			})
			return
		}

		categoryID = &id
	}

	if value := c.Query("is_available"); value != "" {
		parsed, err := strconv.ParseBool(value)
		if err != nil {
			if value == "1" {
				parsed = true
			} else if value == "0" {
				parsed = false
			} else {
				c.JSON(http.StatusBadRequest, gin.H{
					"success": false,
					"message": "is_available tidak valid",
				})
				return
			}
		}

		isAvailable = &parsed
	}

	if value := c.Query("is_featured"); value != "" {
		parsed, err := strconv.ParseBool(value)
		if err != nil {
			if value == "1" {
				parsed = true
			} else if value == "0" {
				parsed = false
			} else {
				c.JSON(http.StatusBadRequest, gin.H{
					"success": false,
					"message": "is_featured tidak valid",
				})
				return
			}
		}

		isFeatured = &parsed
	}

	limit := 0
	offset := 0

	if value := c.Query("limit"); value != "" {
		parsed, err := strconv.Atoi(value)
		if err != nil || parsed < 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "limit tidak valid",
			})
			return
		}

		limit = parsed
	}

	if value := c.Query("offset"); value != "" {
		parsed, err := strconv.Atoi(value)
		if err != nil || parsed < 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "offset tidak valid",
			})
			return
		}

		offset = parsed
	}

	items, err := h.Service.GetAllItems(
		categoryID,
		isAvailable,
		isFeatured,
		limit,
		offset,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil data menu",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    items,
	})
}

// GET /api/menu/:id
func (h *Handler) GetItemByID(c *gin.Context) {
	id, err := parseID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID menu tidak valid",
		})
		return
	}

	item, err := h.Service.GetItemByID(id)

	if err != nil {
		if errors.Is(err, ErrInvalidMenuID) || errors.Is(err, sql.ErrNoRows) {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Menu tidak ditemukan",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil data menu",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    item,
	})
}

// POST /api/menu
func (h *Handler) CreateItem(c *gin.Context) {
	var req CreateMenuItemRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Data menu tidak valid",
			"error":   err.Error(),
		})
		return
	}

	item, err := h.Service.CreateItem(req)

	if err != nil {
		switch {
		case errors.Is(err, ErrInvalidMenuName),
			errors.Is(err, ErrInvalidMenuPrice),
			errors.Is(err, ErrInvalidCategoryID):
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": err.Error(),
			})
			return
		default:
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Gagal membuat menu",
				"error":   err.Error(),
			})
			return
		}
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Menu berhasil dibuat",
		"data":    item,
	})
}

// PUT /api/menu/:id
func (h *Handler) UpdateItem(c *gin.Context) {
	id, err := parseID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID menu tidak valid",
		})
		return
	}

	var req UpdateMenuItemRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Data menu tidak valid",
			"error":   err.Error(),
		})
		return
	}

	item, err := h.Service.UpdateItem(id, req)

	if err != nil {
		switch {
		case errors.Is(err, ErrInvalidMenuName),
			errors.Is(err, ErrInvalidMenuPrice),
			errors.Is(err, ErrInvalidCategoryID):
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": err.Error(),
			})
			return

		case errors.Is(err, ErrInvalidMenuID),
			errors.Is(err, sql.ErrNoRows):
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Menu tidak ditemukan",
			})
			return

		default:
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Gagal memperbarui menu",
				"error":   err.Error(),
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Menu berhasil diperbarui",
		"data":    item,
	})
}

// DELETE /api/menu/:id
func (h *Handler) DeleteItem(c *gin.Context) {
	id, err := parseID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID menu tidak valid",
		})
		return
	}

	err = h.Service.DeleteItem(id)

	if err != nil {
		if errors.Is(err, ErrInvalidMenuID) || errors.Is(err, sql.ErrNoRows) {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Menu tidak ditemukan",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal menghapus menu",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Menu berhasil dihapus",
	})
}

// =========================
// CATEGORIES
// =========================

// GET /api/menu/categories
func (h *Handler) GetAllCategories(c *gin.Context) {
	categories, err := h.Service.GetAllCategories()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil data kategori",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    categories,
	})
}

// GET /api/menu/categories/:id
func (h *Handler) GetCategoryByID(c *gin.Context) {
	id, err := parseID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID kategori tidak valid",
		})
		return
	}

	category, err := h.Service.GetCategoryByID(id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Kategori tidak ditemukan",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    category,
	})
}

// POST /api/menu/categories
func (h *Handler) CreateCategory(c *gin.Context) {
	var req CreateCategoryRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Data kategori tidak valid",
			"error":   err.Error(),
		})
		return
	}

	category, err := h.Service.CreateCategory(req)

	if err != nil {
		if errors.Is(err, ErrInvalidCategoryName) {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal membuat kategori",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Kategori berhasil dibuat",
		"data":    category,
	})
}

// PUT /api/menu/categories/:id
func (h *Handler) UpdateCategory(c *gin.Context) {
	id, err := parseID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID kategori tidak valid",
		})
		return
	}

	var req UpdateCategoryRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Data kategori tidak valid",
			"error":   err.Error(),
		})
		return
	}

	category, err := h.Service.UpdateCategory(id, req)

	if err != nil {
		switch {
		case errors.Is(err, ErrInvalidCategoryName):
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": err.Error(),
			})
			return

		case errors.Is(err, ErrInvalidCategory),
			errors.Is(err, sql.ErrNoRows):
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Kategori tidak ditemukan",
			})
			return

		default:
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Gagal memperbarui kategori",
				"error":   err.Error(),
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Kategori berhasil diperbarui",
		"data":    category,
	})
}

// DELETE /api/menu/categories/:id
func (h *Handler) DeleteCategory(c *gin.Context) {
	id, err := parseID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID kategori tidak valid",
		})
		return
	}

	err = h.Service.DeleteCategory(id)

	if err != nil {
		if errors.Is(err, ErrInvalidCategory) || errors.Is(err, sql.ErrNoRows) {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Kategori tidak ditemukan",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal menghapus kategori",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Kategori berhasil dihapus",
	})
}

// =========================
// MENU BY CATEGORY
// =========================

// GET /api/menu/by-category
func (h *Handler) GetItemsByCategory(c *gin.Context) {
	items, err := h.Service.GetItemsByCategory()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil menu berdasarkan kategori",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    items,
	})
}

// =========================
// HELPER
// =========================

func parseID(c *gin.Context) (uint64, error) {
	idParam := c.Param("id")

	return strconv.ParseUint(idParam, 10, 64)
}
