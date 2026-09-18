package menu

import (
	"errors"
	"strings"
)

var (
	ErrInvalidMenuName     = errors.New("nama menu wajib diisi")
	ErrInvalidMenuPrice    = errors.New("harga menu harus lebih dari 0")
	ErrInvalidCategoryID   = errors.New("kategori tidak ditemukan")
	ErrInvalidCategoryName = errors.New("nama kategori wajib diisi")
	ErrInvalidMenuID       = errors.New("menu tidak ditemukan")
	ErrInvalidCategory     = errors.New("kategori tidak ditemukan")
)

type Service struct {
	Repository *Repository
}

func NewService(repository *Repository) *Service {
	return &Service{
		Repository: repository,
	}
}

// =========================
// MENU ITEMS
// =========================

func (s *Service) GetAllItems(
	categoryID *uint64,
	isAvailable *bool,
	isFeatured *bool,
	limit int,
	offset int,
) ([]MenuItem, error) {

	if limit < 0 {
		limit = 0
	}

	if offset < 0 {
		offset = 0
	}

	return s.Repository.FindAllItems(
		categoryID,
		isAvailable,
		isFeatured,
		limit,
		offset,
	)
}

func (s *Service) GetItemByID(id uint64) (*MenuItem, error) {
	if id == 0 {
		return nil, ErrInvalidMenuID
	}

	item, err := s.Repository.FindItemByID(id)
	if err != nil {
		return nil, ErrInvalidMenuID
	}

	return item, nil
}

func (s *Service) CreateItem(req CreateMenuItemRequest) (*MenuItem, error) {
	req.Name = strings.TrimSpace(req.Name)

	if req.Name == "" {
		return nil, ErrInvalidMenuName
	}

	if req.Price <= 0 {
		return nil, ErrInvalidMenuPrice
	}

	if req.CategoryID == 0 {
		return nil, ErrInvalidCategoryID
	}

	exists, err := s.Repository.CategoryExists(req.CategoryID)
	if err != nil {
		return nil, err
	}

	if !exists {
		return nil, ErrInvalidCategoryID
	}

	return s.Repository.CreateItem(req)
}

func (s *Service) UpdateItem(
	id uint64,
	req UpdateMenuItemRequest,
) (*MenuItem, error) {

	if id == 0 {
		return nil, ErrInvalidMenuID
	}

	req.Name = strings.TrimSpace(req.Name)

	if req.Name == "" {
		return nil, ErrInvalidMenuName
	}

	if req.Price <= 0 {
		return nil, ErrInvalidMenuPrice
	}

	if req.CategoryID == 0 {
		return nil, ErrInvalidCategoryID
	}

	exists, err := s.Repository.CategoryExists(req.CategoryID)
	if err != nil {
		return nil, err
	}

	if !exists {
		return nil, ErrInvalidCategoryID
	}

	return s.Repository.UpdateItem(id, req)
}

func (s *Service) DeleteItem(id uint64) error {
	if id == 0 {
		return ErrInvalidMenuID
	}

	return s.Repository.DeleteItem(id)
}

// =========================
// CATEGORIES
// =========================

func (s *Service) GetAllCategories() ([]MenuCategory, error) {
	return s.Repository.FindAllCategories()
}

func (s *Service) GetCategoryByID(id uint64) (*MenuCategory, error) {
	if id == 0 {
		return nil, ErrInvalidCategory
	}

	category, err := s.Repository.FindCategoryByID(id)
	if err != nil {
		return nil, ErrInvalidCategory
	}

	return category, nil
}

func (s *Service) CreateCategory(
	req CreateCategoryRequest,
) (*MenuCategory, error) {

	req.Name = strings.TrimSpace(req.Name)

	if req.Name == "" {
		return nil, ErrInvalidCategoryName
	}

	if req.DisplayOrder < 0 {
		req.DisplayOrder = 0
	}

	return s.Repository.CreateCategory(req)
}

func (s *Service) UpdateCategory(
	id uint64,
	req UpdateCategoryRequest,
) (*MenuCategory, error) {

	if id == 0 {
		return nil, ErrInvalidCategory
	}

	req.Name = strings.TrimSpace(req.Name)

	if req.Name == "" {
		return nil, ErrInvalidCategoryName
	}

	if req.DisplayOrder < 0 {
		req.DisplayOrder = 0
	}

	return s.Repository.UpdateCategory(id, req)
}

func (s *Service) DeleteCategory(id uint64) error {
	if id == 0 {
		return ErrInvalidCategory
	}

	return s.Repository.DeleteCategory(id)
}

// =========================
// MENU BY CATEGORY
// =========================

func (s *Service) GetItemsByCategory() (map[uint64][]MenuItem, error) {
	return s.Repository.FindItemsByCategory()
}
