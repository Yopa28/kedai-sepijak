package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"

	"github.com/joho/godotenv"
)

var DB *sql.DB

func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: .env file tidak ditemukan")
	}

	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?parseTime=true",
		user,
		password,
		host,
		port,
		name,
	)

	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Gagal membuka koneksi database:", err)
	}

	if err := DB.Ping(); err != nil {
		log.Fatal("Gagal terhubung ke database:", err)
	}

	log.Println("Database connected successfully")
}
