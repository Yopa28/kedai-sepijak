package feedback

import (
	"errors"
	"fmt"
	"strings"
)

var (
	ErrEmployeeNameRequired = errors.New("employee_name wajib diisi")
	ErrRoleRequired         = errors.New("role wajib diisi")
	ErrInvalidRating        = errors.New("rating harus bernilai 1 sampai 5")
	ErrInvalidDetailRating  = errors.New("detail rating harus bernilai 1 sampai 5")
	ErrConsentRequired      = errors.New("voluntary_consent harus bernilai true")
)

type Service struct {
	Repository *Repository
}

func NewService(repository *Repository) *Service {
	return &Service{
		Repository: repository,
	}
}

func (s *Service) Create(request CreateFeedbackRequest) (*Feedback, error) {
	// Validasi employee_name
	if strings.TrimSpace(request.EmployeeName) == "" {
		return nil, ErrEmployeeNameRequired
	}

	// Validasi role
	if strings.TrimSpace(request.Role) == "" {
		return nil, ErrRoleRequired
	}

	// Validasi rating utama
	if request.Rating != nil {
		if *request.Rating < 1 || *request.Rating > 5 {
			return nil, ErrInvalidRating
		}
	}

	// Validasi detail ratings
	if err := validateRatings(request.Ratings); err != nil {
		return nil, err
	}

	// Consent wajib true
	if !request.VoluntaryConsent {
		return nil, ErrConsentRequired
	}

	// Simpan ke database
	feedback, err := s.Repository.Create(request)
	if err != nil {
		return nil, err
	}

	return feedback, nil
}

func validateRatings(ratings map[string]interface{}) error {
	for _, value := range ratings {
		switch v := value.(type) {

		// Nested object:
		// "pelayanan": {
		//     "sikap_pelayan": 5,
		//     "waktu_pesanan": 4
		// }
		case map[string]interface{}:
			if err := validateRatings(v); err != nil {
				return err
			}

		// Rating dari JSON akan dibaca sebagai float64
		case float64:
			if v < 1 || v > 5 {
				return ErrInvalidDetailRating
			}

		// Antisipasi kalau nanti data dibuat langsung dari Go
		case int:
			if v < 1 || v > 5 {
				return ErrInvalidDetailRating
			}

		case int64:
			if v < 1 || v > 5 {
				return ErrInvalidDetailRating
			}

		default:
			return ErrInvalidDetailRating
		}
	}

	return nil
}

func (s *Service) FindAll(filter FeedbackFilter) ([]Feedback, error) {
	return s.Repository.FindAll(filter)
}

func (s *Service) UpdateStatus(id uint64, status string) error {
	if status != "pending" && status != "selesai" {
		return fmt.Errorf("status harus pending atau selesai")
	}

	return s.Repository.UpdateStatus(id, status)
}
