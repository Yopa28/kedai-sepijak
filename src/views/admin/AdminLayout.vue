<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Sidebar -->
        <aside
            :class="[
                'fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#1E4D3B] to-[#153729] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            ]"
        >
            <!-- Logo -->
            <div
                class="flex items-center justify-center h-20 border-b border-[#2A6B4F] bg-[#1E4D3B]/50"
            >
                <div class="text-center">
                    <div class="flex items-center justify-center gap-2">
                        <svg
                            class="w-8 h-8 text-green-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        <h1 class="text-xl font-bold">Kedai Sepijak</h1>
                    </div>
                    <p class="text-xs text-green-300 mt-1">Admin Dashboard</p>
                </div>
            </div>

            <!-- Navigation -->
            <nav class="mt-6 px-4">
                <router-link
                    v-for="item in menuItems"
                    :key="item.name"
                    :to="item.path"
                    class="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all hover:bg-[#2A6B4F]/50 group"
                    :class="[
                        isActiveRoute(item.path)
                            ? 'bg-[#2A6B4F] shadow-lg'
                            : 'hover:bg-[#2A6B4F]/50',
                    ]"
                    @click="closeSidebarOnMobile"
                >
                    <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
                    <span class="font-medium">{{ item.label }}</span>
                    <svg
                        v-if="isActiveRoute(item.path)"
                        class="w-5 h-5 ml-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </router-link>
            </nav>

            <!-- Logout Button -->
            <div
                class="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2A6B4F]"
            >
                <button
                    @click="handleLogout"
                    class="flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all hover:bg-red-600 group"
                >
                    <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    <span class="font-medium">Logout</span>
                </button>
            </div>
        </aside>

        <!-- Mobile Overlay -->
        <div
            v-if="sidebarOpen"
            @click="closeSidebar"
            class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>

        <!-- Main Content -->
        <div class="lg:ml-64">
            <!-- Top Bar -->
            <header class="bg-white shadow-sm sticky top-0 z-30">
                <div class="flex items-center justify-between px-4 py-4">
                    <!-- Mobile Menu Button -->
                    <button
                        @click="toggleSidebar"
                        class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            class="w-6 h-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <!-- Page Title -->
                    <h2 class="text-xl font-semibold text-gray-800">
                        {{ pageTitle }}
                    </h2>

                    <!-- User Info -->
                    <div class="flex items-center gap-3">
                        <div class="text-right hidden sm:block">
                            <p class="text-sm font-semibold text-gray-800">
                                {{ userName }}
                            </p>
                            <p class="text-xs text-gray-500">{{ userRole }}</p>
                        </div>
                        <div
                            class="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E4D3B] to-[#2A6B4F] flex items-center justify-center text-white font-bold shadow-lg"
                        >
                            {{ userInitials }}
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main class="p-4 md:p-6 lg:p-8">
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
import { ref, computed, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// State
const sidebarOpen = ref(false);

// Menu Items
const menuItems = [
    {
        name: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: () =>
            h(
                "svg",
                {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                },
                [
                    h("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                    }),
                ],
            ),
    },
    {
        name: "waiters",
        label: "Pelayan",
        path: "/admin/waiters",
        icon: () =>
            h(
                "svg",
                {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                },
                [
                    h("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                    }),
                ],
            ),
    },
    {
        name: "feedback",
        label: "Feedback",
        path: "/admin/feedback",
        icon: () =>
            h(
                "svg",
                {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                },
                [
                    h("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
                    }),
                ],
            ),
    },
    {
        name: "polls",
        label: "Polling & Event",
        path: "/admin/polls",
        icon: () =>
            h(
                "svg",
                {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                },
                [
                    h("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                    }),
                ],
            ),
    },
];

// Computed
const pageTitle = computed(() => {
    const titles = {
        "/admin/dashboard": "Dashboard",
        "/admin/waiters": "Kelola Pelayan",
        "/admin/feedback": "Feedback Pelanggan",
        "/admin/polls": "Polling & Event",
    };
    return titles[route.path] || "Admin Dashboard";
});

const userName = computed(() => authStore.userName);
const userRole = computed(() => {
    const role = authStore.userRole;
    return role === "super_admin" ? "Super Admin" : "Admin";
});

const userInitials = computed(() => {
    const name = authStore.userName;
    if (!name) return "A";

    const parts = name.split(" ");
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }

    return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
});

// Methods
function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
    sidebarOpen.value = false;
}

function closeSidebarOnMobile() {
    // Close sidebar on mobile after clicking menu item
    if (window.innerWidth < 1024) {
        closeSidebar();
    }
}

function isActiveRoute(path) {
    return route.path === path;
}

async function handleLogout() {
    if (confirm("Apakah Anda yakin ingin logout?")) {
        await authStore.logout();
        router.push("/admin/login");
    }
}
</script>

<style scoped>
/* Transition animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
