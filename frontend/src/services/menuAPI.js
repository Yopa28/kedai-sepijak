// ============================================
// Menu API Service
// Kedai Sepijak Frontend
// ============================================

import api, { handleApiResponse, handleApiError } from './api';

/**
 * Get all menu items
 * @param {Object} params - Query parameters (category_id, is_available, is_featured, limit, offset)
 * @returns {Promise}
 */
export const getAllMenuItems = async (params = {}) => {
    try {
        const response = await api.get('/menu', { params });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get menu items grouped by category
 * @returns {Promise}
 */
export const getMenuByCategory = async () => {
    try {
        const response = await api.get('/menu/by-category');
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get menu item by ID
 * @param {number} id - Menu item ID
 * @returns {Promise}
 */
export const getMenuItemById = async (id) => {
    try {
        const response = await api.get(`/menu/${id}`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Get all categories
 * @returns {Promise}
 */
export const getAllCategories = async () => {
    try {
        const response = await api.get('/menu/categories');
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Create new menu item (Admin)
 * @param {Object} menuData - Menu item data
 * @returns {Promise}
 */
export const createMenuItem = async (menuData) => {
    try {
        const response = await api.post('/menu', menuData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Update menu item (Admin)
 * @param {number} id - Menu item ID
 * @param {Object} menuData - Updated menu data
 * @returns {Promise}
 */
export const updateMenuItem = async (id, menuData) => {
    try {
        const response = await api.put(`/menu/${id}`, menuData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Delete menu item (Admin)
 * @param {number} id - Menu item ID
 * @returns {Promise}
 */
export const deleteMenuItem = async (id) => {
    try {
        const response = await api.delete(`/menu/${id}`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Create new category (Admin)
 * @param {Object} categoryData - Category data
 * @returns {Promise}
 */
export const createCategory = async (categoryData) => {
    try {
        const response = await api.post('/menu/categories', categoryData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Update category (Admin)
 * @param {number} id - Category ID
 * @param {Object} categoryData - Updated category data
 * @returns {Promise}
 */
export const updateCategory = async (id, categoryData) => {
    try {
        const response = await api.put(`/menu/categories/${id}`, categoryData);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Delete category (Admin)
 * @param {number} id - Category ID
 * @returns {Promise}
 */
export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/menu/categories/${id}`);
        return handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
};

export default {
    getAllMenuItems,
    getMenuByCategory,
    getMenuItemById,
    getAllCategories,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    createCategory,
    updateCategory,
    deleteCategory
};
