package dashboard

type Statistics struct {
	TotalFeedback      int     `json:"total_feedback"`
	TodayFeedback      int     `json:"today_feedback"`
	WeekFeedback       int     `json:"week_feedback"`
	MonthFeedback      int     `json:"month_feedback"`
	ActiveWaiters      int     `json:"active_waiters"`
	TotalWaiters       int     `json:"total_waiters"`
	ActivePolls        int     `json:"active_polls"`
	TotalPolls         int     `json:"total_polls"`
	TodayVotes         int     `json:"today_votes"`
	TotalVotes         int     `json:"total_votes"`
	AvailableVouchers  int     `json:"available_vouchers"`
	UsedVouchers       int     `json:"used_vouchers"`
	TotalVouchers      int     `json:"total_vouchers"`
	AverageRating      float64 `json:"average_rating"`
	TodayAverageRating float64 `json:"today_average_rating"`
	FeedbackGrowth     float64 `json:"feedback_growth"`
	RatingTrend        string  `json:"rating_trend"`
}

type DashboardStatsResponse struct {
	Statistics Statistics `json:"statistics"`
}
