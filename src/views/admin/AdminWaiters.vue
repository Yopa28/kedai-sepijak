<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Kelola Waiters</h1>
        <p class="mt-1 text-sm text-gray-500">Kelola data pelayan Kedai Sepijak</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Tambah Waiter
      </button>
    </div>

    <!-- Alerts -->
    <div v-if="errorMsg" class="rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
      {{ errorMsg }}
    </div>
    <div v-if="successMsg" class="rounded-lg border border-green-300 bg-green-50 p-3 text-green-700">
      {{ successMsg }}
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cari</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Cari nama atau kode..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filters.status"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            @change="reload()"
          >
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
        </div>

        <div class="flex items-end">
          <div class="flex gap-2 w-full">
            <button
              @click="reload()"
              :disabled="loading"
              class="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-60"
            >
              {{ loading ? 'Memuat...' : 'Terapkan' }}
            </button>
            <button
              @click="resetFilters"
              class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Feedback</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="w in paginatedWaiters" :key="w.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ w.code || '—' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ w.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="w.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
              >
                {{ w.is_active ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ w.feedback_count ?? 0 }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-sm font-medium text-gray-900">{{ (w.average_rating ?? 0).toFixed(1) }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center gap-2">
                <button @click="openEditModal(w)" class="text-blue-600 hover:text-blue-900" title="Edit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>

                <button
                  @click="toggleStatus(w)"
                  class="text-amber-600 hover:text-amber-900"
                  :title="w.is_active ? 'Nonaktifkan' : 'Aktifkan'"
                >
                  <svg v-if="w.is_active" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>

                <button @click="confirmDelete(w)" class="text-red-600 hover:text-red-900" title="Hapus">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <!-- Empty -->
        <div v-if="!loading && filteredWaiters.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada data</h3>
          <p class="mt-1 text-sm text-gray-500">Belum ada waiter atau tidak ditemukan dengan filter.</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Menampilkan <span class="font-medium">{{ startIndex + 1 }}</span> -
            <span class="font-medium">{{ Math.min(endIndex, filteredWaiters.length) }}</span>
            dari <span class="font-medium">{{ filteredWaiters.length }}</span>
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" @click.self="closeModal">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ isEditing ? 'Edit Waiter' : 'Tambah Waiter' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kode Waiter</label>
            <input
              v-model="form.code"
              type="text"
              placeholder="Contoh: W001"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <p class="text-xs text-gray-400 mt-1">*Optional jika backend belum support.</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span class="text-red-500">*</span></label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Masukkan nama waiter"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div class="flex items-center">
            <input id="is_active" v-model="form.is_active" type="checkbox"
                   class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded" />
            <label for="is_active" class="ml-2 text-sm text-gray-700">Aktif</label>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" @click="closeModal" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Batal
            </button>
            <button type="submit" :disabled="saving" class="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-60">
              {{ saving ? 'Menyimpan...' : (isEditing ? 'Simpan' : 'Tambah') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" @click.self="closeDeleteConfirm">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-lg font-medium text-gray-900">Hapus Waiter</h3>
            <p class="mt-2 text-sm text-gray-500">
              Yakin hapus <strong>{{ waiterToDelete?.name }}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <p v-if="deleteErr" class="mt-2 text-sm text-red-600">{{ deleteErr }}</p>
          </div>
        </div>
        <div class="mt-6 flex gap-3">
          <button @click="closeDeleteConfirm" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Batal
          </button>
          <button @click="deleteWaiter" :disabled="deleting" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-60">
            {{ deleting ? 'Menghapus...' : 'Hapus' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getAllWaiters, createWaiter, updateWaiter, deleteWaiter as apiDeleteWaiter } from '@/services/waitersAPI'

// ---- state ----
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)

const waiters = ref([])

const filters = ref({
  search: '',
  status: '' // '', 'active', 'inactive'
})

const currentPage = ref(1)
const perPage = ref(10)

const showModal = ref(false)
const showDeleteConfirm = ref(false)
const isEditing = ref(false)
const waiterToDelete = ref(null)

const errorMsg = ref('')
const successMsg = ref('')
const deleteErr = ref('')

const form = ref({
  id: null,
  code: '',
  name: '',
  is_active: true
})

// ---- computed ----
const filteredWaiters = computed(() => {
  let rows = [...waiters.value]

  if (filters.value.search) {
    const s = filters.value.search.toLowerCase()
    rows = rows.filter(r =>
      (r.name || '').toLowerCase().includes(s) ||
      (r.code || '').toLowerCase().includes(s)
    )
  }

  if (filters.value.status) {
    const isActive = filters.value.status === 'active'
    rows = rows.filter(r => r.is_active === isActive)
  }

  return rows
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredWaiters.value.length / perPage.value)))
const startIndex = computed(() => (currentPage.value - 1) * perPage.value)
const endIndex = computed(() => startIndex.value + perPage.value)
const paginatedWaiters = computed(() => filteredWaiters.value.slice(startIndex.value, endIndex.value))

watch([() => filters.value.search, () => filters.value.status], () => {
  currentPage.value = 1
})

// ---- methods ----
function resetFilters() {
  filters.value = { search: '', status: '' }
  currentPage.value = 1
  reload()
}

function openCreateModal() {
  isEditing.value = false
  form.value = { id: null, code: '', name: '', is_active: true }
  showModal.value = true
}

function openEditModal(w) {
  isEditing.value = true
  form.value = {
    id: w.id,
    code: w.code || '',
    name: w.name,
    is_active: !!w.is_active
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  form.value = { id: null, code: '', name: '', is_active: true }
}

function confirmDelete(w) {
  deleteErr.value = ''
  waiterToDelete.value = w
  showDeleteConfirm.value = true
}

function closeDeleteConfirm() {
  showDeleteConfirm.value = false
  waiterToDelete.value = null
  deleteErr.value = ''
}

async function reload() {
  errorMsg.value = ''
  loading.value = true
  try {
    const resp = await getAllWaiters({ status: filters.value.status || undefined })
    const rows = resp?.data ?? []

    // normalisasi: backend pakai status string
    waiters.value = rows.map(r => ({
      id: r.id,
      code: r.code ?? '',
      name: r.name,
      is_active: r.status === 'active',
      feedback_count: r.feedback_count ?? 0,
      average_rating: r.average_rating ?? 0,
      created_at: r.created_at ?? null
    }))
  } catch (e) {
    console.error(e)
    errorMsg.value = 'Gagal memuat data waiter.'
    waiters.value = []
  } finally {
    loading.value = false
  }
}

async function submitForm() {
  saving.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    const payload = {
      name: form.value.name,
      status: form.value.is_active ? 'active' : 'inactive',
      code: form.value.code || undefined // akan diabaikan backend jika belum support
    }

    if (isEditing.value && form.value.id) {
      await updateWaiter(form.value.id, payload)
      successMsg.value = 'Waiter berhasil diperbarui.'
    } else {
      await createWaiter(payload)
      successMsg.value = 'Waiter berhasil ditambahkan.'
    }

    await reload()
    closeModal()
  } catch (e) {
    console.error(e)
    errorMsg.value = 'Gagal menyimpan data waiter.'
  } finally {
    saving.value = false
  }
}

async function toggleStatus(w) {
  try {
    await updateWaiter(w.id, { status: w.is_active ? 'inactive' : 'active' })
    await reload()
  } catch (e) {
    console.error(e)
    errorMsg.value = 'Gagal mengubah status waiter.'
  }
}

async function deleteWaiter() {
  if (!waiterToDelete.value) return
  deleting.value = true
  deleteErr.value = ''
  try {
    await apiDeleteWaiter(waiterToDelete.value.id)
    await reload()
    closeDeleteConfirm()
    successMsg.value = 'Waiter berhasil dihapus.'
  } catch (e) {
    console.error(e)
    // kemungkinan: 400 karena ada feedback terkait
    deleteErr.value = 'Tidak bisa menghapus waiter yang sudah punya feedback. Nonaktifkan saja.'
  } finally {
    deleting.value = false
  }
}

// ---- lifecycle ----
onMounted(() => {
  reload()
})
</script>
