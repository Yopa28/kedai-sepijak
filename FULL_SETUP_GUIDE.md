# 🚀 KEDAI SEPIJAK - FULL SETUP GUIDE
## Vue.js Frontend + Node.js Backend

---

## 📋 SISTEM OVERVIEW

Kedai Sepijak Admin Dashboard menggunakan **Full JavaScript Stack**:
- **Frontend:** Vue.js 3 + Vite + Tailwind CSS + Pinia
- **Backend:** Node.js + Express + MySQL
- **Database:** MySQL 5.7+ / MariaDB

### ✨ FITUR UTAMA:
1. ✅ **Authentication** - Login/logout dengan session
2. ✅ **Dashboard** - Statistics real-time dengan charts
3. ⏳ **Waiters Management** - CRUD pelayan (TODO: Implement)
4. ⏳ **Feedback System** - dengan GPS validation + Auto voucher (TODO: Implement)
5. ⏳ **Polling & Event** - Create polls & voting system (TODO: Implement)

### 📊 PROGRESS:
- Backend Infrastructure: 60% (Auth ✅, Dashboard ✅, Others ⏳)
- Frontend Infrastructure: 100% (Stores ✅, Composables ✅, Router ✅)
- Frontend Pages: 40% (Login ✅, Layout ✅, Dashboard ⏳, Others ⏳)

---

## 🎯 PREREQUISITES

### Software Required:
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **MySQL** 5.7+ atau MariaDB ([Download](https://dev.mysql.com/downloads/))
- **Git** (optional)
- **Code Editor** (VS Code recommended)

### Check Installations:
```bash
node --version    # Should be v16 or higher
npm --version     # Should be v8 or higher
mysql --version   # Should be 5.7 or higher
```

---

## 📦 INSTALLATION

### 1️⃣ Clone/Download Project
```bash
# If using git
git clone <repository-url>
cd Kedai_Sepijak

# Or just download and extract ZIP
```

---

### 2️⃣ Setup Database

#### A. Login to MySQL:
```bash
mysql -u root -p
```

#### B. Import Database Schema:
```sql
-- From MySQL prompt
SOURCE admin/database.sql;

-- Or from command line
mysql -u root -p < admin/database.sql
```

#### C. Verify Database Created:
```sql
SHOW DATABASES;
USE kedai_sepijak;
SHOW TABLES;
```

You should see tables:
- admin_users
- waiters
- feedback
- polls
- poll_options
- poll_votes
- vouchers
- settings
- activity_logs

---

### 3️⃣ Setup Backend (Node.js Server)

#### A. Navigate to Server Directory:
```bash
cd server
```

#### B. Install Dependencies:
```bash
npm install
```

This will install:
- express
- mysql2
- cors
- dotenv
- bcryptjs
- express-session
- express-validator
- uuid
- nodemon (dev)

#### C. Create Environment File:
```bash
# Copy example file
cp .env.example .env

# Or manually create .env file
```

#### D. Edit `.env` file:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          # Your MySQL password (empty if no password)
DB_NAME=kedai_sepijak

# Session Secret (CHANGE THIS!)
SESSION_SECRET=kedai-sepijak-super-secret-change-this-123456

# Client URL (Frontend)
CLIENT_URL=http://localhost:5173

# Restaurant Location (GPS Coordinates)
# ⚠️ IMPORTANT: Change to actual Kedai Sepijak coordinates!
RESTAURANT_LAT=-6.2088
RESTAURANT_LNG=106.8456
FEEDBACK_RADIUS_METERS=100

# Voucher Configuration
VOUCHER_DISCOUNT_PERCENTAGE=10
VOUCHER_EXPIRY_DAYS=30
VOUCHER_MIN_PURCHASE=50000

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Timezone
TZ=Asia/Jakarta
```

**⚠️ PENTING: Ganti GPS coordinates dengan lokasi sebenarnya!**

**Cara dapat koordinat:**
1. Buka Google Maps
2. Cari "Kedai Sepijak" atau alamat kedai
3. Klik kanan pada marker → "What's here?"
4. Copy koordinat (contoh: -6.2088, 106.8456)
5. Paste ke `RESTAURANT_LAT` dan `RESTAURANT_LNG`

#### E. Test Backend Server:
```bash
npm run dev
```

Output yang benar:
```
✅ Database connected successfully

🚀 ========================================
🏪 Kedai Sepijak Server is running!
========================================
📡 Server: http://localhost:3000
🔗 API: http://localhost:3000/api
🔍 Health: http://localhost:3000/api/health
========================================
```

#### F. Test API Endpoint:
Buka browser: `http://localhost:3000/api/health`

Should return:
```json
{
  "success": true,
  "message": "Kedai Sepijak API is running",
  "timestamp": "2024-01-15T10:00:00.000Z"
}
```

---

### 4️⃣ Setup Frontend (Vue.js)

#### A. Navigate to Root Directory:
```bash
cd ..   # From server directory, go back to root
```

#### B. Install Dependencies:
```bash
npm install
```

This will install:
- vue
- vue-router
- pinia
- axios
- tailwindcss
- chart.js
- vue-chartjs
- vite
- And more...

#### C. Create Environment File:
```bash
# Create .env file in root directory
```

#### D. Edit `.env` file:
```env
# API Base URL (Node.js Backend)
VITE_API_URL=http://localhost:3000/api
```

#### E. Test Frontend:
```bash
npm run dev
```

Output yang benar:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
➜  press h to show help
```

---

## 🚀 RUNNING THE APPLICATION

### Development Mode (Recommended):

**You need 2 TERMINALS running simultaneously!**

#### Terminal 1 - Backend Server:
```bash
cd server
npm run dev
```
Backend will run on: `http://localhost:3000`

#### Terminal 2 - Frontend Dev Server:
```bash
# From root directory
npm run dev
```
Frontend will run on: `http://localhost:5173`

---

## 🔑 LOGIN TO ADMIN DASHBOARD

### 1. Open Browser:
```
http://localhost:5173/admin/login
```

### 2. Default Credentials:
```
Username: admin
Password: admin123
```

### 3. Login Success:
You should be redirected to: `http://localhost:5173/admin/dashboard`

**⚠️ IMPORTANT:** Change default password after first login!

---

## 📁 PROJECT STRUCTURE

```
Kedai_Sepijak/
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   └── database.js              # MySQL connection
│   ├── controllers/
│   │   ├── authController.js        # ✅ Login/logout logic
│   │   └── dashboardController.js   # ✅ Dashboard stats
│   ├── middleware/
│   │   └── auth.js                  # ✅ Auth middleware
│   ├── routes/
│   │   ├── auth.js                  # ✅ Auth routes
│   │   ├── dashboard.js             # ✅ Dashboard routes
│   │   ├── waiters.js               # ⏳ Waiters routes (TODO)
│   │   ├── feedback.js              # ⏳ Feedback routes (TODO)
│   │   └── polls.js                 # ⏳ Polls routes (TODO)
│   ├── .env                         # ⚠️ Create this!
│   ├── .env.example                 # Template
│   ├── package.json
│   └── server.js                    # Main server file
│
├── src/                             # Vue.js Frontend
│   ├── stores/                      # Pinia State Management
│   │   ├── auth.js                  # ✅ Authentication
│   │   └── dashboard.js             # ✅ Dashboard data
│   ├── composables/                 # Reusable Logic
│   │   ├── useAPI.js                # ✅ API wrapper
│   │   ├── useGeolocation.js        # ✅ GPS validation
│   │   └── useHelpers.js            # ✅ Utilities
│   ├── views/
│   │   ├── admin/
│   │   │   ├── AdminLogin.vue       # ✅ Login page
│   │   │   ├── AdminLayout.vue      # ✅ Layout + sidebar
│   │   │   ├── AdminDashboard.vue   # ⏳ Dashboard (TODO)
│   │   │   ├── AdminWaiters.vue     # ⏳ Waiters CRUD (TODO)
│   │   │   ├── AdminFeedback.vue    # ⏳ Feedback list (TODO)
│   │   │   └── AdminPolls.vue       # ⏳ Polls mgmt (TODO)
│   │   └── public/
│   │       └── PublicFeedback.vue   # ⏳ Feedback form (TODO)
│   ├── router/
│   │   └── index.js                 # ✅ Router + guards
│   └── main.js                      # ✅ Main app
│
├── admin/                           # Legacy PHP (for reference)
│   ├── api/                         # PHP API files
│   └── database.sql                 # ✅ Database schema
│
├── .env                             # ⚠️ Create this!
├── package.json
└── FULL_SETUP_GUIDE.md             # This file
```

---

## 🧪 TESTING

### 1. Test Backend API:

#### Health Check:
```bash
curl http://localhost:3000/api/health
```

#### Login Test:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### Dashboard Stats (need login first):
```bash
curl http://localhost:3000/api/dashboard/stats \
  -H "Cookie: connect.sid=<session-cookie>"
```

### 2. Test Frontend:

#### Open in Browser:
- Login: `http://localhost:5173/admin/login`
- Dashboard: `http://localhost:5173/admin/dashboard`

#### Test Authentication:
1. Login with admin/admin123
2. Check session persists after page refresh
3. Test logout
4. Try accessing dashboard without login (should redirect)

---

## 🎯 WHAT'S WORKING NOW

### ✅ Backend (Node.js):
- [x] Server setup with Express
- [x] Database connection with MySQL2
- [x] Session management
- [x] CORS configuration
- [x] Authentication (login/logout/check session)
- [x] Dashboard statistics API
- [ ] Waiters CRUD API (TODO)
- [ ] Feedback API with GPS validation (TODO)
- [ ] Polls API with voting (TODO)

### ✅ Frontend (Vue.js):
- [x] Vite + Vue 3 setup
- [x] Pinia state management
- [x] Vue Router with guards
- [x] Tailwind CSS styling
- [x] Login page (beautiful UI)
- [x] Admin layout with sidebar
- [x] Authentication flow
- [x] API integration composables
- [x] GPS validation composable
- [x] Helper utilities composable
- [ ] Dashboard page with charts (TODO)
- [ ] Waiters management page (TODO)
- [ ] Feedback list page (TODO)
- [ ] Polls management page (TODO)
- [ ] Public feedback form (TODO)

---

## ⏳ NEXT STEPS - WHAT TO BUILD

### Priority 1: Backend CRUD Operations

#### A. Implement Waiters Controller:
File: `server/controllers/waitersController.js`

Functions needed:
- `getAllWaiters()` - with pagination & filters
- `getWaiterById()`
- `createWaiter()` - with validation
- `updateWaiter()`
- `deleteWaiter()`

#### B. Implement Feedback Controller:
File: `server/controllers/feedbackController.js`

Functions needed:
- `getAllFeedback()` - admin only
- `getFeedbackById()`
- `submitFeedback()` - **PUBLIC with GPS validation**
  - Implement Haversine formula
  - Validate radius (100m)
  - Auto-generate voucher
  - Update waiter rating
- `updateFeedback()`
- `deleteFeedback()`

#### C. Implement Polls Controller:
File: `server/controllers/pollsController.js`

Functions needed:
- `getAllPolls()` - public shows active, admin shows all
- `getPollById()`
- `getPollResults()` - with statistics
- `createPoll()`
- `voteOnPoll()` - **PUBLIC with duplicate prevention**
- `updatePoll()`
- `deletePoll()`

### Priority 2: Frontend Vue Components

#### A. AdminDashboard.vue:
- Statistics cards (4 cards)
- Line chart (feedback trend)
- Doughnut chart (category distribution)
- Top waiters table
- Recent feedback list
- Active polls display

#### B. AdminWaiters.vue:
- Data table with pagination
- Filter by shift & status
- Search functionality
- Create modal
- Edit modal
- Delete confirmation
- Form validation

#### C. AdminFeedback.vue:
- Feedback list with pagination
- Filter by rating/category/date
- View details modal
- Mark voucher as used
- Delete confirmation
- Export to CSV

#### D. AdminPolls.vue:
- Polls list
- Create poll modal (with options)
- View results modal (with charts)
- Toggle active/inactive
- Delete confirmation

#### E. PublicFeedback.vue:
- GPS detection & validation
- Feedback form
- Interactive rating stars
- Category select
- Waiter select (optional)
- Success message with voucher
- Copy voucher code button

---

## 🐛 TROUBLESHOOTING

### Backend Issues:

#### ❌ "Database connection failed"
**Solution:**
```bash
# Check MySQL is running
mysql -u root -p

# Verify credentials in server/.env
# Check database exists:
mysql -u root -p -e "SHOW DATABASES;"
```

#### ❌ "Port 3000 already in use"
**Solution:**
```bash
# Find process using port 3000
lsof -i :3000     # Mac/Linux
netstat -ano | findstr :3000    # Windows

# Kill the process or change PORT in .env
PORT=3001
```

#### ❌ "Session not working"
**Solution:**
```bash
# Check SESSION_SECRET is set in server/.env
# Check CORS configuration allows credentials
# Clear browser cookies and try again
```

### Frontend Issues:

#### ❌ "Failed to resolve import"
**Solution:**
```bash
# Check if file exists
# Check vite.config.js has alias configured
# Restart dev server: Ctrl+C then npm run dev
```

#### ❌ "CORS error"
**Solution:**
```bash
# Check CLIENT_URL in server/.env matches frontend URL
# Default: http://localhost:5173
# Check backend CORS configuration in server.js
```

#### ❌ "Login not persisting"
**Solution:**
```bash
# Check withCredentials: true in axios config
# Check SESSION_SECRET is set
# Check cookies are enabled in browser
# Clear browser cache & cookies
```

### GPS/Location Issues:

#### ❌ "Location not detected"
**Solution:**
1. Allow location permission in browser
2. Use HTTPS in production (localhost is OK for dev)
3. Test on smartphone (more accurate GPS)
4. Check browser supports Geolocation API

#### ❌ "Always rejected (outside radius)"
**Solution:**
1. Verify RESTAURANT_LAT and RESTAURANT_LNG in server/.env
2. Test with actual restaurant coordinates
3. For testing, increase FEEDBACK_RADIUS_METERS temporarily
4. Check distance calculation (Haversine formula)

---

## 📝 ENVIRONMENT VARIABLES SUMMARY

### Backend (server/.env):
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=kedai_sepijak
SESSION_SECRET=change-this-secret
CLIENT_URL=http://localhost:5173
RESTAURANT_LAT=-6.2088        # ⚠️ CHANGE THIS!
RESTAURANT_LNG=106.8456       # ⚠️ CHANGE THIS!
FEEDBACK_RADIUS_METERS=100
VOUCHER_DISCOUNT_PERCENTAGE=10
VOUCHER_EXPIRY_DAYS=30
VOUCHER_MIN_PURCHASE=50000
```

### Frontend (.env):
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🚀 DEPLOYMENT

### Production Checklist:

- [ ] Change default admin password
- [ ] Update GPS coordinates to actual location
- [ ] Set strong SESSION_SECRET
- [ ] Set NODE_ENV=production
- [ ] Update CORS origins
- [ ] Enable HTTPS
- [ ] Set secure session cookies
- [ ] Setup automated backups
- [ ] Configure firewall
- [ ] Setup PM2 for backend
- [ ] Build frontend: `npm run build`
- [ ] Setup reverse proxy (Nginx)

### Build for Production:

#### Backend:
```bash
cd server
npm start    # or use PM2
```

#### Frontend:
```bash
npm run build
# Output in dist/ folder
```

---

## 📚 RESOURCES

### Documentation:
- Vue.js 3: https://vuejs.org
- Pinia: https://pinia.vuejs.org
- Vue Router: https://router.vuejs.org
- Express.js: https://expressjs.com
- MySQL2: https://github.com/sidorares/node-mysql2
- Tailwind CSS: https://tailwindcss.com
- Chart.js: https://www.chartjs.org

### Project Docs:
- `server/README.md` - Backend documentation
- `admin/README.md` - System overview
- `admin/VUE_IMPLEMENTATION.md` - Vue.js guide
- `START_HERE.md` - Quick overview

---

## ✅ QUICK START CHECKLIST

- [ ] Node.js & MySQL installed
- [ ] Database imported (`admin/database.sql`)
- [ ] Backend `.env` created and configured
- [ ] Frontend `.env` created
- [ ] GPS coordinates updated in backend `.env`
- [ ] Backend dependencies installed: `cd server && npm install`
- [ ] Frontend dependencies installed: `npm install`
- [ ] Backend running: `cd server && npm run dev`
- [ ] Frontend running: `npm run dev`
- [ ] Login successful at `http://localhost:5173/admin/login`
- [ ] Dashboard accessible at `http://localhost:5173/admin/dashboard`

---

## 🎉 SUCCESS!

If you can:
1. ✅ Login with admin/admin123
2. ✅ See dashboard layout with sidebar
3. ✅ Session persists after refresh
4. ✅ Backend API responds at http://localhost:3000/api/health

**Congratulations! Your system is working!** 🎊

Now you can start building the remaining pages and features.

---

## 📞 NEED HELP?

Check these files:
- `FULL_SETUP_GUIDE.md` (this file)
- `server/README.md` - Backend API docs
- `START_HERE.md` - Quick overview
- `QUICK_START_VUE.md` - Vue.js quick start

---

**Happy Coding! 🚀**

© 2024 Kedai Sepijak - Full Stack Vue.js + Node.js