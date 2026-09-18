package polling

import (
	"errors"
	"fmt"
	"strings"
)

var ErrDuplicateVote = errors.New("duplicate vote")

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{
		repo: repo,
	}
}

// =========================
// POLL
// =========================

func (s *Service) GetAll() ([]Poll, error) {
	return s.repo.FindAllPolls()
}

func (s *Service) GetActive() ([]Poll, error) {
	return s.repo.FindActivePolls()
}

func (s *Service) GetByID(id uint64) (Poll, error) {
	if id == 0 {
		return Poll{}, fmt.Errorf("poll ID tidak valid")
	}

	return s.repo.FindPollByID(id)
}

func (s *Service) Create(req CreatePollRequest) (Poll, error) {
	if err := validatePoll(req.Question, req.Options); err != nil {
		return Poll{}, err
	}

	poll := Poll{
		Question:    strings.TrimSpace(req.Question),
		Description: req.Description,
		IsActive:    req.IsActive,
	}

	options := normalizeOptions(req.Options)

	if err := s.repo.CreatePoll(&poll, options); err != nil {
		return Poll{}, err
	}

	return s.repo.FindPollByID(poll.ID)
}

func (s *Service) Update(id uint64, req UpdatePollRequest) (Poll, error) {
	if id == 0 {
		return Poll{}, fmt.Errorf("poll ID tidak valid")
	}

	if err := validatePoll(req.Question, req.Options); err != nil {
		return Poll{}, err
	}

	// Pastikan poll ada
	if _, err := s.repo.FindPollByID(id); err != nil {
		return Poll{}, err
	}

	poll := Poll{
		ID:          id,
		Question:    strings.TrimSpace(req.Question),
		Description: req.Description,
		IsActive:    req.IsActive,
	}

	options := normalizeOptions(req.Options)

	if err := s.repo.UpdatePoll(id, &poll, options); err != nil {
		return Poll{}, err
	}

	return s.repo.FindPollByID(id)
}

func (s *Service) Delete(id uint64) error {
	if id == 0 {
		return fmt.Errorf("poll ID tidak valid")
	}

	// Pastikan poll ada
	if _, err := s.repo.FindPollByID(id); err != nil {
		return err
	}

	return s.repo.DeletePoll(id)
}

func (s *Service) Toggle(id uint64) (bool, error) {
	if id == 0 {
		return false, fmt.Errorf("poll ID tidak valid")
	}

	return s.repo.TogglePoll(id)
}

// =========================
// VOTE
// =========================

func (s *Service) Vote(req CreateVoteRequest) (PollVote, error) {
	if req.PollID == 0 {
		return PollVote{}, fmt.Errorf("poll ID wajib diisi")
	}

	if req.OptionID == 0 {
		return PollVote{}, fmt.Errorf("option ID wajib diisi")
	}

	if strings.TrimSpace(req.CustomerPhone) == "" {
		return PollVote{}, fmt.Errorf("nomor telepon wajib diisi")
	}

	if strings.TrimSpace(derefString(req.CustomerName)) == "" {
		return PollVote{}, fmt.Errorf("nama wajib diisi")
	}

	// Pastikan poll ada
	poll, err := s.repo.FindPollByID(req.PollID)
	if err != nil {
		return PollVote{}, err
	}

	if !poll.IsActive {
		return PollVote{}, fmt.Errorf("polling tidak aktif")
	}

	// Pastikan option ada
	option, err := s.repo.FindOptionByID(req.OptionID)
	if err != nil {
		return PollVote{}, err
	}

	// Pastikan option milik poll yang dipilih
	if option.PollID != req.PollID {
		return PollVote{}, fmt.Errorf("option tidak sesuai dengan polling")
	}

	// Cek duplicate vote
	alreadyVoted, err := s.repo.HasVoted(
		req.PollID,
		strings.TrimSpace(req.CustomerPhone),
	)
	if err != nil {
		return PollVote{}, err
	}

	if alreadyVoted {
		return PollVote{}, ErrDuplicateVote
	}

	vote := PollVote{
		PollID:        req.PollID,
		OptionID:      req.OptionID,
		CustomerName:  req.CustomerName,
		CustomerPhone: strings.TrimSpace(req.CustomerPhone),
		CustomerEmail: req.CustomerEmail,
	}

	if err := s.repo.CreateVote(&vote); err != nil {
		return PollVote{}, err
	}

	return s.repo.FindVoteByID(vote.ID)
}

// =========================
// CHECK VOTE
// =========================

func (s *Service) CheckVote(phone string) (bool, error) {
	phone = strings.TrimSpace(phone)

	if phone == "" {
		return false, fmt.Errorf("nomor telepon wajib diisi")
	}

	polls, err := s.repo.FindActivePolls()
	if err != nil {
		return false, err
	}

	if len(polls) == 0 {
		return false, nil
	}

	for _, poll := range polls {
		hasVoted, err := s.repo.HasVoted(poll.ID, phone)
		if err != nil {
			return false, err
		}

		if hasVoted {
			return true, nil
		}
	}

	return false, nil
}

// =========================
// RESULTS
// =========================

func (s *Service) GetResults(pollID uint64) ([]PollResult, error) {
	if pollID == 0 {
		return nil, fmt.Errorf("poll ID tidak valid")
	}

	if _, err := s.repo.FindPollByID(pollID); err != nil {
		return nil, err
	}

	return s.repo.GetPollResults(pollID)
}

func (s *Service) GetVotes(pollID uint64) ([]PollVote, error) {
	if pollID == 0 {
		return nil, fmt.Errorf("poll ID tidak valid")
	}

	if _, err := s.repo.FindPollByID(pollID); err != nil {
		return nil, err
	}

	return s.repo.FindVotesByPollID(pollID)
}

func (s *Service) GetStatistics() (PollStatistics, error) {
	return s.repo.GetStatistics()
}

// =========================
// VALIDATION
// =========================

func validatePoll(question string, options []string) error {
	if strings.TrimSpace(question) == "" {
		return fmt.Errorf("pertanyaan polling wajib diisi")
	}

	if len(options) < 2 {
		return fmt.Errorf("polling minimal memiliki 2 opsi")
	}

	seen := make(map[string]bool)

	for _, option := range options {
		option = strings.TrimSpace(option)

		if option == "" {
			return fmt.Errorf("opsi polling tidak boleh kosong")
		}

		key := strings.ToLower(option)

		if seen[key] {
			return fmt.Errorf("opsi polling tidak boleh duplikat")
		}

		seen[key] = true
	}

	return nil
}

func normalizeOptions(options []string) []string {
	result := make([]string, 0, len(options))

	for _, option := range options {
		option = strings.TrimSpace(option)

		if option != "" {
			result = append(result, option)
		}
	}

	return result
}

func derefString(value *string) string {
	if value == nil {
		return ""
	}

	return *value
}
