package feedback

import (
	"database/sql"
	"encoding/json"
)

type Repository struct {
	DB *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		DB: db,
	}
}

func (r *Repository) Create(request CreateFeedbackRequest) (*Feedback, error) {
	ratingsJSON, err := json.Marshal(request.Ratings)
	if err != nil {
		return nil, err
	}

	query := `
		INSERT INTO feedback (
			customer_name,
			employee_name,
			role,
			contact,
			date_of_visit,
			time_of_visit,
			rating,
			ratings,
			message,
			voluntary_consent,
			category,
			latitude,
			longitude,
			status
		)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
	`

	result, err := r.DB.Exec(
		query,
		request.CustomerName,
		request.EmployeeName,
		request.Role,
		request.Contact,
		request.DateOfVisit,
		request.TimeOfVisit,
		request.Rating,
		ratingsJSON,
		request.Message,
		request.VoluntaryConsent,
		request.Category,
		request.Latitude,
		request.Longitude,
	)

	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	return &Feedback{
		ID:               uint64(id),
		CustomerName:     request.CustomerName,
		EmployeeName:     request.EmployeeName,
		Role:             request.Role,
		Contact:          request.Contact,
		DateOfVisit:      request.DateOfVisit,
		TimeOfVisit:      request.TimeOfVisit,
		Rating:           request.Rating,
		Ratings:          request.Ratings,
		Message:          request.Message,
		VoluntaryConsent: request.VoluntaryConsent,
		Category:         request.Category,
		Latitude:         request.Latitude,
		Longitude:        request.Longitude,
		Status:           "pending",
	}, nil
}

func (r *Repository) FindAll(filter FeedbackFilter) ([]Feedback, error) {
	query := `
		SELECT
			id,
			customer_name,
			employee_name,
			role,
			contact,
			date_of_visit,
			time_of_visit,
			rating,
			ratings,
			message,
			voluntary_consent,
			category,
			latitude,
			longitude,
			status,
			sentiment,
			created_at,
			updated_at
		FROM feedback
		WHERE 1 = 1
	`

	args := make([]interface{}, 0)

	if filter.RatingValue != nil {
		query += " AND rating = ?"
		args = append(args, *filter.RatingValue)
	}

	if filter.Date != "" {
		query += " AND date_of_visit = ?"
		args = append(args, filter.Date)
	}

	query += " ORDER BY created_at DESC"

	rows, err := r.DB.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var feedbacks []Feedback

	for rows.Next() {
		var item Feedback
		var ratingsJSON []byte

		err := rows.Scan(
			&item.ID,
			&item.CustomerName,
			&item.EmployeeName,
			&item.Role,
			&item.Contact,
			&item.DateOfVisit,
			&item.TimeOfVisit,
			&item.Rating,
			&ratingsJSON,
			&item.Message,
			&item.VoluntaryConsent,
			&item.Category,
			&item.Latitude,
			&item.Longitude,
			&item.Status,
			&item.Sentiment,
			&item.CreatedAt,
			&item.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		if len(ratingsJSON) > 0 {
			if err := json.Unmarshal(ratingsJSON, &item.Ratings); err != nil {
				return nil, err
			}
		}

		feedbacks = append(feedbacks, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return feedbacks, nil
}

func (r *Repository) UpdateStatus(id uint64, status string) error {
	query := `
		UPDATE feedback
		SET status = ?, updated_at = CURRENT_TIMESTAMP
		WHERE id = ?
	`

	result, err := r.DB.Exec(query, status, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}
