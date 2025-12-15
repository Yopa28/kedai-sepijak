import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/services/api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const error = ref(null);
  const initialized = ref(false);

  const STORAGE_KEYS = {
    user: "admin_user",
    token: "admin_token",
  };

  const isAdmin = computed(() =>
    ["super_admin", "admin"].includes(user.value?.role)
  );
  const userName = computed(() => user.value?.full_name || "Admin");
  const userRole = computed(() => user.value?.role || "");

  const setSession = (profile, token) => {
    user.value = profile;
    isAuthenticated.value = true;
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(profile));
    if (token) {
      localStorage.setItem(STORAGE_KEYS.token, token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };

  const clearSession = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.token);
    delete api.defaults.headers.common["Authorization"];
  };

  async function login(username, password, options = {}) {
    loading.value = true;
    error.value = null;
    try {
      const payload = { username, password };
      if (options.recaptchaToken) {
        payload.recaptchaToken = options.recaptchaToken;
      }

      const res = await api.post(
        "/auth/login",
        payload,
        { withCredentials: true },
      );
      if (!res.data?.success) throw new Error(res.data?.message || "Login gagal");

      setSession(res.data.data, res.data.token);

      return { success: true, data: res.data.data };
    } catch (err) {
      const responseData = err.response?.data;
      error.value =
        responseData?.message || err.message || "Terjadi kesalahan saat login";
      clearSession();
      return {
        success: false,
        message: error.value,
        captchaRequired: Boolean(responseData?.captchaRequired),
      };
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.warn("Logout error", err?.message);
    } finally {
      clearSession();
    }
  }

  async function checkSession({ force = false } = {}) {
    if (!force && isAuthenticated.value) return true;

    loading.value = true;
    try {
      const res = await api.get("/auth/session", { withCredentials: true });
      if (res.data?.success && res.data?.logged_in) {
        setSession(res.data.data);
        return true;
      }
      clearSession();
      return false;
    } catch {
      clearSession();
      return false;
    } finally {
      loading.value = false;
      initialized.value = true;
    }
  }

  function initFromStorage() {
    if (initialized.value) return;
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    const storedToken = localStorage.getItem(STORAGE_KEYS.token);
    if (storedUser && storedToken) {
      try {
        const parsed = JSON.parse(storedUser);
        setSession(parsed, storedToken);
      } catch {
        clearSession();
      }
    }
    initialized.value = true;
  }

  let sessionPromise = null;
  async function ensureSession() {
    if (isAuthenticated.value) return true;
    if (!initialized.value) initFromStorage();

    if (isAuthenticated.value) return true;

    if (!sessionPromise) {
      sessionPromise = checkSession({ force: true }).finally(() => {
        sessionPromise = null;
      });
    }
    return sessionPromise;
  }

  function clearError() {
    error.value = null;
  }

  initFromStorage();

  return {
    user,
    isAuthenticated,
    loading,
    error,
    isAdmin,
    userName,
    userRole,
    initialized,
    login,
    logout,
    checkSession,
    ensureSession,
    initFromStorage,
    clearError,
  };
});
