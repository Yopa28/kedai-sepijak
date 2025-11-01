// ============================================
// Polling API Service
// Kedai Sepijak Frontend
// ============================================

import api, { handleApiResponse, handleApiError } from './api';

/**
 * Get all active poll options with results
 * @returns {Promise}
 */
export const getAllPollOptions = async () => {
    try {
        const response = await api.get('/polling');
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get poll option by ID
 * @param {number} id - Poll option ID
 * @returns {Promise}
 */
export const getPollOptionById = async (id) => {
    try {
        const response = await api.get(`/polling/${id}`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Submit vote with customer validation
 * @param {Object} voteData - Vote data
 * @param {number} voteData.poll_option_id - Poll option ID
 * @param {string} voteData.customer_name - Customer name (min 3 characters)
 * @param {string} voteData.customer_phone - Customer phone (min 10 digits)
 * @param {string} voteData.customer_email - Customer email (optional)
 * @returns {Promise}
 */
export const submitVote = async (voteData) => {
    try {
        const response = await api.post('/polling/vote', voteData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Check if customer has voted
 * @param {string} phone - Customer phone number
 * @returns {Promise}
 */
export const checkVoteStatus = async (phone) => {
    try {
        const response = await api.get('/polling/check-vote', {
            params: { phone }
        });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get poll statistics
 * @returns {Promise}
 */
export const getPollStatistics = async () => {
    try {
        const response = await api.get('/polling/statistics');
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Create new poll option (Admin)
 * @param {Object} pollData - Poll option data
 * @param {string} pollData.name - Poll option name
 * @param {string} pollData.description - Description (optional)
 * @param {string} pollData.image_url - Image URL (optional)
 * @param {string} pollData.start_date - Start date (optional)
 * @param {string} pollData.end_date - End date (optional)
 * @returns {Promise}
 */
export const createPollOption = async (pollData) => {
    try {
        const response = await api.post('/polling', pollData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Update poll option (Admin)
 * @param {number} id - Poll option ID
 * @param {Object} pollData - Updated poll data
 * @returns {Promise}
 */
export const updatePollOption = async (id, pollData) => {
    try {
        const response = await api.put(`/polling/${id}`, pollData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Delete poll option (Admin)
 * @param {number} id - Poll option ID
 * @returns {Promise}
 */
export const deletePollOption = async (id) => {
    try {
        const response = await api.delete(`/polling/${id}`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

export default {
    getAllPollOptions,
    getPollOptionById,
    submitVote,
    checkVoteStatus,
    getPollStatistics,
    createPollOption,
    updatePollOption,
    deletePollOption
};
