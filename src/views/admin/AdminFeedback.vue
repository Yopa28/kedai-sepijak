<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Feedback Pelanggan</h1>
        <p class="mt-1 text-sm text-gray-500">
          Kelola dan lihat feedback dari pelanggan
        </p>
      </div>
      <button
        @click="exportFeedback"
        class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export Data
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kategori Rating</label>
          <select
            v-model="filters.ratingType"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">Pilih Kategori</option>
            <option value="sikap_pelayan">Sikap Pelayan</option>
            <option value="waktu_pesanan">Waktu Pesanan</option>
            <option value="rasa_menu">Rasa Menu</option>
            <option value="kebersihan">Kebersihan</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nilai</label>
          <select
            v-model="filters.ratingValue"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">Semua Nilai</option>
            <option value="5">5 Bintang</option>
            <option value="4">4 Bintang</option>
            <option value="3">3 Bintang</option>
            <option value="2">2 Bintang</option>
            <option value="1">1 Bintang</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
          <input
            v-model="filters.date"
            type="date"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div class="flex items-end">
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow-md p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Feedback</p>
            <p class="text-2xl font-bold text-gray-900">{{ filteredFeedback.length }}</p>
          </div>
          <div class="bg-blue-100 rounded-full p-3">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Rata-rata Sikap Pelayan</p>
            <p class="text-2xl font-bold text-gray-900">{{ averageRatingByType('sikap_pelayan').toFixed(1) }}</p>
          </div>
          <div class="bg-amber-100 rounded-full p-3">
            <svg class="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Positif (4-5⭐)</p>
            <p class="text-2xl font-bold text-green-600">{{ positiveCount }}</p>
          </div>
          <div class="bg-green-100 rounded-full p-3">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Negatif (1-2⭐)</p>
            <p class="text-2xl font-bold text-red-600">{{ negativeCount }}</p>
          </div>
          <div class="bg-red-100 rounded-full p-3">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback List -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div
          v-for="feedback in paginatedFeedback"
          :key="feedback.id"
          class="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
          @click="viewDetail(feedback)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ feedback.employee_name }}
                </h3>
                <!-- Tampilkan semua rating kriteria -->
                <div class="flex flex-col text-sm">
                  <div class="flex items-center gap-1">
                    <span class="text-gray-600">Sikap:</span>
                    <span v-for="star in 5" :key="star" class="text-xl">
                      <span v-if="star <= feedback.rating_sikap_pelayan" class="text-amber-400">★</span>
                      <span v-else class="text-gray-300">★</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-gray-600">Waktu:</span>
                    <span v-for="star in 5" :key="star" class="text-xl">
                      <span v-if="star <= feedback.rating_waktu_pesanan" class="text-amber-400">★</span>
                      <span v-else class="text-gray-300">★</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-gray-600">Rasa:</span>
                    <span v-for="star in 5" :key="star" class="text-xl">
                      <span v-if="star <= feedback.rating_rasa_menu" class="text-amber-400">★</span>
                      <span v-else class="text-gray-300">★</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-gray-600">Kebersihan:</span>
                    <span v-for="star in 5" :key="star" class="text-xl">
                      <span v-if="star <= feedback.rating_kebersihan" class="text-amber-400">★</span>
                      <span v-else class="text-gray-300">★</span>
                    </span>
                  </div>
                </div>
              </div>

              <p class="text-gray-700 mb-3">{{ feedback.message || 'Tidak ada komentar' }}</p>

              <div class="flex items-center gap-4 text-sm text-gray-500">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Role: {{ feedback.role }}
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ formatDate(feedback.created_at) }}
                </div>
              </div>
            </div>

            <div class="ml-4">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': feedback.status === 'approved',
                  'bg-yellow-100 text-yellow-800': feedback.status === 'pending',
                  'bg-red-100 text-red-800': feedback.status === 'rejected',
                }"
              >
                {{ feedback.status === 'approved' ? 'Approved' : feedback.status === 'rejected' ? 'Rejected' : 'Pending' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredFeedback.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada feedback</h3>
          <p class="mt-1 text-sm text-gray-500">Belum ada feedback atau tidak ditemukan dengan filter yang dipilih.</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Menampilkan <span class="font-medium">{{ startIndex + 1 }}</span> sampai
            <span class="font-medium">{{ Math.min(endIndex, filteredFeedback.length) }}</span> dari
            <span class="font-medium">{{ filteredFeedback.length }}</span> hasil
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div
      v-if="showDetailModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeDetailModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Detail Feedback</h3>
          <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="selectedFeedback" class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-500">Nama Karyawan</label>
            <p class="text-lg font-semibold text-gray-900">{{ selectedFeedback.employee_name }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-500">Role</label>
            <p class="text-gray-900">{{ selectedFeedback.role }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-500">Rating</label>
            <div class="mt-2 space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-gray-600 w-32">Sikap Pelayan:</span>
                <span v-for="star in 5" :key="star" class="text-xl">
                  <span v-if="star <= selectedFeedback.rating_sikap_pelayan" class="text-amber-400">★</span>
                  <span v-else class="text-gray-300">★</span>
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-600 w-32">Waktu Pesanan:</span>
                <span v-for="star in 5" :key="star" class="text-xl">
                  <span v-if="star <= selectedFeedback.rating_waktu_pesanan" class="text-amber-400">★</span>
                  <span v-else class="text-gray-300">★</span>
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-600 w-32">Rasa Menu:</span>
                <span v-for="star in 5" :key="star" class="text-xl">
                  <span v-if="star <= selectedFeedback.rating_rasa_menu" class="text-amber-400">★</span>
                  <span v-else class="text-gray-300">★</span>
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-600 w-32">Kebersihan:</span>
                <span v-for="star in 5" :key="star" class="text-xl">
                  <span v-if="star <= selectedFeedback.rating_kebersihan" class="text-amber-400">★</span>
                  <span v-else class="text-gray-300">★</span>
                </span>
              </div>
            </div>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-500">Komentar</label>
            <p class="text-gray-900 whitespace-pre-wrap">{{ selectedFeedback.message || 'Tidak ada komentar' }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-500">Waktu Submit</label>
            <p class="text-gray-900">{{ new Date(selectedFeedback.created_at).toLocaleString('id-ID') }}</p>
          </div>

          <div v-if="selectedFeedback.latitude && selectedFeedback.longitude">
            <label class="text-sm font-medium text-gray-500">Lokasi</label>
            <p class="text-gray-900">{{ selectedFeedback.latitude }}, {{ selectedFeedback.longitude }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getFeedback } from '@/services/feedbackAPI'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

// State
const feedback = ref([])
const filters = ref({
  ratingType: '',
  ratingValue: '',
  date: ''
})
const currentPage = ref(1)
const perPage = ref(10)
const showDetailModal = ref(false)
const selectedFeedback = ref(null)
const loading = ref(false)

// Computed
const filteredFeedback = computed(() => {
  let result = feedback.value

  if (filters.value.ratingType && filters.value.ratingValue) {
    result = result.filter(f => f[`rating_${filters.value.ratingType}`] === parseInt(filters.value.ratingValue))
  }

  if (filters.value.date) {
    result = result.filter(f => {
      const feedbackDate = new Date(f.created_at).toISOString().split('T')[0]
      return feedbackDate === filters.value.date
    })
  }

  return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

const averageRatingByType = (type) => {
  const filtered = filteredFeedback.value.filter(f => f[`rating_${type}`] !== null)
  if (filtered.length === 0) return 0
  const sum = filtered.reduce((acc, f) => acc + f[`rating_${type}`], 0)
  return sum / filtered.length
}

const positiveCount = computed(() => {
  // Hitung feedback yang semua rating >= 4
  return filteredFeedback.value.filter(f => {
    return f.rating_sikap_pelayan >= 4 &&
           f.rating_waktu_pesanan >= 4 &&
           f.rating_rasa_menu >= 4 &&
           f.rating_kebersihan >= 4;
  }).length
})

const negativeCount = computed(() => {
  // Hitung feedback yang ada rating <= 2
  return filteredFeedback.value.filter(f => {
    return f.rating_sikap_pelayan <= 2 ||
           f.rating_waktu_pesanan <= 2 ||
           f.rating_rasa_menu <= 2 ||
           f.rating_kebersihan <= 2;
  }).length
})

const totalPages = computed(() => Math.ceil(filteredFeedback.value.length / perPage.value))
const startIndex = computed(() => (currentPage.value - 1) * perPage.value)
const endIndex = computed(() => startIndex.value + perPage.value)
const paginatedFeedback = computed(() =>
  filteredFeedback.value.slice(startIndex.value, endIndex.value)
)

// Methods
function resetFilters() {
  filters.value = {
    ratingType: '',
    ratingValue: '',
    date: ''
  }
  currentPage.value = 1
}

function viewDetail(feedbackItem) {
  selectedFeedback.value = feedbackItem
  showDetailModal.value = true
}

function closeDetailModal() {
  showDetailModal.value = false
  selectedFeedback.value = null
}

function exportFeedback() {
  const doc = new jsPDF('landscape', 'mm', 'a4')

    // === HEADER ===
  doc.setFillColor(28, 126, 75) // Dark green
  doc.rect(0, 0, 297, 35, 'F')

  // Logo placeholder
  doc.setFillColor(255, 255, 255)
  doc.circle(25, 17.5, 8, 'F')
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(28, 126, 75)
  doc.text('KS', 21, 21)

  // Title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('LAPORAN FEEDBACK PELANGGAN', 50, 15)

  // Subtitle
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Kedai Sepijak - Customer Satisfaction Report', 50, 25)

  // Info ekspor
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  const now = new Date()
  const exportDateTime = now.toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  doc.text(`Waktu Export: ${exportDateTime}`, 200, 15)
  doc.text(`Total Data: ${filteredFeedback.value.length} feedback`, 200, 25)

  // === TABLE ===
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)

  const tableColumn = [
    { header: 'No', dataKey: 'no' },
    { header: 'Nama Karyawan', dataKey: 'employee' },
    { header: 'Posisi', dataKey: 'role' },
    { header: 'Sikap', dataKey: 'sikap' },
    { header: 'Waktu', dataKey: 'waktu' },
    { header: 'Rasa', dataKey: 'rasa' },
    { header: 'Kebersihan', dataKey: 'kebersihan' },
    { header: 'Komentar', dataKey: 'komentar' },
    { header: 'Tanggal', dataKey: 'tanggal' }
  ]

  const tableRows = filteredFeedback.value.map((item, index) => ({
    no: index + 1,
    employee: item.employee_name || '-',
    role: item.role || '-',
    sikap: item.rating_sikap_pelayan ? `${item.rating_sikap_pelayan}/5` : '-',
    waktu: item.rating_waktu_pesanan ? `${item.rating_waktu_pesanan}/5` : '-',
    rasa: item.rating_rasa_menu ? `${item.rating_rasa_menu}/5` : '-',
    kebersihan: item.rating_kebersihan ? `${item.rating_kebersihan}/5` : '-',
    komentar: item.message ? (item.message.length > 20 ? item.message.substring(0, 20) + '...' : item.message) : 'Tidak ada',
    tanggal: new Date(item.created_at).toLocaleDateString('id-ID')
  }))

  doc.autoTable({
    columns: tableColumn,
    body: tableRows,
    startY: 40,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2.5, // Lebih kecil
      lineColor: [220, 220, 220],
      lineWidth: 0.3,
      textColor: [40, 40, 40],
      font: 'helvetica',
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [28, 126, 75],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      cellPadding: 3,
      halign: 'center'
    },
    bodyStyles: {
      fillColor: [255, 255, 255]
    },
    alternateRowStyles: {
      fillColor: [245, 250, 245]
    },
    // Total lebar kolom sekarang = 12+30+20+15+15+15+20+35+20 = 182mm (aman di 297mm)
    columnStyles: {
      0: { halign: 'center', cellWidth: 12 }, // No
      1: { cellWidth: 30 }, // Nama Karyawan
      2: { halign: 'center', cellWidth: 20 }, // Role
      3: { halign: 'center', cellWidth: 15 }, // Sikap
      4: { halign: 'center', cellWidth: 15 }, // Waktu
      5: { halign: 'center', cellWidth: 15 }, // Rasa
      6: { halign: 'center', cellWidth: 20 }, // Kebersihan
      7: { cellWidth: 35 }, // Komentar (lebih besar karena isi panjang)
      8: { halign: 'center', cellWidth: 20 }  // Tanggal
    },
    didDrawPage: function (data) {
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(`Halaman ${doc.internal.getNumberOfPages()}`, 280, 205)
    }
  })

  // === FOOTER STATISTIK ===
  let finalY = 50
  if (doc.lastAutoTable && doc.lastAutoTable.finalY) {
    finalY = doc.lastAutoTable.finalY
  }

  // Card background
  doc.setFillColor(255, 255, 255)
  doc.rect(20, finalY + 10, 257, 25, 'F')
  doc.setLineWidth(0.5)
  doc.setDrawColor(220, 220, 220)
  doc.rect(20, finalY + 10, 257, 25, 'D')

  // Title statistik
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(28, 126, 75)
  doc.text('RINGKASAN STATISTIK', 25, finalY + 17)

  // Statistik detail
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)

  const avgSikap = averageRatingByType('sikap_pelayan').toFixed(1)
  const avgWaktu = averageRatingByType('waktu_pesanan').toFixed(1)
  const avgRasa = averageRatingByType('rasa_menu').toFixed(1)
  const avgKebersihan = averageRatingByType('kebersihan').toFixed(1)

  doc.text(`Total Feedback: ${filteredFeedback.value.length}`, 25, finalY + 22)
  doc.text(`Rata-rata Sikap: ${avgSikap}/5`, 100, finalY + 22)
  doc.text(`Rata-rata Waktu: ${avgWaktu}/5`, 170, finalY + 22)
  doc.text(`Rata-rata Rasa: ${avgRasa}/5`, 25, finalY + 30)
  doc.text(`Rata-rata Kebersihan: ${avgKebersihan}/5`, 100, finalY + 30)
  doc.text(`Feedback Positif: ${positiveCount.value}`, 170, finalY + 30)

  // Save file
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
  doc.save(`Laporan_Feedback_KedaiSepijak_${timestamp}.pdf`)
}
function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)

  if (days > 7) {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } else if (days > 0) {
    return `${days} hari lalu`
  } else if (hours > 0) {
    return `${hours} jam lalu`
  } else {
    return 'Baru saja'
  }
}

// ✅ Fetch feedback dari API
async function loadFeedback() {
  loading.value = true
  try {
    // Bangun params dari filters (opsional semua)
    const params = {}
    if (filters.value.ratingType) params.ratingType = filters.value.ratingType
    if (filters.value.ratingValue) params.ratingValue = filters.value.ratingValue
    if (filters.value.date) params.date = filters.value.date

    const resp = await getFeedback(params)

    // Pastikan respons sukses dan berisi data
    const rows = resp?.data?.feedbacks || resp?.data || []

    feedback.value = rows.map(r => ({
      id: r.id,
      employee_name: r.employee_name,
      role: r.role,
      rating_sikap_pelayan: r.rating_sikap_pelayan,
      rating_waktu_pesanan: r.rating_waktu_pesanan,
      rating_rasa_menu: r.rating_rasa_menu,
      rating_kebersihan: r.rating_kebersihan,
      message: r.message,
      status: r.status || 'pending',
      latitude: r.latitude,
      longitude: r.longitude,
      created_at: r.created_at
    }))
  } catch (error) {
    console.error('Gagal memuat feedback:', error)
    feedback.value = []
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadFeedback()
})
</script>