package dashboard

import "kedai-sepijak-backend/internal/polling"

type Service struct {
	repo        *Repository
	pollingRepo *polling.Repository
}

func NewService(
	repo *Repository,
	pollingRepo *polling.Repository,
) *Service {
	return &Service{
		repo:        repo,
		pollingRepo: pollingRepo,
	}
}

func (s *Service) GetStatistics() (Statistics, error) {
	return s.repo.GetStatistics()
}

func (s *Service) GetRecentFeedback(limit int) ([]RecentFeedback, error) {
	return s.repo.GetRecentFeedback(limit)
}

func (s *Service) GetActivePolls() ([]polling.Poll, error) {
	return s.pollingRepo.FindActivePolls()
}
