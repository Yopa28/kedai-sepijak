# 🚀 Kedai Sepijak Backend API

Backend API untuk Kedai Sepijak - Coffee Shop Management System menggunakan Express.js dan MySQL.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

Kedai Sepijak Backend adalah REST API yang menyediakan layanan untuk:
- ✅ Feedback & Rating System dengan pemilihan pelayan
- ✅ Polling System dengan validasi data pelanggan
- ✅ Menu Management System
- ✅ Testimonial Management
- ✅ Contact Form Submissions

## 🛠️ Tech Stack

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: MySQL
- **Dependencies**:
  - `mysql2` - MySQL client dengan Promise support
  - `dotenv` - Environment variables management
  - `cors` - Cross-Origin Resource Sharing
  - `helmet` - Security headers
  - `morgan` - HTTP request logger
  - `compression` - Response compression
  - `express-validator` - Request validation

## ✨ Features

### 1. Feedback System
- Submit customer feedback dengan rating 1-5
- Pemilihan pelayan yang melayani
- Track feedback status (pending, reviewed, approved, rejected)
- Analytics per pelayan
- Feedback statistics

### 2. Polling System
- Customer data validation (name, phone, email)
- Anti-spam protection (one vote per phone number)
- Real-time poll results dengan percentage
- Vote tracking dan statistics
- IP address logging

### 3. Menu Management
- CRUD operations untuk menu items
- Category management
- Filter by category, availability, featured status
- Image URL support
- Price management

### 4. Analytics & Reports
- Waiter performance reports
- Feedback statistics
- Poll results dengan percentages
- Daily vote counts

---

## 📦 Prerequisites

Sebelum memulai, pastikan Anda sudah install:

- **Node.js** (v16 atau lebih baru)
- **npm** (v8 atau lebih baru)
- **MySQL** (v5.7 atau lebih baru)
- **Git** (optional)

### Check Versions
```bash
node --version
npm --version
mysql --version
```

---

## 🚀 Installation

### 1. Clone Repository
```bash
cd Kedai_Sepijak_Backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file dengan text editor
# Update dengan konfigurasi Anda
```

---

## 🗄️ Database Setup

### 1. Create Database

**Option A: Manual via MySQL Client**
```bash
mysql -u root -p
```

```sql
CREATE DATABASE kedai_sepijak CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kedai_sepijak;
```

**Option B: Via Command Line**
```bash
mysql -u root -p -e "CREATE DATABASE kedai_sepijak CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 2. Import Schema

**Import schema SQL file:**
```bash
mysql -u root -p kedai_sepijak < database/schema.sql
```

**Atau via MySQL client:**
```sql
USE kedai_sepijak;
SOURCE database/schema.sql;
```

### 3. Verify Tables Created
```sql
USE kedai_sepijak;
SHOW TABLES;
```

**Expected output:**
```
+---------------------------+
| Tables_in_kedai_sepijak   |
+---------------------------+
| contact_messages          |
| feedback                  |
| menu_categories           |
| menu_items                |
| poll_options              |
| poll_votes                |
| settings                  |
| testimonials              |
| waiters                   |
+---------------------------+
```

### 4. Check Sample Data
```sql
-- Check waiters
SELECT * FROM waiters;

-- Check menu categories
SELECT * FROM menu_categories;

-- Check poll options
SELECT * FROM poll_options;
```

---

## ⚙️ Configuration

### Environment Variables

Edit file `.env` dengan konfigurasi Anda:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=0.0.0.0

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=kedai_sepijak

# CORS Configuration (Frontend URL)
CORS_ORIGIN=http://localhost:5173
```

### Important Settings

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `5000` | No |
| `DB_HOST` | MySQL host | `localhost` | Yes |
| `DB_USER` | MySQL username | `root` | Yes |
| `DB_PASSWORD` | MySQL password | - | Yes |
| `DB_NAME` | Database name | `kedai_sepijak` | Yes |
| `CORS_ORIGIN` | Frontend URL | `*` | No |

---

## 🏃 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Expected Output
```
🔌 Testing database connection...
✅ Database connected successfully!
📊 Connected to: kedai_sepijak at localhost

╔════════════════════════════════════════════╗
║   🚀 Kedai Sepijak API Server Started!   ║
╚════════════════════════════════════════════╝

📍 Server running on: http://0.0.0.0:5000
🌍 Environment: development
📊 Database: kedai_sepijak

📚 API Endpoints:
   - Health Check:  http://0.0.0.0:5000/api/health
   - Feedback:      http://0.0.0.0:5000/api/feedback
   - Polling:       http://0.0.0.0:5000/api/polling
   - Menu:          http://0.0.0.0:5000/api/menu

✨ Ready to accept requests!
```

### Test Server
```bash
# Health check
curl http://localhost:5000/api/health

# Expected response:
{
  "success": true,
  "message": "API is healthy",
  "database": "connected",
  "timestamp": "2024-11-01T...",
  "uptime": 12.345
}
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

---

## 📝 Feedback API

### Get All Feedback
```http
GET /api/feedback
```

**Query Parameters:**
- `status` - Filter by status (pending, reviewed, approved, rejected)
- `waiter_id` - Filter by waiter
- `rating` - Filter by rating (1-5)
- `limit` - Limit results (default: 50)
- `offset` - Offset for pagination (default: 0)

**Example:**
```bash
curl "http://localhost:5000/api/feedback?status=pending&limit=10"
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "contact": "08123456789",
      "date_of_visit": "2024-11-01",
      "waiter_id": 1,
      "waiter_name": "Budi",
      "rating": 5,
      "message": "Excellent service!",
      "status": "pending",
      "created_at": "2024-11-01T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

### Submit Feedback
```http
POST /api/feedback
```

**Request Body:**
```json
{
  "name": "John Doe",
  "contact": "08123456789",
  "date_of_visit": "2024-11-01",
  "waiter_id": 1,
  "rating": 5,
  "message": "Great coffee and service!"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "contact": "08123456789",
    "date_of_visit": "2024-11-01",
    "waiter_id": 1,
    "rating": 5,
    "message": "Great coffee and service!"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "waiter_name": "Budi",
    "rating": 5,
    "status": "pending"
  }
}
```

### Get Feedback Statistics
```http
GET /api/feedback/stats
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback statistics retrieved successfully",
  "data": {
    "total_feedback": 100,
    "average_rating": 4.5,
    "five_star": 60,
    "four_star": 25,
    "three_star": 10,
    "two_star": 3,
    "one_star": 2
  }
}
```

### Get Waiter Performance
```http
GET /api/feedback/waiter-performance
```

**Response:**
```json
{
  "success": true,
  "message": "Waiter performance retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Budi",
      "total_feedbacks": 50,
      "average_rating": 4.8,
      "positive_feedbacks": 48,
      "negative_feedbacks": 2
    }
  ]
}
```

---

## 🗳️ Polling API

### Get Poll Options
```http
GET /api/polling
```

**Response:**
```json
{
  "success": true,
  "message": "Poll options retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Jazzy Brewers 🎷",
      "description": "Live music performance",
      "vote_count": 45,
      "percentage": 45.00,
      "is_active": true
    }
  ]
}
```

### Submit Vote
```http
POST /api/polling/vote
```

**Request Body:**
```json
{
  "poll_option_id": 1,
  "customer_name": "John Doe",
  "customer_phone": "08123456789",
  "customer_email": "john@example.com"
}
```

**Validation Rules:**
- `customer_name`: Minimum 3 characters
- `customer_phone`: Minimum 10 digits
- `customer_email`: Optional, valid email format

**Example:**
```bash
curl -X POST http://localhost:5000/api/polling/vote \
  -H "Content-Type: application/json" \
  -d '{
    "poll_option_id": 1,
    "customer_name": "John Doe",
    "customer_phone": "08123456789",
    "customer_email": "john@example.com"
  }'
```

**Success Response:**
```json
{
  "success": true,
  "message": "Vote submitted successfully",
  "data": {
    "voted_for": 1,
    "customer_name": "John Doe",
    "poll_results": [
      {
        "id": 1,
        "name": "Jazzy Brewers 🎷",
        "vote_count": 46,
        "percentage": 46.00
      }
    ]
  }
}
```

**Error Response (Already Voted):**
```json
{
  "success": false,
  "message": "You have already voted. One vote per customer allowed.",
  "data": {
    "already_voted": true
  }
}
```

### Check Vote Status
```http
GET /api/polling/check-vote?phone=08123456789
```

**Response:**
```json
{
  "success": true,
  "message": "Customer has already voted",
  "data": {
    "has_voted": true,
    "vote_details": {
      "poll_option_id": 1,
      "poll_option_name": "Jazzy Brewers 🎷",
      "voted_at": "2024-11-01T10:30:00.000Z"
    }
  }
}
```

### Get Poll Statistics
```http
GET /api/polling/statistics
```

**Response:**
```json
{
  "success": true,
  "message": "Poll statistics retrieved successfully",
  "data": {
    "summary": {
      "total_options": 3,
      "total_votes": 100,
      "unique_voters": 100,
      "total_vote_records": 100
    },
    "daily_votes": [
      {
        "vote_date": "2024-11-01",
        "vote_count": 25
      }
    ]
  }
}
```

---

## 🍽️ Menu API

### Get All Menu Items
```http
GET /api/menu
```

**Query Parameters:**
- `category_id` - Filter by category
- `is_available` - Filter by availability (true/false)
- `is_featured` - Filter by featured status (true/false)
- `limit` - Limit results (default: 100)
- `offset` - Offset for pagination (default: 0)

**Example:**
```bash
curl "http://localhost:5000/api/menu?category_id=1&is_available=true"
```

### Get Menu by Category
```http
GET /api/menu/by-category
```

**Response:**
```json
{
  "success": true,
  "message": "Menu retrieved successfully",
  "data": [
    {
      "category_id": 1,
      "category_name": "Kopi",
      "category_description": "Berbagai pilihan kopi premium",
      "items": [
        {
          "id": 1,
          "name": "Signature Coffee Blend",
          "description": "Kopi signature dengan blend spesial",
          "price": 25000,
          "image_url": "https://...",
          "is_available": true,
          "is_featured": true
        }
      ]
    }
  ]
}
```

### Get All Categories
```http
GET /api/menu/categories
```

**Response:**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Kopi",
      "description": "Berbagai pilihan kopi premium",
      "display_order": 1,
      "total_items": 10,
      "available_items": 8
    }
  ]
}
```

---

## 📁 Project Structure

```
Kedai_Sepijak_Backend/
├── src/
│   ├── config/
│   │   └── database.js              # Database configuration & connection pool
│   ├── controllers/
│   │   ├── feedbackController.js    # Feedback business logic
│   │   ├── pollingController.js     # Polling business logic
│   │   └── menuController.js        # Menu business logic
│   ├── routes/
│   │   ├── feedbackRoutes.js        # Feedback API routes
│   │   ├── pollingRoutes.js         # Polling API routes
│   │   └── menuRoutes.js            # Menu API routes
│   ├── middleware/
│   │   ├── errorHandler.js          # Global error handling
│   │   └── validation.js            # Input validation middleware
│   └── app.js                       # Express app configuration
├── database/
│   └── schema.sql                   # Database schema & seed data
├── .env                             # Environment variables (gitignored)
├── .env.example                     # Environment variables example
├── .gitignore                       # Git ignore rules
├── package.json                     # Project dependencies
├── server.js                        # Server entry point
└── README.md                        # This file
```

---

## 🔒 Security

### Implemented Security Measures

1. **Helmet.js** - Security headers
2. **CORS** - Cross-Origin Resource Sharing configuration
3. **Input Validation** - All inputs validated
4. **SQL Injection Prevention** - Prepared statements
5. **Rate Limiting** - Prevent abuse (to be implemented)
6. **IP Tracking** - Log IP addresses for votes/feedback
7. **Phone Number Validation** - Prevent duplicate votes

### Best Practices

- Never commit `.env` file
- Use environment variables for sensitive data
- Keep dependencies updated
- Use HTTPS in production
- Implement authentication for admin routes
- Regular security audits

---

## 🧪 Testing

### Manual Testing dengan cURL

**Test Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Test Submit Feedback:**
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "contact": "08123456789",
    "date_of_visit": "2024-11-01",
    "waiter_id": 1,
    "rating": 5,
    "message": "Test feedback"
  }'
```

**Test Submit Vote:**
```bash
curl -X POST http://localhost:5000/api/polling/vote \
  -H "Content-Type: application/json" \
  -d '{
    "poll_option_id": 1,
    "customer_name": "Test User",
    "customer_phone": "08123456789"
  }'
```

### Testing dengan Postman

1. Import collection dari `docs/postman_collection.json` (jika ada)
2. Set environment variables
3. Run tests sequentially

---

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Use strong database passwords
- [ ] Configure CORS untuk production frontend URL
- [ ] Enable HTTPS
- [ ] Setup process manager (PM2)
- [ ] Configure firewall
- [ ] Setup database backups
- [ ] Monitor logs
- [ ] Setup error tracking (Sentry, etc.)

### Deploy dengan PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start server
pm2 start server.js --name kedai-sepijak-api

# Setup auto-restart on system boot
pm2 startup
pm2 save

# Monitor
pm2 monit

# View logs
pm2 logs kedai-sepijak-api
```

### Deploy ke VPS

1. **Setup Server:**
```bash
# Update system
sudo apt update && sudo apt upgrade

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install mysql-server
```

2. **Clone & Setup:**
```bash
git clone <repository-url>
cd Kedai_Sepijak_Backend
npm install --production
cp .env.example .env
# Edit .env dengan production values
```

3. **Setup Database:**
```bash
mysql -u root -p < database/schema.sql
```

4. **Start Server:**
```bash
pm2 start server.js --name kedai-sepijak-api
pm2 save
```

---

## 🐛 Troubleshooting

### Database Connection Error

**Error:**
```
❌ Database connection failed: Access denied for user 'root'@'localhost'
```

**Solution:**
1. Check DB_USER and DB_PASSWORD in `.env`
2. Verify MySQL is running: `sudo systemctl status mysql`
3. Test MySQL connection: `mysql -u root -p`

### Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
1. Change PORT in `.env` to different port
2. Or kill process using port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Tables Not Found

**Error:**
```
ER_NO_SUCH_TABLE: Table 'kedai_sepijak.feedback' doesn't exist
```

**Solution:**
1. Import schema: `mysql -u root -p kedai_sepijak < database/schema.sql`
2. Verify tables: `SHOW TABLES;`

---

## 📞 Support & Contact

- **Email**: support@kedaisepijak.com
- **Documentation**: [API Docs](http://localhost:5000/api)
- **Issues**: Create issue di repository

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

---

## 📄 License

Copyright © 2024 Kedai Sepijak. All rights reserved.

---

## 📝 Changelog

### v1.0.0 (2024-11-01)
- ✅ Initial release
- ✅ Feedback API with waiter selection
- ✅ Polling API with customer validation
- ✅ Menu Management API
- ✅ Complete database schema
- ✅ Error handling & logging
- ✅ Security middleware

---

## 🎯 Roadmap

### v1.1.0 (Planned)
- [ ] Authentication & Authorization (JWT)
- [ ] Admin dashboard API
- [ ] Image upload for menu items
- [ ] Email notifications
- [ ] Rate limiting
- [ ] API documentation with Swagger

### v1.2.0 (Planned)
- [ ] Real-time updates with WebSocket
- [ ] Analytics dashboard
- [ ] Export reports (PDF, Excel)
- [ ] Multi-language support

---

**Built with ❤️ for Kedai Sepijak**

**Version**: 1.0.0  
**Last Updated**: November 1, 2025  
**Status**: ✅ Production Ready