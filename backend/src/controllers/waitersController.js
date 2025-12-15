// ============================================
// Waiters Controller
// Kedai Sepijak Backend
// ============================================

const { query } = require('../config/database');

// Get all waiters
const getAllWaiters = async (req, res) => {
    try {
        const { status } = req.query;

        let sql = 'SELECT * FROM waiters WHERE 1=1';
        const params = [];

        if (status) {
            sql += ' AND status = ?';
            params.push(status);
        }

        sql += ' ORDER BY name ASC';

        const results = await query(sql, params);

        res.status(200).json({
            success: true,
            message: 'Waiters retrieved successfully',
            data: results
        });
    } catch (error) {
        console.error('Error getting waiters:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve waiters',
            error: error.message
        });
    }
};

// Get waiter by ID
const getWaiterById = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = 'SELECT * FROM waiters WHERE id = ?';
        const results = await query(sql, [id]);

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Waiter not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Waiter retrieved successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Error getting waiter by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve waiter',
            error: error.message
        });
    }
};

// Create new waiter
const createWaiter = async (req, res) => {
    try {
        const { name, status } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Waiter name is required'
            });
        }

        const sql = 'INSERT INTO waiters (name, status) VALUES (?, ?)';
        const result = await query(sql, [name, status || 'active']);

        const [newWaiter] = await query('SELECT * FROM waiters WHERE id = ?', [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Waiter created successfully',
            data: newWaiter
        });
    } catch (error) {
        console.error('Error creating waiter:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create waiter',
            error: error.message
        });
    }
};

// Update waiter
const updateWaiter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const updateFields = [];
        const params = [];

        if (name !== undefined) {
            updateFields.push('name = ?');
            params.push(name);
        }

        if (status !== undefined) {
            if (!['active', 'inactive'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid status. Must be either "active" or "inactive"'
                });
            }
            updateFields.push('status = ?');
            params.push(status);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        params.push(id);

        const sql = `UPDATE waiters SET ${updateFields.join(', ')} WHERE id = ?`;
        const result = await query(sql, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Waiter not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Waiter updated successfully'
        });
    } catch (error) {
        console.error('Error updating waiter:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update waiter',
            error: error.message
        });
    }
};

// Delete waiter
const deleteWaiter = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if waiter has feedback entries
        const checkFeedbackSql = 'SELECT COUNT(*) as feedback_count FROM feedback WHERE waiter_id = ?';
        const [feedbackCheck] = await query(checkFeedbackSql, [id]);

        if (feedbackCheck.feedback_count > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete waiter with existing feedback entries. Consider marking as inactive instead.'
            });
        }

        const sql = 'DELETE FROM waiters WHERE id = ?';
        const result = await query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Waiter not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Waiter deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting waiter:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete waiter',
            error: error.message
        });
    }
};

// Get waiter statistics
const getWaiterStats = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `
            SELECT
                w.id,
                w.name,
                w.status,
                COUNT(f.id) as total_feedbacks,
                ROUND(AVG(f.rating), 2) as average_rating,
                SUM(CASE WHEN f.rating >= 4 THEN 1 ELSE 0 END) as positive_feedbacks,
                SUM(CASE WHEN f.rating <= 2 THEN 1 ELSE 0 END) as negative_feedbacks,
                SUM(CASE WHEN f.rating = 5 THEN 1 ELSE 0 END) as five_star,
                SUM(CASE WHEN f.rating = 4 THEN 1 ELSE 0 END) as four_star,
                SUM(CASE WHEN f.rating = 3 THEN 1 ELSE 0 END) as three_star,
                SUM(CASE WHEN f.rating = 2 THEN 1 ELSE 0 END) as two_star,
                SUM(CASE WHEN f.rating = 1 THEN 1 ELSE 0 END) as one_star
            FROM waiters w
            LEFT JOIN feedback f ON w.id = f.waiter_id
            WHERE w.id = ?
            GROUP BY w.id, w.name, w.status
        `;

        const results = await query(sql, [id]);

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Waiter not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Waiter statistics retrieved successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Error getting waiter stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve waiter statistics',
            error: error.message
        });
    }
};

module.exports = {
    getAllWaiters,
    getWaiterById,
    createWaiter,
    updateWaiter,
    deleteWaiter,
    getWaiterStats
};
