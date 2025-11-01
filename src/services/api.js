// ============================================
// API Configuration
// Kedai Sepijak Frontend
// ============================================

import axios from 'axios';

// Base URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add timestamp to request
        config.metadata = { startTime: new Date() };

        // Log request in development
        if (import.meta.env.DEV) {
            console.log(`📤 ${config.method.toUpperCase()} ${config.url}`, config.data);
        }

        // Add auth token if available (for future use)
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Calculate request duration
        const duration = new Date() - response.config.metadata.startTime;

        // Log response in development
        if (import.meta.env.DEV) {
            console.log(`📥 ${response.config.method.toUpperCase()} ${response.config.url} - ${duration}ms`, response.data);
        }

        return response;
    },
    (error) => {
        // Handle errors
        if (error.response) {
            // Server responded with error status
            console.error('Response error:', {
                status: error.response.status,
                data: error.response.data,
                url: error.config.url
            });

            // Handle specific status codes
            switch (error.response.status) {
                case 401:
                    // Unauthorized - redirect to login (if implemented)
                    console.warn('Unauthorized access');
                    break;
                case 403:
                    // Forbidden
                    console.warn('Access forbidden');
                    break;
                case 404:
                    // Not found
                    console.warn('Resource not found');
                    break;
                case 500:
                    // Server error
                    console.error('Server error');
                    break;
                default:
                    console.error('API error:', error.response.data.message);
            }
        } else if (error.request) {
            // Request made but no response
            console.error('No response from server:', error.request);
        } else {
            // Error in request configuration
            console.error('Request configuration error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Helper function to handle API responses
export const handleApiResponse = (response) => {
    if (response.data.success) {
        return response.data;
    }
    throw new Error(response.data.message || 'API request failed');
};

// Helper function to handle API errors
export const handleApiError = (error) => {
    if (error.response?.data?.message) {
        return {
            success: false,
            message: error.response.data.message,
            error: error.response.data
        };
    }

    return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        error: error
    };
};

export default api;
