package polling

type Poll struct {
	ID          uint64       `json:"id"`
	Question    string       `json:"question"`
	Description *string      `json:"description"`
	IsActive    bool         `json:"is_active"`
	TotalVotes  int          `json:"total_votes"`
	Options     []PollOption `json:"options"`
}

type PollOption struct {
	ID         uint64  `json:"id"`
	PollID     uint64  `json:"poll_id,omitempty"`
	OptionText string  `json:"option_text"`
	Votes      int     `json:"votes"`
	Percentage float64 `json:"percentage"`
}

type PollVote struct {
	ID            uint64  `json:"id"`
	PollID        uint64  `json:"poll_id"`
	OptionID      uint64  `json:"option_id"`
	CustomerName  *string `json:"customer_name,omitempty"`
	CustomerPhone string  `json:"customer_phone"`
	CustomerEmail *string `json:"customer_email,omitempty"`
}

type CreatePollRequest struct {
	Question    string   `json:"question" binding:"required"`
	Description *string  `json:"description"`
	IsActive    bool     `json:"is_active"`
	Options     []string `json:"options" binding:"required"`
}

type UpdatePollRequest struct {
	Question    string   `json:"question" binding:"required"`
	Description *string  `json:"description"`
	IsActive    bool     `json:"is_active"`
	Options     []string `json:"options" binding:"required"`
}

type CreateVoteRequest struct {
	PollID        uint64  `json:"poll_id" binding:"required"`
	OptionID      uint64  `json:"option_id" binding:"required"`
	CustomerName  *string `json:"customer_name"`
	CustomerPhone string  `json:"customer_phone" binding:"required"`
	CustomerEmail *string `json:"customer_email"`
}
