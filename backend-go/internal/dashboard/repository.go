package dashboard

import (
	"database/sql"
	"fmt"
	"time"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (r *Repository) GetStatistics() (Statistics, error) {
	var stats Statistics

	// Feedback
	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM feedback
	`).Scan(&stats.TotalFeedback); err != nil {
		return stats, fmt.Errorf("get total feedback: %w", err)
	}

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM feedback
		WHERE DATE(created_at) = CURDATE()
	`).Scan(&stats.TodayFeedback); err != nil {
		return stats, fmt.Errorf("get today feedback: %w", err)
	}

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM feedback
		WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
	`).Scan(&stats.WeekFeedback); err != nil {
		return stats, fmt.Errorf("get week feedback: %w", err)
	}

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM feedback
		WHERE YEAR(created_at) = YEAR(CURDATE())
		AND MONTH(created_at) = MONTH(CURDATE())
	`).Scan(&stats.MonthFeedback); err != nil {
		return stats, fmt.Errorf("get month feedback: %w", err)
	}

	// Waiters
	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM waiters
	`).Scan(&stats.TotalWaiters); err != nil {
		return stats, fmt.Errorf("get total waiters: %w", err)
	}

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM waiters
		WHERE status = 'active'
	`).Scan(&stats.ActiveWaiters); err != nil {
		return stats, fmt.Errorf("get active waiters: %w", err)
	}

	// Polls
	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM polls
	`).Scan(&stats.TotalPolls); err != nil {
		return stats, fmt.Errorf("get total polls: %w", err)
	}

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM polls
		WHERE is_active = 1
	`).Scan(&stats.ActivePolls); err != nil {
		return stats, fmt.Errorf("get active polls: %w", err)
	}

	// Votes
	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM poll_votes
	`).Scan(&stats.TotalVotes); err != nil {
		return stats, fmt.Errorf("get total votes: %w", err)
	}

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM poll_votes
		WHERE DATE(created_at) = CURDATE()
	`).Scan(&stats.TodayVotes); err != nil {
		return stats, fmt.Errorf("get today votes: %w", err)
	}

	// Average rating
	var averageRating sql.NullFloat64

	if err := r.db.QueryRow(`
		SELECT AVG(rating)
		FROM feedback
		WHERE rating IS NOT NULL
	`).Scan(&averageRating); err != nil {
		return stats, fmt.Errorf("get average rating: %w", err)
	}

	if averageRating.Valid {
		stats.AverageRating = averageRating.Float64
	}

	// Today's average rating
	var todayAverageRating sql.NullFloat64

	if err := r.db.QueryRow(`
		SELECT AVG(rating)
		FROM feedback
		WHERE DATE(created_at) = CURDATE()
		AND rating IS NOT NULL
	`).Scan(&todayAverageRating); err != nil {
		return stats, fmt.Errorf("get today average rating: %w", err)
	}

	if todayAverageRating.Valid {
		stats.TodayAverageRating = todayAverageRating.Float64
	}

	// Feedback growth
	stats.FeedbackGrowth = calculateGrowth(
		stats.TotalFeedback,
		stats.MonthFeedback,
	)

	// Rating trend
	stats.RatingTrend = "stable"

	if stats.TodayAverageRating > stats.AverageRating {
		stats.RatingTrend = "up"
	} else if stats.TodayAverageRating < stats.AverageRating {
		stats.RatingTrend = "down"
	}

	// Voucher fields.
	// The API contract contains these fields, but the current
	// database schema does not define a vouchers table.
	stats.AvailableVouchers = 0
	stats.UsedVouchers = 0
	stats.TotalVouchers = 0

	return stats, nil
}

func calculateGrowth(totalFeedback, monthFeedback int) float64 {
	if totalFeedback == 0 {
		return 0
	}

	previousTotal := totalFeedback - monthFeedback

	if previousTotal <= 0 {
		return 0
	}

	return (float64(monthFeedback) / float64(previousTotal)) * 100
}

type RecentFeedback struct {
	ID           uint64    `json:"id"`
	CustomerName *string   `json:"customer_name,omitempty"`
	Rating       *int      `json:"rating,omitempty"`
	Message      *string   `json:"message,omitempty"`
	Category     *string   `json:"category,omitempty"`
	Status       string    `json:"status"`
	Sentiment    *string   `json:"sentiment,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
}

func (r *Repository) GetRecentFeedback(limit int) ([]RecentFeedback, error) {
	if limit <= 0 {
		limit = 5
	}

	if limit > 100 {
		limit = 100
	}

	query := fmt.Sprintf(`
		SELECT
			id,
			customer_name,
			rating,
			message,
			category,
			status,
			sentiment,
			created_at
		FROM feedback
		ORDER BY created_at DESC
		LIMIT %d
	`, limit)

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("get recent feedback: %w", err)
	}
	defer rows.Close()

	result := make([]RecentFeedback, 0)

	for rows.Next() {
		var feedback RecentFeedback

		if err := rows.Scan(
			&feedback.ID,
			&feedback.CustomerName,
			&feedback.Rating,
			&feedback.Message,
			&feedback.Category,
			&feedback.Status,
			&feedback.Sentiment,
			&feedback.CreatedAt,
		); err != nil {
			return nil, fmt.Errorf("scan recent feedback: %w", err)
		}

		result = append(result, feedback)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate recent feedback: %w", err)
	}

	return result, nil
}
