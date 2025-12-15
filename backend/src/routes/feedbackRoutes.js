const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/feedbackController')

// POST feedback dari frontend
router.post('/', ctrl.createFeedback)

// Sentiment analytics endpoints
router.get('/analytics/sentiment', ctrl.getSentimentAnalytics)
router.get('/sentiment/daily-trend', ctrl.getSentimentTrend)
// Backfill sentiment for existing rows (admin-only endpoint)
router.post('/analytics/backfill-sentiment', ctrl.backfillSentiment)
// Test sentiment analyzer for arbitrary text
router.get('/analytics/test-sentiment', ctrl.testSentiment)

// Feedback statistics endpoint
router.get('/stats', ctrl.getFeedbackStats)

// List untuk admin (dengan filter opsional)
router.get('/', ctrl.listFeedback)

// Detail feedback
router.get('/:id', ctrl.getFeedbackById)

// Update status feedback
router.patch('/:id/status', ctrl.updateFeedbackStatus)

module.exports = router
