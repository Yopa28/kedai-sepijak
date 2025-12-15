# 🚀 Quick Start Guide - Kedai Sepijak Backend

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
cd Kedai_Sepijak_Backend
npm install
```

### Step 2: Setup Database
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE kedai_sepijak CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Exit MySQL
exit

# Import schema
mysql -u root -p kedai_sepijak < database/schema.sql
```

### Step 3: Configure Environment
```bash
# Copy environment file
cp .env.example .env

# Edit .env file - Update these lines:
# DB_PASSWORD=your_mysql_password
# CORS_ORIGIN=http://localhost:5173
```

### Step 4: Start Server
```bash
npm run dev
```

**Expected Output:**
```
✅ Database connected successfully!
🚀 Kedai Sepijak API Server Started!
📍 Server running on: http://0.0.0.0:5000
```

### Step 5: Test API
```bash
# Open browser and visit:
http://localhost:5000/api/health

# Or use curl:
curl http://localhost:5000/api/health
```

**Success Response:**
```json
{
  "success": true,
  "message": "API is healthy",
  "database": "connected"
}
```

---

## 🎯 Quick Test Commands

### Get All Waiters
```bash
curl http://localhost:5000/api/waiters
```

### Get Poll Options
```bash
curl http://localhost:5000/api/polling
```

### Get Menu Items
```bash
curl http://localhost:5000/api/menu
```

### Submit Feedback (POST)
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "contact": "08123456789",
    "date_of_visit": "2024-11-01",
    "waiter_id": 1,
    "rating": 5,
    "message": "Great service!"
  }'
```

### Submit Vote (POST)
```bash
curl -X POST http://localhost:5000/api/polling/vote \
  -H "Content-Type: application/json" \
  -d '{
    "poll_option_id": 1,
    "customer_name": "Jane Doe",
    "customer_phone": "08123456789"
  }'
```

---

## 📚 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/waiters` | Get all waiters |
| GET | `/api/feedback` | Get all feedback |
| POST | `/api/feedback` | Submit feedback |
| GET | `/api/polling` | Get poll options |
| POST | `/api/polling/vote` | Submit vote |
| GET | `/api/menu` | Get menu items |
| GET | `/api/menu/by-category` | Get menu by category |

**Full documentation**: See [README.md](./README.md)

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check MySQL is running
# Windows:
net start MySQL

# Linux:
sudo systemctl start mysql

# Mac:
brew services start mysql
```

### Port 5000 Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### Tables Not Found
```bash
# Re-import schema
mysql -u root -p kedai_sepijak < database/schema.sql
```

---

## 🎉 You're Ready!

Server is running at: **http://localhost:5000**

Next steps:
1. Connect frontend to backend
2. Test all API endpoints
3. Check database data
4. Read full documentation

**Need help?** See [README.md](./README.md) for detailed documentation.