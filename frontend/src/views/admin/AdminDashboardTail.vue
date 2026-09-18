<template>
  <section class="dashboard-page">
    <div class="page-heading-row">
      <div>
        <p class="section-kicker">Overview</p>
        <h2 class="page-heading">Good afternoon, {{ userName }}</h2>
        <p class="page-subheading">Berikut ringkasan aktivitas Kedai Sepijak hari ini.</p>
      </div>
      <button class="primary-action" type="button" :disabled="loading" @click="refreshData">
        <RefreshCw :size="16" :class="{ spinning: loading }" />
        {{ loading ? "Memuat..." : "Refresh data" }}
      </button>
    </div>

    <div v-if="error" class="dashboard-alert" role="alert">
      <AlertCircle :size="18" />
      <span>{{ error }}</span>
      <button type="button" aria-label="Tutup pesan" @click="clearError"><X :size="16" /></button>
    </div>

    <div class="stats-grid">
      <article v-for="stat in statsCards" :key="stat.label" class="stat-card">
        <div class="stat-card-top">
          <span class="stat-label">{{ stat.label }}</span>
          <span :class="['stat-icon', stat.tone]"><component :is="stat.icon" :size="18" /></span>
        </div>
        <strong class="stat-value">{{ stat.value }}</strong>
        <div class="stat-meta">
          <span>{{ stat.detail }}</span>
          <span v-if="stat.trend" class="stat-trend">{{ stat.trend }}</span>
        </div>
      </article>
    </div>

    <div class="dashboard-grid">
      <article class="data-panel">
        <div class="panel-heading">
          <div><h3>Feedback terbaru</h3><p>Masukan pelanggan yang baru masuk</p></div>
          <router-link to="/admin/feedback">Lihat semua <ArrowUpRight :size="14" /></router-link>
        </div>
        <div v-if="recentFeedback.length" class="activity-list">
          <div v-for="feedback in recentFeedback.slice(0, 5)" :key="feedback.id" class="activity-row">
            <div class="activity-avatar">{{ initials(feedback.employee_name || feedback.customer_name) }}</div>
            <div class="activity-body">
              <strong>{{ feedback.employee_name || feedback.customer_name || "Pelanggan" }}</strong>
              <p>{{ feedback.message || "Tidak ada pesan" }}</p>
            </div>
            <div class="activity-side">
              <span class="rating">★ {{ getAverageRating(feedback) }}</span>
              <small>{{ formatDate(feedback.created_at) }}</small>
            </div>
          </div>
        </div>
        <div v-else class="panel-empty"><MessageSquare :size="22" /><span>Belum ada feedback terbaru.</span></div>
      </article>

      <article class="data-panel">
        <div class="panel-heading">
          <div><h3>Polling aktif</h3><p>Event yang sedang berjalan</p></div>
          <router-link to="/admin/polls">Kelola <ArrowUpRight :size="14" /></router-link>
        </div>
        <div v-if="activePolls.length" class="poll-list">
          <div v-for="poll in activePolls.slice(0, 4)" :key="poll.id" class="poll-row">
            <div class="poll-symbol"><CalendarDays :size="17" /></div>
            <div class="poll-body"><strong>{{ poll.title || poll.question }}</strong><span>{{ poll.total_votes || 0 }} votes</span></div>
            <span class="status-badge status-active">Aktif</span>
          </div>
        </div>
        <div v-else class="panel-empty"><CalendarDays :size="22" /><span>Tidak ada polling aktif.</span></div>
      </article>
    </div>

    <article class="insight-banner">
      <div class="insight-icon"><ShieldCheck :size="20" /></div>
      <div><strong>Data tersinkronisasi</strong><p>Statistik diperbarui dari feedback, pelayan, dan polling yang tersimpan di database.</p></div>
      <span class="live-dot"><i></i> Live</span>
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { AlertCircle, ArrowUpRight, CalendarDays, ChartNoAxesCombined, MessageSquare, RefreshCw, ShieldCheck, Star, UsersRound, X } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const userName = computed(() => authStore.userName);
const loading = computed(() => dashboardStore.loading);
const error = computed(() => dashboardStore.error);
const statistics = computed(() => dashboardStore.statistics);
const recentFeedback = computed(() => dashboardStore.recentFeedback);
const activePolls = computed(() => dashboardStore.activePolls);

const statsCards = computed(() => [
  { label: "Total feedback", value: statistics.value.total_feedback, detail: `${statistics.value.today_feedback} hari ini`, trend: statistics.value.feedback_growth ? `${statistics.value.feedback_growth}%` : "", tone: "blue", icon: MessageSquare },
  { label: "Pelayan aktif", value: statistics.value.active_waiters, detail: `dari ${statistics.value.total_waiters} pelayan`, tone: "green", icon: UsersRound },
  { label: "Polling aktif", value: statistics.value.active_polls, detail: `${statistics.value.today_votes} vote hari ini`, tone: "amber", icon: ChartNoAxesCombined },
  { label: "Rating rata-rata", value: Number(statistics.value.average_rating || 0).toFixed(1), detail: `${statistics.value.rating_trend || "stable"}`, tone: "violet", icon: Star },
]);

async function refreshData() { await dashboardStore.fetchDashboardData(); }
function clearError() { dashboardStore.clearError(); }
function initials(name) { return (name || "P").split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase(); }
function getAverageRating(feedback) {
  const values = [feedback.rating_sikap_pelayan, feedback.rating_waktu_pesanan, feedback.rating_rasa_menu, feedback.rating_kebersihan].filter(Boolean).map(Number);
  return values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : Number(feedback.rating || 0);
}
function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}
let refreshInterval;
onMounted(() => { refreshData(); refreshInterval = setInterval(refreshData, 120000); });
onUnmounted(() => clearInterval(refreshInterval));
</script>

<style>
.dashboard-page { max-width: 1440px; margin: 0 auto; }
.page-heading-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
.section-kicker { margin: 0 0 6px; color: #8a5b26; font-size: 11px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.page-heading { margin: 0; color: var(--admin-text); font-size: clamp(24px, 3vw, 30px); font-weight: 750; letter-spacing: -.035em; }
.page-subheading { margin: 7px 0 0; color: var(--admin-muted); font-size: 13px; }
.primary-action { display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 7px; background: #1e4d3b; padding: 10px 14px; color: #fff; font-size: 12px; font-weight: 700; cursor: pointer; }
.primary-action:disabled { cursor: wait; opacity: .65; }
.spinning { animation: spin 800ms linear infinite; }
.dashboard-alert { display: flex; align-items: center; gap: 9px; margin-bottom: 20px; border: 1px solid #fecaca; border-radius: 8px; background: #fff1f2; padding: 12px 14px; color: #b91c1c; font-size: 13px; }
.dashboard-alert span { flex: 1; }.dashboard-alert button { border: 0; background: transparent; color: inherit; cursor: pointer; }
.stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.stat-card, .data-panel { border: 1px solid var(--admin-border); border-radius: 9px; background: var(--admin-surface); box-shadow: 0 2px 8px rgba(15, 23, 42, .025); }
.stat-card { padding: 19px; }.stat-card-top, .stat-meta, .panel-heading, .activity-row, .poll-row, .insight-banner { display: flex; align-items: center; }
.stat-card-top { justify-content: space-between; }.stat-label { color: var(--admin-muted); font-size: 12px; font-weight: 650; }.stat-icon { display: grid; height: 34px; width: 34px; place-items: center; border-radius: 8px; }.stat-icon.blue { background: #e8f1ff; color: #3878d8; }.stat-icon.green { background: #e6f4ed; color: #26835a; }.stat-icon.amber { background: #fff1d7; color: #a76718; }.stat-icon.violet { background: #eeeaff; color: #7056c9; }
.stat-value { display: block; margin-top: 16px; color: var(--admin-text); font-size: 29px; letter-spacing: -.04em; }.stat-meta { justify-content: space-between; margin-top: 10px; color: var(--admin-muted); font-size: 11px; }.stat-trend { color: #26835a; font-weight: 700; }
.dashboard-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr); gap: 16px; margin-top: 22px; }.data-panel { min-width: 0; padding: 22px; }.panel-heading { justify-content: space-between; gap: 15px; margin-bottom: 18px; }.panel-heading h3 { margin: 0; color: var(--admin-text); font-size: 15px; font-weight: 750; }.panel-heading p { margin: 5px 0 0; color: var(--admin-muted); font-size: 11px; }.panel-heading a { display: inline-flex; align-items: center; gap: 4px; color: #8a5b26; font-size: 11px; font-weight: 700; text-decoration: none; white-space: nowrap; }
.activity-list, .poll-list { display: flex; flex-direction: column; }.activity-row, .poll-row { gap: 12px; border-top: 1px solid var(--admin-border); padding: 13px 0; }.activity-avatar, .poll-symbol { display: grid; flex: 0 0 auto; height: 34px; width: 34px; place-items: center; border-radius: 50%; background: var(--admin-accent-soft); color: var(--admin-accent); font-size: 11px; font-weight: 800; }.poll-symbol { border-radius: 8px; color: #8a5b26; }.activity-body, .poll-body { min-width: 0; flex: 1; }.activity-body strong, .poll-body strong { display: block; overflow: hidden; color: var(--admin-text); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }.activity-body p { overflow: hidden; margin: 4px 0 0; color: var(--admin-muted); font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }.activity-side { display: flex; flex: 0 0 auto; flex-direction: column; align-items: flex-end; gap: 4px; }.rating { color: #a76718; font-size: 11px; font-weight: 700; }.activity-side small, .poll-body span { color: var(--admin-muted); font-size: 10px; }.poll-body span { display: block; margin-top: 4px; }.status-badge { border-radius: 999px; padding: 4px 8px; font-size: 10px; font-weight: 700; }.status-active { background: #e6f4ed; color: #26835a; }.panel-empty { display: flex; min-height: 150px; flex-direction: column; align-items: center; justify-content: center; gap: 9px; color: var(--admin-muted); font-size: 12px; }
.insight-banner { gap: 12px; margin-top: 22px; border: 1px solid #d8e6df; border-radius: 9px; background: var(--admin-accent-soft); padding: 16px 18px; }.insight-icon { display: grid; height: 33px; width: 33px; flex: 0 0 auto; place-items: center; border-radius: 8px; background: #fff; color: #26835a; }.insight-banner strong { color: var(--admin-text); font-size: 12px; }.insight-banner p { margin: 4px 0 0; color: var(--admin-muted); font-size: 11px; }.live-dot { display: inline-flex; align-items: center; gap: 5px; margin-left: auto; color: #26835a; font-size: 11px; font-weight: 700; }.live-dot i { height: 6px; width: 6px; border-radius: 50%; background: #35a36e; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 1000px) { .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 720px) { .page-heading-row { align-items: flex-start; flex-direction: column; }.dashboard-grid { grid-template-columns: 1fr; }.primary-action { align-self: stretch; justify-content: center; }.admin-dark .stat-icon.blue { background: #243a59; } }
@media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr; }.data-panel { padding: 17px; }.activity-side { display: none; } }
</style>
