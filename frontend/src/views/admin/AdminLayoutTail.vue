<template>
  <div :class="['admin-shell', { 'admin-dark': darkMode }]">
    <aside :class="['admin-sidebar', { 'is-open': sidebarOpen, 'is-collapsed': sidebarCollapsed }]">
      <div class="sidebar-brand">
        <img class="brand-logo" src="@/assets/images/logo-sepijak.png" alt="Logo Kedai Sepijak" />
        <div v-if="!sidebarCollapsed" class="brand-copy">
          <strong>Kedai Sepijak</strong>
          <span>Management system</span>
        </div>
        <button v-if="!sidebarCollapsed" class="sidebar-close mobile-only" type="button" aria-label="Tutup navigasi" @click="closeSidebar">
          <X :size="20" />
        </button>
      </div>

      <div v-if="!sidebarCollapsed" class="sidebar-section-label">Workspace</div>
      <nav class="sidebar-nav" aria-label="Navigasi utama">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          :title="sidebarCollapsed ? item.label : undefined"
          :class="['sidebar-link', { 'is-active': isActiveRoute(item.path) }]"
          @click="closeSidebarOnMobile"
        >
          <component :is="item.icon" :size="19" stroke-width="1.9" />
          <span v-if="!sidebarCollapsed">{{ item.label }}</span>
          <span v-if="!sidebarCollapsed && isActiveRoute(item.path)" class="active-dot"></span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="sidebar-link sidebar-collapse" type="button" :title="sidebarCollapsed ? 'Buka sidebar' : 'Ciutkan sidebar'" @click="sidebarCollapsed = !sidebarCollapsed">
          <ChevronRight v-if="sidebarCollapsed" :size="19" />
          <ChevronLeft v-else :size="19" />
          <span v-if="!sidebarCollapsed">Ciutkan menu</span>
        </button>
        <button class="sidebar-link logout-link" type="button" title="Keluar" @click="handleLogout">
          <LogOut :size="19" />
          <span v-if="!sidebarCollapsed">Keluar</span>
        </button>
      </div>
    </aside>

    <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>

    <div class="admin-main">
      <header class="admin-header">
        <div class="header-left">
          <button class="icon-button mobile-only" type="button" aria-label="Buka navigasi" @click="toggleSidebar">
            <Menu :size="21" />
          </button>
          <div>
            <p class="eyebrow">Kedai Sepijak / Admin</p>
            <h1>{{ pageTitle }}</h1>
          </div>
        </div>

        <div class="header-actions">
          <label class="header-search desktop-only">
            <Search :size="17" />
            <input type="search" placeholder="Cari sesuatu..." aria-label="Cari" />
            <kbd>⌘ K</kbd>
          </label>
          <button class="icon-button" type="button" title="Notifikasi" aria-label="Notifikasi">
            <Bell :size="18" />
            <span class="notification-dot"></span>
          </button>
          <button class="icon-button" type="button" title="Ubah tema" aria-label="Ubah tema" @click="toggleDarkMode">
            <Sun v-if="darkMode" :size="18" />
            <Moon v-else :size="18" />
          </button>
          <div class="profile-divider"></div>
          <button class="profile-button" type="button" aria-label="Menu profil">
            <span class="profile-avatar">{{ userInitials }}</span>
            <span class="profile-copy desktop-only">
              <strong>{{ userName }}</strong>
              <small>{{ userRole }}</small>
            </span>
            <ChevronDown class="desktop-only" :size="16" />
          </button>
        </div>
      </header>

      <main class="admin-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { BarChart3, Bell, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, LogOut, Menu, MessageSquare, Moon, Search, Sun, UsersRound, X } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);
const darkMode = ref(false);

const menuItems = [
  { name: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: BarChart3 },
  { name: "waiters", label: "Pelayan", path: "/admin/waiters", icon: UsersRound },
  { name: "feedback", label: "Feedback", path: "/admin/feedback", icon: MessageSquare },
  { name: "polls", label: "Polling & Event", path: "/admin/polls", icon: CalendarDays },
  { name: "sentiment", label: "Sentiment Analytics", path: "/admin/sentiment", icon: BarChart3 },
];

const pageTitle = computed(() => ({
  "/admin/dashboard": "Dashboard overview",
  "/admin/waiters": "Kelola pelayan",
  "/admin/feedback": "Feedback pelanggan",
  "/admin/polls": "Polling & event",
  "/admin/sentiment": "Sentiment analytics",
}[route.path] || "Admin dashboard"));

const userName = computed(() => authStore.userName);
const userRole = computed(() => authStore.userRole === "super_admin" ? "Super Admin" : "Admin");
const userInitials = computed(() => (authStore.userName || "Admin").split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase());

function isActiveRoute(path) { return route.path === path; }
function toggleSidebar() { sidebarOpen.value = !sidebarOpen.value; }
function closeSidebar() { sidebarOpen.value = false; }
function closeSidebarOnMobile() { if (window.innerWidth < 1024) closeSidebar(); }
function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle("dark", darkMode.value);
  localStorage.setItem("kedai-theme", darkMode.value ? "dark" : "light");
}
async function handleLogout() { await authStore.logout(); router.push("/admin/login"); }

onMounted(() => {
  darkMode.value = localStorage.getItem("kedai-theme") === "dark";
  document.documentElement.classList.toggle("dark", darkMode.value);
});
</script>

<style>
.admin-shell {
  --admin-bg: #f5f7fb;
  --admin-surface: #ffffff;
  --admin-border: #e5e7eb;
  --admin-text: #111827;
  --admin-muted: #6b7280;
  --admin-accent: #1e4d3b;
  --admin-accent-soft: #e7f1ec;
  min-height: 100vh;
  background: var(--admin-bg);
  color: var(--admin-text);
  transition: background-color 180ms ease, color 180ms ease;
}
.admin-shell.admin-dark { --admin-bg: #111827; --admin-surface: #182233; --admin-border: #2c394d; --admin-text: #f3f4f6; --admin-muted: #9ca3af; --admin-accent-soft: #213b34; }
.admin-sidebar { position: fixed; inset: 0 auto 0 0; z-index: 50; display: flex; width: 260px; flex-direction: column; border-right: 1px solid #263e35; background: #14251f; color: #d1ddd8; transition: width 220ms ease, transform 220ms ease; }
.admin-sidebar.is-collapsed { width: 78px; }
.sidebar-brand { display: flex; min-height: 82px; align-items: center; gap: 11px; border-bottom: 1px solid #263e35; padding: 20px; }
.admin-sidebar.is-collapsed .sidebar-brand { justify-content: center; padding: 20px 10px; }
.brand-logo { height: 38px; width: 38px; flex: 0 0 auto; border-radius: 50%; object-fit: cover; }
.brand-copy { display: flex; min-width: 0; flex-direction: column; }
.brand-copy strong { color: #fff; font-size: 14px; letter-spacing: .01em; }
.brand-copy span { margin-top: 2px; color: #91aaa0; font-size: 11px; }
.sidebar-section-label { padding: 26px 20px 9px; color: #6f8c80; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.sidebar-nav { display: flex; flex: 1; flex-direction: column; gap: 5px; padding: 0 12px; }
.sidebar-link { position: relative; display: flex; min-height: 42px; align-items: center; gap: 12px; border-radius: 8px; padding: 0 12px; color: #9db3aa; font-size: 13px; font-weight: 600; text-decoration: none; transition: background-color 160ms ease, color 160ms ease; }
.is-collapsed .sidebar-link { justify-content: center; padding: 0; }
.sidebar-link:hover { background: #203b31; color: #fff; }
.sidebar-link.is-active { background: #d3a15b; color: #18251f; box-shadow: 0 8px 18px rgba(0,0,0,.14); }
.active-dot { margin-left: auto; height: 5px; width: 5px; border-radius: 999px; background: #18251f; }
.sidebar-footer { display: flex; flex-direction: column; gap: 5px; border-top: 1px solid #263e35; padding: 14px 12px 18px; }
.sidebar-collapse, .logout-link { border: 0; background: transparent; font: inherit; cursor: pointer; }
.logout-link:hover { background: #492b2b; color: #f5b4b4; }
.admin-main { min-height: 100vh; margin-left: 260px; transition: margin-left 220ms ease; }
.admin-sidebar.is-collapsed ~ .admin-main { margin-left: 78px; }
.admin-header { position: sticky; top: 0; z-index: 20; display: flex; min-height: 82px; align-items: center; justify-content: space-between; gap: 20px; border-bottom: 1px solid var(--admin-border); background: var(--admin-surface); padding: 16px 32px; }
.header-left, .header-actions, .profile-button, .header-search { display: flex; align-items: center; }
.header-left { gap: 14px; }
.eyebrow { margin: 0 0 4px; color: var(--admin-muted); font-size: 11px; font-weight: 600; }
.header-left h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -.02em; }
.header-actions { gap: 11px; }
.header-search { width: min(250px, 28vw); gap: 8px; border: 1px solid var(--admin-border); border-radius: 7px; background: var(--admin-surface); padding: 8px 10px; color: var(--admin-muted); }
.header-search input { min-width: 0; flex: 1; border: 0; outline: 0; background: transparent; color: var(--admin-text); font-size: 12px; }
.header-search kbd { border: 1px solid var(--admin-border); border-radius: 4px; padding: 2px 5px; color: var(--admin-muted); font-size: 10px; }
.icon-button, .profile-button { position: relative; border: 0; background: transparent; color: var(--admin-muted); cursor: pointer; }
.icon-button { display: grid; height: 36px; width: 36px; place-items: center; border-radius: 7px; }
.icon-button:hover { background: var(--admin-bg); color: var(--admin-text); }
.notification-dot { position: absolute; top: 7px; right: 8px; height: 5px; width: 5px; border: 1px solid var(--admin-surface); border-radius: 50%; background: #d3a15b; }
.profile-divider { height: 28px; width: 1px; background: var(--admin-border); }
.profile-button { gap: 9px; padding: 0; text-align: left; }
.profile-avatar { display: grid; height: 34px; width: 34px; place-items: center; border-radius: 50%; background: var(--admin-accent-soft); color: var(--admin-accent); font-size: 12px; font-weight: 800; }
.profile-copy { display: flex; min-width: 74px; flex-direction: column; }
.profile-copy strong { color: var(--admin-text); font-size: 12px; }
.profile-copy small { margin-top: 2px; color: var(--admin-muted); font-size: 10px; }
.admin-content { padding: 32px; }
.sidebar-overlay { display: none; }
.mobile-only { display: none; }
.fade-enter-active, .fade-leave-active { transition: opacity 160ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@media (max-width: 1023px) {
  .admin-sidebar { transform: translateX(-100%); }
  .admin-sidebar.is-open { transform: translateX(0); }
  .admin-sidebar.is-collapsed { width: 260px; }
  .admin-sidebar.is-collapsed .sidebar-brand { justify-content: flex-start; padding: 20px; }
  .admin-sidebar.is-collapsed .sidebar-link { justify-content: flex-start; padding: 0 12px; }
  .admin-sidebar.is-collapsed .brand-copy, .admin-sidebar.is-collapsed .sidebar-section-label, .admin-sidebar.is-collapsed .sidebar-link span, .admin-sidebar.is-collapsed .sidebar-footer span { display: block; }
  .admin-main, .admin-sidebar.is-collapsed ~ .admin-main { margin-left: 0; }
  .sidebar-overlay { position: fixed; inset: 0; z-index: 40; display: block; background: rgba(9, 20, 16, .52); }
  .mobile-only { display: grid; }
  .desktop-only { display: none; }
}
@media (max-width: 640px) {
  .admin-header { min-height: 70px; padding: 14px 18px; }
  .admin-content { padding: 22px 16px; }
  .profile-divider { display: none; }
  .header-left h1 { font-size: 17px; }
}
</style>
