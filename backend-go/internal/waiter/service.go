package waiter

import (
	"database/sql"
	"fmt"
	"strings"
)

type Service struct {
	Repository *Repository
}

func NewService(repository *Repository) *Service {
	return &Service{
		Repository: repository,
	}
}

func (s *Service) FindAll() ([]Waiter, error) {
	return s.Repository.FindAll()
}

func (s *Service) Create(req CreateWaiterRequest) (*Waiter, error) {
	req.Name = strings.TrimSpace(req.Name)

	if req.Name == "" {
		return nil, fmt.Errorf("nama waiter wajib diisi")
	}

	if req.Status != "" &&
		req.Status != "active" &&
		req.Status != "inactive" {
		return nil, fmt.Errorf("status harus active atau inactive")
	}

	return s.Repository.Create(req)
}

func (s *Service) Update(
	id uint64,
	req UpdateWaiterRequest,
) (*Waiter, error) {
	req.Name = strings.TrimSpace(req.Name)

	if req.Name == "" {
		return nil, fmt.Errorf("nama waiter wajib diisi")
	}

	if req.Status != "" &&
		req.Status != "active" &&
		req.Status != "inactive" {
		return nil, fmt.Errorf("status harus active atau inactive")
	}

	return s.Repository.Update(id, req)
}

func (s *Service) Delete(id uint64) error {
	err := s.Repository.Delete(id)

	if err == sql.ErrNoRows {
		return sql.ErrNoRows
	}

	return err
}
