// ============================================
// Vue Router Configuration
// Kedai Sepijak Frontend + Admin Dashboard
// ============================================

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Import public views
import Home from "../views/HomeEditorial.vue";
import FeedbackPage from "../views/FeedbackEditorial.vue";
import PollingPage from "../views/PollingEditorial.vue";
import MenuPage from "../views/MenuPage.vue";
import NotFound from "../views/NotFound.vue";

// Import public feedback submission
// import PublicFeedback from "../views/public/PublicFeedback.vue"; // TODO: Create this file

// Import admin views (lazy loading for better performance)
import AdminLogin from "../views/admin/AdminLoginTail.vue";
import AdminLayout from "../views/admin/AdminLayoutTail.vue";
// Other admin views will be lazy loaded

const routes = [
  // ==========================================
  // PUBLIC ROUTES
  // ==========================================
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Kedai Sepijak — Coffee, Food & Space in Purwokerto",
      description: "Kopi, makanan, dan ruang untuk setiap cerita di Purwokerto.",
    },
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: FeedbackPage,
    meta: {
      title: "Feedback — Kedai Sepijak",
      description: "Bagikan pengalamanmu di Kedai Sepijak.",
    },
  },
  {
    path: "/polling",
    name: "Polling",
    component: PollingPage,
    meta: {
      title: "Polling — Kedai Sepijak",
      description: "Ikut menentukan acara berikutnya di Kedai Sepijak.",
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: MenuPage,
    meta: {
      title: "Menu — Kedai Sepijak Purwokerto",
      description: "Lihat kopi, minuman, dan makanan dari Kedai Sepijak.",
    },
  },
  // Temporarily disabled until PublicFeedback.vue is created
  // {
  //   path: "/submit-feedback",
  //   name: "PublicFeedback",
  //   component: PublicFeedback,
  //   meta: {
  //     title: "Berikan Feedback - Kedai Sepijak",
  //     description: "Submit your feedback and get discount voucher",
  //     public: true,
  //   },
  // },

  // ==========================================
  // ADMIN ROUTES
  // ==========================================
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: {
      title: "Admin Login - Kedai Sepijak",
      guest: true,
    },
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("../views/admin/AdminDashboardTail.vue"),
        meta: {
          title: "Dashboard - Kedai Sepijak Admin",
          requiresAuth: true,
        },
      },
      {
        path: "waiters",
        name: "AdminWaiters",
        component: () => import("../views/admin/AdminWaiters.vue"),
        meta: {
          title: "Kelola Pelayan - Kedai Sepijak Admin",
          requiresAuth: true,
        },
      },
      {
        path: "feedback",
        name: "AdminFeedback",
        component: () => import("../views/admin/AdminFeedback.vue"),
        meta: {
          title: "Feedback - Kedai Sepijak Admin",
          requiresAuth: true,
        },
      },
      {
        path: "polls",
        name: "AdminPolls",
        component: () => import("../views/admin/AdminPolls.vue"),
        meta: {
          title: "Polling & Event - Kedai Sepijak Admin",
          requiresAuth: true,
        },
      },
      {
        path: "sentiment",
        name: "AdminSentiment",
        component: () => import("../components/SentimentAnalytics.vue"),
        meta: {
          title: "Sentiment Analysis (AI) - Kedai Sepijak Admin",
          requiresAuth: true,
        },
      },
    ],
  },

  // ==========================================
  // 404 NOT FOUND
  // ==========================================
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Halaman Tidak Ditemukan - Kedai Sepijak",
      description: "Halaman yang Anda cari tidak tersedia.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        top: 84,
        behavior: "smooth",
      };
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// ==========================================
// NAVIGATION GUARDS
// ==========================================

router.beforeEach(async (to, from, next) => {
  // Set page title
  document.title = to.meta.title || "Kedai Sepijak";

  // Set meta description
  if (to.meta.description) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", to.meta.description);
    }
  }

  // Check authentication for protected routes
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isGuest = to.matched.some((record) => record.meta.guest);

  if (requiresAuth) {
    const hasSession = await authStore.ensureSession();
    if (!hasSession) {
      next({
        name: "AdminLogin",
        query: { redirect: encodeURIComponent(to.fullPath) },
      });
      return;
    }
    next();
    return;
  }

  if (isGuest && authStore.isAuthenticated) {
    const redirectTarget = from?.name && from?.name !== "AdminLogin"
      ? { path: from.fullPath }
      : { name: "AdminDashboard" };
    next(redirectTarget);
    return;
  }

  next();
});

// Global error handler
router.onError((error) => {
  console.error("Router error:", error);
});

export default router;
