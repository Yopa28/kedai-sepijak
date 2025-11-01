// ============================================
// Feedback API Service
// Kedai Sepijak Frontend
// ============================================

import api, { handleApiResponse, handleApiError } from './api';

/**
 * Get all feedback
 * @param {Object} params - Query parameters (status, waiter_id, rating, limit, offset)
 * @returns {Promise}
 */
export const getAllFeedback = async (params = {}) => {
    try {
        const response = await api.get('/feedback', { params });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get feedback by ID
 * @param {number} id - Feedback ID
 * @returns {Promise}
 */
export const getFeedbackById = async (id) => {
    try {
        const response = await api.get(`/feedback/${id}`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Submit new feedback
 * @param {Object} feedbackData - Feedback data
 * @param {string} feedbackData.name - Customer name
 * @param {string} feedbackData.contact - Contact (phone/bill ID)
 * @param {string} feedbackData.date_of_visit - Date of visit (YYYY-MM-DD)
 * @param {number} feedbackData.waiter_id - Waiter ID
 * @param {number} feedbackData.rating - Rating (1-5)
 * @param {string} feedbackData.message - Feedback message
 * @returns {Promise}
 */
export const submitFeedback = async (feedbackData) => {
    try {
        const response = await api.post('/feedback', feedbackData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Update feedback status
 * @param {number} id - Feedback ID
 * @param {string} status - New status (pending, reviewed, approved, rejected)
 * @returns {Promise}
 */
export const updateFeedbackStatus = async (id, status) => {
    try {
        const response = await api.put(`/feedback/${id}/status`, { status });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Delete feedback
 * @param {number} id - Feedback ID
 * @returns {Promise}
 */
export const deleteFeedback = async (id) => {
    try {
        const response = await api.delete(`/feedback/${id}`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get feedback statistics
 * @returns {Promise}
 */
export const getFeedbackStats = async () => {
    try {
        const response = await api.get('/feedback/stats');
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get waiter performance report
 * @returns {Promise}
 */
export const getWaiterPerformance = async () => {
    try {
        const response = await api.get('/feedback/waiter-performance');
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

export default {
    getAllFeedback,
    getFeedbackById,
    submitFeedback,
    updateFeedbackStatus,
    deleteFeedback,
    getFeedbackStats,
    getWaiterPerformance
};
