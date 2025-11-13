/**
 * Dashboard Controller
 * Kedai Sepijak Server
 */

import { query } from '../config/database.js';

/**
 * Get dashboard statistics
 * GET /api/dashboard/stats
 */
export const getDashboardStats = async (req, res) => {
  try {
    // Get overall statistics
    const statsQuery = `
      SELECT
        (SELECT COUNT(*) FROM feedback) as total_feedback,
        (SELECT COUNT(*) FROM feedback WHERE DATE(created_at) = CURDATE()) as today_feedback,
        (SELECT COUNT(*) FROM feedback WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)) as week_feedback,
        (SELECT COUNT(*) FROM feedback WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())) as month_feedback,
        (SELECT COUNT(*) FROM waiters WHERE status = 'active') as active_waiters,
        (SELECT COUNT(*) FROM waiters) as total_waiters,
        (SELECT COUNT(*) FROM polls WHERE is_active = TRUE AND end_date > NOW()) as active_polls,
        (SELECT COUNT(*) FROM polls) as total_polls,
        (SELECT COUNT(*) FROM poll_votes WHERE DATE(voted_at) = CURDATE()) as today_votes,
        (SELECT COUNT(*) FROM poll_votes) as total_votes,
        (SELECT COUNT(*) FROM vouchers WHERE is_used = FALSE AND expires_at > NOW()) as available_vouchers,
        (SELECT COUNT(*) FROM vouchers WHERE is_used = TRUE) as used_vouchers,
        (SELECT COUNT(*) FROM vouchers) as total_vouchers,
        (SELECT COALESCE(AVG(rating), 0) FROM feedback) as average_rating,
        (SELECT COALESCE(AVG(rating), 0) FROM feedback WHERE DATE(created_at) = CURDATE()) as today_average_rating
    `;

    const stats = await query(statsQuery);

    // Get feedback growth (this week vs last week)
    const growthQuery = `
      SELECT
        (SELECT COUNT(*) FROM feedback WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)) as current_week,
        (SELECT COUNT(*) FROM feedback WHERE YEARWEEK(created_at, 1) = YEARWEEK(DATE_SUB(CURDATE(), INTERVAL 1 WEEK), 1)) as previous_week
    `;

    const growth = await query(growthQuery);
    const growthData = growth[0];

    let feedback_growth = 0;
    if (growthData.previous_week > 0) {
      feedback_growth = ((growthData.current_week - growthData.previous_week) / growthData.previous_week) * 100;
    } else if (growthData.current_week > 0) {
      feedback_growth = 100;
    }

    // Get rating trend
    const trendQuery = `
      SELECT
        (SELECT COALESCE(AVG(rating), 0) FROM feedback WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)) as current_week,
        (SELECT COALESCE(AVG(rating), 0) FROM feedback WHERE YEARWEEK(created_at, 1) = YEARWEEK(DATE_SUB(CURDATE(), INTERVAL 1 WEEK), 1)) as previous_week
    `;

    const trend = await query(trendQuery);
    const trendData = trend[0];

    let rating_trend = 'stable';
    if (trendData.current_week > trendData.previous_week) {
      rating_trend = 'up';
    } else if (trendData.current_week < trendData.previous_week) {
      rating_trend = 'down';
    }

    // Get recent feedback (last 10)
    const recentFeedbackQuery = `
      SELECT f.*, w.name as waiter_name
      FROM feedback f
      LEFT JOIN waiters w ON f.waiter_id = w.id
      ORDER BY f.created_at DESC
      LIMIT 10
    `;

    const recentFeedback = await query(recentFeedbackQuery);

    // Get active polls
    const activePollsQuery = `
      SELECT p.*,
        (SELECT COUNT(*) FROM poll_votes WHERE poll_id = p.id) as total_votes
      FROM polls p
      WHERE p.is_active = TRUE AND p.end_date > NOW()
      ORDER BY p.created_at DESC
      LIMIT 5
    `;

    const activePolls = await query(activePollsQuery);

    // Get poll options for each poll
    for (let poll of activePolls) {
      const optionsQuery = `
        SELECT * FROM poll_options
        WHERE poll_id = ?
        ORDER BY vote_count DESC
      `;
      poll.options = await query(optionsQuery, [poll.id]);
    }

    // Get top waiters
    const topWaitersQuery = `
      SELECT w.*,
        (SELECT COUNT(*) FROM feedback WHERE waiter_id = w.id) as feedback_count,
        (SELECT COALESCE(AVG(rating), 0) FROM feedback WHERE waiter_id = w.id) as avg_rating
      FROM waiters w
      WHERE w.status = 'active'
      HAVING feedback_count > 0
      ORDER BY avg_rating DESC, feedback_count DESC
      LIMIT 5
    `;

    const topWaiters = await query(topWaitersQuery);

    // Get feedback by category
    const categoryQuery = `
      SELECT category,
        COUNT(*) as count,
        COALESCE(AVG(rating), 0) as avg_rating
      FROM feedback
      GROUP BY category
      ORDER BY count DESC
    `;

    const feedbackByCategory = await query(categoryQuery);

    // Calculate percentages
    const totalFeedback = stats[0].total_feedback;
    feedbackByCategory.forEach(item => {
      item.percentage = totalFeedback > 0 ? ((item.count / totalFeedback) * 100).toFixed(1) : 0;
      item.avg_rating = parseFloat(item.avg_rating).toFixed(2);
    });

    // Get feedback trend (last 7 days)
    const feedbackTrendQuery = `
      SELECT DATE(created_at) as date,
        COUNT(*) as count,
        COALESCE(AVG(rating), 0) as avg_rating
      FROM feedback
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date
    `;

    const feedbackTrend = await query(feedbackTrendQuery);

    // Format ratings
    feedbackTrend.forEach(item => {
      item.avg_rating = parseFloat(item.avg_rating).toFixed(2);
    });

    // Get voucher statistics
    const voucherStatsQuery = `
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN is_used = FALSE AND expires_at > NOW() THEN 1 END) as available,
        COUNT(CASE WHEN is_used = TRUE THEN 1 END) as used,
        COUNT(CASE WHEN is_used = FALSE AND expires_at <= NOW() THEN 1 END) as expired,
        COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as created_today,
        COUNT(CASE WHEN DATE(used_at) = CURDATE() THEN 1 END) as used_today
      FROM vouchers
    `;

    const voucherStats = await query(voucherStatsQuery);
    const voucherData = voucherStats[0];

    // Calculate usage rate
    voucherData.usage_rate = voucherData.total > 0
      ? ((voucherData.used / voucherData.total) * 100).toFixed(1)
      : 0;

    // Return all data
    return res.status(200).json({
      success: true,
      data: {
        statistics: {
          ...stats[0],
          feedback_growth: parseFloat(feedback_growth.toFixed(1)),
          rating_trend,
          average_rating: parseFloat(stats[0].average_rating).toFixed(2),
          today_average_rating: parseFloat(stats[0].today_average_rating).toFixed(2)
        },
        recent_feedback: recentFeedback,
        active_polls: activePolls,
        top_waiters: topWaiters,
        feedback_by_category: feedbackByCategory,
        feedback_trend: feedbackTrend,
        voucher_statistics: voucherData
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching dashboard data'
    });
  }
};

/**
 * Get quick stats (for topbar or widgets)
 * GET /api/dashboard/quick-stats
 */
export const getQuickStats = async (req, res) => {
  try {
    const quickStatsQuery = `
      SELECT
        (SELECT COUNT(*) FROM feedback WHERE DATE(created_at) = CURDATE()) as today_feedback,
        (SELECT COUNT(*) FROM waiters WHERE status = 'active') as active_waiters,
        (SELECT COUNT(*) FROM polls WHERE is_active = TRUE) as active_polls,
        (SELECT COALESCE(AVG(rating), 0) FROM feedback WHERE DATE(created_at) = CURDATE()) as today_rating
    `;

    const stats = await query(quickStatsQuery);

    return res.status(200).json({
      success: true,
      data: {
        ...stats[0],
        today_rating: parseFloat(stats[0].today_rating).toFixed(1)
      }
    });

  } catch (error) {
    console.error('Get quick stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching quick stats'
    });
  }
};
  