# 🚀 QUICK START - Vue.js Admin Dashboard

## ⚡ Setup dalam 5 Menit!

---

## 📋 Prerequisites

- Node.js 16+ (check: `node --version`)
- npm atau yarn
- MySQL/MariaDB
- PHP 7.4+

---

## 🎯 LANGKAH INSTALASI

### 1️⃣ Clone & Install Dependencies

```bash
cd Kedai_Sepijak

# Install semua dependencies
npm install
```

**Yang akan terinstall:**
- ✅ Vue.js 3
- ✅ Pinia (state management)
- ✅ Vue Router
- ✅ Chart.js + vue-chartjs
- ✅ Axios
- ✅ Tailwind CSS

---

### 2️⃣ Setup Database

```bash
# Login MySQL
mysql -u root -p

# Import database
mysql -u root -p < admin/database.sql
```

**Atau via phpMyAdmin:**
1. Buka phpMyAdmin
2. Create database: `kedai_sepijak`
3. Import file: `admin/database.sql`

---

### 3️⃣ Konfigurasi Backend

Edit `admin/api/config.php`:

```php
// Database (sesuaikan dengan setup Anda)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'kedai_sepijak');

// ⚠️ PENTING: Ganti dengan koordinat SEBENARNYA!
define('RESTAURANT_LAT', -6.2088);   // ← GANTI INI!
define('RESTAURANT_LNG', 106.8456);  // ← GANTI INI!
define('FEEDBACK_RADIUS_METERS', 100);
```

**Cara dapat koordinat GPS:**
1. Buka Google Maps
2. Cari lokasi "Kedai Sepijak"
3. Klik kanan → "What's here?"
4. Copy koordinat (contoh: -6.2088, 106.8456)

---

### 4️⃣ Setup Environment Variables

Buat file `.env` di root project:

```env
# API Base URL
VITE_API_URL=http://localhost:8000/api

# Atau sesuaikan dengan setup Anda
# VITE_API_URL=http://localhost/Kedai_Sepijak/admin/api
```

---

### 5️⃣ Jalankan Development Servers

#### **Terminal 1 - Frontend (Vue.js):**

```bash
npm run dev
```

Output:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

**Akses di browser:** `http://localhost:5173`

---

#### **Terminal 2 - Backend (PHP):**

```bash
cd admin
php -S localhost:8000
```

Output:
```
PHP 8.x.x Development Server started at http://localhost:8000
```

**API tersedia di:** `http://localhost:8000/api`

---

### 6️⃣ Login ke Admin Dashboard

1. **Buka browser:** `http://localhost:5173/admin/login`

2. **Login dengan credentials:**
   ```
   Username: admin
   Password: admin123
   ```

3. **Done!** ✅ Anda sekarang di admin dashboard

---

## 📱 Test Fitur GPS (Feedback)

### Dari Smartphone:

1. **Cari IP komputer Anda:**
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   # atau
   ip addr show
   ```
   
   Contoh: `192.168.1.100`

2. **Akses dari HP:**
   ```
   http://192.168.1.100:5173/submit-feedback
   ```

3. **Allow GPS permission** saat diminta

4. **Isi form & submit** → Dapat voucher!

---

## 🎯 Fitur yang Sudah Bisa Dipakai

### ✅ Authentication
- Login/Logout
- Session management
- Protected routes

### ✅ Admin Layout
- Responsive sidebar
- Mobile menu
- User info display

### ⏳ Pages (Belum Dibuat - Need Implementation)
- Dashboard (belum ada konten)
- Kelola Pelayan (page kosong)
- Feedback (page kosong)
- Polling & Event (page kosong)

---

## 🛠️ Development Guide

### Struktur Project:

```
src/
├── stores/              # State Management (Pinia)
│   ├── auth.js          ✅ Authentication
│   └── dashboard.js     ✅ Dashboard data
│
├── composables/         # Reusable Logic
│   ├── useAPI.js        ✅ API calls
│   ├── useGeolocation.js ✅ GPS validation
│   └── useHelpers.js    ✅ Utilities
│
├── views/admin/         # Admin Pages
│   ├── AdminLogin.vue   ✅ Login page
│   ├── AdminLayout.vue  ✅ Layout dengan sidebar
│   ├── AdminDashboard.vue   ⏳ TO DO
│   ├── AdminWaiters.vue     ⏳ TO DO
│   ├── AdminFeedback.vue    ⏳ TO DO
│   └── AdminPolls.vue       ⏳ TO DO
│
└── views/public/
    └── PublicFeedback.vue   ⏳ TO DO
```

---

### Contoh Penggunaan Composables:

#### 1. **API Calls:**

```vue
<script setup>
import { useAPI } from '@/composables/useAPI'

const api = useAPI()

// Fetch waiters
const result = await api.fetchWaiters({ status: 'active' })

if (result.success) {
  console.log(result.data.data) // Array of waiters
}

// Create waiter
await api.createWaiter({
  name: 'John Doe',
  phone: '081234567890',
  shift: 'pagi',
  join_date: '2024-01-15',
  status: 'active'
})
</script>
```

---

#### 2. **GPS Validation:**

```vue
<script setup>
import { useGeolocation } from '@/composables/useGeolocation'

const geo = useGeolocation()

// Get current location
const result = await geo.getCurrentPosition()

if (result.success) {
  console.log('Lat:', geo.latitude.value)
  console.log('Lng:', geo.longitude.value)
  console.log('Distance:', geo.distance.value, 'meters')
  console.log('Valid?', geo.isWithinRadius.value)
}
</script>
```

---

#### 3. **Helper Functions:**

```vue
<script setup>
import { useHelpers } from '@/composables/useHelpers'

const helpers = useHelpers()

// Format currency
const price = helpers.formatCurrency(50000)
// Output: "Rp 50.000"

// Format date
const date = helpers.formatDate('2024-01-15')
// Output: "15 Jan 2024"

// Rating stars
const stars = helpers.getRatingStars(4.5)
// Output: Array of star objects
</script>
```

---

#### 4. **State Management:**

```vue
<script setup>
import { useAuthStore } from '@/stores/auth'
import { useDashboardStore } from '@/stores/dashboard'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()

// Check if logged in
if (authStore.isAuthenticated) {
  console.log('User:', authStore.userName)
}

// Fetch dashboard data
await dashboardStore.fetchDashboardData()
console.log('Stats:', dashboardStore.statistics)
</script>
```

---

## 🐛 Troubleshooting

### ❌ Error: "Cannot find module '@/stores/auth'"

**Solution:** Check `vite.config.js` punya alias:
```javascript
export default {
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}
```

---

### ❌ Error: CORS policy blocked

**Solution:** Edit `admin/api/config.php`:
```php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
```

---

### ❌ Error: Session tidak persist

**Solution:**
1. Check `withCredentials: true` di axios (sudah ada di `useAPI.js`)
2. Check PHP `session_start()` di semua API files (sudah ada)
3. Restart both servers

---

### ❌ Error: GPS tidak bisa detect

**Solution:**
1. Pastikan browser support Geolocation
2. Allow permission GPS saat diminta
3. Gunakan HTTPS di production (atau localhost untuk dev)
4. Test di smartphone (lebih accurate)

---

## 📦 Build untuk Production

### Build Frontend:

```bash
npm run build
```

Output di folder `dist/`

### Deploy Options:

**Option 1: Same server dengan PHP**
```
/var/www/html/
├── index.html (dari dist/)
├── assets/ (dari dist/)
└── admin/
    └── api/
```

**Option 2: Separate servers**
- Frontend: Vercel, Netlify, dll
- Backend: PHP hosting

Update `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com/admin/api
```

---

## 📝 Default Credentials

```
Admin Login:
Username: admin
Password: admin123

⚠️ GANTI PASSWORD setelah first login!
```

---

## 🎨 Tech Stack

- **Frontend:** Vue.js 3 + Vite
- **State:** Pinia
- **Routing:** Vue Router
- **Styling:** Tailwind CSS
- **Charts:** Chart.js + vue-chartjs
- **HTTP:** Axios
- **Backend:** PHP 7.4+
- **Database:** MySQL/MariaDB

---

## 📚 Documentation

**Lengkap:**
- `admin/VUE_IMPLEMENTATION.md` - Implementation guide
- `admin/MIGRATION_SUMMARY.md` - Migration details
- `admin/SYSTEM_SUMMARY.md` - System architecture
- `admin/README.md` - Backend API docs

**Quick:**
- `QUICK_START_VUE.md` - This file

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MySQL running
- [ ] Database imported
- [ ] `admin/api/config.php` edited (GPS coordinates!)
- [ ] `.env` created
- [ ] `npm install` done
- [ ] Both servers running
- [ ] Login berhasil
- [ ] GPS test dari smartphone

---

## 🎉 You're Ready!

Sekarang Anda bisa:
1. ✅ Login ke admin dashboard
2. ✅ Akses semua API endpoints
3. ✅ Gunakan GPS validation
4. ⏳ Buat remaining pages (Dashboard, Waiters, Feedback, Polls)

**Happy Coding! 🚀**

---

## 📞 Need Help?

**Baca dokumentasi:**
- `admin/VUE_IMPLEMENTATION.md` (PALING PENTING!)

**Resources:**
- Vue.js: https://vuejs.org
- Pinia: https://pinia.vuejs.org
- Tailwind: https://tailwindcss.com

---

© 2024 Kedai Sepijak - Vue.js Admin Dashboard