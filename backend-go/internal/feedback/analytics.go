package feedback

import (
	"database/sql"
	"fmt"
	"time"
)

type SentimentCount struct {
	Positive int `json:"positive"`
	Negative int `json:"negative"`
	Neutral  int `json:"neutral"`
}

type SentimentPercentage struct {
	Positive float64 `json:"positive"`
	Negative float64 `json:"negative"`
	Neutral  float64 `json:"neutral"`
}

type SentimentAnalysis struct {
	Total       int                 `json:"total"`
	Positive    int                 `json:"positive"`
	Negative    int                 `json:"negative"`
	Neutral     int                 `json:"neutral"`
	Percentages SentimentPercentage `json:"percentages"`
}

type SentimentFeedback struct {
	ID           uint64    `json:"id"`
	CustomerName *string   `json:"customer_name,omitempty"`
	Rating       *int      `json:"rating,omitempty"`
	Message      *string   `json:"message,omitempty"`
	Category     *string   `json:"category,omitempty"`
	Sentiment    *string   `json:"sentiment,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
}

type SentimentAnalyticsResponse struct {
	SentimentAnalysis SentimentAnalysis   `json:"sentimentAnalysis"`
	Feedback          []SentimentFeedback `json:"feedback"`
}

type DailyTrend struct {
	Labels   []string `json:"labels"`
	Positive []int    `json:"positive"`
	Negative []int    `json:"negative"`
	Neutral  []int    `json:"neutral"`
}

type AnalyticsRepository struct {
	db *sql.DB
}

func NewAnalyticsRepository(db *sql.DB) *AnalyticsRepository {
	return &AnalyticsRepository{
		db: db,
	}
}

// GetSentimentAnalytics mengambil statistik sentiment dan daftar feedback.
//
// Jika startDate atau endDate kosong, digunakan default:
// - startDate: 30 hari terakhir
// - endDate: hari ini
func (r *AnalyticsRepository) GetSentimentAnalytics(
	startDate string,
	endDate string,
) (SentimentAnalyticsResponse, error) {

	var response SentimentAnalyticsResponse

	// Default date range: 30 hari terakhir sampai hari ini.
	if startDate == "" {
		startDate = time.Now().AddDate(0, 0, -30).Format("2006-01-02")
	}

	if endDate == "" {
		endDate = time.Now().Format("2006-01-02")
	}

	// =========================
	// SENTIMENT SUMMARY
	// =========================

	query := `
		SELECT
			COUNT(*) AS total,

			SUM(
				CASE
					WHEN LOWER(sentiment) = 'positive'
					THEN 1
					ELSE 0
				END
			) AS positive,

			SUM(
				CASE
					WHEN LOWER(sentiment) = 'negative'
					THEN 1
					ELSE 0
				END
			) AS negative,

			SUM(
				CASE
					WHEN LOWER(sentiment) = 'neutral'
						OR sentiment IS NULL
						OR LOWER(sentiment) NOT IN ('positive', 'negative')
					THEN 1
					ELSE 0
				END
			) AS neutral

		FROM feedback

		WHERE DATE(created_at) BETWEEN ? AND ?
	`

	var total, positive, negative, neutral int

	err := r.db.QueryRow(
		query,
		startDate,
		endDate,
	).Scan(
		&total,
		&positive,
		&negative,
		&neutral,
	)

	if err != nil {
		return response, fmt.Errorf(
			"get sentiment summary: %w",
			err,
		)
	}

	response.SentimentAnalysis = SentimentAnalysis{
		Total:    total,
		Positive: positive,
		Negative: negative,
		Neutral:  neutral,
	}

	// Hitung persentase hanya jika ada feedback.
	if total > 0 {
		response.SentimentAnalysis.Percentages = SentimentPercentage{
			Positive: float64(positive) / float64(total) * 100,
			Negative: float64(negative) / float64(total) * 100,
			Neutral:  float64(neutral) / float64(total) * 100,
		}
	}

	// =========================
	// FEEDBACK LIST
	// =========================

	feedbackQuery := `
		SELECT
			id,
			customer_name,
			rating,
			message,
			category,
			sentiment,
			created_at

		FROM feedback

		WHERE DATE(created_at) BETWEEN ? AND ?

		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(
		feedbackQuery,
		startDate,
		endDate,
	)

	if err != nil {
		return response, fmt.Errorf(
			"get sentiment feedback: %w",
			err,
		)
	}

	defer rows.Close()

	response.Feedback = make([]SentimentFeedback, 0)

	for rows.Next() {

		var item SentimentFeedback

		if err := rows.Scan(
			&item.ID,
			&item.CustomerName,
			&item.Rating,
			&item.Message,
			&item.Category,
			&item.Sentiment,
			&item.CreatedAt,
		); err != nil {
			return response, fmt.Errorf(
				"scan sentiment feedback: %w",
				err,
			)
		}

		response.Feedback = append(
			response.Feedback,
			item,
		)
	}

	if err := rows.Err(); err != nil {
		return response, fmt.Errorf(
			"iterate sentiment feedback: %w",
			err,
		)
	}

	return response, nil
}

// GetDailyTrend mengambil jumlah sentiment per hari.
//
// Jika startDate atau endDate kosong, digunakan default:
// - startDate: 30 hari terakhir
// - endDate: hari ini
func (r *AnalyticsRepository) GetDailyTrend(
	startDate string,
	endDate string,
) (DailyTrend, error) {

	// =========================
	// DEFAULT DATE RANGE
	// =========================

	if startDate == "" {
		startDate = time.Now().AddDate(0, 0, -30).Format("2006-01-02")
	}

	if endDate == "" {
		endDate = time.Now().Format("2006-01-02")
	}

	// =========================
	// DAILY SENTIMENT QUERY
	// =========================

	query := `
		SELECT
			DATE_FORMAT(created_at, '%Y-%m-%d') AS feedback_date,

			SUM(
				CASE
					WHEN LOWER(sentiment) = 'positive'
					THEN 1
					ELSE 0
				END
			) AS positive,

			SUM(
				CASE
					WHEN LOWER(sentiment) = 'negative'
					THEN 1
					ELSE 0
				END
			) AS negative,

			SUM(
				CASE
					WHEN LOWER(sentiment) = 'neutral'
						OR sentiment IS NULL
						OR LOWER(sentiment) NOT IN ('positive', 'negative')
					THEN 1
					ELSE 0
				END
			) AS neutral

		FROM feedback

		WHERE DATE(created_at) BETWEEN ? AND ?

		GROUP BY DATE(created_at)

		ORDER BY DATE(created_at) ASC
	`

	rows, err := r.db.Query(
		query,
		startDate,
		endDate,
	)

	if err != nil {
		return DailyTrend{}, fmt.Errorf(
			"get daily sentiment trend: %w",
			err,
		)
	}

	defer rows.Close()

	// =========================
	// INITIALIZE RESPONSE
	// =========================

	trend := DailyTrend{
		Labels:   make([]string, 0),
		Positive: make([]int, 0),
		Negative: make([]int, 0),
		Neutral:  make([]int, 0),
	}

	// =========================
	// READ QUERY RESULT
	// =========================

	for rows.Next() {

		var date string
		var positive, negative, neutral int

		if err := rows.Scan(
			&date,
			&positive,
			&negative,
			&neutral,
		); err != nil {
			return DailyTrend{}, fmt.Errorf(
				"scan daily sentiment trend: %w",
				err,
			)
		}

		trend.Labels = append(
			trend.Labels,
			date,
		)

		trend.Positive = append(
			trend.Positive,
			positive,
		)

		trend.Negative = append(
			trend.Negative,
			negative,
		)

		trend.Neutral = append(
			trend.Neutral,
			neutral,
		)
	}

	if err := rows.Err(); err != nil {
		return DailyTrend{}, fmt.Errorf(
			"iterate daily sentiment trend: %w",
			err,
		)
	}

	return trend, nil
}
