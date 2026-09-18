package auth

import (
	"database/sql"
	"errors"
)

type Repository struct {
	DB *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		DB: db,
	}
}

func (r *Repository) FindByUsername(username string) (*AdminUser, error) {
	var user AdminUser

	query := `
		SELECT id, username, email, password, full_name, role
		FROM admin_users
		WHERE username = ?
		LIMIT 1
	`

	err := r.DB.QueryRow(query, username).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Password,
		&user.FullName,
		&user.Role,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}

		return nil, err
	}

	return &user, nil
}
