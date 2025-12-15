// ============================================
// Feedback Controller
// Kedai Sepijak Backend
// ============================================
const { query } = require('../config/database');
const sentimentAnalyzer = require('../utils/sentimentAnalyzer');
const backfillCtrl = require('./backfillController');

// helper baca angka aman
const toInt = (v, d = 0) => {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? d : n;
};

// POST /api/feedback
exports.createFeedback = async (req, res) => {
  try {
    console.log('=== CREATE FEEDBACK REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const b = req.body || {};

    // FE kirim 'name' -> map ke customer_name
    const customer_name = b.customer_name || b.name || b.employee_name;
    const role = b.role ?? null;
    const employee_name = b.employee_name ?? null;
    const contact = b.contact ?? null;
    const date_of_visit = b.date_of_visit ?? null; // 'YYYY-MM-DD'
    const time_of_visit = b.time_of_visit ?? null;
    const rating = toInt(b.rating, null); // 1..5
    const ratings = b.ratings ? JSON.stringify(b.ratings) : null; // Detailed ratings as JSON
    const message = b.message || 'Feedback submitted via form'; // teks feedback
    const voluntary_consent = b.voluntary_consent ?? false;
    const category = b.category ?? null;  // makanan/pelayanan/kebersihan/suasana/lainnya
    const latitude = b.latitude ?? null;
    const longitude = b.longitude ?? null;
    const ip_address = (req.headers['x-forwarded-for'] || req.ip || '').toString().split(',')[0];
    const user_agent = req.headers['user-agent'] || '';

    // validasi minimal
    if (!customer_name || !rating) {
      return res.status(400).json({
        success: false,
        message: 'customer_name dan rating wajib diisi'
      });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'rating harus 1..5' });
    }

    // Extract individual ratings from nested object
    const rating_sikap_pelayan = b.ratings?.pelayanan?.sikap_pelayan || null;
    const rating_waktu_pesanan = b.ratings?.pelayanan?.waktu_pesanan || null;
    const rating_rasa_menu = b.ratings?.menu?.rasa_menu || null;
    const rating_kebersihan = b.ratings?.kebersihan || null;

    console.log('Individual ratings:', {
      rating_sikap_pelayan,
      rating_waktu_pesanan,
      rating_rasa_menu,
      rating_kebersihan
    });

    const sql = `
      INSERT INTO feedback
        (role, employee_name, contact, date_of_visit, time_of_visit, 
         rating_sikap_pelayan, rating_waktu_pesanan, rating_rasa_menu, rating_kebersihan,
         message, voluntary_consent, category, latitude, longitude, ip_address, user_agent, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;
    const params = [
      role, employee_name, contact, date_of_visit, time_of_visit,
      rating_sikap_pelayan, rating_waktu_pesanan, rating_rasa_menu, rating_kebersihan,
      message, voluntary_consent, category, latitude, longitude, ip_address, user_agent
    ];

    console.log('SQL params:', params);

    const result = await query(sql, params);
    console.log('Insert result:', result);

    // Analyze sentiment dari feedback message
    const sentimentResult = sentimentAnalyzer.analyzeSentiment(message);

    // Update feedback dengan sentiment data
    const updateSql = `
      UPDATE feedback 
      SET sentiment_label = ?, sentiment_score = ?, sentiment_confidence = ?
      WHERE id = ?
    `;
    const updateParams = [
      sentimentResult.label,
      sentimentResult.score,
      sentimentResult.confidence,
      result.insertId
    ];

    await query(updateSql, updateParams);
    console.log('Update sentiment params:', updateParams);

    const updateResult = await query('SELECT ROW_COUNT() AS affected');
    console.log('Update result:', updateResult);

    // ambil row baru yang baru dibuat dengan sentiment data
    const [created] = await query(
      `SELECT * FROM feedback WHERE id = ?`, [result.insertId]
    );
    console.log('Created row:', created);

    return res.status(201).json({
      success: true,
      message: 'Feedback created successfully',
      data: created
    });
  } catch (err) {
    console.error('createFeedback error:', err);
    return res.status(500).json({ success: false, message: 'Gagal menyimpan feedback' });
  }
};

// GET /api/feedback?rating=&waiter_id=&category=&date=&q=&page=&per_page=

exports.listFeedback = async (req, res) => {
  try {
    // Ambil semua data tanpa filter dan paging dulu
    const rows = await query(`
      SELECT * FROM feedback
      ORDER BY id DESC
      LIMIT 10
    `);

    return res.json({
      success: true,
      data: rows,
      meta: {
        total: rows.length,
        page: 1,
        per_page: 10,
        total_pages: 1
      }
    });
  } catch (err) {
    console.error('listFeedback error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil feedback' });
  }
};

// GET /api/feedback/stats
exports.getFeedbackStats = async (req, res) => {
  try {
    console.log('=== GET FEEDBACK STATS ===');

    // Fetch ALL feedback rows with the 4 rating columns
    const allFeedback = await query(`
      SELECT 
        rating_sikap_pelayan,
        rating_waktu_pesanan,
        rating_rasa_menu,
        rating_kebersihan
      FROM feedback
    `);

    console.log(`Total rows fetched: ${allFeedback.length}`);

    // Initialize counters
    let total_feedback = 0;
    let positive_count = 0;
    let negative_count = 0;
    let neutral_count = 0;
    let global_total_score = 0;

    // Loop through each feedback row
    allFeedback.forEach((row, index) => {
      // Create array of valid ratings (filter out null, undefined, and 0)
      const validScores = [
        row.rating_sikap_pelayan,
        row.rating_waktu_pesanan,
        row.rating_rasa_menu,
        row.rating_kebersihan
      ].filter(v => v !== null && v !== undefined && v > 0);

      // Only process rows that have at least one valid rating
      if (validScores.length > 0) {
        // Calculate Row Average
        const sum = validScores.reduce((acc, val) => acc + Number(val), 0);
        const rowAverage = sum / validScores.length;

        console.log(`Row ${index + 1}: validScores=[${validScores}], rowAvg=${rowAverage.toFixed(2)}`);

        // Increment total feedback count
        total_feedback++;

        // Add to global total score
        global_total_score += rowAverage;

        // Sentiment Check
        if (rowAverage >= 4) {
          positive_count++;
        } else if (rowAverage <= 2) {
          negative_count++;
        } else {
          neutral_count++;
        }
      } else {
        console.log(`Row ${index + 1}: No valid scores, skipping`);
      }
    });

    // Calculate final average rating
    const average_rating = total_feedback > 0
      ? Number((global_total_score / total_feedback).toFixed(2))
      : 0;

    // Prepare response
    const stats = {
      total_feedback,
      average_rating,
      positive_count,
      negative_count,
      neutral_count
    };

    console.log('Final stats calculated:', stats);
    return res.json({ success: true, data: stats });

  } catch (err) {
    console.error('getFeedbackStats error:', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil statistik feedback',
      error: err.message
    });
  }
};



// GET /api/feedback/:id
exports.getFeedbackById = async (req, res) => {
  try {
    const id = toInt(req.params.id, 0);
    if (!id) return res.status(400).json({ success: false, message: 'ID tidak valid' });

    const rows = await query(
      `SELECT f.*, w.name AS waiter_name
       FROM feedback f LEFT JOIN waiters w ON w.id = f.waiter_id
       WHERE f.id = ?`, [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Feedback tidak ditemukan' });
    }

    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('getFeedbackById error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil detail feedback' });
  }
};

// PATCH /api/feedback/:id/status
exports.updateFeedbackStatus = async (req, res) => {
  try {
    console.log('=== UPDATE FEEDBACK STATUS ===');
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);

    const id = toInt(req.params.id, 0);
    if (!id) {
      console.log('Invalid ID:', req.params.id);
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }

    const { status } = req.body;
    console.log('New status:', status);

    // Validasi status yang diperbolehkan
    const allowedStatuses = ['pending', 'selesai', 'approved', 'rejected'];
    if (!status || !allowedStatuses.includes(status)) {
      console.log('Invalid status:', status);
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid. Gunakan: pending, selesai, approved, atau rejected'
      });
    }

    // Cek apakah feedback exists
    const existingRows = await query('SELECT id FROM feedback WHERE id = ?', [id]);
    console.log('Existing rows:', existingRows);

    if (!existingRows || existingRows.length === 0) {
      console.log('Feedback not found for id:', id);
      return res.status(404).json({ success: false, message: 'Feedback tidak ditemukan' });
    }

    // Update status
    console.log('Updating status to:', status, 'for id:', id);
    const updateResult = await query('UPDATE feedback SET status = ? WHERE id = ?', [status, id]);
    console.log('Update result:', updateResult);

    // Ambil data yang sudah diupdate
    const updatedRows = await query('SELECT * FROM feedback WHERE id = ?', [id]);
    console.log('Updated rows:', updatedRows);

    return res.json({
      success: true,
      message: 'Status feedback berhasil diupdate',
      data: updatedRows[0]
    });
  } catch (err) {
    console.error('updateFeedbackStatus error:', err);
    console.error('Error stack:', err.stack);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengupdate status feedback',
      error: err.message
    });
  }
};
// GET /api/feedback/analytics/sentiment
exports.getSentimentAnalytics = async (req, res) => {
  try {
    console.log('=== GET SENTIMENT ANALYTICS ===');

    const { startDate, endDate, limit } = req.query;
    const pageLimit = parseInt(limit) || 100;

    // Build date filter
    let dateFilter = '';
    const dateParams = [];

    if (startDate && endDate) {
      dateFilter = 'WHERE DATE(created_at) BETWEEN ? AND ?';
      dateParams.push(startDate, endDate);
    }

    // Fetch feedback with the 4 rating columns
    const selectFields = `
      id, message, sentiment_label, sentiment_score, sentiment_confidence, created_at,
      rating_sikap_pelayan, rating_waktu_pesanan, rating_rasa_menu, rating_kebersihan
    `;

    const feedbackQuery = `SELECT ${selectFields} FROM feedback ${dateFilter}
       ORDER BY created_at DESC
       LIMIT ${parseInt(pageLimit, 10)}`;
    console.log('Feedback query:', feedbackQuery);
    console.log('Feedback query params:', dateParams);

    let feedbackRows;
    try {
      feedbackRows = await query(feedbackQuery, dateParams);
    } catch (dbErr) {
      console.error('Error executing feedback query', dbErr);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil sentiment analytics - feedback query error',
        error: dbErr.message,
        query: feedbackQuery,
        params: dateParams
      });
    }

    if (feedbackRows.length === 0) {
      return res.json({
        success: true,
        data: {
          total: 0,
          sentimentAnalysis: {
            total: 0,
            positive: 0,
            negative: 0,
            neutral: 0,
            averageScore: 0,
            percentages: { positive: 0, negative: 0, neutral: 0 }
          },
          topKeywords: [],
          recentFeedback: [],
          ratingAverage: 0
        }
      });
    }

    // Calculate ratings from the 4 columns
    let totalRowAverage = 0;
    let validRowCount = 0;
    const calculatedRatings = [];

    feedbackRows.forEach(row => {
      // Filter valid scores (> 0)
      const validScores = [
        row.rating_sikap_pelayan,
        row.rating_waktu_pesanan,
        row.rating_rasa_menu,
        row.rating_kebersihan
      ].filter(v => v !== null && v !== undefined && v > 0);

      if (validScores.length > 0) {
        const sum = validScores.reduce((acc, val) => acc + Number(val), 0);
        const rowAverage = sum / validScores.length;
        totalRowAverage += rowAverage;
        validRowCount++;
        calculatedRatings.push(rowAverage);
      }
    });

    // Calculate global average rating
    const ratingAverage = validRowCount > 0
      ? Number((totalRowAverage / validRowCount).toFixed(2))
      : 0;

    console.log(`Calculated rating average: ${ratingAverage} from ${validRowCount} valid rows`);

    // Get sentiment summary
    const summary = sentimentAnalyzer.getSentimentSummary(feedbackRows, calculatedRatings);

    // Get category breakdown
    // Build category breakdown query depending on rating column
    // Use INTERVAL and LIMIT with embedded numeric values to avoid parameter issues
    const intDays = parseInt(req.query.days, 10) || 30;
    const trendQuery = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as total,
        SUM(CASE WHEN sentiment_label = 'positive' THEN 1 ELSE 0 END) as positive,
        SUM(CASE WHEN sentiment_label = 'negative' THEN 1 ELSE 0 END) as negative,
        SUM(CASE WHEN sentiment_label = 'neutral' THEN 1 ELSE 0 END) as neutral,
        NULL as avg_rating
      FROM feedback
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ${intDays} DAY)
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT ${intDays}
    `;

    console.log('Trend query:', trendQuery);
    console.log('Trend query params: none');
    let trend;
    try {
      trend = await query(trendQuery);
    } catch (dbErr) {
      console.error('Error executing trend query', dbErr);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil sentiment trend - trend query error',
        error: dbErr.message,
        query: trendQuery,
        params: []
      });
    }

    // Placeholder for category breakdown (not implemented yet)
    const categoryBreakdown = {};

    // Calculate individual ratings for recent feedback
    const recentFeedbackWithRatings = feedbackRows.slice(0, 10).map(f => {
      const validScores = [
        f.rating_sikap_pelayan,
        f.rating_waktu_pesanan,
        f.rating_rasa_menu,
        f.rating_kebersihan
      ].filter(v => v !== null && v !== undefined && v > 0);

      const rating = validScores.length > 0
        ? Number((validScores.reduce((acc, val) => acc + Number(val), 0) / validScores.length).toFixed(2))
        : 0;

      return {
        id: f.id,
        message: f.message,
        rating: rating,
        sentiment: f.sentiment_label,
        confidence: f.sentiment_confidence,
        createdAt: f.created_at
      };
    });

    return res.json({
      success: true,
      data: {
        total: feedbackRows.length,
        sentimentAnalysis: summary.sentimentAnalysis,
        topKeywords: summary.topKeywords,
        categoryBreakdown: categoryBreakdown,
        ratingAverage: ratingAverage, // Use calculated rating average
        recentFeedback: recentFeedbackWithRatings,
        dateRange: {
          start: startDate || 'all-time',
          end: endDate || 'today'
        }
      }
    });
  } catch (err) {
    console.error('getSentimentAnalytics error:', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil sentiment analytics',
      error: err.message
    });
  }
};

// GET /api/feedback/sentiment/daily-trend
exports.getSentimentTrend = async (req, res) => {
  try {
    console.log('=== GET SENTIMENT TREND ===');

    const { days = 30 } = req.query;
    const dayLimit = parseInt(days) || 30;

    // Check if rating column exists to avoid SQL errors
    const dbName = process.env.DB_NAME || 'kedai_sepijak';
    const colCheck = await query(
      `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'feedback' AND COLUMN_NAME = 'rating'`,
      [dbName]
    );
    const hasRating = colCheck && colCheck[0] && colCheck[0].cnt > 0;

    // Build trend query with embedded numeric dayLimit to avoid prepared-statement issues
    const trendQuery = hasRating ? `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as total,
        SUM(CASE WHEN sentiment_label = 'positive' THEN 1 ELSE 0 END) as positive,
        SUM(CASE WHEN sentiment_label = 'negative' THEN 1 ELSE 0 END) as negative,
        SUM(CASE WHEN sentiment_label = 'neutral' THEN 1 ELSE 0 END) as neutral,
        ROUND(AVG(rating), 2) as avg_rating
      FROM feedback
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ${dayLimit} DAY)
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT ${dayLimit}
    ` : `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as total,
        SUM(CASE WHEN sentiment_label = 'positive' THEN 1 ELSE 0 END) as positive,
        SUM(CASE WHEN sentiment_label = 'negative' THEN 1 ELSE 0 END) as negative,
        SUM(CASE WHEN sentiment_label = 'neutral' THEN 1 ELSE 0 END) as neutral,
        NULL as avg_rating
      FROM feedback
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ${dayLimit} DAY)
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT ${dayLimit}
    `;

    console.log('Trend query (final):', trendQuery);
    let trend;
    try {
      trend = await query(trendQuery);
    } catch (dbErr) {
      console.error('Error executing trend query', dbErr);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil sentiment trend - trend query error',
        error: dbErr.message,
        query: trendQuery,
        params: []
      });
    }

    return res.json({
      success: true,
      data: {
        trend: trend.reverse(), // Ascending order
        days: dayLimit
      }
    });
  } catch (err) {
    console.error('getSentimentTrend error:', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil sentiment trend',
      error: err.message
    });
  }
};

// Re-export backfill handler for routing convenience
exports.backfillSentiment = backfillCtrl.backfillSentiment

// Test sentiment analyzer for debug
exports.testSentiment = async (req, res) => {
  try {
    const text = req.query.text || req.body?.text || '';
    const result = sentimentAnalyzer.analyzeSentiment(text);
    return res.json({ success: true, text, result });
  } catch (err) {
    console.error('testSentiment error:', err);
    return res.status(500).json({ success: false, message: 'test failed', error: err.message });
  }
}