package auth

import (
	"errors"
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

func (h *Handler) Login(c *gin.Context) {
	var request LoginRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Username dan password wajib diisi",
		})
		return
	}

	token, user, err := h.Service.Login(request)

	if err != nil {
		if errors.Is(err, ErrInvalidCredentials) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Username atau password salah",
			})
			return
		}

		if errors.Is(err, ErrUnauthorized) {
			c.JSON(http.StatusForbidden, gin.H{
				"success": false,
				"message": "Akses tidak diizinkan",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Terjadi kesalahan pada server",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Login berhasil",
		"token":   token,
		"data": gin.H{
			"id":        user.ID,
			"username":  user.Username,
			"email":     user.Email,
			"full_name": user.FullName,
			"role":      user.Role,
		},
	})
}

func (h *Handler) Session(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success":   false,
			"logged_in": false,
			"message":   "Belum login",
		})
		return
	}

	username, _ := c.Get("username")
	fullName, _ := c.Get("full_name")
	role, _ := c.Get("role")

	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"logged_in": true,
		"data": gin.H{
			"id":        userID,
			"username":  username,
			"full_name": fullName,
			"role":      role,
		},
	})
}

func (h *Handler) Logout(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Logout berhasil",
	})
}
