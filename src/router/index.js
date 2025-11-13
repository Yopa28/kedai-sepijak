// ============================================
// Vue Router Configuration
// Kedai Sepijak Frontend + Admin Dashboard
// ============================================

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Import public views
import Home from "../views/Home.vue";
import FeedbackPage from "../views/FeedbackPage.vue";
import PollingPage from "../views/PollingPage.vue";
import MenuPage from "../views/MenuPage.vue";

// Import public feedback submission
// import PublicFeedback from "../views/public/PublicFeedback.vue"; // TODO: Create this file

// Import admin views (lazy loading for better performance)
import AdminLogin from "../views/admin/AdminLogin.vue";
import AdminLayout from "../views/admin/AdminLayout.vue";
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
      title: "Kedai Sepijak - Home",
      description: "Kedai kopi tradisional di Purwokerto",
    },
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: FeedbackPage,
    meta: {
      title: "Feedback - Kedai Sepijak",
      description: "Share your experience and feedback",
    },
  },
  {
    path: "/polling",
    name: "Polling",
    component: PollingPage,
    meta: {
      title: "Polling Event - Kedai Sepijak",
      description: "Vote for the next event at Kedai Sepijak",
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: MenuPage,
    meta: {
      title: "Menu Lengkap - Kedai Sepijak",
      description: "Lihat semua menu kopi, makanan, dan minuman di Kedai Sepijak",
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
        component: () => import("../views/admin/AdminDashboard.vue"),
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
    ],
  },

  // ==========================================
  // 404 NOT FOUND
  // ==========================================
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/",
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
    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
      // Try to restore session from server
      const isValid = await authStore.checkSession();

      if (!isValid) {
        // Not authenticated, redirect to login
        next({
          name: "AdminLogin",
          query: { redirect: to.fullPath },
        });
        return;
      }
    }
    // User is authenticated, proceed
    next();
  } else if (isGuest) {
    // Guest routes (login page)
    if (authStore.isAuthenticated) {
      // Already logged in, redirect to dashboard
      next({ name: "AdminDashboard" });
      return;
    }
    next();
  } else {
    // Public routes
    next();
  }
});

// Global error handler
router.onError((error) => {
  console.error("Router error:", error);
});

export default router;
