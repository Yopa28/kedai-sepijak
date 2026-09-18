# Kedai Sepijak - Backend API Contract

Dokumen ini diturunkan dari pemakaian API di `frontend/src`. Backend Go harus mempertahankan kontrak ini agar frontend yang sekarang tetap dapat digunakan.

## 1. Konfigurasi Dasar

Frontend utama memakai:

```text
VITE_API_BASE=http://localhost:5001/api
```

Jika variabel tersebut tidak diisi, default-nya adalah `http://localhost:5001/api`.

`frontend/src/composables/useAPI.js` adalah helper lama dan memakai `VITE_API_URL` dengan default `http://localhost:3000/api`. Service yang aktif sekarang memakai `src/services/api.js`, jadi backend Go sebaiknya berjalan di port `5001` atau frontend diarahkan ke port baru.

Semua request menggunakan:

```http
Content-Type: application/json
Accept: application/json
```

Frontend mengaktifkan credentials, sehingga backend harus mengatur CORS untuk origin frontend dan mengizinkan credentials.

## 2. Format Response

Response sukses umum:

```json
{
  "success": true,
  "message": "Request berhasil",
  "data": {}
}
```

Response error:

```json
{
  "success": false,
  "message": "Pesan error yang dapat ditampilkan ke user"
}
```

Status code yang digunakan frontend:

| Status | Kegunaan                           |
| ------ | ---------------------------------- |
| `200`  | GET/update berhasil                |
| `201`  | Resource berhasil dibuat           |
| `400`  | Payload atau parameter tidak valid |
| `401`  | Belum login/token tidak valid      |
| `403`  | Tidak memiliki hak akses           |
| `404`  | Resource tidak ditemukan           |
| `409`  | Contoh: nomor telepon sudah voting |
| `422`  | Validasi data gagal                |
| `500`  | Error server                       |

## 3. Authentication

### POST `/api/auth/login`

Request:

```json
{
  "username": "admin",
  "password": "admin123",
  "recaptchaToken": "optional-token"
}
```

Response yang wajib didukung:

```json
{
  "success": true,
  "message": "Login berhasil",
  "token": "jwt-token",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "full_name": "Administrator",
    "role": "admin"
  }
}
```

Frontend menyimpan `token` ke `localStorage` dengan key `admin_token`, kemudian mengirimkannya pada setiap request:

```http
Authorization: Bearer <token>
```

Role yang dianggap sebagai admin oleh frontend: `admin` dan `super_admin`.

### POST `/api/auth/logout`

Request body boleh `{}`. Hapus/invalidate session atau token jika backend memakai session/cookie.

Response minimal:

```json
{ "success": true, "message": "Logout berhasil" }
```

### GET `/api/auth/session`

Dipanggil saat membuka halaman admin. Response saat login:

```json
{
  "success": true,
  "logged_in": true,
  "data": {
    "id": 1,
    "username": "admin",
    "full_name": "Administrator",
    "role": "admin"
  }
}
```

Jika tidak login, gunakan `401` atau response `200` dengan `logged_in: false`.

## 4. Health Check

### GET `/api/health`

```json
{
  "success": true,
  "message": "API is healthy",
  "database": "connected"
}
```

## 5. Feedback

### POST `/api/feedback`

Endpoint publik. Request yang dikirim frontend:

```json
{
  "customer_name": "Budi",
  "role": "kasir",
  "employee_name": "Siti",
  "contact": "081234567890",
  "date_of_visit": "2026-09-18",
  "time_of_visit": "14:30",
  "rating": 5,
  "ratings": {
    "pelayanan": {
      "sikap_pelayan": 5,
      "waktu_pesanan": 4
    }
  },
  "message": "Pelayanannya ramah",
  "voluntary_consent": true,
  "category": "pelayanan"
}
```

Catatan: implementasi frontend saat ini mengisi `customer_name` dengan nilai `employee_name`. Backend sebaiknya tetap menerima kedua field, tetapi untuk data baru idealnya `customer_name` berasal dari nama pelanggan.

Validasi minimum:

- `employee_name` dan `role` tidak kosong.
- `rating` bernilai 1 sampai 5 jika dikirim.
- Nilai detail pada `ratings` bernilai 1 sampai 5.
- `voluntary_consent` harus `true`.
- `message` boleh kosong.

Backend boleh menghitung `rating` dari detail ratings apabila nilai tersebut tidak dikirim, tetapi jangan mengganti rating yang valid secara diam-diam.

### GET `/api/feedback`

Endpoint admin. Query parameter opsional yang dipakai frontend:

```text
?ratingType=rating&ratingValue=5&date=2026-09-18
```

Response yang paling kompatibel:

```json
{
  "success": true,
  "data": {
    "feedbacks": [
      {
        "id": 1,
        "employee_name": "Siti",
        "contact": "081234567890",
        "role": "kasir",
        "rating_sikap_pelayan": 5,
        "rating_waktu_pesanan": 4,
        "rating_rasa_menu": null,
        "rating_kebersihan": null,
        "rating": 5,
        "message": "Pelayanannya ramah",
        "status": "pending",
        "latitude": null,
        "longitude": null,
        "created_at": "2026-09-18T14:30:00Z"
      }
    ]
  }
}
```

Frontend juga dapat menerima `data` langsung berupa array, tetapi bentuk `{ feedbacks: [] }` lebih jelas.

### PATCH `/api/feedback/:id/status`

Request:

```json
{ "status": "selesai" }
```

Frontend menggunakan status `pending` dan `selesai`. Backend sebaiknya juga menerima `reviewed` atau `resolved` hanya jika status tersebut memang dipakai di database.

## 6. Waiters / Pelayan

Semua endpoint berikut memerlukan autentikasi kecuali GET yang ingin dibuat publik untuk form feedback.

| Method | Endpoint                     | Keterangan        |
| ------ | ---------------------------- | ----------------- |
| GET    | `/api/waiters?status=active` | Daftar pelayan    |
| GET    | `/api/waiters/:id`           | Detail pelayan    |
| GET    | `/api/waiters/:id/stats`     | Statistik pelayan |
| POST   | `/api/waiters`               | Buat pelayan      |
| PUT    | `/api/waiters/:id`           | Ubah pelayan      |
| DELETE | `/api/waiters/:id`           | Hapus pelayan     |

Request create/update minimal:

```json
{
  "name": "Siti",
  "phone": "081234567890",
  "status": "active"
}
```

Response daftar minimal:

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Siti", "phone": "081234567890", "status": "active" }
  ]
}
```

## 7. Menu

| Method | Endpoint                                                                 | Keterangan                              |
| ------ | ------------------------------------------------------------------------ | --------------------------------------- |
| GET    | `/api/menu`                                                              | Daftar menu                             |
| GET    | `/api/menu?category_id=1&is_available=1&is_featured=1&limit=20&offset=0` | Filter menu                             |
| GET    | `/api/menu/:id`                                                          | Detail menu                             |
| GET    | `/api/menu/by-category`                                                  | Menu dikelompokkan berdasarkan kategori |
| GET    | `/api/menu/categories`                                                   | Daftar kategori                         |
| POST   | `/api/menu`                                                              | Buat menu, admin                        |
| PUT    | `/api/menu/:id`                                                          | Ubah menu, admin                        |
| DELETE | `/api/menu/:id`                                                          | Hapus menu, admin                       |
| POST   | `/api/menu/categories`                                                   | Buat kategori, admin                    |
| PUT    | `/api/menu/categories/:id`                                               | Ubah kategori, admin                    |
| DELETE | `/api/menu/categories/:id`                                               | Hapus kategori, admin                   |

Field menu yang perlu didukung:

```json
{
  "category_id": 1,
  "name": "Kopi Susu",
  "description": "Kopi susu hangat",
  "price": 12000,
  "image_url": null,
  "is_available": true,
  "is_featured": false
}
```

Field kategori minimal: `name`, `description`, `display_order`, `is_active`.

## 8. Polling

### Endpoint admin

| Method | Endpoint                  | Keterangan         |
| ------ | ------------------------- | ------------------ |
| GET    | `/api/polling`            | Daftar polling     |
| POST   | `/api/polling`            | Buat polling       |
| GET    | `/api/polling/:id`        | Detail polling     |
| PATCH  | `/api/polling/:id/toggle` | Toggle `is_active` |
| DELETE | `/api/polling/:id`        | Hapus polling      |
| GET    | `/api/polling/:id/votes`  | Daftar voter       |
| GET    | `/api/polling/statistics` | Statistik polling  |

Create request:

```json
{
  "question": "Menu baru favorit?",
  "options": ["Bakso", "Soto Ayam", "Rawon"],
  "is_active": true
}
```

Polling object yang dipakai frontend:

```json
{
  "id": 1,
  "question": "Menu baru favorit?",
  "description": "Pilih satu",
  "is_active": true,
  "total_votes": 10,
  "options": [{ "id": 1, "option_text": "Bakso", "votes": 6, "percentage": 60 }]
}
```

### Endpoint publik

| Method | Endpoint                                     | Keterangan                              |
| ------ | -------------------------------------------- | --------------------------------------- |
| GET    | `/api/polling/active`                        | Satu polling aktif untuk halaman publik |
| GET    | `/api/polling/check-vote?phone=081234567890` | Cek apakah nomor sudah voting           |
| POST   | `/api/polling/:pollId/vote`                  | Voting dari komponen publik             |
| POST   | `/api/polling/vote`                          | Voting dari service polling             |

Payload yang digunakan komponen publik:

```json
{
  "name": "Budi",
  "phone": "081234567890",
  "email": "budi@example.com",
  "option_id": 1
}
```

Payload alternatif dari service:

```json
{
  "customer_name": "Budi",
  "customer_phone": "081234567890",
  "customer_email": "budi@example.com",
  "option_id": 1
}
```

Backend Go sebaiknya menerima kedua nama field tersebut dan menormalisasikannya. Tolak voting kedua dengan HTTP `409` jika nomor telepon sudah voting pada polling yang sama.

## 9. Dashboard Admin

Semua endpoint dashboard memerlukan Bearer token.

### GET `/api/dashboard/stats`

Frontend membaca `data.statistics`, dengan field berikut:

```json
{
  "success": true,
  "data": {
    "statistics": {
      "total_feedback": 0,
      "today_feedback": 0,
      "week_feedback": 0,
      "month_feedback": 0,
      "active_waiters": 0,
      "total_waiters": 0,
      "active_polls": 0,
      "total_polls": 0,
      "today_votes": 0,
      "total_votes": 0,
      "available_vouchers": 0,
      "used_vouchers": 0,
      "total_vouchers": 0,
      "average_rating": 0,
      "today_average_rating": 0,
      "feedback_growth": 0,
      "rating_trend": "stable"
    }
  }
}
```

### GET `/api/dashboard/recent-feedback?limit=5`

Response `data` berupa array feedback terbaru.

### GET `/api/dashboard/active-polls`

Response `data` berupa array polling aktif.

## 10. Sentiment Analytics

Halaman admin memanggil endpoint relatif terhadap origin frontend, bukan instance Axios:

### GET `/api/feedback/analytics/sentiment?startDate=2026-09-01&endDate=2026-09-18`

Response `data` harus memiliki minimal:

```json
{
  "sentimentAnalysis": {
    "positive": 10,
    "negative": 2,
    "neutral": 3,
    "percentages": {
      "positive": 66.67,
      "negative": 13.33,
      "neutral": 20
    }
  },
  "feedback": []
}
```

Setiap item pada `feedback` sebaiknya memiliki field `sentiment` dengan nilai `positive`, `negative`, atau `neutral`.

### GET `/api/feedback/sentiment/daily-trend`

Response `data` dibaca oleh Chart.js sebagai data trend harian. Gunakan format konsisten, misalnya:

```json
{
  "labels": ["2026-09-17", "2026-09-18"],
  "positive": [3, 5],
  "negative": [1, 0],
  "neutral": [2, 1]
}
```

## 11. Database Minimum

Tabel minimum yang tersirat dari frontend:

- `admin_users`
- `waiters`
- `feedback`
- `polls`
- `poll_options`
- `poll_votes`
- `menu_categories`
- `menu_items`

Kolom feedback yang perlu disiapkan: customer/employee identity, role, contact, visit date/time, rating, detail ratings JSON, message, consent, category, latitude/longitude, status, sentiment, dan timestamps.

## 12. Urutan Implementasi Go

1. Buat `GET /api/health` dan konfigurasi CORS.
2. Buat koneksi MySQL dan migration tabel minimum.
3. Implementasikan login, JWT Bearer, session, dan middleware admin.
4. Implementasikan feedback publik lalu feedback admin.
5. Implementasikan waiters dan menu CRUD.
6. Implementasikan polling publik lalu polling admin.
7. Implementasikan dashboard dan sentiment analytics.
8. Set frontend `VITE_API_BASE` ke URL backend Go dan uji route publik serta admin.

## 13. Ketidakkonsistenan yang Perlu Diputuskan

- Frontend memakai dua nama konfigurasi: `VITE_API_BASE` dan legacy `VITE_API_URL`.
- Polling publik dipanggil melalui `/polling/active`, `/polling`, dan `/polling/:id/vote`.
- Payload voting memakai `name`/`phone` pada satu tempat dan `customer_name`/`customer_phone` pada tempat lain.
- Status feedback frontend memakai `selesai`, sedangkan schema lama juga menyebut `reviewed` dan `resolved`.
- Sentiment memakai `fetch()` relatif ke origin frontend, sehingga reverse proxy atau konfigurasi Vite harus meneruskan `/api` ke backend Go.

Sebaiknya backend Go mendukung bentuk-bentuk tersebut pada tahap migrasi, kemudian frontend dirapikan ke satu kontrak setelah backend baru stabil.
