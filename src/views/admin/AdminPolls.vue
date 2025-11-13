<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Kelola Polling</h1>
        <p class="mt-1 text-sm text-gray-500">
          Buat dan kelola polling untuk pelanggan
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Buat Polling
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filters.status"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cari</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Cari pertanyaan..."
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

    <!-- Polls Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        v-for="poll in filteredPolls"
        :key="poll.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <!-- Poll Header -->
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-purple-100">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ poll.question || 'Pertanyaan tidak valid' }}</h3>
              <p class="text-sm text-gray-600 mt-1">
                Dibuat: {{ formatDate(poll.created_at) }}
              </p>
            </div>
            <div class="flex items-center gap-2 ml-4">
              <button
                @click="togglePollStatus(poll)"
                class="p-2 rounded-lg transition-colors"
                :class="{
                  'bg-green-100 text-green-600 hover:bg-green-200': poll.is_active,
                  'bg-gray-100 text-gray-600 hover:bg-gray-200': !poll.is_active,
                }"
                :title="poll.is_active ? 'Nonaktifkan' : 'Aktifkan'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                @click="viewResults(poll)"
                class="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                title="Lihat Hasil"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
              <button
                @click="confirmDelete(poll)"
                class="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                title="Hapus"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Poll Body -->
        <div class="px-6 py-4">
          <div class="space-y-3">
            <div
              v-for="option in poll.options"
              :key="option.id"
              class="relative"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">{{ option.option_text || 'Opsi tidak valid' }}</span>
                <span class="text-sm font-semibold text-gray-900">
                  {{ option.votes || 0 }} votes ({{ getPercentage(option.votes, poll.total_votes) }}%)
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  :style="{ width: `${getPercentage(option.votes, poll.total_votes)}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Poll Footer -->
          <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ poll.total_votes || 0 }} total votes
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ poll.options?.length || 0 }} opsi
              </div>
            </div>
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
              :class="{
                'bg-green-100 text-green-800': poll.is_active,
                'bg-gray-100 text-gray-800': !poll.is_active,
              }"
            >
              {{ poll.is_active ? 'Aktif' : 'Nonaktif' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredPolls.length === 0"
        class="col-span-2 bg-white rounded-lg shadow-md p-12 text-center"
      >
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada polling</h3>
        <p class="mt-1 text-sm text-gray-500">Mulai dengan membuat polling pertama Anda.</p>
      </div>
    </div>

    <!-- Create Poll Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeCreateModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Buat Polling Baru</h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitPoll" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Pertanyaan Polling <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="pollForm.question"
              required
              rows="3"
              placeholder="Contoh: Menu favorit Anda di Kedai Sepijak?"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Opsi Jawaban <span class="text-red-500">*</span>
              <span class="text-gray-500 font-normal">(Minimal 2 opsi)</span>
            </label>
            <div class="space-y-2">
              <div
                v-for="(option, index) in pollForm.options"
                :key="index"
                class="flex gap-2"
              >
                <input
                  v-model="pollForm.options[index]"
                  type="text"
                  required
                  :placeholder="`Opsi ${index + 1}`"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  v-if="pollForm.options.length > 2"
                  type="button"
                  @click="removeOption(index)"
                  class="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              type="button"
              @click="addOption"
              class="mt-2 inline-flex items-center px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm font-medium"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Opsi
            </button>
          </div>

          <div>
            <label class="flex items-center">
              <input
                v-model="pollForm.is_active"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">Aktifkan polling sekarang</span>
            </label>
          </div>

          <div class="flex gap-3 pt-4 border-t">
            <button
              type="button"
              @click="closeCreateModal"
              class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Buat Polling
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Results Modal -->
    <div
      v-if="showResultsModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeResultsModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Hasil Polling</h3>
          <button @click="closeResultsModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="selectedPoll">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
            <h4 class="text-xl font-semibold text-gray-900 mb-2">{{ selectedPoll.question || 'Pertanyaan tidak valid' }}</h4>
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span>Total Votes: {{ selectedPoll.total_votes || 0 }}</span>
              <span>Status: {{ selectedPoll.is_active ? 'Aktif' : 'Nonaktif' }}</span>
              <span>Dibuat: {{ formatDate(selectedPoll.created_at) }}</span>
            </div>
          </div>

          <div class="space-y-4">
            <div
              v-for="(option, index) in selectedPoll.options"
              :key="option.id"
              class="bg-gray-50 rounded-lg p-4"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div
                    class="flex items-center justify-center w-10 h-10 rounded-full font-bold text-white"
                    :class="{
                      'bg-yellow-500': index === 0,
                      'bg-gray-400': index === 1,
                      'bg-orange-600': index === 2,
                      'bg-purple-500': index > 2,
                    }"
                  >
                    {{ index + 1 }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ option.option_text || 'Opsi tidak valid' }}</p>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ option.votes || 0 }} votes · {{ getPercentage(option.votes, selectedPoll.total_votes) }}%
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold text-purple-600">
                    {{ getPercentage(option.votes, selectedPoll.total_votes) }}%
                  </p>
                </div>
              </div>
              <div class="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  :style="{ width: `${getPercentage(option.votes, selectedPoll.total_votes)}%` }"
                >
                  <span class="text-xs font-medium text-white" v-if="getPercentage(option.votes, selectedPoll.total_votes) > 10">
                    {{ option.votes }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeDeleteConfirm"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-lg font-medium text-gray-900">Hapus Polling</h3>
            <p class="mt-2 text-sm text-gray-500">
              Apakah Anda yakin ingin menghapus polling ini? Semua data voting akan hilang.
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
        </div>
        <div class="mt-6 flex gap-3">
          <button
            @click="closeDeleteConfirm"
            class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            @click="deletePoll"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  listPolls as apiListPolls,
  createPoll as apiCreatePoll,
  togglePoll as apiTogglePoll,
  deletePollOption as apiDeletePoll,
  getPoll as apiGetPollById
} from '@/services/pollingAPI'

// State
const polls = ref([])
const filters = ref({ status: '', search: '' })
const showCreateModal = ref(false)
const showResultsModal = ref(false)
const showDeleteConfirm = ref(false)
const selectedPoll = ref(null)
const pollToDelete = ref(null)
const loading = ref(false)
const submitting = ref(false)
const pollForm = ref({
  question: '',
  options: ['', ''],
  is_active: true
})

// Computed
const filteredPolls = computed(() => {
  // Pastiin polls.value selalu array
  let result = Array.isArray(polls.value) ? polls.value : []

  if (filters.value.status) {
    const isActive = filters.value.status === 'active'
    result = result.filter(p => !!p.is_active === isActive)
  }

  if (filters.value.search?.trim()) {
    const s = filters.value.search.toLowerCase()
    result = result.filter(p => (p.question || '').toLowerCase().includes(s))
  }

  // Pastiin result selalu array sebelum sort
  if (!Array.isArray(result)) {
    result = []
  }

  // Tambahkan pengecekan untuk created_at biar gak error di sort
  return result
    .filter(p => p && p.hasOwnProperty('created_at')) // Pastiin item punya created_at
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

// Methods
function resetFilters() {
  filters.value = { status: '', search: '' }
}

function getPercentage(votes, total) {
  if (!total || total === 0) return 0
  return Math.round((Number(votes || 0) / Number(total)) * 100)
}

function openCreateModal() {
  pollForm.value = { question: '', options: ['', ''], is_active: true }
  showCreateModal.value = true
}

function closeCreateModal() {
  showCreateModal.value = false
}

function addOption() {
  pollForm.value.options.push('')
}

function removeOption(index) {
  pollForm.value.options.splice(index, 1)
}

async function submitPoll() {
  const validOptions = pollForm.value.options
    .map(o => (o || '').trim())
    .filter(Boolean)

  if (!pollForm.value.question.trim() || validOptions.length < 2) {
    alert('Pertanyaan & minimal 2 opsi diperlukan')
    return
  }

  try {
    submitting.value = true

    // Panggil API
    const newPoll = await apiCreatePoll({
      question: pollForm.value.question.trim(),
      options: validOptions,
      is_active: !!pollForm.value.is_active
    })

    // Pastiin newPoll adalah object dan bukan error object dari handleApiError
    if (newPoll && typeof newPoll === 'object' && newPoll.hasOwnProperty('id')) {
      // Jika polls.value bukan array, set ke array kosong dulu
      if (!Array.isArray(polls.value)) {
        polls.value = []
      }
      // Tambahkan polling baru ke awal array
      polls.value.unshift(newPoll)
    } else {
      // Jika newPoll adalah error object dari handleApiError
      throw new Error(newPoll?.message || 'Respon API tidak valid')
    }

    closeCreateModal()
  } catch (e) {
    console.error(e)
    alert(e.message || 'Gagal membuat polling')
  } finally {
    submitting.value = false
  }
}

async function togglePollStatus(poll) {
  try {
    const updated = await apiTogglePoll(poll.id)
    // Pastiin updated adalah object dan bukan error object
    if (updated && typeof updated === 'object' && updated.hasOwnProperty('id')) {
      // Pastiin polls.value array
      if (!Array.isArray(polls.value)) {
        polls.value = []
      }
      // replace item di state
      const idx = polls.value.findIndex(p => p.id === poll.id)
      if (idx !== -1) polls.value[idx] = updated
    } else {
      throw new Error(updated?.message || 'Respon API tidak valid')
    }
  } catch (e) {
    console.error(e)
    alert(e.message || 'Gagal mengubah status polling')
  }
}

async function viewResults(poll) {
  try {
    const detail = await apiGetPollById(poll.id)
    // Pastiin detail adalah object dan bukan error object
    if (detail && typeof detail === 'object' && detail.hasOwnProperty('id')) {
      selectedPoll.value = detail
      showResultsModal.value = true
    } else {
      throw new Error(detail?.message || 'Respon API tidak valid')
    }
  } catch (e) {
    console.error(e)
    alert(e.message || 'Gagal mengambil detail polling')
  }
}

function closeResultsModal() {
  showResultsModal.value = false
  selectedPoll.value = null
}

function confirmDelete(poll) {
  pollToDelete.value = poll
  showDeleteConfirm.value = true
}

function closeDeleteConfirm() {
  showDeleteConfirm.value = false
  pollToDelete.value = null
}

async function deletePoll() {
  try {
    const result = await apiDeletePoll(pollToDelete.value.id)
    // Fungsi delete biasanya return pesan sukses, bukan data polling
    // Jadi cek apakah sukses berdasarkan pesan atau handleApiError
    if (result && result.success) {
      // Pastiin polls.value array
      if (!Array.isArray(polls.value)) {
        polls.value = []
      }
      const idx = polls.value.findIndex(p => p.id === pollToDelete.value.id)
      if (idx !== -1) polls.value.splice(idx, 1)
      closeDeleteConfirm()
    } else {
      // Jika result adalah error object dari handleApiError
      throw new Error(result?.message || 'Gagal menghapus polling')
    }
  } catch (e) {
    console.error(e)
    alert(e.message || 'Gagal menghapus polling')
  }
}

function formatDate(dateString) {
  // Tambahkan pengecekan awal
  if (!dateString) {
    return '-'; // atau 'Tanggal tidak valid'
  }

  // Coba parse dulu, kalo gagal return pesan error
  try {
    const date = new Date(dateString);
    // Cek apakah date valid
    if (isNaN(date.getTime())) {
      console.warn('Tanggal tidak valid:', dateString);
      return 'Tanggal tidak valid';
    }

    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } else if (days > 0) {
      return `${days} hari lalu`;
    } else if (hours > 0) {
      return `${hours} jam lalu`;
    } else {
      return 'Baru saja';
    }
  } catch (e) {
    console.error('Error parsing date:', e);
    return 'Tanggal tidak valid';
  }
}

async function loadPolls() {
  try {
    loading.value = true

    // Ambil data polling lewat fungsi apiListPolls
    // Karena fungsi listPolls di pollingAPI.js udah diubah,
    // sekarang harusnya return array kalo sukses
    const data = await apiListPolls()

    // Cek apakah data adalah array (berarti sukses)
    if (Array.isArray(data)) {
      polls.value = data
      console.log('Polls loaded successfully:', polls.value); // Tambahin log ini
      console.log('Is polls.value an array?', Array.isArray(polls.value)); // Tambahin log ini
      console.log('First poll data:', polls.value[0]); // Tambahin log ini buat cek isi array
    } else {
      // Jika bukan array (kemungkinan besar object error dari handleApiError di pollingAPI.js)
      polls.value = []
      console.warn('Data polling bukan array (kemungkinan error):', data)
      // Opsional: tampilkan error ke user berdasarkan pesan dari API
      alert(data?.message || 'Gagal memuat polling.')
    }

  } catch (e) {
    // Ini cuma ke trigger kalo ada error di luar handleApiResponse/handleApiError
    // atau error syntax
    console.error('Load polls error (catch):', e)
    polls.value = []
    alert(e.message || 'Gagal memuat polling.')
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadPolls()
})
</script>