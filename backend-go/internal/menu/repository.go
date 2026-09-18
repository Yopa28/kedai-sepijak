package menu

import (
	"database/sql"
	"fmt"
	"strings"
)

type Repository struct {
	DB *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		DB: db,
	}
}

// =========================
// MENU ITEMS
// =========================

func (r *Repository) FindAllItems(
	categoryID *uint64,
	isAvailable *bool,
	isFeatured *bool,
	limit int,
	offset int,
) ([]MenuItem, error) {

	query := `
		SELECT
			id,
			category_id,
			name,
			description,
			price,
			image_url,
			is_available,
			is_featured
		FROM menu_items
	`

	var conditions []string
	var args []interface{}

	if categoryID != nil {
		conditions = append(conditions, "category_id = ?")
		args = append(args, *categoryID)
	}

	if isAvailable != nil {
		conditions = append(conditions, "is_available = ?")
		args = append(args, *isAvailable)
	}

	if isFeatured != nil {
		conditions = append(conditions, "is_featured = ?")
		args = append(args, *isFeatured)
	}

	if len(conditions) > 0 {
		query += " WHERE " + strings.Join(conditions, " AND ")
	}

	query += " ORDER BY id DESC"

	if limit > 0 {
		query += " LIMIT ?"
		args = append(args, limit)

		if offset > 0 {
			query += " OFFSET ?"
			args = append(args, offset)
		}
	}

	rows, err := r.DB.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	items := make([]MenuItem, 0)

	for rows.Next() {
		var item MenuItem

		err := rows.Scan(
			&item.ID,
			&item.CategoryID,
			&item.Name,
			&item.Description,
			&item.Price,
			&item.ImageURL,
			&item.IsAvailable,
			&item.IsFeatured,
		)
		if err != nil {
			return nil, err
		}

		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (r *Repository) FindItemByID(id uint64) (*MenuItem, error) {
	query := `
		SELECT
			id,
			category_id,
			name,
			description,
			price,
			image_url,
			is_available,
			is_featured
		FROM menu_items
		WHERE id = ?
	`

	var item MenuItem

	err := r.DB.QueryRow(query, id).Scan(
		&item.ID,
		&item.CategoryID,
		&item.Name,
		&item.Description,
		&item.Price,
		&item.ImageURL,
		&item.IsAvailable,
		&item.IsFeatured,
	)

	if err != nil {
		return nil, err
	}

	return &item, nil
}

func (r *Repository) CreateItem(req CreateMenuItemRequest) (*MenuItem, error) {
	query := `
		INSERT INTO menu_items (
			category_id,
			name,
			description,
			price,
			image_url,
			is_available,
			is_featured
		)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`

	result, err := r.DB.Exec(
		query,
		req.CategoryID,
		req.Name,
		req.Description,
		req.Price,
		req.ImageURL,
		req.IsAvailable,
		req.IsFeatured,
	)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	return r.FindItemByID(uint64(id))
}

func (r *Repository) UpdateItem(
	id uint64,
	req UpdateMenuItemRequest,
) (*MenuItem, error) {

	query := `
		UPDATE menu_items
		SET
			category_id = ?,
			name = ?,
			description = ?,
			price = ?,
			image_url = ?,
			is_available = ?,
			is_featured = ?
		WHERE id = ?
	`

	result, err := r.DB.Exec(
		query,
		req.CategoryID,
		req.Name,
		req.Description,
		req.Price,
		req.ImageURL,
		req.IsAvailable,
		req.IsFeatured,
		id,
	)
	if err != nil {
		return nil, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return nil, err
	}

	if rowsAffected == 0 {
		return nil, sql.ErrNoRows
	}

	return r.FindItemByID(id)
}

func (r *Repository) DeleteItem(id uint64) error {
	query := `
		DELETE FROM menu_items
		WHERE id = ?
	`

	result, err := r.DB.Exec(query, id)
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

// =========================
// CATEGORIES
// =========================

func (r *Repository) FindAllCategories() ([]MenuCategory, error) {
	query := `
		SELECT
			id,
			name,
			description,
			display_order,
			is_active
		FROM menu_categories
		ORDER BY display_order ASC, id ASC
	`

	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	categories := make([]MenuCategory, 0)

	for rows.Next() {
		var category MenuCategory

		err := rows.Scan(
			&category.ID,
			&category.Name,
			&category.Description,
			&category.DisplayOrder,
			&category.IsActive,
		)
		if err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return categories, nil
}

func (r *Repository) FindCategoryByID(id uint64) (*MenuCategory, error) {
	query := `
		SELECT
			id,
			name,
			description,
			display_order,
			is_active
		FROM menu_categories
		WHERE id = ?
	`

	var category MenuCategory

	err := r.DB.QueryRow(query, id).Scan(
		&category.ID,
		&category.Name,
		&category.Description,
		&category.DisplayOrder,
		&category.IsActive,
	)

	if err != nil {
		return nil, err
	}

	return &category, nil
}

func (r *Repository) CreateCategory(
	req CreateCategoryRequest,
) (*MenuCategory, error) {

	query := `
		INSERT INTO menu_categories (
			name,
			description,
			display_order,
			is_active
		)
		VALUES (?, ?, ?, ?)
	`

	result, err := r.DB.Exec(
		query,
		req.Name,
		req.Description,
		req.DisplayOrder,
		req.IsActive,
	)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	return r.FindCategoryByID(uint64(id))
}

func (r *Repository) UpdateCategory(
	id uint64,
	req UpdateCategoryRequest,
) (*MenuCategory, error) {

	query := `
		UPDATE menu_categories
		SET
			name = ?,
			description = ?,
			display_order = ?,
			is_active = ?
		WHERE id = ?
	`

	result, err := r.DB.Exec(
		query,
		req.Name,
		req.Description,
		req.DisplayOrder,
		req.IsActive,
		id,
	)
	if err != nil {
		return nil, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return nil, err
	}

	if rowsAffected == 0 {
		return nil, sql.ErrNoRows
	}

	return r.FindCategoryByID(id)
}

func (r *Repository) DeleteCategory(id uint64) error {
	query := `
		DELETE FROM menu_categories
		WHERE id = ?
	`

	result, err := r.DB.Exec(query, id)
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

// =========================
// MENU BY CATEGORY
// =========================

func (r *Repository) FindItemsByCategory() (map[uint64][]MenuItem, error) {
	query := `
		SELECT
			id,
			category_id,
			name,
			description,
			price,
			image_url,
			is_available,
			is_featured
		FROM menu_items
		ORDER BY category_id ASC, id ASC
	`

	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	result := make(map[uint64][]MenuItem)

	for rows.Next() {
		var item MenuItem

		err := rows.Scan(
			&item.ID,
			&item.CategoryID,
			&item.Name,
			&item.Description,
			&item.Price,
			&item.ImageURL,
			&item.IsAvailable,
			&item.IsFeatured,
		)
		if err != nil {
			return nil, err
		}

		result[item.CategoryID] = append(
			result[item.CategoryID],
			item,
		)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return result, nil
}

// =========================
// CATEGORY EXISTENCE
// =========================

func (r *Repository) CategoryExists(id uint64) (bool, error) {
	var exists bool

	query := `
		SELECT EXISTS(
			SELECT 1
			FROM menu_categories
			WHERE id = ?
		)
	`

	err := r.DB.QueryRow(query, id).Scan(&exists)

	return exists, err
}

// =========================
// DEBUG HELPER
// =========================

func (r *Repository) Ping() error {
	if r.DB == nil {
		return fmt.Errorf("database connection is nil")
	}

	return r.DB.Ping()
}
