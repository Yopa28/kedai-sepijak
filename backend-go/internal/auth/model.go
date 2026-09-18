package auth

type AdminUser struct {
	ID       uint64 `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"-"`
	FullName string `json:"full_name"`
	Role     string `json:"role"`
}

type LoginRequest struct {
	Username       string `json:"username" binding:"required"`
	Password       string `json:"password" binding:"required"`
	RecaptchaToken string `json:"recaptchaToken"`
}
