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

func (r *AnalyticsRepository) GetSentimentAnalytics(
	startDate string,
	endDate string,
) (SentimentAnalyticsResponse, error) {
	var response SentimentAnalyticsResponse

	query := `
		SELECT
			COUNT(*) AS total,
			SUM(CASE WHEN LOWER(sentiment) = 'positive' THEN 1 ELSE 0 END),
			SUM(CASE WHEN LOWER(sentiment) = 'negative' THEN 1 ELSE 0 END),
			SUM(CASE
				WHEN LOWER(sentiment) = 'neutral'
					OR sentiment IS NULL
					OR LOWER(sentiment) NOT IN ('positive', 'negative')
				THEN 1
				ELSE 0
			END)
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

	if total > 0 {
		response.SentimentAnalysis.Percentages = SentimentPercentage{
			Positive: float64(positive) / float64(total) * 100,
			Negative: float64(negative) / float64(total) * 100,
			Neutral:  float64(neutral) / float64(total) * 100,
		}
	}

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

func (r *AnalyticsRepository) GetDailyTrend(
	startDate string,
	endDate string,
) (DailyTrend, error) {
	query := `
		SELECT
			DATE(created_at) AS feedback_date,
			SUM(CASE WHEN LOWER(sentiment) = 'positive' THEN 1 ELSE 0 END),
			SUM(CASE WHEN LOWER(sentiment) = 'negative' THEN 1 ELSE 0 END),
			SUM(CASE
				WHEN LOWER(sentiment) = 'neutral'
					OR sentiment IS NULL
					OR LOWER(sentiment) NOT IN ('positive', 'negative')
				THEN 1
				ELSE 0
			END)
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

	trend := DailyTrend{
		Labels:   make([]string, 0),
		Positive: make([]int, 0),
		Negative: make([]int, 0),
		Neutral:  make([]int, 0),
	}

	for rows.Next() {
		var date time.Time
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
			date.Format("2006-01-02"),
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
