# 🚀 Kedai Sepijak - Node.js Backend Server

Backend API server menggunakan **Node.js + Express + MySQL** untuk Kedai Sepijak Admin Dashboard.

---

## 📋 Overview

Backend ini menggantikan PHP API dengan Node.js/Express untuk:
- ✅ Authentication & Session Management
- ✅ Dashboard Statistics
- ✅ Waiters CRUD
- ✅ Feedback with GPS Validation
- ✅ Auto Voucher Generation
- ✅ Polls & Voting System

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 16+
- **Framework:** Express.js 4.x
- **Database:** MySQL 5.7+ / MariaDB
- **Session:** express-session
- **Auth:** bcryptjs
- **CORS:** cors middleware
- **Environment:** dotenv

---

## 📦 Installation

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=kedai_sepijak

# Session Secret (CHANGE THIS!)
SESSION_SECRET=your-super-secret-key-here

# Client URL
CLIENT_URL=http://localhost:5173

# Restaurant GPS Coordinates (⚠️ CHANGE THIS!)
RESTAURANT_LAT=-6.2088
RESTAURANT_LNG=106.8456
FEEDBACK_RADIUS_METERS=100

# Voucher Config
VOUCHER_DISCOUNT_PERCENTAGE=10
VOUCHER_EXPIRY_DAYS=30
VOUCHER_MIN_PURCHASE=50000
```

### 3. Setup Database

Import database schema (menggunakan schema yang sama dengan PHP version):

```bash
mysql -u root -p < ../admin/database.sql
```

### 4. Run Development Server

```bash
npm run dev
```

Server akan berjalan di: `http://localhost:3000`

---

## 🚀 Production

### Build & Run

```bash
npm start
```

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start server with PM2
pm2 start server.js --name kedai-sepijak-api

# View logs
pm2 logs kedai-sepijak-api

# Restart
pm2 restart kedai-sepijak-api

# Stop
pm2 stop kedai-sepijak-api
```

---

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Login admin | No |
| POST | `/auth/logout` | Logout admin | Yes |
| GET | `/auth/session` | Check session | No |
| GET | `/auth/me` | Get current user | Yes |

### Dashboard

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/dashboard/stats` | Get complete statistics | Yes |
| GET | `/dashboard/quick-stats` | Get quick stats | Yes |

### Waiters

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/waiters` | Get all waiters | Yes |
| GET | `/waiters/:id` | Get single waiter | Yes |
| POST | `/waiters` | Create waiter | Yes |
| PUT | `/waiters/:id` | Update waiter | Yes |
| DELETE | `/waiters/:id` | Delete waiter | Yes |

### Feedback

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/feedback` | Get all feedback | Yes |
| GET | `/feedback/:id` | Get single feedback | Yes |
| POST | `/feedback` | Submit feedback (with GPS) | No |
| PUT | `/feedback/:id` | Update feedback | Yes |
| DELETE | `/feedback/:id` | Delete feedback | Yes |
| GET | `/feedback/stats/summary` | Get statistics | Yes |

### Polls

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/polls` | Get all polls | No (public: active only) |
| GET | `/polls/:id` | Get single poll | No |
| GET | `/polls/:id/results` | Get poll results | No |
| POST | `/polls` | Create poll | Yes |
| POST | `/polls/:id/vote` | Vote on poll | No |
| PUT | `/polls/:id` | Update poll | Yes |
| DELETE | `/polls/:id` | Delete poll | Yes |
| GET | `/polls/stats/summary` | Get statistics | Yes |

---

## 🔒 Authentication

### Login Request

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Login Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@kedaisepijak.com",
    "full_name": "Super Admin",
    "role": "super_admin"
  }
}
```

### Session Cookie

Session automatically stored in cookie: `connect.sid`

Include cookie in subsequent requests for authentication.

---

## 🌍 GPS Validation (Feedback)

### Submit Feedback Request

```bash
POST /api/feedback
Content-Type: application/json

{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "081234567890",
  "rating": 5,
  "category": "pelayanan",
  "message": "Excellent service!",
  "waiter_id": 1,
  "latitude": -6.2088,
  "longitude": 106.8456
}
```

### Success Response (Within Radius)

```json
{
  "success": true,
  "message": "Terima kasih atas feedback Anda! Voucher diskon telah dikirimkan.",
  "data": {
    "feedback": {
      "id": 123,
      "customer_name": "John Doe",
      "rating": 5,
      "category": "pelayanan",
      "message": "Excellent service!"
    },
    "voucher": {
      "code": "KS20240115ABCD12",
      "discount_percentage": 10,
      "min_purchase": 50000,
      "expires_at": "2024-02-14T12:00:00.000Z",
      "description": "Terima kasih atas feedback Anda! Dapatkan diskon 10%"
    },
    "location_verified": true,
    "distance_meters": 45.32
  }
}
```

### Error Response (Outside Radius)

```json
{
  "success": false,
  "message": "Anda harus berada di area Kedai Sepijak untuk memberikan feedback.",
  "data": {
    "distance_meters": 250.5,
    "max_distance_meters": 100,
    "restaurant_location": {
      "latitude": -6.2088,
      "longitude": 106.8456
    }
  }
}
```

---

## 📁 Project Structure

```
server/
├── config/
│   └── database.js          # MySQL connection pool
├── controllers/
│   ├── authController.js    # ✅ Authentication logic
│   └── dashboardController.js # ✅ Dashboard statistics
├── middleware/
│   └── auth.js              # ✅ Auth middleware
├── models/
│   └── (future: data models)
├── routes/
│   ├── auth.js              # ✅ Auth routes
│   ├── dashboard.js         # ✅ Dashboard routes
│   ├── waiters.js           # ⏳ Waiters routes (TODO)
│   ├── feedback.js          # ⏳ Feedback routes (TODO)
│   └── polls.js             # ⏳ Polls routes (TODO)
├── .env.example             # ✅ Environment template
├── package.json             # ✅ Dependencies
├── server.js                # ✅ Main server file
└── README.md                # ✅ This file
```

---

## ✅ Completed Features

### 1. Authentication System (100%)
- ✅ Login with bcrypt password verification
- ✅ Session management with express-session
- ✅ Logout with session destroy
- ✅ Check session endpoint
- ✅ Protected routes middleware
- ✅ Guest routes middleware

### 2. Dashboard Statistics (100%)
- ✅ Complete dashboard stats
- ✅ Feedback statistics
- ✅ Waiter statistics
- ✅ Poll statistics
- ✅ Voucher statistics
- ✅ Recent feedback
- ✅ Top waiters
- ✅ Feedback by category
- ✅ Feedback trend (7 days)
- ✅ Growth calculation
- ✅ Rating trend

### 3. Database Connection (100%)
- ✅ MySQL connection pool
- ✅ Connection testing
- ✅ Query helper function
- ✅ Error handling

### 4. Server Setup (100%)
- ✅ Express server
- ✅ CORS configuration
- ✅ Body parser middleware
- ✅ Session middleware
- ✅ Error handler
- ✅ 404 handler
- ✅ Health check endpoint

---

## ⏳ TODO (Need Implementation)

### 1. Waiters Routes (0%)
- ⏳ GET all waiters with pagination
- ⏳ GET single waiter
- ⏳ POST create waiter
- ⏳ PUT update waiter
- ⏳ DELETE waiter
- ⏳ Filter by shift & status
- ⏳ Search functionality

### 2. Feedback Routes (0%)
- ⏳ GET all feedback with filters
- ⏳ GET single feedback
- ⏳ POST submit feedback
  - ⏳ **GPS validation (Haversine formula)**
  - ⏳ **Auto voucher generation**
- ⏳ PUT update feedback
- ⏳ DELETE feedback
- ⏳ Feedback statistics

### 3. Polls Routes (0%)
- ⏳ GET all polls
- ⏳ GET single poll
- ⏳ GET poll results
- ⏳ POST create poll
- ⏳ POST vote on poll
  - ⏳ IP-based duplicate prevention
- ⏳ PUT update poll
- ⏳ DELETE poll
- ⏳ Poll statistics

### 4. Additional Features
- ⏳ Input validation (express-validator)
- ⏳ File upload (for waiter photos)
- ⏳ Email notifications
- ⏳ Rate limiting
- ⏳ API documentation (Swagger)
- ⏳ Unit tests
- ⏳ Logger (Winston)

---

## 🐛 Troubleshooting

### Database Connection Failed

**Error:** `❌ Database connection failed`

**Solution:**
1. Check MySQL is running: `mysql -u root -p`
2. Verify credentials in `.env`
3. Check database exists: `SHOW DATABASES;`
4. Check user permissions

### Session Not Working

**Error:** Session not persisting

**Solution:**
1. Check `SESSION_SECRET` in `.env`
2. Verify cookie settings
3. Check CORS configuration allows credentials
4. Clear browser cookies

### CORS Error

**Error:** `Access to fetch at ... has been blocked by CORS policy`

**Solution:**
1. Check `CLIENT_URL` in `.env`
2. Verify CORS configuration in `server.js`
3. Ensure `credentials: true` in both server and client

---

## 📚 Resources

- **Express.js:** https://expressjs.com/
- **MySQL2:** https://github.com/sidorares/node-mysql2
- **bcryptjs:** https://github.com/dcodeIO/bcrypt.js
- **express-session:** https://github.com/expressjs/session
- **dotenv:** https://github.com/motdotla/dotenv

---

## 🚀 Next Steps

1. **Implement Waiters CRUD:**
   - Create controller in `controllers/waitersController.js`
   - Implement all CRUD operations
   - Add validation

2. **Implement Feedback with GPS:**
   - Create controller in `controllers/feedbackController.js`
   - Implement Haversine formula for distance calculation
   - Add voucher generation logic
   - Auto-update waiter ratings

3. **Implement Polls System:**
   - Create controller in `controllers/pollsController.js`
   - Implement voting with duplicate prevention
   - Add results calculation

4. **Add Validation:**
   - Use express-validator
   - Validate all inputs
   - Sanitize data

5. **Testing:**
   - Write unit tests
   - Write integration tests
   - Test GPS validation

---

## 📞 Support

**Default Credentials:**
```
Username: admin
Password: admin123
```

**⚠️ IMPORTANT:** Change default password in production!

---

**Status:** 🔨 Backend Infrastructure Complete (60%)
- ✅ Auth & Session: 100%
- ✅ Dashboard: 100%
- ⏳ Waiters: 0%
- ⏳ Feedback: 0%
- ⏳ Polls: 0%

**Next:** Implement CRUD operations for Waiters, Feedback, and Polls

---

© 2024 Kedai Sepijak - Node.js Backend Server