package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"kedai-sepijak-backend/database"
	"kedai-sepijak-backend/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file tidak ditemukan")
	}

	database.Connect()

	r := gin.Default()

	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success":  true,
			"message":  "API is healthy",
			"database": "connected",
		})
	})

	jwtSecret := os.Getenv("JWT_SECRET")

	if jwtSecret == "" {
		log.Fatal("JWT_SECRET belum diset di .env")
	}

	routes.Setup(r, database.DB, jwtSecret)

	if err := r.Run(":5001"); err != nil {
		log.Fatal(err)
	}
}
