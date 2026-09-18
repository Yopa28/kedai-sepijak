package menu

type MenuItem struct {
	ID          uint64  `json:"id"`
	CategoryID  uint64  `json:"category_id"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	Price       float64 `json:"price"`
	ImageURL    *string `json:"image_url,omitempty"`
	IsAvailable bool    `json:"is_available"`
	IsFeatured  bool    `json:"is_featured"`
}

type CreateMenuItemRequest struct {
	CategoryID  uint64  `json:"category_id" binding:"required"`
	Name        string  `json:"name" binding:"required"`
	Description *string `json:"description"`
	Price       float64 `json:"price" binding:"required"`
	ImageURL    *string `json:"image_url"`
	IsAvailable bool    `json:"is_available"`
	IsFeatured  bool    `json:"is_featured"`
}

type UpdateMenuItemRequest struct {
	CategoryID  uint64  `json:"category_id" binding:"required"`
	Name        string  `json:"name" binding:"required"`
	Description *string `json:"description"`
	Price       float64 `json:"price" binding:"required"`
	ImageURL    *string `json:"image_url"`
	IsAvailable bool    `json:"is_available"`
	IsFeatured  bool    `json:"is_featured"`
}

type MenuCategory struct {
	ID           uint64  `json:"id"`
	Name         string  `json:"name"`
	Description  *string `json:"description,omitempty"`
	DisplayOrder int     `json:"display_order"`
	IsActive     bool    `json:"is_active"`
}

type CreateCategoryRequest struct {
	Name         string  `json:"name" binding:"required"`
	Description  *string `json:"description"`
	DisplayOrder int     `json:"display_order"`
	IsActive     bool    `json:"is_active"`
}

type UpdateCategoryRequest struct {
	Name         string  `json:"name" binding:"required"`
	Description  *string `json:"description"`
	DisplayOrder int     `json:"display_order"`
	IsActive     bool    `json:"is_active"`
}
