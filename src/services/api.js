// ============================================
// API Configuration
// Kedai Sepijak Frontend
// ============================================

import axios from "axios";

// Base URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

const ADMIN_TOKEN_KEY = "admin_token";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add timestamp to request
    config.metadata = { startTime: new Date() };

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(
        `📤 ${config.method.toUpperCase()} ${config.url}`,
        config.data,
      );
    }

    // Add auth token if available
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata.startTime;

    // Log response in development
    if (import.meta.env.DEV) {
      console.log(
        `📥 ${response.config.method.toUpperCase()} ${response.config.url} - ${duration}ms`,
        response.data,
      );
    }

    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      console.error("Response error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url,
      });

      // Handle specific status codes
      switch (error.response.status) {
        case 401:
        case 403:
          // Unauthorized / Forbidden: clear local token so guard can handle re-login
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          delete api.defaults.headers.common["Authorization"];
          console.warn("Authorization error", error.response.status);
          break;
        case 404:
          // Not found
          console.warn("Resource not found");
          break;
        case 500:
          // Server error
          console.error("Server error");
          break;
        default:
          console.error("API error:", error.response.data.message);
      }
    } else if (error.request) {
      // Request made but no response
      console.error("No response from server:", error.request);
    } else {
      // Error in request configuration
      console.error("Request configuration error:", error.message);
    }

    return Promise.reject(error);
  },
);

// Initialize default header from storage on first load
setAuthHeader(localStorage.getItem(ADMIN_TOKEN_KEY));

// Helper function to handle API responses
export const handleApiResponse = (response) => {
  if (response.data.success) {
    return response.data;
  }
  throw new Error(response.data.message || "API request failed");
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return {
      success: false,
      message: error.response.data.message,
      error: error.response.data,
    };
  }

  return {
    success: false,
    message: error.message || "An unexpected error occurred",
    error: error,
  };
};

export default api;
