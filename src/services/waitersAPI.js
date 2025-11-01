// ============================================
// Waiters API Service
// Kedai Sepijak Frontend
// ============================================

import api, { handleApiResponse, handleApiError } from './api';

/**
 * Get all waiters
 * @param {Object} params - Query parameters (status)
 * @returns {Promise}
 */
export const getAllWaiters = async (params = {}) => {
    try {
        const response = await api.get('/waiters', { params });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get waiter by ID
 * @param {number} id - Waiter ID
 * @returns {Promise}
 */
export const getWaiterById = async (id) => {
    try {
        const response = await api.get(`/waiters/${id}`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get waiter statistics
 * @param {number} id - Waiter ID
 * @returns {Promise}
 */
export const getWaiterStats = async (id) => {
    try {
        const response = await api.get(`/waiters/${id}/stats`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Create new waiter (Admin)
 * @param {Object} waiterData - Waiter data
 * @param {string} waiterData.name - Waiter name
 * @param {string} waiterData.status - Status (active/inactive)
 * @returns {Promise}
 */
export const createWaiter = async (waiterData) => {
    try {
        const response = await api.post('/waiters', waiterData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Update waiter (Admin)
 * @param {number} id - Waiter ID
 * @param {Object} waiterData - Updated waiter data
 * @returns {Promise}
 */
export const updateWaiter = async (id, waiterData) => {
    try {
        const response = await api.put(`/waiters/${id}`, waiterData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Delete waiter (Admin)
 * @param {number} id - Waiter ID
 * @returns {Promise}
 */
export const deleteWaiter = async (id) => {
    try {
        const response = await api.delete(`/waiters/${id}`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

export default {
    getAllWaiters,
    getWaiterById,
    getWaiterStats,
    createWaiter,
    updateWaiter,
    deleteWaiter
};
