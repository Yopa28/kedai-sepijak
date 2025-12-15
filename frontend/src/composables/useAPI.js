import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

// API Base URL from environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export function useAPI() {
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();
  const authStore = useAuthStore();

  // Configure axios defaults
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Content-Type"] = "application/json";

  // Add response interceptor for handling 401 errors
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Unauthorized - redirect to login
        authStore.logout();
        router.push("/admin/login");
      }
      return Promise.reject(error);
    },
  );

  /**
   * Make GET request
   */
  async function get(endpoint, params = {}) {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        params,
        withCredentials: true,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Request failed";
      return {
        success: false,
        message: error.value,
      };
    } finally {
      loading.value = false;
    }
  }

  /**
   * Make POST request
   */
  async function post(endpoint, data = {}) {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
        withCredentials: true,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Request failed";
      return {
        success: false,
        message: error.value,
      };
    } finally {
      loading.value = false;
    }
  }

  /**
   * Make PUT request
   */
  async function put(endpoint, data = {}) {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
        withCredentials: true,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Request failed";
      return {
        success: false,
        message: error.value,
      };
    } finally {
      loading.value = false;
    }
  }

  /**
   * Make DELETE request
   */
  async function del(endpoint, params = {}) {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.delete(`${API_BASE_URL}${endpoint}`, {
        params,
        withCredentials: true,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Request failed";
      return {
        success: false,
        message: error.value,
      };
    } finally {
      loading.value = false;
    }
  }

  /**
   * Fetch waiters
   */
  async function fetchWaiters(params = {}) {
    return await get("/waiters.php", params);
  }

  /**
   * Fetch single waiter
   */
  async function fetchWaiter(id) {
    return await get("/waiters.php", { id });
  }

  /**
   * Create waiter
   */
  async function createWaiter(data) {
    return await post("/waiters.php", data);
  }

  /**
   * Update waiter
   */
  async function updateWaiter(data) {
    return await put("/waiters.php", data);
  }

  /**
   * Delete waiter
   */
  async function deleteWaiter(id) {
    return await del("/waiters.php", { id });
  }

  /**
   * Fetch feedback
   */
  async function fetchFeedback(params = {}) {
    return await get("/feedback.php", params);
  }

  /**
   * Fetch single feedback
   */
  async function fetchFeedbackItem(id) {
    return await get("/feedback.php", { id });
  }

  /**
   * Submit feedback (public)
   */
  async function submitFeedback(data) {
    return await post("/feedback.php", data);
  }

  /**
   * Update feedback
   */
  async function updateFeedback(data) {
    return await put("/feedback.php", data);
  }

  /**
   * Delete feedback
   */
  async function deleteFeedback(id) {
    return await del("/feedback.php", { id });
  }

  /**
   * Fetch polls
   */
  async function fetchPolls(params = {}) {
    return await get("/polls.php", params);
  }

  /**
   * Fetch single poll
   */
  async function fetchPoll(id) {
    return await get("/polls.php", { id });
  }

  /**
   * Fetch poll results
   */
  async function fetchPollResults(id) {
    return await get("/polls.php", { action: "results", id });
  }

  /**
   * Create poll
   */
  async function createPoll(data) {
    return await post("/polls.php", data);
  }

  /**
   * Vote on poll
   */
  async function votePoll(data) {
    return await post("/polls.php", { ...data, action: "vote" });
  }

  /**
   * Update poll
   */
  async function updatePoll(data) {
    return await put("/polls.php", data);
  }

  /**
   * Delete poll
   */
  async function deletePoll(id) {
    return await del("/polls.php", { id });
  }

  /**
   * Clear error
   */
  function clearError() {
    error.value = null;
  }

  return {
    loading,
    error,

    // Generic methods
    get,
    post,
    put,
    del,

    // Waiters
    fetchWaiters,
    fetchWaiter,
    createWaiter,
    updateWaiter,
    deleteWaiter,

    // Feedback
    fetchFeedback,
    fetchFeedbackItem,
    submitFeedback,
    updateFeedback,
    deleteFeedback,

    // Polls
    fetchPolls,
    fetchPoll,
    fetchPollResults,
    createPoll,
    votePoll,
    updatePoll,
    deletePoll,

    // Utility
    clearError,
    API_BASE_URL,
  };
}
