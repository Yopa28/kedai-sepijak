<template>
  <div class="polling-card">
    <!-- ==================== CUSTOMER POLLING ==================== -->
    <div v-if="!hasSubmittedData" class="polling-form">
      <div class="polling-header">
        <div class="polling-icon">
          <span class="material-symbols-outlined" aria-hidden="true">how_to_vote</span>
        </div>

        <div>
          <h3>Polling Pelanggan</h3>
          <p>Bantu kami meningkatkan pelayanan</p>
        </div>
      </div>

      <form @submit.prevent="submitCustomerData">
        <!-- Nama -->
        <div class="form-group">
          <label for="customer-name">
            Nama <span class="required">*</span>
          </label>

          <input
            id="customer-name"
            v-model.trim="customerData.name"
            type="text"
            placeholder="Masukkan nama"
            required
            autocomplete="name"
          />
        </div>

        <!-- Nomor HP -->
        <div class="form-group">
          <label for="customer-phone">
            Nomor HP <span class="required">*</span>
          </label>

          <input
            id="customer-phone"
            v-model.trim="customerData.phone"
            type="tel"
            placeholder="Contoh: 081234567890"
            required
            autocomplete="tel"
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="customer-email">
            Email <span class="optional">(opsional)</span>
          </label>

          <input
            id="customer-email"
            v-model.trim="customerData.email"
            type="email"
            placeholder="nama@email.com"
            autocomplete="email"
          />
        </div>

        <button
          type="submit"
          class="submit-button"
          :disabled="loading || !customerData.name || !customerData.phone"
        >
          <span v-if="loading">Memuat...</span>
          <span v-else>Lanjut ke Polling</span>
        </button>
      </form>
    </div>

    <!-- ==================== LOADING ==================== -->
    <div v-else-if="loading" class="polling-loading">
      <div class="spinner"></div>
      <p>Memuat polling...</p>
    </div>

    <!-- ==================== ERROR ==================== -->
    <div v-else-if="error" class="polling-error">
      <div class="error-icon">⚠️</div>

      <h3>Polling tidak dapat dimuat</h3>
      <p>{{ error }}</p>

      <button type="button" @click="loadPollingData">
        Coba Lagi
      </button>
    </div>

    <!-- ==================== POLLING ==================== -->
    <div v-else-if="pollLoaded" class="polling-content">
      <div class="polling-header">
        <div class="polling-icon">
          <span class="material-symbols-outlined" aria-hidden="true">how_to_vote</span>
        </div>

        <div>
          <h3>Polling Pelanggan</h3>
          <p>Sampaikan pendapat tentang pelayanan kami</p>
        </div>
      </div>

      <div class="poll-question">
        <h4>{{ currentPollQuestion }}</h4>
      </div>

      <!-- Belum vote -->
      <div v-if="!hasVoted" class="poll-options">
        <button
          v-for="option in pollOptions"
          :key="option.id"
          type="button"
          class="poll-option"
          :class="{ selected: votedFor === option.id }"
          :disabled="loading"
          @click="selectOption(option.id)"
        >
          <span class="option-radio">
            <span v-if="votedFor === option.id"></span>
          </span>

          <span class="option-name">
            {{ option.name }}
          </span>
        </button>

        <button
          type="button"
          class="vote-button"
          :disabled="loading || !votedFor"
          @click="submitVote"
        >
          <span v-if="loading">Mengirim...</span>
          <span v-else>Kirim Jawaban</span>
        </button>
      </div>

      <!-- Sudah vote -->
      <div v-else class="poll-results">
          <div class="success-message">
          <div class="success-icon" aria-hidden="true">✓</div>

          <div>
            <strong>SUARA SUDAH TEREKAM</strong>
            <p>Pilihan Anda: {{ selectedOptionName }}</p>
          </div>
        </div>

        <div class="results-list">
          <div
            v-for="option in pollOptions"
            :key="option.id"
            class="result-item"
          >
            <div class="result-header">
              <span class="result-name">
                {{ option.name }}
              </span>

              <span class="result-percentage">
                {{ option.percentage }}%
              </span>
            </div>

            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: `${option.percentage}%` }"
              ></div>
            </div>

            <div class="result-votes">
              {{ option.votes }} suara
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== NO POLLING ==================== -->
    <div v-else class="no-polling">
      <div class="no-polling-icon material-symbols-outlined" aria-hidden="true">how_to_vote</div>

      <h3>Belum Ada Polling</h3>
      <p>Polling baru akan tersedia di sini.</p>
    </div>
  </div>
</template>

<script>
import api, {
  handleApiResponse,
  handleApiError
} from '../services/api';

export default {
  name: 'PollingCard',

  data() {
    return {
      hasSubmittedData: false,

      hasVoted: false,
      votedFor: null,

      pollLoaded: false,
      loading: false,
      error: null,

      currentPollId: null,
      currentPollQuestion: '',

      customerData: {
        name: '',
        phone: '',
        email: ''
      },

      pollOptions: []
    };
  },

  computed: {
    selectedOptionName() {
      return this.pollOptions.find((option) => option.id === this.votedFor)?.name || 'Pilihan Anda';
    },
  },

  mounted() {
    this.loadPollingData();
  },

  methods: {
    /**
     * Load active polling
     *
     * Backend bisa mengembalikan:
     *
     * {
     *   success: true,
     *   data: {
     *     id: 1,
     *     question: "...",
     *     options: [...]
     *   }
     * }
     *
     * atau:
     *
     * {
     *   success: true,
     *   data: [
     *     {
     *       id: 1,
     *       question: "...",
     *       options: [...]
     *     }
     *   ]
     * }
     */
    async loadPollingData() {
      try {
        this.loading = true;
        this.error = null;

        const response = await api.get('/polling/active');

        const processedResponse = handleApiResponse(response);

        console.log('[PollingCard] Active polling response:', processedResponse);

        if (!processedResponse.success) {
          this.pollLoaded = false;
          this.pollOptions = [];
          return;
        }

        const responseData = processedResponse.data;

        // Backend bisa mengembalikan array atau object
        const poll = Array.isArray(responseData)
          ? responseData[0]
          : responseData;

        console.log('[PollingCard] Normalized poll:', poll);

        // Tidak ada polling aktif
        if (!poll) {
          this.pollLoaded = false;
          this.pollOptions = [];
          this.currentPollId = null;
          this.currentPollQuestion = '';
          return;
        }

        // Simpan informasi polling
        this.currentPollId = poll.id;
        this.currentPollQuestion = poll.question || 'Bagaimana pendapat Anda?';

        // Pastikan options selalu array
        const options = Array.isArray(poll.options)
          ? poll.options
          : [];

        console.log('[PollingCard] Poll options:', options);

        // Mapping options
        const totalVotes = Number(poll.total_votes || 0);

        this.pollOptions = options.map((option) => {
          const votes = Number(option.votes || 0);

          let percentage = 0;

          if (totalVotes > 0) {
            percentage = Math.round((votes / totalVotes) * 100);
          }

          return {
            id: option.id,
            name: option.option_text || option.name || '',
            votes,
            percentage
          };
        });

        this.pollLoaded = this.pollOptions.length > 0;

        // Reset state polling
        this.hasVoted = false;
        this.votedFor = null;

        console.log('[PollingCard] Poll loaded:', {
          id: this.currentPollId,
          question: this.currentPollQuestion,
          options: this.pollOptions
        });

      } catch (err) {
        console.error('[PollingCard] Error loading polling:', err);

        this.pollLoaded = false;
        this.pollOptions = [];

        this.error = handleApiError(err).message;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Submit customer data
     */
    async submitCustomerData() {
      if (!this.customerData.name) {
        this.error = 'Nama wajib diisi.';
        return;
      }

      if (!this.customerData.phone) {
        this.error = 'Nomor HP wajib diisi.';
        return;
      }

      this.error = null;

      // Pastikan polling sudah tersedia
      if (!this.currentPollId) {
        await this.loadPollingData();

        if (!this.currentPollId) {
          this.error = 'Belum ada polling aktif.';
          return;
        }
      }

      this.hasSubmittedData = true;
    },

    /**
     * Pilih opsi polling
     */
    selectOption(optionId) {
      if (this.hasVoted || this.loading) {
        return;
      }

      this.votedFor = optionId;

      console.log('[PollingCard] Selected option:', optionId);
    },

    /**
     * Submit vote
     */
    async submitVote() {
      if (!this.votedFor) {
        this.error = 'Silakan pilih salah satu jawaban.';
        return;
      }

      if (!this.currentPollId) {
        this.error = 'Polling tidak ditemukan.';
        return;
      }

      try {
        this.loading = true;
        this.error = null;

        const payload = {
          name: this.customerData.name,
          phone: this.customerData.phone,
          email: this.customerData.email || '',
          option_id: this.votedFor
        };

        console.log('[PollingCard] Submit vote:', {
          pollId: this.currentPollId,
          payload
        });

        const response = await api.post(
          `/polling/${this.currentPollId}/vote`,
          payload
        );

        const processedResponse = handleApiResponse(response);

        console.log('[PollingCard] Vote response:', processedResponse);

        if (!processedResponse.success) {
          this.error =
            processedResponse.message ||
            'Gagal mengirim jawaban.';

          return;
        }

        // Tandai sudah vote
        this.hasVoted = true;

        // Refresh hasil polling
        await this.loadPollingResults();

      } catch (err) {
        console.error('[PollingCard] Error submitting vote:', err);

        const status = err?.response?.status;

        if (status === 409) {
          this.hasVoted = true;
          this.error = null;

          await this.loadPollingResults();
          return;
        }

        this.error = handleApiError(err).message;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Load hasil polling setelah vote
     */
    async loadPollingResults() {
      if (!this.currentPollId) {
        return;
      }

      try {
        const response = await api.get(
          `/polling/${this.currentPollId}/results`
        );

        const processedResponse = handleApiResponse(response);

        console.log(
          '[PollingCard] Poll results:',
          processedResponse
        );

        if (!processedResponse.success) {
          return;
        }

        const results = Array.isArray(processedResponse.data)
          ? processedResponse.data
          : [];

        this.pollOptions = this.pollOptions.map((option) => {
          const result = results.find(
            (item) => Number(item.option_id) === Number(option.id)
          );

          if (!result) {
            return option;
          }

          return {
            ...option,
            votes: Number(result.votes || 0),
            percentage: Number(result.percentage || 0)
          };
        });

      } catch (err) {
        console.error(
          '[PollingCard] Error loading poll results:',
          err
        );

        // Jangan membuat vote dianggap gagal hanya karena
        // endpoint results gagal.
      }
    }
  }
};
</script>

<style scoped>
.polling-card {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;
}

/* ==================== HEADER ==================== */

.polling-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.polling-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.polling-icon span {
  font-size: 24px;
}

.polling-header h3 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.polling-header p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

/* ==================== FORM ==================== */

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.required {
  color: #ef4444;
}

.optional {
  font-size: 12px;
  font-weight: 400;
  color: #9ca3af;
}

.form-group input {
  width: 100%;
  height: 44px;
  padding: 0 13px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  font-size: 14px;
  color: #111827;
  background: #ffffff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group input::placeholder {
  color: #9ca3af;
}

/* ==================== BUTTON ==================== */

.submit-button,
.vote-button {
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

.submit-button:hover:not(:disabled),
.vote-button:hover:not(:disabled) {
  opacity: 0.9;
}

.submit-button:active:not(:disabled),
.vote-button:active:not(:disabled) {
  transform: scale(0.99);
}

.submit-button:disabled,
.vote-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ==================== POLL QUESTION ==================== */

.poll-question {
  margin-bottom: 20px;
}

.poll-question h4 {
  margin: 0;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 700;
  color: #111827;
}

/* ==================== OPTIONS ==================== */

.poll-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.poll-option {
  width: 100%;
  min-height: 52px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #ffffff;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s, background 0.2s;
  box-sizing: border-box;
}

.poll-option:hover:not(:disabled) {
  border-color: #2563eb;
  background: #f8faff;
}

.poll-option.selected {
  border-color: #2563eb;
  background: #eff6ff;
}

.poll-option:disabled {
  cursor: not-allowed;
}

.option-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #9ca3af;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
}

.poll-option.selected .option-radio {
  border-color: #2563eb;
}

.option-radio span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2563eb;
}

.option-name {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.poll-option.selected .option-name {
  color: #1d4ed8;
  font-weight: 600;
}

.vote-button {
  margin-top: 8px;
}

/* ==================== LOADING ==================== */

.polling-loading {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

.polling-loading p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ==================== ERROR ==================== */

.polling-error {
  padding: 20px;
  text-align: center;
}

.error-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.polling-error h3 {
  margin: 0 0 6px;
  font-size: 16px;
  color: #111827;
}

.polling-error p {
  margin: 0 0 16px;
  font-size: 14px;
  color: #6b7280;
}

.polling-error button {
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

/* ==================== RESULTS ==================== */

.poll-results {
  margin-top: 4px;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.success-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #22c55e;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.success-message strong {
  display: block;
  margin-bottom: 2px;
  font-size: 14px;
  color: #166534;
}

.success-message p {
  margin: 0;
  font-size: 13px;
  color: #15803d;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-item {
  width: 100%;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 7px;
}

.result-name {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.result-percentage {
  font-size: 13px;
  font-weight: 700;
  color: #2563eb;
}

.progress-bar {
  width: 100%;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #e5e7eb;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: #2563eb;
  transition: width 0.3s ease;
}

.result-votes {
  margin-top: 5px;
  font-size: 12px;
  color: #9ca3af;
}

/* ==================== NO POLLING ==================== */

.no-polling {
  padding: 30px 20px;
  text-align: center;
}

.no-polling-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.no-polling h3 {
  margin: 0 0 6px;
  font-size: 16px;
  color: #111827;
}

.no-polling p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

/* ==================== RESPONSIVE ==================== */

@media (max-width: 640px) {
  .polling-card {
    padding: 18px;
    border-radius: 12px;
  }

  .polling-header {
    margin-bottom: 20px;
  }

  .polling-icon {
    width: 42px;
    height: 42px;
  }

  .polling-header h3 {
    font-size: 16px;
  }

  .poll-question h4 {
    font-size: 16px;
  }
}
</style>