# Features Guide - Kedai Sepijak

Panduan lengkap fitur-fitur yang tersedia di website Kedai Sepijak.

---

## 🏠 Hero Section

### Deskripsi
Landing page utama yang menyambut pengunjung dengan informasi singkat tentang Kedai Sepijak.

### Fitur
- **Heading Utama**: "Kedai Sepijak" dengan font display yang elegant
- **Tagline**: "Kopi Tradisional Purwokerto"
- **Deskripsi**: Penjelasan singkat tentang kedai
- **2 CTA Buttons**:
  - "Lihat Menu" - Mengarah ke section menu
  - "Hubungi Kami" - Mengarah ke section contact
- **3 Feature Cards**:
  - Biji Kopi Pilihan
  - Dibuat dengan Cinta
  - Suasana Hangat

### Tech Stack
- Vue 3 component
- Tailwind CSS untuk styling
- Material Icons untuk ikon
- Responsive grid layout

---

## 📋 Feedback Form

### Deskripsi
Form untuk pelanggan memberikan feedback dan saran tentang pengalaman mereka di Kedai Sepijak.

### Fitur Lengkap

#### 1. Progress Indicator
- 3 step indicator di bagian atas form
- Visual progress bar yang mengisi sesuai step
- Warna berubah sesuai completion status

#### 2. Form Fields

##### A. Nama Lengkap
- Type: Text input
- Required: Ya
- Validation: Harus diisi
- Floating label effect

##### B. Contact (Phone / Bill ID)
- Type: Text input
- Required: Ya
- Validation: Harus diisi
- Bisa input nomor telepon atau nomor bill

##### C. Tanggal Kunjungan
- Type: Date picker
- Required: Ya
- Validation: Harus dipilih
- Format: dd/mm/yyyy

##### D. **[NEW]** Pelayan yang Melayani
- Type: Dropdown select
- Required: Ya
- Options:
  - Budi
  - Siti
  - Ahmad
  - Dewi
  - Rudi
  - Fitri
  - Joko
  - Maya
- Purpose: Untuk mengevaluasi performa individual pelayan

#### 3. Rating System
- Interactive 5-star rating
- Hover effects dengan warna amber
- Selected star dengan glow animation
- Rating labels:
  - 1 star: Very Poor
  - 2 stars: Poor
  - 3 stars: Average
  - 4 stars: Good
  - 5 stars: Excellent

#### 4. Feedback Message
- Type: Textarea
- Required: Ya
- Rows: 4
- Placeholder: "Your Feedback"
- Floating label effect

#### 5. Submit Button
- Full width button
- Primary green color
- Hover effects dengan scale
- Loading state (to be implemented)
- Success confirmation via alert

### User Flow
```
1. User mengisi nama
2. User mengisi contact/bill ID
3. User memilih tanggal kunjungan
4. User memilih pelayan yang melayani (BARU!)
5. User memberikan rating bintang
6. User menulis feedback detail
7. User klik "Send Feedback"
8. Form tervalidasi
9. Success message ditampilkan
10. Form direset
```

### Data yang Dikumpulkan
```javascript
{
  name: String,
  contact: String,
  date: Date,
  waiter: String,      // FIELD BARU!
  rating: Number (1-5),
  message: String
}
```

---

## 📊 Polling System

### Deskripsi
Sistem polling untuk melibatkan pelanggan dalam keputusan event di Kedai Sepijak.

### **[NEW]** Two-Step Process

#### Step 1: Customer Data Collection

**Purpose**: Memastikan setiap vote adalah valid dan mencegah spam/duplicate voting.

##### Form Fields

1. **Full Name**
   - Type: Text input
   - Required: Ya
   - Minimum: 3 karakter
   - Floating label effect
   - Real-time validation

2. **Phone Number**
   - Type: Tel input
   - Required: Ya
   - Minimum: 10 digit
   - Untuk verifikasi identitas
   - Real-time validation

3. **Email**
   - Type: Email input
   - Required: Tidak (optional)
   - Untuk komunikasi follow-up
   - Email format validation

##### Validation Rules
```javascript
- Name: length >= 3 characters
- Phone: length >= 10 digits
- Email: valid email format (optional)
- Continue button disabled until name & phone valid
```

##### Continue Button
- Disabled state: Gray, tidak bisa diklik
- Enabled state: Green, clickable dengan hover effect
- Text: "Continue to Vote"
- Validasi form sebelum proceed

#### Step 2: Voting Interface

##### Customer Info Display
- Box dengan background sage/20
- Menampilkan:
  - "Voting as:"
  - Nama customer
  - Nomor telepon customer
- Purpose: Konfirmasi identitas sebelum vote

##### Poll Results Display
- 3 opsi poll ditampilkan
- Progress bar untuk setiap opsi
- Percentage display
- Real-time update setelah vote
- Smooth animation pada progress bar

##### Poll Options (Example)
1. Jazzy Brewers 🎷 - Live music performance
2. Latte Art Workshop ☕ - Workshop membuat latte art
3. Poetry Night ✍️ - Malam puisi dan performance art

##### Vote Buttons
- Satu button untuk setiap opsi
- State before vote:
  - Border amber
  - Transparent background
  - Amber text
  - Hover: Filled amber dengan shadow
- State after vote (selected):
  - Filled amber
  - White text
  - Ring effect amber/30
  - Checkmark prefix "✓ Voted for"
- State after vote (not selected):
  - Disabled
  - Opacity 70%
  - Cannot be clicked

##### Reset Functionality
- Button "Vote again with different account"
- Muncul setelah vote submitted
- Purpose: Demo/testing atau vote dengan akun lain
- Reset semua data dan kembali ke Step 1

### User Flow
```
1. User masuk ke polling section
2. Melihat form "Please fill in your details to vote"
3. User mengisi nama (min 3 char)
4. User mengisi nomor telepon (min 10 digit)
5. User optional mengisi email
6. Button "Continue to Vote" aktif
7. User klik Continue
8. Melihat konfirmasi data: "Voting as: [Nama]"
9. Melihat 3 opsi poll dengan progress bars
10. User klik salah satu "Vote for [Option]"
11. Button berubah jadi "✓ Voted for [Option]"
12. Progress bar ter-update
13. Success alert: "Thank you [Nama]! Your vote has been recorded."
14. Optional: Klik "Vote again" untuk reset
```

### Data yang Dikumpulkan
```javascript
{
  customer: {
    name: String (min 3 char),
    phone: String (min 10 digit),
    email: String (optional)
  },
  votedFor: Number (option ID),
  timestamp: Date (auto-generated),
  ipAddress: String (to be implemented)
}
```

### Anti-Spam Measures
1. **Customer data validation**: Memastikan data valid
2. **Phone number requirement**: 10+ digit untuk verifikasi
3. **One vote per submission**: Disabled setelah vote
4. **Reset requires new data**: Tidak bisa vote lagi dengan data yang sama
5. **Backend validation** (to be implemented):
   - Check duplicate phone numbers
   - Rate limiting
   - IP tracking
   - Captcha untuk suspicious activity

### Future Enhancements
- [ ] SMS verification untuk phone number
- [ ] Email confirmation
- [ ] Prevent duplicate votes by phone number
- [ ] Real-time poll results update untuk semua user
- [ ] Poll expiration date/time
- [ ] Multiple active polls
- [ ] Admin dashboard untuk manage polls

---

## 🎯 Key Improvements Summary

### What Changed from v1.0 to v1.1

#### 1. Hero Section
**Before**: Was a duplicate navbar  
**After**: Proper hero section with CTAs and feature cards

#### 2. Feedback Form
**Before**: No waiter selection  
**After**: Dropdown untuk pilih pelayan yang melayani

**Impact**: 
- Management bisa track performa individual staff
- Reward system untuk top-rated waiters
- Training needs identification

#### 3. Polling System
**Before**: Direct voting tanpa validasi  
**After**: Two-step process dengan customer data collection

**Impact**:
- Valid votes dari real customers
- Anti-spam protection
- Customer database building
- Better analytics dan insights

---

## 💡 Usage Tips

### Untuk Pelanggan

#### Memberikan Feedback
1. Pastikan isi semua field dengan benar
2. Pilih pelayan yang benar-benar melayani Anda
3. Berikan rating yang fair
4. Tulis feedback yang spesifik dan konstruktif
5. Submit form

#### Voting di Poll
1. Gunakan data yang valid (real name & phone)
2. Baca semua opsi sebelum voting
3. Vote untuk opsi yang benar-benar Anda inginkan
4. Vote tidak bisa diubah setelah submit
5. One vote per customer

### Untuk Management

#### Menganalisa Feedback
- Filter feedback by waiter
- Track rating trends per waiter
- Identify training needs
- Reward high-performing staff
- Address customer complaints

#### Menganalisa Poll Results
- Monitor voting patterns
- Identify customer preferences
- Plan events based on demand
- Verify voter data for authenticity
- Export data untuk business intelligence

---

## 🔒 Privacy & Data Protection

### Data yang Dikumpulkan
- Nama pelanggan
- Nomor telepon
- Email (optional)
- Tanggal kunjungan
- Rating dan feedback
- Poll votes

### Penggunaan Data
- Internal evaluation only
- Tidak dijual ke pihak ketiga
- Disimpan dengan aman
- Digunakan untuk improve service quality

### Customer Rights
- Request data deletion
- Update personal information
- Opt-out dari communications
- Access own data history

---

## 🛠️ Technical Implementation

### Component Structure
```
FeedbackSection.vue
├── FeedbackForm.vue (with waiter dropdown)
└── PollingCard.vue (two-step validation)
```

### State Management
- Local component state dengan Vue 3 data()
- Computed properties untuk validation
- Methods untuk form handling
- Future: Vuex/Pinia untuk global state

### Form Validation
- Client-side validation (current)
- HTML5 validation attributes
- Custom validation logic
- Backend validation (to be added)

### Data Flow
```
User Input → Component State → Validation → Submit Handler → 
Console Log (current) → Backend API (future) → Database
```

---

## 📱 Responsive Design

Semua fitur fully responsive:
- **Mobile** (320px - 767px): Single column layout
- **Tablet** (768px - 1023px): Optimized spacing
- **Desktop** (1024px+): Full two-column layout

---

## 🎨 Design System

### Colors Used
- Primary Green: Form labels, headings
- Accent Amber: Buttons, highlights, progress bars
- Secondary Sage: Borders, placeholders
- Background Beige: Backgrounds
- Text Charcoal: Body text

### Typography
- Display font: Headings dan titles
- Body font: Form labels dan text
- Font sizes: Responsive dengan breakpoints

### Spacing
- Consistent gap-* utilities
- Padding responsive per breakpoint
- Margin auto untuk centering

---

## 📞 Support

Untuk pertanyaan atau issues:
- Contact management di Kedai Sepijak
- Email: support@kedaisepijak.com (example)
- Phone: +62 xxx-xxxx-xxxx (example)

---

**Last Updated**: November 1, 2024  
**Version**: 1.1.0