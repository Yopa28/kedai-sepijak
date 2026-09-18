package waiter

import (
	"database/sql"
)

type Repository struct {
	DB *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		DB: db,
	}
}

func (r *Repository) FindAll() ([]Waiter, error) {
	query := `
		SELECT id, name, phone, status
		FROM waiters
		ORDER BY id DESC
	`

	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var waiters []Waiter

	for rows.Next() {
		var w Waiter

		if err := rows.Scan(
			&w.ID,
			&w.Name,
			&w.Phone,
			&w.Status,
		); err != nil {
			return nil, err
		}

		waiters = append(waiters, w)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return waiters, nil
}

func (r *Repository) FindByID(id uint64) (*Waiter, error) {
	query := `
		SELECT id, name, phone, status
		FROM waiters
		WHERE id = ?
	`

	var w Waiter

	err := r.DB.QueryRow(
		query,
		id,
	).Scan(
		&w.ID,
		&w.Name,
		&w.Phone,
		&w.Status,
	)

	if err != nil {
		return nil, err
	}

	return &w, nil
}

func (r *Repository) Create(req CreateWaiterRequest) (*Waiter, error) {
	query := `
		INSERT INTO waiters (name, phone, status)
		VALUES (?, ?, ?)
	`

	status := req.Status
	if status == "" {
		status = "active"
	}

	result, err := r.DB.Exec(
		query,
		req.Name,
		req.Phone,
		status,
	)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	return r.FindByID(uint64(id))
}

func (r *Repository) Update(
	id uint64,
	req UpdateWaiterRequest,
) (*Waiter, error) {
	query := `
		UPDATE waiters
		SET name = ?, phone = ?, status = ?
		WHERE id = ?
	`

	status := req.Status
	if status == "" {
		status = "active"
	}

	result, err := r.DB.Exec(
		query,
		req.Name,
		req.Phone,
		status,
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

	return r.FindByID(id)
}

func (r *Repository) Delete(id uint64) error {
	query := `
		DELETE FROM waiters
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
