# 🚀 Startup Guide - Kedai Sepijak Admin Dashboard

Panduan lengkap untuk menjalankan Backend API dan Frontend Admin Dashboard.

---

## 📋 Prerequisites

Pastikan Anda sudah menginstall:
- ✅ **Node.js** v16+ dan npm
- ✅ **MySQL** Server (XAMPP/standalone)
- ✅ Database **kedai_sepijak** sudah dibuat dan tabel sudah dimigrasikan

---

## 🎯 Quick Start

### 1️⃣ **Start Backend API Server**

```bash
# Masuk ke folder backend
cd Kedai_Sepijak_Backend

# Pastikan dependencies sudah terinstall
npm install

# Jalankan server
npm start

# Atau untuk development (dengan auto-reload)
npm run dev
```

**Backend akan berjalan di:** `http://localhost:5000`

**Endpoint yang tersedia:**
- Health Check: `http://localhost:5000/api/health`
- Login Admin: `POST http://localhost:5000/api/auth/login`
- Dashboard Stats: `GET http://localhost:5000/api/dashboard/stats`

---

### 2️⃣ **Start Frontend Admin Dashboard**

```bash
# Masuk ke folder frontend (di terminal/command prompt baru)
cd Kedai_Sepijak

# Pastikan dependencies sudah terinstall
npm install

# Jalankan development server
npm run dev
```

**Frontend akan berjalan di:** `http://localhost:5173`

---

## 🔐 Login Credentials

Gunakan kredensial berikut untuk login ke admin dashboard:

```
Username: admin
Password: admin123
```

⚠️ **PENTING:** Ganti password setelah login pertama kali!

---

## 🛠️ Troubleshooting

### ❌ **Error: Port Already in Use**

**Backend (Port 5000):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

**Frontend (Port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

---

### ❌ **Error: Database Connection Failed**

1. **Pastikan MySQL sedang berjalan**
   - Jika menggunakan XAMPP, start Apache dan MySQL
   - Check di Services (Windows) atau Activity Monitor (Mac)

2. **Cek konfigurasi di `.env`**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=kedai_sepijak
   DB_PORT=3306
   ```

3. **Test koneksi database**
   ```bash
   cd Kedai_Sepijak_Backend
   node -e "const db = require('./src/config/database'); db.testConnection()"
   ```

---

### ❌ **Error: Admin User Not Found**

Jalankan script untuk membuat admin user default:

```bash
cd Kedai_Sepijak_Backend
node database/seed-admin.js
```

---

### ❌ **Error: CORS / Network Error di Frontend**

1. **Pastikan backend sudah berjalan** di port 5000
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Cek file `.env` di folder frontend** (Kedai_Sepijak/.env)
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Restart frontend dev server** setelah mengubah .env
   ```bash
   # Stop server (Ctrl+C)
   # Start ulang
   npm run dev
   ```

---

### ❌ **Error: Cannot read properties of undefined**

Ini biasanya terjadi karena password hash tidak cocok. Reset admin user:

```bash
cd Kedai_Sepijak_Backend

# Hapus admin user lama
node -e "const db = require('./src/config/database'); (async () => { await db.query('DELETE FROM admin_users WHERE username = ?', ['admin']); console.log('Deleted'); process.exit(0); })()"

# Buat admin user baru
node database/seed-admin.js
```

---

## 📊 Testing API Endpoints

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

### Test Dashboard Stats (perlu login dulu)
```bash
# 1. Login dan simpan cookie
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}" \
  -c cookies.txt

# 2. Akses dashboard dengan cookie
curl http://localhost:5000/api/dashboard/stats \
  -b cookies.txt
```

---

## 🏗️ Project Structure

```
Kedai_Sepijak_Backend/          # Backend API (Node.js + Express)
├── src/
│   ├── config/
│   │   └── database.js         # Database connection pool
│   ├── controllers/
│   │   ├── adminAuthController.js      # Login, logout, session
│   │   └── adminDashboardController.js # Dashboard statistics
│   ├── middleware/
│   │   └── auth.js             # JWT authentication
│   ├── routes/
│   │   ├── adminAuthRoutes.js
│   │   └── adminDashboardRoutes.js
│   └── app.js                  # Express app setup
├── database/
│   └── seed-admin.js           # Script untuk membuat admin
├── .env                        # Environment variables
└── server.js                   # Server entry point

Kedai_Sepijak/                  # Frontend Admin Dashboard (Vue.js)
├── src/
│   ├── views/
│   │   └── admin/
│   │       ├── AdminLogin.vue      # Halaman login
│   │       ├── AdminLayout.vue     # Layout utama
│   │       ├── AdminDashboard.vue  # Dashboard dengan stats
│   │       ├── AdminWaiters.vue    # Kelola waiters
│   │       ├── AdminFeedback.vue   # Lihat feedback
│   │       └── AdminPolls.vue      # Kelola polling
│   ├── stores/
│   │   ├── auth.js             # Pinia store untuk auth
│   │   └── dashboard.js        # Pinia store untuk dashboard
│   ├── router/
│   │   └── index.js            # Vue Router config
│   └── main.js                 # Vue app entry point
├── .env                        # Environment variables (API URL)
└── vite.config.js              # Vite configuration

```

---

## 🔄 Development Workflow

### 1. **Develop Backend API**
```bash
cd Kedai_Sepijak_Backend
npm run dev  # Auto-reload dengan nodemon
```

### 2. **Develop Frontend**
```bash
cd Kedai_Sepijak
npm run dev  # Hot-reload dengan Vite
```

### 3. **Test Changes**
- Buka browser: `http://localhost:5173`
- Login dengan `admin` / `admin123`
- Test fitur di dashboard

---

## 📦 Build untuk Production

### Backend
```bash
cd Kedai_Sepijak_Backend
npm start  # Production mode
```

### Frontend
```bash
cd Kedai_Sepijak
npm run build  # Build ke folder dist/
npm run preview  # Preview production build
```

---

## 🔒 Security Notes

1. **Ganti JWT Secret** di `.env` backend:
   ```env
   JWT_SECRET=your-very-secure-random-string-here-min-32-chars
   ```

2. **Ganti Database Password** di production:
   ```env
   DB_PASSWORD=your-secure-password
   ```

3. **Enable HTTPS** di production
4. **Set NODE_ENV=production** di production

---

## 📝 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=kedai_sepijak
DB_PORT=3306

# JWT
JWT_SECRET=kedai-sepijak-secret-key-2024
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎨 Admin Dashboard Features

✅ **Dashboard Overview**
- Total feedback, waiters, polls statistics
- Rating average dan trend
- Recent feedback dan active polls
- Top performing waiters
- Feedback by category charts

✅ **Waiters Management**
- CRUD operations untuk waiters
- Filter dan search
- Toggle active/inactive status
- Performance tracking

✅ **Feedback Management**
- View all customer feedback
- Filter by rating, category, date
- Export data
- View voucher status

✅ **Polls Management**
- Create new polls dengan multiple options
- View results dengan visualisasi
- Toggle active/inactive
- Delete polls

✅ **Authentication**
- Secure login dengan JWT
- Session management
- Auto logout on token expire
- Protected routes

---

## 📞 Support

Jika ada masalah atau pertanyaan:
1. Cek bagian **Troubleshooting** di atas
2. Pastikan semua prerequisites sudah terpenuhi
3. Cek error log di terminal/console
4. Test API endpoints dengan curl/Postman

---

## ✨ Happy Coding!

Backend: `http://localhost:5000`
Frontend: `http://localhost:5173`

Login: `admin` / `admin123`

---

**Last Updated:** November 2025
**Version:** 1.0.0