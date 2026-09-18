package feedback

import "time"

type Feedback struct {
	ID               uint64                 `json:"id"`
	CustomerName     *string                `json:"customer_name,omitempty"`
	EmployeeName     string                 `json:"employee_name"`
	Role             string                 `json:"role"`
	Contact          *string                `json:"contact,omitempty"`
	DateOfVisit      *string                `json:"date_of_visit,omitempty"`
	TimeOfVisit      *string                `json:"time_of_visit,omitempty"`
	Rating           *int                   `json:"rating,omitempty"`
	Ratings          map[string]interface{} `json:"ratings,omitempty"`
	Message          *string                `json:"message,omitempty"`
	VoluntaryConsent bool                   `json:"voluntary_consent"`
	Category         *string                `json:"category,omitempty"`
	Latitude         *float64               `json:"latitude,omitempty"`
	Longitude        *float64               `json:"longitude,omitempty"`
	Status           string                 `json:"status"`
	Sentiment        *string                `json:"sentiment,omitempty"`
	CreatedAt        time.Time              `json:"created_at"`
	UpdatedAt        time.Time              `json:"updated_at"`
}

type CreateFeedbackRequest struct {
	CustomerName     *string                `json:"customer_name"`
	EmployeeName     string                 `json:"employee_name"`
	Role             string                 `json:"role"`
	Contact          *string                `json:"contact"`
	DateOfVisit      *string                `json:"date_of_visit"`
	TimeOfVisit      *string                `json:"time_of_visit"`
	Rating           *int                   `json:"rating"`
	Ratings          map[string]interface{} `json:"ratings"`
	Message          *string                `json:"message"`
	VoluntaryConsent bool                   `json:"voluntary_consent"`
	Category         *string                `json:"category"`
	Latitude         *float64               `json:"latitude"`
	Longitude        *float64               `json:"longitude"`
}

type FeedbackFilter struct {
	RatingType  string
	RatingValue *int
	Date        string
}
