<template>
  <div class="sentiment-analytics">

    <!-- ================================
         HEADER
    ================================= -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Analisis Sentimen</h1>
        <p class="page-description">
          Analisis feedback pelanggan berdasarkan sentimen dan periode waktu.
        </p>
      </div>

      <div class="date-filter">
        <div class="date-field">
          <label for="startDate">Mulai</label>
          <input
            id="startDate"
            v-model="startDate"
            type="date"
            @change="fetchAnalytics"
          />
        </div>

        <div class="date-separator">—</div>

        <div class="date-field">
          <label for="endDate">Sampai</label>
          <input
            id="endDate"
            v-model="endDate"
            type="date"
            @change="fetchAnalytics"
          />
        </div>

        <button
          class="refresh-button"
          type="button"
          :disabled="loading"
          @click="fetchAnalytics"
        >
          <span v-if="loading" class="spinner"></span>
          <span v-else>↻</span>
          Refresh
        </button>
      </div>
    </div>

    <!-- ================================
         ERROR
    ================================= -->
    <div v-if="error" class="error-state">
      <div class="error-icon">!</div>

      <div class="error-content">
        <h3>Gagal memuat data</h3>
        <p>{{ error }}</p>
      </div>

      <button
        type="button"
        class="retry-button"
        @click="fetchAnalytics"
      >
        Coba Lagi
      </button>
    </div>

    <!-- ================================
         LOADING
    ================================= -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <h3>Memuat analisis...</h3>
      <p>Data sentiment sedang diproses.</p>
    </div>

    <!-- ================================
         DASHBOARD
    ================================= -->
    <div v-if="data && !loading" class="dashboard-content">

      <!-- ==============================
           KPI CARDS
      ================================= -->
      <div class="kpi-grid">

        <!-- Total Feedback -->
        <div class="kpi-card">
          <div class="kpi-icon blue">
            <MessageSquare :size="21" />
          </div>

          <div class="kpi-content">
            <span class="kpi-label">Total Feedback</span>
            <strong class="kpi-value">
              {{ totalFeedback }}
            </strong>
            <span class="kpi-description">
              Feedback dalam periode
            </span>
          </div>
        </div>

        <!-- Positive -->
        <div class="kpi-card">
          <div class="kpi-icon green">
            <Smile :size="21" />
          </div>

          <div class="kpi-content">
            <span class="kpi-label">Positif</span>
            <strong class="kpi-value">
              {{ positiveCount }}
            </strong>
            <span class="kpi-description">
              {{ positivePercentage }}% dari total
            </span>
          </div>
        </div>

        <!-- Negative -->
        <div class="kpi-card">
          <div class="kpi-icon red">
            <Frown :size="21" />
          </div>

          <div class="kpi-content">
            <span class="kpi-label">Negatif</span>
            <strong class="kpi-value">
              {{ negativeCount }}
            </strong>
            <span class="kpi-description">
              {{ negativePercentage }}% dari total
            </span>
          </div>
        </div>

        <!-- Neutral -->
        <div class="kpi-card">
          <div class="kpi-icon gray">
            <Meh :size="21" />
          </div>

          <div class="kpi-content">
            <span class="kpi-label">Netral</span>
            <strong class="kpi-value">
              {{ neutralCount }}
            </strong>
            <span class="kpi-description">
              {{ neutralPercentage }}% dari total
            </span>
          </div>
        </div>

      </div>

      <!-- ==============================
           CHARTS
      ================================= -->
      <div class="charts-grid">

        <!-- Sentiment Distribution -->
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h2>Distribusi Sentimen</h2>
              <p>Perbandingan sentiment feedback</p>
            </div>
          </div>

          <div class="chart-container doughnut-container">
            <canvas id="sentimentChart"></canvas>
          </div>
        </div>

        <!-- Daily Trend -->
        <div class="chart-card trend-card">
          <div class="chart-header">
            <div>
              <h2>Trend Sentimen</h2>
              <p>Perubahan sentiment berdasarkan tanggal</p>
            </div>
          </div>

          <div class="chart-container trend-container">
            <canvas id="trendChart"></canvas>

            <div
              v-if="!trendData || !trendData.labels || trendData.labels.length === 0"
              class="empty-chart"
            >
              <ChartNoAxesCombined :size="24" />
              <p>Belum ada data trend pada periode ini.</p>
            </div>
          </div>
        </div>

      </div>

      <!-- ==============================
           KEYWORDS + INSIGHTS
      ================================= -->
      <div class="bottom-grid">

        <!-- Keywords -->
        <div class="info-card">
          <div class="section-header">
            <div>
              <h2>Top Keywords</h2>
              <p>Kata yang paling sering muncul</p>
            </div>
          </div>

          <div
            v-if="topKeywords.length > 0"
            class="keywords-list"
          >
            <div
              v-for="(keyword, index) in topKeywords"
              :key="index"
              class="keyword-item"
            >
              <span class="keyword-rank">
                {{ index + 1 }}
              </span>

              <span class="keyword-name">
                {{ getKeywordName(keyword) }}
              </span>

              <span
                v-if="getKeywordCount(keyword) !== null"
                class="keyword-count"
              >
                {{ getKeywordCount(keyword) }}
              </span>
            </div>
          </div>

          <div v-else class="empty-state-small">
            <Search :size="22" />
            <p>Belum ada keyword.</p>
          </div>
        </div>

        <!-- Insights -->
        <div class="info-card">
          <div class="section-header">
            <div>
              <h2>Insight</h2>
              <p>Ringkasan analisis sentiment</p>
            </div>
          </div>

          <div class="insights-list">

            <div class="insight-item">
              <div class="insight-icon positive">
                <Smile :size="17" />
              </div>

              <div>
                <strong>Sentimen positif</strong>
                <p>
                  {{ positivePercentage }}% feedback memiliki
                  sentiment positif.
                </p>
              </div>
            </div>

            <div class="insight-item">
              <div class="insight-icon negative">
                <Frown :size="17" />
              </div>

              <div>
                <strong>Sentimen negatif</strong>
                <p>
                  {{ negativePercentage }}% feedback memiliki
                  sentiment negatif.
                </p>
              </div>
            </div>

            <div class="insight-item">
              <div class="insight-icon neutral">
                <Meh :size="17" />
              </div>

              <div>
                <strong>Sentimen netral</strong>
                <p>
                  {{ neutralPercentage }}% feedback memiliki
                  sentiment netral.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- ==============================
           RECENT FEEDBACK
      ================================= -->
      <div class="feedback-card">
        <div class="section-header">
          <div>
            <h2>Feedback Terbaru</h2>
            <p>Feedback pelanggan pada periode yang dipilih</p>
          </div>
        </div>

        <div
          v-if="recentFeedback.length > 0"
          class="feedback-list"
        >
          <div
            v-for="(feedback, index) in recentFeedback"
            :key="feedback.id || index"
            class="feedback-item"
          >
            <div class="feedback-avatar">
              <component :is="getSentimentIcon(feedback.sentiment)" :size="18" />
            </div>

            <div class="feedback-main">
              <div class="feedback-top">
                <strong>
                  {{ feedback.customerName || feedback.customer_name || 'Pelanggan' }}
                </strong>

                <span
                  class="sentiment-badge"
                  :class="getSentimentClass(feedback.sentiment)"
                >
                  {{ formatSentiment(feedback.sentiment) }}
                </span>
              </div>

              <p class="feedback-message">
                {{ feedback.message || feedback.comment || feedback.feedback || '-' }}
              </p>

              <div class="feedback-meta">
                <span>
                  {{ formatDate(
                    feedback.createdAt ||
                    feedback.created_at ||
                    feedback.date
                  ) }}
                </span>

                <span
                  v-if="
                    feedback.rating !== undefined &&
                    feedback.rating !== null
                  "
                >
                  <Star :size="12" /> {{ feedback.rating }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="empty-state-small feedback-empty"
        >
          <MessageSquare :size="24" />
          <p>Belum ada feedback pada periode ini.</p>
        </div>
      </div>

    </div>

    <!-- ================================
         NO DATA
    ================================= -->
    <div
      v-if="!loading && !error && !data"
      class="empty-dashboard"
    >
      <div class="empty-dashboard-icon"><ChartNoAxesCombined :size="38" /></div>

      <h3>Belum ada data analytics</h3>

      <p>
        Pilih periode tanggal kemudian refresh data.
      </p>

      <button
        type="button"
        class="retry-button"
        @click="fetchAnalytics"
      >
        Muat Data
      </button>
    </div>

  </div>
</template>

<script>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from 'vue'

import Chart from 'chart.js/auto'

import api, {
  handleApiResponse,
} from '@/services/api'

import {
  ChartNoAxesCombined,
  Frown,
  Meh,
  MessageSquare,
  Search,
  Smile,
  Star,
} from 'lucide-vue-next'

export default {
  name: 'SentimentAnalytics',

  components: {
    ChartNoAxesCombined,
    Frown,
    Meh,
    MessageSquare,
    Search,
    Smile,
    Star,
  },

  setup() {
    // ==========================================
    // STATE
    // ==========================================

    const data = ref(null)

    const loading = ref(false)

    const error = ref(null)

    const startDate = ref('')

    const endDate = ref('')

    const trendData = ref(null)

    let sentimentChart = null

    let trendChart = null

    // ==========================================
    // HELPER
    // ==========================================

    const getSentimentData = computed(() => {
      return data.value?.sentimentAnalysis || {}
    })

    const positiveCount = computed(() => {
      return Number(
        getSentimentData.value?.positive || 0
      )
    })

    const negativeCount = computed(() => {
      return Number(
        getSentimentData.value?.negative || 0
      )
    })

    const neutralCount = computed(() => {
      return Number(
        getSentimentData.value?.neutral || 0
      )
    })

    const totalFeedback = computed(() => {
      const sentimentTotal =
        positiveCount.value +
        negativeCount.value +
        neutralCount.value

      if (sentimentTotal > 0) {
        return sentimentTotal
      }

      return Number(
        data.value?.totalFeedback ||
        data.value?.total_feedback ||
        data.value?.feedback?.total ||
        0
      )
    })

    const positivePercentage = computed(() => {
      if (totalFeedback.value === 0) {
        return 0
      }

      return Math.round(
        (positiveCount.value /
          totalFeedback.value) *
          100
      )
    })

    const negativePercentage = computed(() => {
      if (totalFeedback.value === 0) {
        return 0
      }

      return Math.round(
        (negativeCount.value /
          totalFeedback.value) *
          100
      )
    })

    const neutralPercentage = computed(() => {
      if (totalFeedback.value === 0) {
        return 0
      }

      return Math.round(
        (neutralCount.value /
          totalFeedback.value) *
          100
      )
    })

    // ==========================================
    // TOP KEYWORDS
    // ==========================================

    const topKeywords = computed(() => {
      const keywords =
        data.value?.topKeywords ||
        data.value?.top_keywords ||
        data.value?.keywords ||
        []

      return Array.isArray(keywords)
        ? keywords
        : []
    })

    const getKeywordName = (keyword) => {
      if (typeof keyword === 'string') {
        return keyword
      }

      return (
        keyword?.keyword ||
        keyword?.word ||
        keyword?.name ||
        '-'
      )
    }

    const getKeywordCount = (keyword) => {
      if (typeof keyword === 'string') {
        return null
      }

      const count =
        keyword?.count ??
        keyword?.frequency ??
        keyword?.total

      if (
        count === undefined ||
        count === null
      ) {
        return null
      }

      return count
    }

    // ==========================================
    // RECENT FEEDBACK
    // ==========================================

    const recentFeedback = computed(() => {
      const feedback =
        data.value?.recentFeedback ||
        data.value?.recent_feedback ||
        data.value?.feedback?.items ||
        data.value?.feedback ||
        []

      return Array.isArray(feedback)
        ? feedback
        : []
    })

    // ==========================================
    // FETCH ANALYTICS
    // ==========================================

    const fetchAnalytics = async () => {
      loading.value = true

      error.value = null

      try {
        if (
          !startDate.value ||
          !endDate.value
        ) {
          error.value =
            'Tanggal mulai dan tanggal akhir wajib diisi'

          return
        }

        if (
          startDate.value >
          endDate.value
        ) {
          error.value =
            'Tanggal mulai tidak boleh lebih besar dari tanggal akhir'

          return
        }

        const params = {
          startDate: startDate.value,
          endDate: endDate.value,
        }

        console.log(
          '📊 Fetch sentiment analytics:',
          params
        )

        // ========================================
        // DESTROY OLD CHART
        // ========================================

        destroyCharts()

        // ========================================
        // ANALYTICS
        // ========================================

        const response = await api.get(
          '/feedback/analytics/sentiment',
          {
            params,
          }
        )

        const result =
          handleApiResponse(response)

        console.log(
          '📊 Analytics response:',
          result
        )

        data.value =
          result?.data || null

        // ========================================
        // DAILY TREND
        // ========================================

        await fetchTrendData()

      } catch (err) {
        console.error(
          '❌ Error fetching analytics:',
          err
        )

        data.value = null

        trendData.value = null

        error.value =
          err?.response?.data?.message ||
          err?.message ||
          'Gagal mengambil data analytics'

      } finally {
        loading.value = false

        // Tunggu Vue selesai render template
        await nextTick()

        // Render chart setelah canvas benar-benar tersedia
        requestAnimationFrame(() => {
          renderCharts()
        })
      }
    }

    // ==========================================
    // FETCH DAILY TREND
    // ==========================================

    const fetchTrendData = async () => {
      try {
        if (
          !startDate.value ||
          !endDate.value
        ) {
          trendData.value = null
          return
        }

        const params = {
          startDate: startDate.value,
          endDate: endDate.value,
        }

        console.log(
          '📈 Fetch sentiment trend:',
          params
        )

        const response = await api.get(
          '/feedback/sentiment/daily-trend',
          {
            params,
          }
        )

        const result =
          handleApiResponse(response)

        console.log(
          '📈 Sentiment trend response:',
          result
        )

        trendData.value =
          result?.data || null

      } catch (err) {
        console.error(
          '❌ Error fetching trend:',
          err
        )

        trendData.value = null
      }
    }

    // ==========================================
    // RENDER CHARTS
    // ==========================================

    const renderCharts = () => {
      console.log(
        '🎨 Rendering charts...'
      )

      if (!data.value) {
        console.warn(
          '⚠️ Analytics data belum tersedia'
        )

        return
      }

      // ========================================
      // SENTIMENT CHART
      // ========================================

      const sentimentCanvas =
        document.getElementById(
          'sentimentChart'
        )

      console.log(
        '🍩 sentimentCanvas:',
        sentimentCanvas
      )

      if (sentimentCanvas) {
        if (sentimentChart) {
          sentimentChart.destroy()
          sentimentChart = null
        }

        const positive =
          positiveCount.value

        const negative =
          negativeCount.value

        const neutral =
          neutralCount.value

        console.log(
          '🍩 Sentiment data:',
          {
            positive,
            negative,
            neutral,
          }
        )

        sentimentChart =
          new Chart(
            sentimentCanvas,
            {
              type: 'doughnut',

              data: {
                labels: [
                  'Positif',
                  'Negatif',
                  'Netral',
                ],

                datasets: [
                  {
                    data: [
                      positive,
                      negative,
                      neutral,
                    ],

                    backgroundColor: [
                      '#10b981',
                      '#ef4444',
                      '#cbd5e1',
                    ],

                    borderWidth: 0,

                    hoverOffset: 5,
                  },
                ],
              },

              options: {
                responsive: true,

                maintainAspectRatio: false,

                cutout: '72%',

                plugins: {
                  legend: {
                    position: 'bottom',

                    labels: {
                      usePointStyle: true,

                      pointStyle: 'circle',

                      padding: 20,

                      font: {
                        size: 12,
                      },
                    },
                  },

                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value =
                          context.raw || 0

                        const total =
                          totalFeedback.value

                        const percentage =
                          total > 0
                            ? Math.round(
                                (value /
                                  total) *
                                  100
                              )
                            : 0

                        return ` ${context.label}: ${value} (${percentage}%)`
                      },
                    },
                  },
                },
              },
            }
          )

        console.log(
          '✅ Sentiment chart berhasil dibuat'
        )
      } else {
        console.warn(
          '⚠️ Canvas sentimentChart tidak ditemukan'
        )
      }

      // ========================================
      // TREND CHART
      // ========================================

      const trendCanvas =
        document.getElementById(
          'trendChart'
        )

      console.log(
        '📈 trendCanvas:',
        trendCanvas
      )

      if (!trendCanvas) {
        console.warn(
          '⚠️ Canvas trendChart tidak ditemukan'
        )

        return
      }

      if (
        !trendData.value ||
        !Array.isArray(
          trendData.value.labels
        )
      ) {
        console.warn(
          '⚠️ Data trend belum tersedia'
        )

        return
      }

      const labels =
        trendData.value.labels || []

      const positive =
        Array.isArray(
          trendData.value.positive
        )
          ? trendData.value.positive
          : []

      const negative =
        Array.isArray(
          trendData.value.negative
        )
          ? trendData.value.negative
          : []

      const neutral =
        Array.isArray(
          trendData.value.neutral
        )
          ? trendData.value.neutral
          : []

      console.log(
        '📈 Trend chart data:',
        {
          labels,
          positive,
          negative,
          neutral,
        }
      )

      if (trendChart) {
        trendChart.destroy()
        trendChart = null
      }

      trendChart =
        new Chart(
          trendCanvas,
          {
            type: 'line',

            data: {
              labels,

              datasets: [
                {
                  label: 'Positif',

                  data: positive,

                  borderColor: '#10b981',

                  backgroundColor:
                    'rgba(16, 185, 129, 0.08)',

                  tension: 0.4,

                  fill: true,

                  pointRadius: 3,

                  pointHoverRadius: 5,

                  borderWidth: 2,
                },

                {
                  label: 'Negatif',

                  data: negative,

                  borderColor: '#ef4444',

                  backgroundColor:
                    'rgba(239, 68, 68, 0.08)',

                  tension: 0.4,

                  fill: true,

                  pointRadius: 3,

                  pointHoverRadius: 5,

                  borderWidth: 2,
                },

                {
                  label: 'Netral',

                  data: neutral,

                  borderColor: '#94a3b8',

                  backgroundColor:
                    'rgba(148, 163, 184, 0.08)',

                  tension: 0.4,

                  fill: true,

                  pointRadius: 3,

                  pointHoverRadius: 5,

                  borderWidth: 2,
                },
              ],
            },

            options: {
              responsive: true,

              maintainAspectRatio: false,

              interaction: {
                intersect: false,

                mode: 'index',
              },

              plugins: {
                legend: {
                  position: 'bottom',

                  labels: {
                    usePointStyle: true,

                    pointStyle: 'circle',

                    padding: 20,

                    font: {
                      size: 12,
                    },
                  },
                },

                tooltip: {
                  mode: 'index',

                  intersect: false,
                },
              },

              scales: {
                y: {
                  beginAtZero: true,

                  ticks: {
                    precision: 0,

                    stepSize: 1,
                  },

                  grid: {
                    color:
                      'rgba(148, 163, 184, 0.15)',
                  },
                },

                x: {
                  ticks: {
                    maxRotation: 45,

                    minRotation: 0,

                    autoSkip: true,

                    maxTicksLimit: 12,
                  },

                  grid: {
                    display: false,
                  },
                },
              },
            },
          }
        )

      console.log(
        '✅ Trend chart berhasil dibuat'
      )
    }

    // ==========================================
    // DESTROY CHARTS
    // ==========================================

    const destroyCharts = () => {
      if (sentimentChart) {
        sentimentChart.destroy()

        sentimentChart = null
      }

      if (trendChart) {
        trendChart.destroy()

        trendChart = null
      }
    }

    // ==========================================
    // SENTIMENT EMOJI
    // ==========================================

    const getSentimentEmoji = (
      sentiment
    ) => {
      const normalized =
        String(
          sentiment || ''
        ).toLowerCase()

      const emojis = {
        positive: '😊',
        negatif: '😞',
        negative: '😞',
        neutral: '😐',
        netral: '😐',
      }

      return (
        emojis[normalized] ||
        '😐'
      )
    }

    const getSentimentIcon = (sentiment) => {
      const normalized = String(sentiment || '').toLowerCase()

      if (normalized === 'positive') return Smile
      if (normalized === 'negative' || normalized === 'negatif') return Frown
      return Meh
    }

    // ==========================================
    // SENTIMENT CLASS
    // ==========================================

    const getSentimentClass = (
      sentiment
    ) => {
      const normalized =
        String(
          sentiment || ''
        ).toLowerCase()

      if (
        normalized === 'positive'
      ) {
        return 'positive'
      }

      if (
        normalized === 'negative' ||
        normalized === 'negatif'
      ) {
        return 'negative'
      }

      return 'neutral'
    }

    // ==========================================
    // FORMAT SENTIMENT
    // ==========================================

    const formatSentiment = (
      sentiment
    ) => {
      const normalized =
        String(
          sentiment || ''
        ).toLowerCase()

      if (
        normalized === 'positive'
      ) {
        return 'Positif'
      }

      if (
        normalized === 'negative' ||
        normalized === 'negatif'
      ) {
        return 'Negatif'
      }

      return 'Netral'
    }

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (
      dateStr
    ) => {
      if (!dateStr) {
        return '-'
      }

      try {
        const date =
          new Date(dateStr)

        if (
          Number.isNaN(
            date.getTime()
          )
        ) {
          return dateStr
        }

        return date.toLocaleString(
          'id-ID',
          {
            day: 'numeric',

            month: 'short',

            year: 'numeric',

            hour: '2-digit',

            minute: '2-digit',
          }
        )
      } catch {
        return dateStr
      }
    }

    // ==========================================
    // ON MOUNTED
    // ==========================================

    onMounted(() => {
      const today =
        new Date()

      const thirtyDaysAgo =
        new Date(
          today.getTime() -
            30 *
              24 *
              60 *
              60 *
              1000
        )

      // Gunakan local date agar tidak terkena
      // masalah timezone UTC.
      const formatInputDate =
        (date) => {
          const year =
            date.getFullYear()

          const month =
            String(
              date.getMonth() + 1
            ).padStart(2, '0')

          const day =
            String(
              date.getDate()
            ).padStart(2, '0')

          return `${year}-${month}-${day}`
        }

      startDate.value =
        formatInputDate(
          thirtyDaysAgo
        )

      endDate.value =
        formatInputDate(
          today
        )

      console.log(
        '📅 Default date:',
        {
          startDate:
            startDate.value,

          endDate:
            endDate.value,
        }
      )

      fetchAnalytics()
    })

    // ==========================================
    // CLEANUP
    // ==========================================

    onBeforeUnmount(() => {
      destroyCharts()
    })

    // ==========================================
    // RETURN
    // ==========================================

    return {
      data,

      loading,

      error,

      startDate,

      endDate,

      trendData,

      totalFeedback,

      positiveCount,

      negativeCount,

      neutralCount,

      positivePercentage,

      negativePercentage,

      neutralPercentage,

      topKeywords,

      recentFeedback,

      fetchAnalytics,

      getSentimentEmoji,

      getSentimentIcon,

      getSentimentClass,

      formatSentiment,

      formatDate,

      getKeywordName,

      getKeywordCount,
    }
  },
}
</script>

<style scoped>
/* ==========================================
   ROOT
========================================== */

.sentiment-analytics {
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  color: #1e293b;
}

/* ==========================================
   HEADER
========================================== */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 24px;
}

.page-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
}

.page-description {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 14px;
}

.date-filter {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.date-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.date-field label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

.date-field input {
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  color: #334155;
  outline: none;
  transition: 0.2s ease;
}

.date-field input:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.15);
}

.date-separator {
  height: 40px;
  display: flex;
  align-items: center;
  color: #94a3b8;
}

.refresh-button {
  height: 40px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 0;
  border-radius: 8px;
  background: #0f172a;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.refresh-button:hover:not(:disabled) {
  background: #1e293b;
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

/* ==========================================
   KPI
========================================== */

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.kpi-card {
  min-height: 120px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-sizing: border-box;
}

.kpi-icon {
  width: 48px;
  height: 48px;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 22px;
}

.kpi-icon.blue {
  background: #eff6ff;
}

.kpi-icon.green {
  background: #ecfdf5;
}

.kpi-icon.red {
  background: #fef2f2;
}

.kpi-icon.gray {
  background: #f1f5f9;
}

.kpi-content {
  min-width: 0;
}

.kpi-label {
  display: block;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 4px;
}

.kpi-value {
  display: block;
  font-size: 25px;
  line-height: 1.2;
  color: #0f172a;
}

.kpi-description {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #94a3b8;
}

/* ==========================================
   CHARTS
========================================== */

.charts-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.6fr;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  min-width: 0;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
}

.chart-header {
  margin-bottom: 16px;
}

.chart-header h2,
.section-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.chart-header p,
.section-header p {
  margin: 4px 0 0;
  font-size: 12px;
  color: #94a3b8;
}

.chart-container {
  position: relative;
  width: 100%;
}

.doughnut-container {
  height: 320px;
}

.trend-container {
  height: 320px;
}

/* ==========================================
   BOTTOM GRID
========================================== */

.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.info-card,
.feedback-card {
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
}

.section-header {
  margin-bottom: 18px;
}

/* ==========================================
   KEYWORDS
========================================== */

.keywords-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.keyword-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #f8fafc;
  border-radius: 9px;
}

.keyword-rank {
  width: 28px;
  height: 28px;
  min-width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  border-radius: 7px;
  color: #475569;
  font-size: 12px;
  font-weight: 700;
}

.keyword-name {
  flex: 1;
  color: #334155;
  font-size: 14px;
}

.keyword-count {
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
}

/* ==========================================
   INSIGHTS
========================================== */

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.insight-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background: #f8fafc;
}

.insight-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  font-size: 17px;
}

.insight-icon.positive {
  background: #ecfdf5;
}

.insight-icon.negative {
  background: #fef2f2;
}

.insight-icon.neutral {
  background: #f1f5f9;
}

.insight-item strong {
  display: block;
  margin-bottom: 3px;
  color: #334155;
  font-size: 13px;
}

.insight-item p {
  margin: 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.5;
}

/* ==========================================
   FEEDBACK
========================================== */

.feedback-card {
  margin-bottom: 20px;
}

.feedback-list {
  display: flex;
  flex-direction: column;
}

.feedback-item {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;
}

.feedback-item:first-child {
  padding-top: 0;
}

.feedback-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.feedback-avatar {
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 50%;
  font-size: 20px;
}

.feedback-main {
  flex: 1;
  min-width: 0;
}

.feedback-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.feedback-top strong {
  color: #334155;
  font-size: 13px;
}

.feedback-message {
  margin: 7px 0;
  color: #475569;
  font-size: 13px;
  line-height: 1.6;
}

.feedback-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #94a3b8;
  font-size: 11px;
}

.sentiment-badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
}

.sentiment-badge.positive {
  background: #ecfdf5;
  color: #059669;
}

.sentiment-badge.negative {
  background: #fef2f2;
  color: #dc2626;
}

.sentiment-badge.neutral {
  background: #f1f5f9;
  color: #64748b;
}

/* ==========================================
   LOADING
========================================== */

.loading-state {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
}

.loading-spinner {
  width: 38px;
  height: 38px;
  margin-bottom: 16px;
  border: 3px solid #e2e8f0;
  border-top-color: #334155;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-state h3 {
  margin: 0;
  font-size: 15px;
  color: #334155;
}

.loading-state p {
  margin: 6px 0 0;
  color: #94a3b8;
  font-size: 13px;
}

/* ==========================================
   ERROR
========================================== */

.error-state {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  margin-bottom: 20px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
}

.error-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fee2e2;
  border-radius: 50%;
  color: #dc2626;
  font-weight: 800;
}

.error-content {
  flex: 1;
}

.error-content h3 {
  margin: 0 0 3px;
  color: #991b1b;
  font-size: 14px;
}

.error-content p {
  margin: 0;
  color: #b91c1c;
  font-size: 12px;
}

.retry-button {
  height: 38px;
  padding: 0 14px;
  border: 0;
  border-radius: 8px;
  background: #0f172a;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

/* ==========================================
   EMPTY
========================================== */

.empty-chart {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: #94a3b8;
}

.empty-chart span {
  font-size: 28px;
  margin-bottom: 8px;
}

.empty-chart p {
  margin: 0;
  font-size: 12px;
}

.empty-state-small {
  min-height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

.empty-state-small span {
  font-size: 25px;
  margin-bottom: 7px;
}

.empty-state-small p {
  margin: 0;
  font-size: 12px;
}

.empty-dashboard {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  text-align: center;
}

.empty-dashboard-icon {
  font-size: 44px;
  margin-bottom: 14px;
}

.empty-dashboard h3 {
  margin: 0;
  color: #334155;
  font-size: 16px;
}

.empty-dashboard p {
  margin: 7px 0 18px;
  color: #94a3b8;
  font-size: 13px;
}

.feedback-empty {
  min-height: 150px;
}

/* ==========================================
   ANIMATION
========================================== */

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ==========================================
   RESPONSIVE
========================================== */

@media (max-width: 1100px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 800px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .date-filter {
    flex-wrap: wrap;
  }

  .bottom-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .sentiment-analytics {
    padding: 16px;
  }

  .page-title {
    font-size: 23px;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .date-filter {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .date-separator {
    display: none;
  }

  .refresh-button {
    grid-column: 1 / -1;
  }

  .doughnut-container,
  .trend-container {
    height: 280px;
  }

  .feedback-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
}
</style>