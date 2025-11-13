<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold text-[#1E4D3B]">Dashboard Overview</h1>
                <p class="mt-1 text-sm text-gray-600">
                    Selamat datang kembali, <span class="font-semibold">{{ userName }}</span>! 👋
                </p>
            </div>
            <button
                @click="refreshData"
                :disabled="loading"
                class="inline-flex items-center px-4 py-2.5 bg-[#1E4D3B] text-white rounded-lg shadow-sm text-sm font-medium hover:bg-[#2A6B4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E4D3B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                <svg
                    class="w-4 h-4 mr-2"
                    :class="{ 'animate-spin': loading }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                </svg>
                {{ loading ? 'Memuat...' : 'Refresh Data' }}
            </button>
        </div>

        <!-- Error Alert -->
        <div
            v-if="error"
            class="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3 shadow-sm"
        >
            <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                />
            </svg>
            <div class="flex-1">
                <p class="text-sm text-red-800 font-medium">{{ error }}</p>
            </div>
            <button @click="clearError" class="text-red-400 hover:text-red-600 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>

        <!-- Statistics Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Feedback Card -->
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-sm font-medium text-blue-100 uppercase tracking-wide">Total Feedback</p>
                        <p class="mt-2 text-4xl font-bold">{{ statistics.total_feedback }}</p>
                        <p class="mt-2 text-sm text-blue-100">
                            Hari ini: <span class="font-semibold">{{ statistics.today_feedback }}</span>
                        </p>
                    </div>
                    <div class="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                </div>
                <div class="mt-4 flex items-center text-sm">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm"
                        :class="statistics.feedback_growth >= 0 ? 'text-green-100' : 'text-red-100'">
                        {{ statistics.feedback_growth >= 0 ? '↑' : '↓' }} {{ Math.abs(statistics.feedback_growth) }}%
                    </span>
                    <span class="ml-2 text-blue-100">dari minggu lalu</span>
                </div>
            </div>

            <!-- Staff Card -->
            <div class="bg-gradient-to-br from-[#1E4D3B] to-[#2A6B4F] rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-sm font-medium text-green-100 uppercase tracking-wide">Total Staff</p>
                        <p class="mt-2 text-4xl font-bold">{{ statistics.total_waiters }}</p>
                        <p class="mt-2 text-sm text-green-100">
                            Aktif: <span class="font-semibold">{{ statistics.active_waiters }}</span>
                        </p>
                    </div>
                    <div class="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="w-full bg-white/20 rounded-full h-2.5 backdrop-blur-sm">
                        <div class="bg-white h-2.5 rounded-full transition-all duration-500"
                            :style="{ width: `${(statistics.active_waiters / Math.max(statistics.total_waiters, 1)) * 100}%` }">
                        </div>
                    </div>
                    <p class="text-xs text-green-100 mt-1.5">
                        {{ Math.round((statistics.active_waiters / Math.max(statistics.total_waiters, 1)) * 100) }}% pelayan aktif
                    </p>
                </div>
            </div>

            <!-- Polls Card -->
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-sm font-medium text-purple-100 uppercase tracking-wide">Polling & Event</p>
                        <p class="mt-2 text-4xl font-bold">{{ statistics.active_polls }}</p>
                        <p class="mt-2 text-sm text-purple-100">
                            Total votes: <span class="font-semibold">{{ statistics.total_votes }}</span>
                        </p>
                    </div>
                    <div class="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
                <div class="mt-4 flex items-center text-sm">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-purple-100">
                        {{ statistics.today_votes }} votes
                    </span>
                    <span class="ml-2 text-purple-100">hari ini</span>
                </div>
            </div>

            <!-- Average Rating Card -->
            <div class="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-sm font-medium text-amber-100 uppercase tracking-wide">Rating Rata-rata</p>
                        <p class="mt-2 text-4xl font-bold">{{ parseFloat(statistics.average_rating).toFixed(1) }}</p>
                        <div class="flex items-center mt-2">
                            <svg v-for="star in 5" :key="star" class="w-4 h-4"
                                :class="star <= Math.round(statistics.average_rating) ? 'text-yellow-300' : 'text-white/30'"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>
                    <div class="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                </div>
                <div class="mt-4 flex items-center text-sm">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm"
                        :class="{
                            'text-green-100': statistics.rating_trend === 'up',
                            'text-red-100': statistics.rating_trend === 'down',
                            'text-amber-100': statistics.rating_trend === 'stable'
                        }">
                        {{ statistics.rating_trend === 'up' ? '↑ Meningkat' : statistics.rating_trend === 'down' ? '↓ Menurun' : '→ Stabil' }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Recent Activity Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Feedback -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-900">Feedback Terbaru</h3>
                    <router-link 
                        to="/admin/feedback" 
                        class="text-sm text-[#1E4D3B] hover:text-[#2A6B4F] font-medium transition-colors"
                    >
                        Lihat Semua →
                    </router-link>
                </div>
                <div class="space-y-4" v-if="recentFeedback.length > 0">
                    <div 
                        v-for="feedback in recentFeedback.slice(0, 3)" 
                        :key="feedback.id"
                        class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-[#1E4D3B] rounded-full flex items-center justify-center">
                                <span class="text-white text-xs font-semibold">
                                    {{ feedback.employee_name ? feedback.employee_name.charAt(0).toUpperCase() : 'U' }}
                                </span>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900">
                                {{ feedback.employee_name || 'Unknown' }} - {{ feedback.role || 'Staff' }}
                            </p>
                            <p class="text-xs text-gray-500 truncate">
                                {{ feedback.message || 'No message' }}
                            </p>
                            <div class="flex items-center mt-1 space-x-2">
                                <div class="flex items-center">
                                    <svg v-for="star in 5" :key="star" class="w-3 h-3"
                                        :class="star <= getAverageRating(feedback) ? 'text-yellow-400' : 'text-gray-300'"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <span class="text-xs text-gray-500">
                                    {{ formatDate(feedback.created_at) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center py-8">
                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p class="text-gray-500 text-sm">Belum ada feedback hari ini</p>
                </div>
            </div>

            <!-- Active Polls -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-900">Polling Aktif</h3>
                    <router-link 
                        to="/admin/polls" 
                        class="text-sm text-[#1E4D3B] hover:text-[#2A6B4F] font-medium transition-colors"
                    >
                        Kelola →
                    </router-link>
                </div>
                <div class="space-y-4" v-if="activePolls.length > 0">
                    <div 
                        v-for="poll in activePolls.slice(0, 3)" 
                        :key="poll.id"
                        class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <h4 class="font-medium text-gray-900 text-sm mb-2">{{ poll.title }}</h4>
                        <p class="text-xs text-gray-600 mb-2">{{ poll.description }}</p>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-gray-500">
                                {{ poll.options ? poll.options.length : 0 }} opsi
                            </span>
                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                Aktif
                            </span>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center py-8">
                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-gray-500 text-sm">Tidak ada polling aktif</p>
                </div>
            </div>
        </div>

        <!-- Info Banner -->
        <div class="bg-gradient-to-r from-[#1E4D3B] to-[#2A6B4F] rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-semibold">✅ Data Real-time dari Database</h3>
                    <p class="text-sm text-green-100 mt-1">Dashboard menampilkan statistik real-time dari feedback pelanggan, data pelayan, dan polling event yang diambil langsung dari database Kedai Sepijak</p>
                    <div class="flex items-center mt-3 space-x-4 text-xs">
                        <span class="flex items-center">
                            <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Feedback API
                        </span>
                        <span class="flex items-center">
                            <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Waiters API
                        </span>
                        <span class="flex items-center">
                            <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Polling API
                        </span>
                    </div>
                </div>
                <svg class="w-12 h-12 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </div>
        
        
        <!-- Backend Test Section removed - not needed -->
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDashboardStore } from '@/stores/dashboard'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()

// Computed
const userName = computed(() => authStore.userName)
const loading = computed(() => dashboardStore.loading)
const error = computed(() => dashboardStore.error)
const statistics = computed(() => dashboardStore.statistics)
const recentFeedback = computed(() => dashboardStore.recentFeedback)

const activePolls = computed(() => dashboardStore.activePolls)
const topWaiters = computed(() => dashboardStore.topWaiters)

// Methods
async function refreshData() {
    await dashboardStore.fetchDashboardData()
}

function clearError() {
    dashboardStore.clearError()
}

// Helper methods
function getAverageRating(feedback) {
    const ratings = []
    if (feedback.rating_sikap_pelayan) ratings.push(Number(feedback.rating_sikap_pelayan))
    if (feedback.rating_waktu_pesanan) ratings.push(Number(feedback.rating_waktu_pesanan))
    if (feedback.rating_rasa_menu) ratings.push(Number(feedback.rating_rasa_menu))
    if (feedback.rating_kebersihan) ratings.push(Number(feedback.rating_kebersihan))
    
    return ratings.length > 0 ? Math.round(ratings.reduce((sum, r) => sum + r, 0) / ratings.length) : 0
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown'
    
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Hari ini'
    if (diffDays === 2) return 'Kemarin'
    if (diffDays <= 7) return `${diffDays - 1} hari lalu`
    
    return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
}

// Auto-refresh interval
let refreshInterval = null

// Lifecycle
onMounted(() => {
    refreshData()
    
    // Set up auto-refresh every 2 minutes
    refreshInterval = setInterval(() => {
        refreshData()
    }, 120000)
})

onUnmounted(() => {
    if (refreshInterval) {
        clearInterval(refreshInterval)
        refreshInterval = null
    }
})
</script>

<style scoped>
/* Styles handled by Tailwind CSS */
</style>
