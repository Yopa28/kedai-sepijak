import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/services/api"; // pastiin pathnya bener

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const error = ref(null);

  const isAdmin = computed(() =>
    ["super_admin", "admin"].includes(user.value?.role)
  );
  const userName = computed(() => user.value?.full_name || "Admin");
  const userRole = computed(() => user.value?.role || "");

  async function login(username, password) {
    loading.value = true; error.value = null;
    try {
      const res = await api.post("/auth/login", { username, password }, { withCredentials: true });
      if (!res.data?.success) throw new Error(res.data?.message || "Login gagal");

      user.value = res.data.data;
      isAuthenticated.value = true;

      // 🔑 token
      const token = res.data.token;
      localStorage.setItem("admin_user", JSON.stringify(res.data.data));
      localStorage.setItem("admin_token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true, data: res.data.data };
    } catch (err) {
      error.value = err.response?.data?.message || err.message || "Terjadi kesalahan saat login";
      isAuthenticated.value = false; user.value = null;
      return { success: false, message: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try { await api.post("/auth/logout", {}, { withCredentials: true }); } catch {}
    user.value = null; isAuthenticated.value = false;
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_token");
    delete api.defaults.headers.common["Authorization"];
  }

  async function checkSession() {
    loading.value = true;
    try {
      const res = await api.get("/auth/session", { withCredentials: true });
      if (res.data?.success && res.data?.logged_in) {
        user.value = res.data.data; isAuthenticated.value = true;
        localStorage.setItem("admin_user", JSON.stringify(res.data.data));
        // kalau backend juga set cookie, header masih tetap dari localStorage
        return true;
      }
      user.value = null; isAuthenticated.value = false;
      localStorage.removeItem("admin_user"); localStorage.removeItem("admin_token");
      delete api.defaults.headers.common["Authorization"];
      return false;
    } catch {
      user.value = null; isAuthenticated.value = false;
      localStorage.removeItem("admin_user"); localStorage.removeItem("admin_token");
      delete api.defaults.headers.common["Authorization"];
      return false;
    } finally { loading.value = false; }
  }

  function initFromStorage() {
    const storedUser = localStorage.getItem("admin_user");
    const storedToken = localStorage.getItem("admin_token");
    if (storedUser && storedToken) {
      try {
        user.value = JSON.parse(storedUser);
        isAuthenticated.value = true;
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      } catch {
        localStorage.removeItem("admin_user");
        localStorage.removeItem("admin_token");
      }
    }
  }

  function clearError() { error.value = null; }
  initFromStorage();

  return { user, isAuthenticated, loading, error, isAdmin, userName, userRole, login, logout, checkSession, initFromStorage, clearError };
});
