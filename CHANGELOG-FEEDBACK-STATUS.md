# Changelog - Fitur Update Status Feedback

## Tanggal: 19 November 2025

### Fitur Baru: Update Status Feedback dari Pending ke Selesai

#### Perubahan Database
- **Tabel**: `feedback`
- **Kolom**: `status` (ENUM)
- **Nilai Baru**: Ditambahkan `'selesai'` ke dalam ENUM
- **Nilai Lengkap**: `'pending'`, `'approved'`, `'rejected'`, `'selesai'`
- **Default**: `'pending'`

#### Perubahan Backend

**File: `backend/src/controllers/feedbackController.js`**
- Menambahkan fungsi `updateFeedbackStatus` untuk endpoint PATCH `/api/feedback/:id/status`
- Validasi status yang diperbolehkan
- Logging detail untuk debugging
- Error handling yang lebih baik

**File: `backend/src/routes/feedbackRoutes.js`**
- Menambahkan route: `PATCH /api/feedback/:id/status`

#### Perubahan Frontend

**File: `src/services/feedbackAPI.js`**
- Menambahkan fungsi `updateFeedbackStatus(id, status)` untuk memanggil API

**File: `src/views/admin/AdminFeedback.vue`**
- Menambahkan tombol "Tandai Selesai" di list feedback (untuk status pending)
- Menambahkan tombol "Tandai Selesai" di modal detail (untuk status pending)
- Menambahkan tombol "Kembalikan ke Pending" di modal detail (untuk status selesai)
- Update badge status untuk menampilkan warna yang sesuai:
  - 🟡 Pending (kuning)
  - 🟢 Selesai (hijau)
  - 🔵 Approved (biru)
  - 🔴 Rejected (merah)

#### API Endpoint Baru

```
PATCH /api/feedback/:id/status
```

**Request Body:**
```json
{
  "status": "selesai" // atau "pending", "approved", "rejected"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Status feedback berhasil diupdate",
  "data": { /* feedback object */ }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```

#### Cara Menggunakan
1. Login sebagai admin
2. Buka halaman "Feedback Pelanggan"
3. Cari feedback dengan status "Pending"
4. Klik tombol "Tandai Selesai" untuk mengubah status
5. Status akan berubah menjadi "Selesai" dengan badge hijau

#### Script Migrasi Database
File yang digunakan untuk update database:
- `backend/add-selesai-status.js` - Script untuk menambahkan 'selesai' ke ENUM
- `backend/check-feedback-schema.js` - Script untuk verifikasi schema

#### Testing
- ✅ Backend endpoint berfungsi dengan baik
- ✅ Frontend dapat mengubah status
- ✅ Database menyimpan perubahan status
- ✅ UI menampilkan status yang benar
