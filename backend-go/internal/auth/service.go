package auth

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrInvalidCredentials = errors.New("username atau password salah")
	ErrUnauthorized       = errors.New("akses tidak diizinkan")
)

type Service struct {
	Repository *Repository
	JWTSecret  string
}

func NewService(repository *Repository, jwtSecret string) *Service {
	return &Service{
		Repository: repository,
		JWTSecret:  jwtSecret,
	}
}

func (s *Service) Login(request LoginRequest) (string, *AdminUser, error) {
	user, err := s.Repository.FindByUsername(request.Username)
	if err != nil {
		return "", nil, err
	}

	if user == nil {
		return "", nil, ErrInvalidCredentials
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(request.Password),
	)
	if err != nil {
		return "", nil, ErrInvalidCredentials
	}

	if user.Role != "admin" && user.Role != "super_admin" {
		return "", nil, ErrUnauthorized
	}

	claims := jwt.MapClaims{
		"user_id":   user.ID,
		"username":  user.Username,
		"full_name": user.FullName,
		"role":      user.Role,
		"exp":       time.Now().Add(24 * time.Hour).Unix(),
		"iat":       time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(s.JWTSecret))
	if err != nil {
		return "", nil, err
	}

	return signedToken, user, nil
}
