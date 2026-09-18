package feedback

import "fmt"

type AnalyticsService struct {
	repo *AnalyticsRepository
}

func NewAnalyticsService(repo *AnalyticsRepository) *AnalyticsService {
	return &AnalyticsService{
		repo: repo,
	}
}

func (s *AnalyticsService) GetSentimentAnalytics(
	startDate string,
	endDate string,
) (SentimentAnalyticsResponse, error) {
	if startDate == "" || endDate == "" {
		return SentimentAnalyticsResponse{}, fmt.Errorf(
			"startDate dan endDate wajib diisi",
		)
	}

	if startDate > endDate {
		return SentimentAnalyticsResponse{}, fmt.Errorf(
			"startDate tidak boleh lebih besar dari endDate",
		)
	}

	return s.repo.GetSentimentAnalytics(
		startDate,
		endDate,
	)
}

func (s *AnalyticsService) GetDailyTrend(
	startDate string,
	endDate string,
) (DailyTrend, error) {
	if startDate == "" || endDate == "" {
		return DailyTrend{}, fmt.Errorf(
			"startDate dan endDate wajib diisi",
		)
	}

	if startDate > endDate {
		return DailyTrend{}, fmt.Errorf(
			"startDate tidak boleh lebih besar dari endDate",
		)
	}

	return s.repo.GetDailyTrend(
		startDate,
		endDate,
	)
}
