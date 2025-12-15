<template>
  <div class="sentiment-analytics">
    <div class="header-container">
      <div class="header-content">
        <h1 class="title">📊 Sentiment Dashboard</h1>
        <p class="subtitle">Analisis AI Feedback Pelanggan Kedai Sepijak</p>
      </div>

      <div class="filter-wrapper">
        <div class="date-group">
          <div class="input-wrapper">
            <span class="input-icon">📅</span>
            <input 
              v-model="startDate" 
              type="date" 
              @change="fetchAnalytics"
              class="modern-input"
            />
          </div>
          <span class="separator">s/d</span>
          <div class="input-wrapper">
            <span class="input-icon">📅</span>
            <input 
              v-model="endDate" 
              type="date" 
              @change="fetchAnalytics"
              class="modern-input"
            />
          </div>
        </div>
        <button @click="fetchAnalytics" class="refresh-btn">
          <span>🔄 Refresh Data</span>
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Sedang menganalisis data...</p>
    </div>

    <div v-else-if="data" class="dashboard-content">
      
      <div class="kpi-grid">
        <div class="kpi-card total">
          <div class="icon-bubble purple">📝</div>
          <div class="kpi-info">
            <span class="kpi-label">Total Feedback</span>
            <span class="kpi-value">{{ data.total }}</span>
          </div>
        </div>

        <div class="kpi-card positive">
          <div class="icon-bubble green">😊</div>
          <div class="kpi-info">
            <span class="kpi-label">Positif</span>
            <div class="kpi-value-group">
              <span class="kpi-value">{{ data.sentimentAnalysis.positive }}</span>
              <span class="kpi-pill green">{{ data.sentimentAnalysis.percentages.positive }}%</span>
            </div>
          </div>
        </div>

        <div class="kpi-card negative">
          <div class="icon-bubble red">😞</div>
          <div class="kpi-info">
            <span class="kpi-label">Negatif</span>
            <div class="kpi-value-group">
              <span class="kpi-value">{{ data.sentimentAnalysis.negative }}</span>
              <span class="kpi-pill red">{{ data.sentimentAnalysis.percentages.negative }}%</span>
            </div>
          </div>
        </div>

        <div class="kpi-card rating">
          <div class="icon-bubble yellow">⭐</div>
          <div class="kpi-info">
            <span class="kpi-label">Avg Rating</span>
            <div class="kpi-value-group">
              <span class="kpi-value">{{ data.ratingAverage }}<small>/5</small></span>
            </div>
            <div class="star-display">
              <span 
                v-for="i in 5" 
                :key="i" 
                :class="{ 'filled-star': i <= Math.round(data.ratingAverage), 'empty-star': i > Math.round(data.ratingAverage) }"
              >
                ★
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="charts-grid">
        <div class="chart-card">
          <div class="card-header">
            <h3>📈 Trend Sentimen (30 Hari)</h3>
          </div>
          <div class="chart-body">
            <canvas id="trendChart"></canvas>
          </div>
        </div>
        <div class="chart-card">
          <div class="card-header">
            <h3>🍩 Distribusi Sentimen</h3>
          </div>
          <div class="chart-body pie-container">
            <canvas id="sentimentChart"></canvas>
          </div>
        </div>
      </div>

      <div class="bottom-grid">
        <div class="content-card keywords-card">
          <div class="card-header">
            <h3>🔑 Kata Kunci Populer</h3>
          </div>
          <div class="keywords-wrapper">
            <div 
              v-for="(kw, idx) in (data.topKeywords || [])" 
              :key="idx"
              class="keyword-chip"
            >
              <span class="word">{{ kw.keyword }}</span>
              <span class="badge">{{ kw.count }}</span>
            </div>
          </div>
        </div>

        <div class="content-card insights-card">
          <div class="card-header">
            <h3>💡 AI Insights</h3>
          </div>
          <div class="insights-list">
            <div class="insight-item positive">
              <div class="insight-icon">😊</div>
              <div class="insight-text">
                <strong>Kepuasan Pelanggan</strong>
                <p>{{ data.sentimentAnalysis.percentages.positive }}% pelanggan merasa puas dengan layanan.</p>
              </div>
            </div>
            <div class="insight-item warning" v-if="data.sentimentAnalysis.percentages.negative > 0">
              <div class="insight-icon">⚠️</div>
              <div class="insight-text">
                <strong>Perhatian Diperlukan</strong>
                <p>Ada {{ data.sentimentAnalysis.percentages.negative }}% feedback negatif yang perlu dievaluasi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-card feedback-card">
        <div class="card-header">
          <h3>📋 Feedback Terbaru</h3>
        </div>
        <div class="feedback-scroll">
          <div 
            v-for="feedback in data.recentFeedback" 
            :key="feedback.id"
            class="feedback-row"
          >
            <div class="feedback-meta">
              <div class="sentiment-tag" :class="feedback.sentiment || 'neutral'">
                {{ getSentimentEmoji(feedback.sentiment || 'neutral') }}
                {{ (feedback.sentiment || 'UNKNOWN').toUpperCase() }}
              </div>
              <span class="feedback-date">{{ formatDate(feedback.createdAt) }}</span>
            </div>
            <p class="feedback-text">"{{ feedback.message }}"</p>
            <div class="feedback-rating">
              <span v-for="n in 5" :key="n" :class="{ filled: n <= (feedback.rating || 0) }">★</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-else class="error-state">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <h3>Gagal Memuat Data</h3>
        <button @click="fetchAnalytics" class="retry-btn">Coba Lagi</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'SentimentAnalytics',
  setup() {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const startDate = ref('')
    const endDate = ref('')
    const trendData = ref(null)
    let sentimentChart = null
    let trendChart = null

    const fetchAnalytics = async () => {
      loading.value = true
      error.value = null
      
      try {
        const params = new URLSearchParams()
        if (startDate.value) params.append('startDate', startDate.value)
        if (endDate.value) params.append('endDate', endDate.value)

        const response = await fetch(`/api/feedback/analytics/sentiment?${params}`)
        const result = await response.json()

        if (result.success) {
          data.value = result.data
          await fetchTrendData()
          setTimeout(() => {
            renderCharts()
          }, 100)
        } else {
          error.value = result.message || 'Gagal mengambil data'
        }
      } catch (err) {
        console.error('Error fetching analytics:', err)
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const fetchTrendData = async () => {
      try {
        const response = await fetch('/api/feedback/sentiment/daily-trend')
        const result = await response.json()
        if (result.success) {
          trendData.value = result.data
        }
      } catch (err) {
        console.error('Error fetching trend:', err)
      }
    }

    const renderCharts = () => {
      if (!data.value) return

      // Sentiment Distribution Pie Chart
      const sentimentCtx = document.getElementById('sentimentChart')
      if (sentimentCtx) {
        if (sentimentChart) sentimentChart.destroy()
        
        sentimentChart = new Chart(sentimentCtx, {
          type: 'doughnut',
          data: {
            labels: ['Positif', 'Negatif', 'Netral'],
            datasets: [{
              data: [
                data.value.sentimentAnalysis.positive,
                data.value.sentimentAnalysis.negative,
                data.value.sentimentAnalysis.neutral
              ],
              backgroundColor: ['#10b981', '#ef4444', '#cbd5e1'],
              borderWidth: 0,
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
              legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
            }
          }
        })
      }

      // Trend Line Chart
      const trendCtx = document.getElementById('trendChart')
      if (trendCtx && trendData.value) {
        if (trendChart) trendChart.destroy()
        
        const trend = trendData.value.trend
        
        trendChart = new Chart(trendCtx, {
          type: 'line',
          data: {
            labels: trend.map(t => t.date.split('T')[0]),
            datasets: [
              {
                label: 'Positif',
                data: trend.map(t => Number(t.positive)), // Fix Number
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4
              },
              {
                label: 'Negatif',
                data: trend.map(t => Number(t.negative)), // Fix Number
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: { legend: { display: true, position: 'top', align: 'end' } },
            scales: {
              y: { beginAtZero: true, grid: { borderDash: [2, 2] } },
              x: { grid: { display: false } }
            }
          }
        })
      }
    }

    const getSentimentEmoji = (sentiment) => {
      const emojis = { positive: '😊', negative: '😞', neutral: '😐' }
      return emojis[sentiment] || '😐'
    }

    const formatDate = (dateStr) => {
      try {
        const date = new Date(dateStr)
        return date.toLocaleString('id-ID', {
          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
      } catch { return dateStr }
    }

    onMounted(() => {
      const today = new Date()
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
      endDate.value = today.toISOString().split('T')[0]
      startDate.value = thirtyDaysAgo.toISOString().split('T')[0]
      fetchAnalytics()
    })

    return {
      data, loading, error, startDate, endDate,
      fetchAnalytics, getSentimentEmoji, formatDate
    }
  }
}
</script>

<style scoped>
/* Base Layout & Typography */
.sentiment-analytics {
  padding: 24px;
  background-color: #f8fafc; /* Light Gray Background */
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #334155;
}

/* Header Styling */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 20px;
}

.title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #64748b;
  margin: 4px 0 0;
  font-size: 0.95rem;
}

/* Filter Controls */
.filter-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  flex-wrap: wrap;
}

.date-group {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 8px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.modern-input {
  border: none;
  background: transparent;
  color: #334155;
  font-family: inherit;
  font-size: 0.9rem;
  padding: 4px 0;
  outline: none;
  cursor: pointer;
}

.separator {
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 600;
}

.refresh-btn {
  background: #10b981; /* Kedai Sepijak Green */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.refresh-btn:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}

/* KPI Cards */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.kpi-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s;
  border: 1px solid #f1f5f9;
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.icon-bubble {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.icon-bubble.purple { background: #f3e8ff; color: #9333ea; }
.icon-bubble.green { background: #d1fae5; color: #059669; }
.icon-bubble.red { background: #fee2e2; color: #dc2626; }
.icon-bubble.yellow { background: #fef3c7; color: #d97706; }

.kpi-info {
  display: flex;
  flex-direction: column;
}

.kpi-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

.kpi-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.kpi-value-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.star-display {
  display: flex;
  gap: 2px;
  margin-top: 4px;
}

.star-display span {
  font-size: 1.875rem; /* text-3xl */
  line-height: 1;
}

.star-display .filled-star {
  color: #fbbf24; /* text-yellow-400 */
}

.star-display .empty-star {
  color: #e5e7eb; /* text-gray-200 */
}

.kpi-pill {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}
.kpi-pill.green { background: #ecfdf5; color: #059669; }
.kpi-pill.red { background: #fef2f2; color: #dc2626; }

/* Charts Layout */
.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.chart-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.card-header h3 {
  margin: 0 0 20px 0;
  font-size: 1.1rem;
  color: #1e293b;
  font-weight: 700;
}

.chart-body {
  height: 300px;
  width: 100%;
}

.pie-container {
  position: relative;
}

/* Bottom Grid (Keywords & Insights) */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.content-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

/* Keywords Chips */
.keywords-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.keyword-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.keyword-chip:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.keyword-chip .word { font-weight: 500; color: #334155; }
.keyword-chip .badge {
  background: #e2e8f0;
  color: #475569;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

/* Insights List */
.insights-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.insight-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
}

.insight-item.positive { background: #f0fdf4; border: 1px solid #bbf7d0; }
.insight-item.warning { background: #fffbeb; border: 1px solid #fde68a; }

.insight-icon { font-size: 1.5rem; }
.insight-text strong { display: block; color: #1e293b; margin-bottom: 4px; }
.insight-text p { margin: 0; font-size: 0.9rem; color: #475569; }

/* Feedback List */
.feedback-scroll {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.feedback-row {
  border-bottom: 1px solid #f1f5f9;
  padding: 16px 0;
}
.feedback-row:last-child { border-bottom: none; }

.feedback-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.sentiment-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}
.sentiment-tag.positive { background: #d1fae5; color: #047857; }
.sentiment-tag.negative { background: #fee2e2; color: #b91c1c; }
.sentiment-tag.neutral { background: #f1f5f9; color: #475569; }

.feedback-date { font-size: 0.8rem; color: #94a3b8; }
.feedback-text { margin: 0 0 8px 0; color: #334155; line-height: 1.5; font-style: italic;}

.feedback-rating .filled { color: #fbbf24; }
.feedback-rating span { color: #e2e8f0; font-size: 1.1rem; }

/* Utilities */
.loading-state, .error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* Mobile Responsive */
@media (max-width: 1024px) {
  .charts-grid, .bottom-grid { grid-template-columns: 1fr; }
  .header-container { flex-direction: column; align-items: flex-start; }
  .filter-wrapper { width: 100%; justify-content: space-between; }
}
</style>