// ============================================
// Dashboard Store
// Kedai Sepijak Frontend
// ============================================

import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api"; // Gunakan instance api yang sudah dikonfigurasi

export const useDashboardStore = defineStore("dashboard", () => {
  // State
  const statistics = ref({
    total_feedback: 0,
    today_feedback: 0,
    week_feedback: 0,
    month_feedback: 0,
    active_waiters: 0,
    total_waiters: 0,
    active_polls: 0,
    total_polls: 0,
    today_votes: 0,
    total_votes: 0,
    available_vouchers: 0,
    used_vouchers: 0,
    total_vouchers: 0,
    average_rating: 0,
    today_average_rating: 0,
    feedback_growth: 0,
    rating_trend: "stable",
  });

  const recentFeedback = ref([]);
  const activePolls = ref([]);
  const topWaiters = ref([]);
  const feedbackByCategory = ref([]);
  const feedbackTrend = ref([]);
  const voucherStatistics = ref({
    total: 0,
    available: 0,
    used: 0,
    expired: 0,
    created_today: 0,
    used_today: 0,
    usage_rate: 0,
  });

  const loading = ref(false);
  const error = ref(null);
  const lastUpdated = ref(null);
  const autoRefreshInterval = ref(null);
  const isAutoRefreshEnabled = ref(true);

  // Actions
  async function fetchDashboardData() {
    loading.value = true;
    error.value = null;

    try {
      // Fetch main statistics
      const statsResponse = await api.get("/dashboard/stats", {
        withCredentials: true,
      });

      if (statsResponse.data.success) {
        statistics.value = statsResponse.data.data.statistics;
        lastUpdated.value = new Date();
      }

      // Fetch recent feedback
      try {
        const feedbackResponse = await api.get("/dashboard/recent-feedback?limit=5", {
          withCredentials: true,
        });
        console.log("Recent feedback response:", feedbackResponse.data);
        if (feedbackResponse.data.success) {
          recentFeedback.value = feedbackResponse.data.data;
          console.log("Recent feedback data:", recentFeedback.value);
        }
      } catch (feedbackErr) {
        console.warn("Failed to fetch recent feedback:", feedbackErr);
        recentFeedback.value = [];
      }

      // Fetch active polls
      try {
        const pollsResponse = await api.get("/dashboard/active-polls", {
          withCredentials: true,
        });
        console.log("Active polls response:", pollsResponse.data);
        if (pollsResponse.data.success) {
          activePolls.value = pollsResponse.data.data;
          console.log("Active polls data:", activePolls.value);
        }
      } catch (pollsErr) {
        console.warn("Failed to fetch active polls:", pollsErr);
        activePolls.value = [];
      }

      return { success: true };
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      error.value =
        err.response?.data?.message || err.message || "Terjadi kesalahan";
      return { success: false, message: error.value };
    } finally {
      loading.value = false;
    }
  }

  function clearError() {
    error.value = null;
  }

  // Auto-refresh functions
  function startAutoRefresh(intervalMs = 30000) { // Default 30 seconds
    if (autoRefreshInterval.value) {
      clearInterval(autoRefreshInterval.value);
    }
    
    if (isAutoRefreshEnabled.value) {
      autoRefreshInterval.value = setInterval(() => {
        console.log('🔄 Auto-refreshing dashboard data...');
        fetchDashboardData();
      }, intervalMs);
      
      console.log(`✅ Auto-refresh started (${intervalMs/1000}s interval)`);
    }
  }

  function stopAutoRefresh() {
    if (autoRefreshInterval.value) {
      clearInterval(autoRefreshInterval.value);
      autoRefreshInterval.value = null;
      console.log('🛑 Auto-refresh stopped');
    }
  }

  function toggleAutoRefresh() {
    isAutoRefreshEnabled.value = !isAutoRefreshEnabled.value;
    
    if (isAutoRefreshEnabled.value) {
      startAutoRefresh();
    } else {
      stopAutoRefresh();
    }
  }

  function resetDashboard() {
    statistics.value = {
      total_feedback: 0,
      today_feedback: 0,
      week_feedback: 0,
      month_feedback: 0,
      active_waiters: 0,
      total_waiters: 0,
      active_polls: 0,
      total_polls: 0,
      today_votes: 0,
      total_votes: 0,
      available_vouchers: 0,
      used_vouchers: 0,
      total_vouchers: 0,
      average_rating: 0,
      today_average_rating: 0,
      feedback_growth: 0,
      rating_trend: "stable",
    };
    recentFeedback.value = [];
    activePolls.value = [];
    topWaiters.value = [];
    feedbackByCategory.value = [];
    feedbackTrend.value = [];
    voucherStatistics.value = {
      total: 0,
      available: 0,
      used: 0,
      expired: 0,
      created_today: 0,
      used_today: 0,
      usage_rate: 0,
    };
  }

  return {
    // State
    statistics,
    recentFeedback,
    activePolls,
    topWaiters,
    feedbackByCategory,
    feedbackTrend,
    voucherStatistics,
    loading,
    error,
    lastUpdated,
    isAutoRefreshEnabled,

    // Actions
    fetchDashboardData,
    clearError,
    resetDashboard,
    startAutoRefresh,
    stopAutoRefresh,
    toggleAutoRefresh,
  };
});