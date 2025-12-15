# 🤖 Sentiment Analysis (AI/ML) - Implementation Guide

Implementasi AI/ML Feature: **Sentiment Analysis untuk Feedback Pelanggan Kedai Sepijak**

---

## 📋 Overview

Sentiment Analysis adalah fitur AI yang secara otomatis menganalisis dan mengklasifikasi sentimen dari setiap feedback pelanggan sebagai:
- **POSITIF** 😊 - Pujian atau kepuasan
- **NEGATIF** 😞 - Keluhan atau ketidakpuasan  
- **NETRAL** 😐 - Pertanyaan atau informasi

Sistem ini juga mengidentifikasi kata-kata kunci yang paling sering disebut dan memberikan insights untuk business intelligence.

---

## 🏗️ Arsitektur Teknis

### Backend Stack
- **Library**: `sentiment` (npm package)
- **Framework**: Node.js + Express
- **Database**: MySQL
- **API Endpoints**: RESTful

### Frontend Stack
- **Component**: Vue 3 (SentimentAnalytics.vue)
- **Visualization**: Chart.js untuk grafik
- **Styling**: Tailwind CSS

---

## 📁 File Structure

```
backend/
├── src/
│   ├── utils/
│   │   └── sentimentAnalyzer.js          (NEW) - Core sentiment analysis logic
│   ├── controllers/
│   │   └── feedbackController.js         (MODIFIED) - Add sentiment analysis
│   └── routes/
│       └── feedbackRoutes.js             (MODIFIED) - Add new endpoints
├── package.json                          (MODIFIED) - Added 'sentiment' package

src/
├── components/
│   └── SentimentAnalytics.vue            (NEW) - Dashboard component
├── router/
│   └── index.js                          (MODIFIED) - Add sentiment route
└── views/
    └── admin/
        └── AdminLayout.vue               (MODIFIED) - Add menu item

add-sentiment-columns.sql                 (NEW) - Database migration
```

---

## 🔧 Installation & Setup

### 1. Install Sentiment Package
```bash
cd backend
npm install sentiment
```

### 2. Update Database Schema
Jalankan SQL migration untuk menambah kolom sentiment:

```sql
-- File: add-sentiment-columns.sql
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS sentiment_label VARCHAR(20) DEFAULT 'neutral';
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS sentiment_score INT DEFAULT 0;
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS sentiment_confidence DECIMAL(5,2) DEFAULT 0;
```

### 3. Start Backend Server
```bash
cd backend
npm run dev
```

### 4. Start Frontend (Vue)
```bash
npm run dev
```

---

## 🎯 Features Implemented

### 1. **Sentiment Analyzer Utility** 
File: `backend/src/utils/sentimentAnalyzer.js`

```javascript
// Analyze single feedback
const result = sentimentAnalyzer.analyzeSentiment("Makanan enak tapi lambat");
// Output: { score: 2, comparative: 0.5, label: 'positive', confidence: 50 }

// Batch analysis
const stats = sentimentAnalyzer.analyzeFeedbackBatch(feedbackArray);
// Output: { total, positive, negative, neutral, percentages, details }

// Extract keywords
const keywords = sentimentAnalyzer.extractKeywords(feedbackArray);
// Output: [{ keyword: 'enak', count: 5 }, ...]
```

### 2. **API Endpoints**

#### GET `/api/feedback/analytics/sentiment`
Mendapatkan sentiment analytics dashboard data.

**Query Parameters:**
- `startDate` - Format: YYYY-MM-DD (optional)
- `endDate` - Format: YYYY-MM-DD (optional)
- `limit` - Max records (default: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 50,
    "sentimentAnalysis": {
      "positive": 40,
      "negative": 5,
      "neutral": 5,
      "averageScore": 3.2,
      "percentages": {
        "positive": 80,
        "negative": 10,
        "neutral": 10
      }
    },
    "topKeywords": [
      { "keyword": "enak", "count": 18 },
      { "keyword": "nyaman", "count": 12 },
      ...
    ],
    "categoryBreakdown": [...],
    "ratingAverage": 4.2,
    "recentFeedback": [...]
  }
}
```

#### GET `/api/feedback/sentiment/daily-trend`
Mendapatkan trend sentimen dalam n hari terakhir.

**Query Parameters:**
- `days` - Number of days (default: 30)

**Response:**
```json
{
  "success": true,
  "data": {
    "trend": [
      {
        "date": "2025-12-10",
        "total": 5,
        "positive": 4,
        "negative": 1,
        "neutral": 0,
        "avg_rating": 4.5
      },
      ...
    ],
    "days": 30
  }
}
```

### 3. **Database Schema**

```sql
-- New columns added to feedback table:
- sentiment_label VARCHAR(20) - 'positive', 'negative', 'neutral'
- sentiment_score INT - Score dari sentiment analysis
- sentiment_confidence DECIMAL(5,2) - Confidence percentage

-- New view:
feedback_sentiment_stats - Aggregated sentiment statistics
```

### 4. **Updated Feedback Controller**

Saat feedback baru disubmit, sistem otomatis:
1. Menerima feedback message
2. Analyze sentimen menggunakan `sentimentAnalyzer.analyzeSentiment()`
3. Simpan sentiment_label, sentiment_score, confidence ke database
4. Return feedback dengan sentiment data

### 5. **Admin Dashboard (Vue Component)**

File: `src/components/SentimentAnalytics.vue`

**Features:**
- 📊 Summary cards (Total, Positif, Negatif, Netral, Rating)
- 📈 Pie chart distribusi sentimen
- 📉 Line chart trend sentimen 30 hari
- 🔑 Top keywords/topics
- 📂 Category breakdown table
- 📋 Recent feedback list dengan sentiment badge
- 💡 AI insights dan rekomendasi

**Navigation:**
Admin → Sidebar → "Sentiment Analysis (AI)" → `/admin/sentiment`

---

## 🚀 How It Works

### Flow Diagram

```
Pelanggan Submit Feedback
         ↓
   Backend menerima via POST /api/feedback
         ↓
   Database: INSERT feedback
         ↓
   sentimentAnalyzer.analyzeSentiment() → score, label, confidence
         ↓
   UPDATE feedback SET sentiment_label, sentiment_score, confidence
         ↓
   Response: Feedback with sentiment data
         ↓
Admin View Sentiment Dashboard
         ↓
   GET /api/feedback/analytics/sentiment
         ↓
   Backend query: SELECT * FROM feedback + calculate stats
         ↓
   Return: stats, trends, keywords, insights
         ↓
   Frontend render charts + tables
```

---

## 📊 Sentiment Analysis Algorithm

### Menggunakan: `sentiment` npm package

Library ini menggunakan:
- **Approach**: Lexicon-based sentiment analysis
- **Database**: AFINN-111 lexicon (English) + Extended (multiple languages)
- **Scoring**: 
  - Positive words: +1 to +5
  - Negative words: -1 to -5
  - Comparative score: total_score / word_count

### Classification:
- Score > 0 → POSITIVE
- Score < 0 → NEGATIVE
- Score = 0 → NEUTRAL

### Confidence:
- Calculated dari absolute value of comparative score
- Range: 0-100%
- Higher = more certain

---

## 💡 Example Usage

### Input Feedback:
```
"Makanan enak dan murah, tapi pelayanan lambat dan kurang ramah"
```

### Analysis:
```json
{
  "score": 2,
  "comparative": 0.167,
  "label": "positive",
  "confidence": 16.7,
  "extracted_keywords": ["makanan", "enak", "murah", "pelayanan", "lambat", "ramah"]
}
```

### Interpretation:
- Lebih banyak kata positif (enak, murah) dibanding negatif (lambat, kurang ramah)
- Overall POSITIF tapi ada area improvement (service)
- Confidence 16.7% → moderately confident

---

## 📈 Admin Dashboard Screenshots

### Main Dashboard
```
┌─────────────────────────────────────────────────────────┐
│  📊 Sentiment Analysis Dashboard                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📝 Total: 50    😊 Positif: 40    😞 Negatif: 5      │
│  😐 Netral: 5    ⭐ Rating: 4.2/5                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  📈 Distribusi Sentimen      │  📊 Trend (30 hari)     │
│  [Pie Chart]                 │  [Line Chart]           │
├─────────────────────────────────────────────────────────┤
│  🔑 Top Keywords                                        │
│  [enak: 18] [nyaman: 12] [cepat: 9] [ramah: 7]        │
├─────────────────────────────────────────────────────────┤
│  📋 Recent Feedback                                     │
│  ✅ "Makanan lezat!" - POSITIF (92%)                   │
│  ⚠️ "Lambat sekali" - NEGATIF (85%)                    │
│  ❓ "Jam operasional?" - NETRAL (question)             │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Performance Considerations

- **Caching**: Endpoint results dapat di-cache untuk query yang sama
- **Batch Processing**: Untuk feedback besar, process dalam background job
- **Indexing**: Database indexes pada sentiment_label, sentiment_score
- **Real-time**: Dashboard update otomatis via WebSocket (future enhancement)

---

## 🐛 Troubleshooting

### Issue: "Sentiment library not found"
```bash
npm install sentiment --save
```

### Issue: Sentiment analysis tidak berfungsi
- Check: Backend server running
- Check: Feedback message tidak kosong
- Check: sentimentAnalyzer.js di path yang benar

### Issue: Chart tidak muncul
- Check: Chart.js sudah di-import
- Check: Canvas element ada di DOM
- Check: Data tidak null/undefined

---

## 🎓 Untuk Tugas Akhir

Anda dapat showcase:

1. **AI/ML Implementation**
   - Natural Language Processing (NLP)
   - Sentiment Classification Algorithm
   - Text Mining (keyword extraction)

2. **Business Intelligence**
   - Customer satisfaction metrics
   - Trend analysis
   - Actionable insights dari data

3. **Full Stack Development**
   - Backend API dengan complex logic
   - Frontend visualization
   - Database optimization
   - Real-time analytics

4. **Documentation**
   - Technical architecture
   - Algorithm explanation
   - Performance metrics
   - Use cases & benefits

---

## 📝 Next Steps (Future Enhancements)

1. **Indonesian Language Support**
   - Integrate Bahasa Indonesia lexicon
   - Better accuracy untuk feedback lokal

2. **Advanced Analytics**
   - Emotion detection (tidak hanya sentiment)
   - Topic modeling
   - Aspect-based sentiment analysis

3. **Real-time Monitoring**
   - WebSocket untuk live updates
   - Alerts untuk negative feedback spikes
   - Automated responses

4. **Integration**
   - Email notifications
   - WhatsApp alerts
   - Slack integration

---

## 📚 References

- **Sentiment Library**: https://www.npmjs.com/package/sentiment
- **Chart.js**: https://www.chartjs.org/
- **Vue 3 Docs**: https://vuejs.org/
- **Natural Language Processing**: https://en.wikipedia.org/wiki/Sentiment_analysis

---

**Status**: ✅ Implementation Complete  
**Last Updated**: December 13, 2025  
**Version**: 1.0.0

