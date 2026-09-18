package polling

import (
	"errors"
	"net/http"
	"strconv"
	"strings"

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

// =========================
// GET ALL
// =========================

// GET /api/polling
func (h *Handler) GetAll(c *gin.Context) {
	polls, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil polling",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    polls,
	})
}

// GET /api/polling/active
func (h *Handler) GetActive(c *gin.Context) {
	polls, err := h.service.GetActive()
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

// GET /api/polling/:id
func (h *Handler) GetByID(c *gin.Context) {
	id, ok := parseID(c)
	if !ok {
		return
	}

	poll, err := h.service.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    poll,
	})
}

// =========================
// ADMIN
// =========================

// POST /api/polling
func (h *Handler) Create(c *gin.Context) {
	var req CreatePollRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Payload tidak valid",
			"error":   err.Error(),
		})
		return
	}

	poll, err := h.service.Create(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Polling berhasil dibuat",
		"data":    poll,
	})
}

// PUT /api/polling/:id
func (h *Handler) Update(c *gin.Context) {
	id, ok := parseID(c)
	if !ok {
		return
	}

	var req UpdatePollRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Payload tidak valid",
			"error":   err.Error(),
		})
		return
	}

	poll, err := h.service.Update(id, req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Polling berhasil diperbarui",
		"data":    poll,
	})
}

// PATCH /api/polling/:id/toggle
func (h *Handler) Toggle(c *gin.Context) {
	id, ok := parseID(c)
	if !ok {
		return
	}

	isActive, err := h.service.Toggle(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Status polling berhasil diubah",
		"data": gin.H{
			"id":        id,
			"is_active": isActive,
		},
	})
}

// DELETE /api/polling/:id
func (h *Handler) Delete(c *gin.Context) {
	id, ok := parseID(c)
	if !ok {
		return
	}

	if err := h.service.Delete(id); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Polling berhasil dihapus",
	})
}

// =========================
// VOTE
// =========================

// POST /api/polling/:pollId/vote
func (h *Handler) VoteByPoll(c *gin.Context) {
	pollID, ok := parseParamID(c, "pollId")
	if !ok {
		return
	}

	var body struct {
		Name     *string `json:"name"`
		Phone    string  `json:"phone"`
		Email    *string `json:"email"`
		OptionID uint64  `json:"option_id"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Payload tidak valid",
			"error":   err.Error(),
		})
		return
	}

	req := CreateVoteRequest{
		PollID:        pollID,
		OptionID:      body.OptionID,
		CustomerName:  body.Name,
		CustomerPhone: body.Phone,
		CustomerEmail: body.Email,
	}

	vote, err := h.service.Vote(req)
	if err != nil {
		h.handleVoteError(c, err)
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Vote berhasil disimpan",
		"data":    vote,
	})
}

// POST /api/polling/vote
func (h *Handler) Vote(c *gin.Context) {
	var body struct {
		PollID   uint64  `json:"poll_id"`
		Name     *string `json:"name"`
		Phone    string  `json:"phone"`
		Email    *string `json:"email"`
		OptionID uint64  `json:"option_id"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Payload tidak valid",
			"error":   err.Error(),
		})
		return
	}

	req := CreateVoteRequest{
		PollID:        body.PollID,
		OptionID:      body.OptionID,
		CustomerName:  body.Name,
		CustomerPhone: body.Phone,
		CustomerEmail: body.Email,
	}

	vote, err := h.service.Vote(req)
	if err != nil {
		h.handleVoteError(c, err)
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Vote berhasil disimpan",
		"data":    vote,
	})
}

// =========================
// CHECK VOTE
// =========================

// GET /api/polling/check-vote?phone=...
func (h *Handler) CheckVote(c *gin.Context) {
	phone := strings.TrimSpace(c.Query("phone"))

	if phone == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Parameter phone wajib diisi",
		})
		return
	}

	hasVoted, err := h.service.CheckVote(phone)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"has_voted": hasVoted,
		},
	})
}

// =========================
// RESULTS
// =========================

// GET /api/polling/:id/votes
func (h *Handler) GetVotes(c *gin.Context) {
	id, ok := parseID(c)
	if !ok {
		return
	}

	votes, err := h.service.GetVotes(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    votes,
	})
}

// GET /api/polling/:id/results
func (h *Handler) GetResults(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID polling tidak valid",
		})
		return
	}

	results, err := h.service.GetResults(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    results,
	})
}

// GET /api/polling/statistics
func (h *Handler) GetStatistics(c *gin.Context) {
	stats, err := h.service.GetStatistics()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil statistik polling",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    stats,
	})
}

// =========================
// HELPERS
// =========================

func parseID(c *gin.Context) (uint64, bool) {
	return parseParamID(c, "id")
}

func parseParamID(c *gin.Context, param string) (uint64, bool) {
	id, err := strconv.ParseUint(c.Param(param), 10, 64)

	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID tidak valid",
		})
		return 0, false
	}

	return id, true
}

func (h *Handler) handleVoteError(c *gin.Context, err error) {
	if errors.Is(err, ErrDuplicateVote) {
		c.JSON(http.StatusConflict, gin.H{
			"success": false,
			"message": "Anda sudah memberikan vote pada polling ini",
		})
		return
	}

	c.JSON(http.StatusBadRequest, gin.H{
		"success": false,
		"message": err.Error(),
	})
}
