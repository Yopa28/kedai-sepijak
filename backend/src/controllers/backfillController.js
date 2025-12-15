const { query } = require('../config/database')
const sentimentAnalyzer = require('../utils/sentimentAnalyzer')

// Backfill sentiment for feedback rows without sentiment
exports.backfillSentiment = async (req, res) => {
  try {
    console.log('=== BACKFILL SENTIMENT START ===')

    // limit and filter can be provided in body for safety
    const limit = parseInt(req.body.limit, 10) || 500
    const onlyNull = req.body.onlyNull === undefined ? true : !!req.body.onlyNull

    // select rows needing sentiment
    const where = onlyNull ? 'WHERE sentiment_label IS NULL' : ''
    const rows = await query(`SELECT id, message FROM feedback ${where} ORDER BY created_at DESC LIMIT ${limit}`)

    console.log(`Found ${rows.length} rows to process`)

    const updates = []
    for (const r of rows) {
      const s = sentimentAnalyzer.analyzeSentiment(r.message || '')
      const params = [s.label, s.score, s.confidence, r.id]
      updates.push(query(`UPDATE feedback SET sentiment_label = ?, sentiment_score = ?, sentiment_confidence = ? WHERE id = ?`, params))
    }

    await Promise.all(updates)

    console.log('=== BACKFILL SENTIMENT COMPLETE ===')
    return res.json({ success: true, message: 'Backfill completed', processed: rows.length })
  } catch (err) {
    console.error('backfillSentiment error:', err)
    return res.status(500).json({ success: false, message: 'Backfill failed', error: err.message })
  }
}

module.exports = exports
