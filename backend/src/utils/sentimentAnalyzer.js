// ============================================
// Sentiment Analyzer Utility (UPDATED V2)
// Kedai Sepijak Backend
// ============================================

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// --- 1. KAMUS BAHASA INDONESIA & JAWA ---
const idLanguage = {
  labels: {
    // ===========================
    // KATA POSITIF (Indonesia)
    // ===========================
    'enak': 3, 'sedap': 3, 'lezat': 4, 'nikmat': 4, 'gurih': 3, 'renyah': 3, 'segar': 3, 'fresh': 3,
    'mantap': 4, 'mantul': 5, 'juara': 5, 'top': 4, 'the best': 5, 'oke': 2, 'sip': 2,
    'suka': 3, 'puas': 4, 'betah': 3, 'cinta': 4, 'love': 4, 'sayang': 3,
    'ramah': 4, 'sopan': 3, 'baik': 3, 'membantu': 3, 'cekatan': 3, 'sigap': 3,
    'cepat': 3, 'kilat': 3, 'satset': 4, 'ngebut': 2,
    'bersih': 4, 'rapi': 3, 'wangi': 3, 'higienis': 4, 'kinclong': 3,
    'murah': 3, 'terjangkau': 3, 'hemat': 3, 'ekonomis': 2, 'worth': 4, 'pas': 2,
    'nyaman': 4, 'adem': 3, 'luas': 2, 'tenang': 2, 'cozy': 4, 'estetik': 3, 'bagus': 3, 'keren': 3,
    'rekomendasi': 5, 'rekomen': 5, 'wajib': 4, 'nagih': 5, 'lagi': 2, // "mau lagi"
    'lengkap': 2, 'komplit': 2, 'banyak': 2,

    // ===========================
    // KATA POSITIF (Bahasa Jawa)
    // ===========================
    'wenak': 4, 'uenak': 5, 'ecom': 3, 'eco': 3, 'nyamleng': 4, 'maknyus': 5,
    'wareg': 3, 'maregi': 3, // Kenyang/mengenyangkan
    'jos': 4, 'joss': 5, 'gandos': 4,
    'apik': 3, 'sae': 3, 'mbois': 4, 'ngeten': 4, // (Sambil acung jempol)
    'resik': 3, // Bersih
    'grapyak': 4, // Ramah banget
    'aluss': 3, 'alus': 3, // Halus (rasa/bicaranya)
    'murah': 3, 'meriah': 3,
    'banter': 2, // Cepat (internet/pelayanan)

    // ===========================
    // KATA NEGATIF (Indonesia)
    // ===========================
    'buruk': -3, 'jelek': -3, 'parah': -4, 'ancur': -4, 'hancur': -4, 'rusak': -3,
    'kecewa': -5, 'nyesel': -4, 'menyesal': -4, 'kapok': -5, 'marah': -3, 'emosi': -3, 'kesal': -3,
    'kotor': -4, 'jorok': -5, 'kumuh': -4, 'berdebu': -2, 'sampah': -5,
    'mahal': -3, 'boros': -2, 'perampok': -5, // Hiperbola harga
    'lama': -3, 'lambat': -3, 'lelet': -4, 'lemot': -3, 'ngaret': -3,
    'kasar': -4, 'jutek': -4, 'galak': -3, 'sombong': -3, 'cuek': -2, 'bego': -4, 'bodoh': -4,
    'asin': -2, 'hambar': -3, 'anyep': -2, 'pahit': -2, 'gosong': -3, 'keras': -2, 'alot': -3, 'mentah': -3, 'basi': -5, 'asam': -2, 'kecut': -2,
    'dingin': -2, 'beku': -2, // Makanan dingin padahal harusnya panas
    'bau': -4, 'bising': -3, 'berisik': -3, 'panas': -2, 'gerah': -2, 'sumpek': -3, 'sempit': -2, 'gelap': -2,
    'biasa': -1, 'standar': -1, 'kurang': -2, 'dikit': -2, 'sedikit': -2, 'kosong': -2, 'habis': -2,
    'gak': -2, 'ga': -2, 'nggak': -2, 'tidak': -2, 'jangan': -3, 'batal': -3, 'salah': -2, 'aneh': -2,
    'zonk': -4, 'fail': -3, 'rugi': -3,

    // ===========================
    // KATA NEGATIF (Bahasa Jawa)
    // ===========================
    'ora': -2, 'mboten': -2, // Tidak
    'elek': -3, // Jelek
    'larang': -4, // Mahal
    'suwi': -3, 'suwe': -3, // Lama
    'reged': -3, 'reget': -3, // Kotor
    'mambu': -4, 'banger': -4, // Bau
    'anyep': -3, // Hambar / Dingin (makanan)
    'cemplang': -3, // Hambar
    'pedes': -1, // Pedas (bisa netral, tapi kalau komplain biasanya negatif)
    'kemroh': -4, // Jorok
    'lelet': -3,
    'ngawur': -4, // Asal-asalan
    'sepo': -3, // Hambar
    'atos': -3, // Keras (nasi/daging)
    'ulet': -3, // Alot
    'ambreng': -4 // Bau menyengat
  }
};

// Daftarkan bahasa Indonesia+Jawa ke library
sentiment.registerLanguage('id', idLanguage);

// --- 2. FUNGSI PEMBERSIH & PENTERJEMAH SLANG (UPDATED) ---
const preprocessText = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  let clean = text.toLowerCase().trim();

  // Hapus tanda baca
  clean = clean.replace(/[^a-zA-Z0-9\s]/g, ' ');

  // ---------------------------------------------------------
  // PENANGANAN NEGASI (INDONESIA & JAWA)
  // Mengubah "tidak [kata sifat]" menjadi satu kata negatif kuat
  // ---------------------------------------------------------
  
  clean = clean
    // INDONESIA: ga/gak/tidak/kurang
    .replace(/\b(ga|gak|nggak|tidak|kurang) enak\b/g, 'buruk')
    .replace(/\b(ga|gak|nggak|tidak|kurang) sedap\b/g, 'buruk')
    .replace(/\b(ga|gak|nggak|tidak) ramah\b/g, 'kasar')
    .replace(/\b(ga|gak|nggak|tidak) sopan\b/g, 'kasar')
    .replace(/\b(ga|gak|nggak|tidak) bersih\b/g, 'kotor')
    .replace(/\b(ga|gak|nggak|tidak) higienis\b/g, 'jorok')
    .replace(/\b(ga|gak|nggak|tidak) suka\b/g, 'kecewa')
    .replace(/\b(ga|gak|nggak|tidak) worth\b/g, 'rugi')
    .replace(/\b(ga|gak|nggak|tidak) recommended\b/g, 'buruk')
    .replace(/\b(biasa aja|b aja)\b/g, 'biasa')

    // JAWA: ora/mboten
    .replace(/\b(ora|mboten) enak\b/g, 'buruk')
    .replace(/\b(ora|mboten) wenak\b/g, 'buruk')
    .replace(/\b(ora|mboten) eco\b/g, 'buruk')
    .replace(/\b(ora|mboten) resik\b/g, 'jorok')
    .replace(/\b(ora|mboten) genah\b/g, 'ngawur') // Tidak beres
    .replace(/\b(ora|mboten) umum\b/g, 'aneh')
    .replace(/\b(ora|mboten) pantes\b/g, 'buruk')
    .replace(/\b(ora|mboten) worth\b/g, 'rugi');

  return clean;
};

// ... (SISA KODE KE BAWAH TETAP SAMA: analyzeSentiment, dll) ...
// --- 3. FUNGSI UTAMA ANALISIS ---
exports.analyzeSentiment = (text) => {
  // 1. Bersihkan teks dulu
  const cleanText = preprocessText(text);

  // 2. Analisis menggunakan library dengan bahasa 'id'
  const result = sentiment.analyze(cleanText, { language: 'id' });

  // 3. Logika Penentuan Label
  let label = 'neutral';
  let confidence = 0;

  if (result.score === 0) {
    label = 'neutral';
    confidence = 50; 
  } else if (result.score > 0) {
    label = 'positive';
    // Max confidence 95% biar gak overproud
    confidence = Math.min(50 + (result.score * 10), 95);
  } else {
    label = 'negative';
    confidence = Math.min(50 + (Math.abs(result.score) * 10), 95);
  }

  return {
    score: result.score,
    comparative: result.comparative,
    label: label,
    confidence: Math.round(confidence),
    tokens: result.tokens,
    words: result.words
  };
};

// --- 4. ANALISIS BATCH (BANYAK DATA) ---
exports.analyzeFeedbackBatch = (feedbackArray) => {
  if (!Array.isArray(feedbackArray) || feedbackArray.length === 0) {
    return {
      total: 0,
      positive: 0,
      negative: 0,
      neutral: 0,
      averageScore: 0,
      percentages: { positive: 0, negative: 0, neutral: 0 }
    };
  }

  const analysis = feedbackArray.map(item => 
    exports.analyzeSentiment(item.message || item.text || '')
  );

  const positive = analysis.filter(a => a.label === 'positive').length;
  const negative = analysis.filter(a => a.label === 'negative').length;
  const neutral = analysis.filter(a => a.label === 'neutral').length;
  const total = analysis.length;
  
  const totalScore = analysis.reduce((sum, a) => sum + a.score, 0);

  return {
    total,
    positive,
    negative,
    neutral,
    averageScore: total ? parseFloat((totalScore / total).toFixed(2)) : 0,
    percentages: {
      positive: total ? Math.round((positive / total) * 100) : 0,
      negative: total ? Math.round((negative / total) * 100) : 0,
      neutral: total ? Math.round((neutral / total) * 100) : 0
    },
    details: analysis
  };
};

// --- 5. EKSTRAK KEYWORD ---
exports.extractKeywords = (feedbackArray) => {
  const keywords = {};
  // Stopwords ditambah (bhs jawa halus/kasar dikit)
  const stopWords = [
    'yang', 'di', 'dan', 'ini', 'itu', 'ke', 'dari', 'saya', 'aku', 
    'sangat', 'banget', 'kedai', 'sepijak', 'makan', 'minum', 'untuk', 
    'dengan', 'karena', 'kalau', 'tapi', 'adalah', 'kula', 'kowe', 'sampeyan',
    'ora', 'sing', 'iki', 'iku', 'ning', 'nek', 'bae', 'wae', 'kok'
  ];

  feedbackArray.forEach(feedback => {
    const text = preprocessText(feedback.message || feedback.text || '');
    const words = text.split(/\s+/);
    
    words.forEach(word => {
      if (word.length > 2 && !stopWords.includes(word)) { // length > 2 biar kata 'ga' terfilter jika sisa
        keywords[word] = (keywords[word] || 0) + 1;
      }
    });
  });

  return Object.entries(keywords)
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 10) 
    .map(([keyword, count]) => ({ keyword, count }));
};

// --- 6. SUMMARY UNTUK DASHBOARD ---
exports.getSentimentSummary = (feedbackArray, ratings = []) => {
  const sentimentStats = exports.analyzeFeedbackBatch(feedbackArray);
  const topKeywords = exports.extractKeywords(feedbackArray);

  let ratingAverage = 0;
  if (ratings && ratings.length > 0) {
    const validRatings = ratings.filter(r => r);
    if (validRatings.length > 0) {
      ratingAverage = (validRatings.reduce((a, b) => a + b, 0) / validRatings.length).toFixed(1);
    }
  }

  return {
    sentimentAnalysis: sentimentStats,
    topKeywords,
    ratingAverage
  };
};

module.exports = exports;