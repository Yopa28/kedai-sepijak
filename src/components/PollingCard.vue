<template>
  <div class="flex flex-col gap-6 rounded-xl bg-white p-8 shadow-2xl" id="polling">
    <div class="text-center">
      <h3 class="font-display text-3xl font-bold text-primary-green">
        Help Us Choose the Next Event!
      </h3>
      <p class="text-text-charcoal/70 mt-1">
        Your vote determines who performs at the next Kedai Sepijak event.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <p class="text-text-charcoal">Loading polling data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Customer Data Form (shown before voting) -->
    <div v-else-if="!hasSubmittedData" class="flex flex-col gap-5 mt-4">
      <p class="text-center text-sm font-semibold text-primary-green">
        Please fill in your details to vote
      </p>

      <div class="relative input-field">
        <input
          v-model="customerData.name"
          class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
          id="polling-name"
          placeholder="Name"
          type="text"
        />
        <label
          class="absolute left-3 -top-2.5 text-text-charcoal/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green peer-focus:left-3 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:left-3 bg-white px-1 text-sm"
          for="polling-name"
        >
          Full Name
        </label>
      </div>

      <div class="relative input-field">
        <input
          v-model="customerData.phone"
          class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
          id="polling-phone"
          placeholder="Phone Number"
          type="tel"
        />
        <label
          class="absolute left-3 -top-2.5 text-text-charcoal/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green peer-focus:left-3 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:left-3 bg-white px-1 text-sm"
          for="polling-phone"
        >
          Phone Number
        </label>
      </div>

      <div class="relative input-field">
        <input
          v-model="customerData.email"
          class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
          id="polling-email"
          placeholder="Email"
          type="email"
        />
        <label
          class="absolute left-3 -top-2.5 text-text-charcoal/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green peer-focus:left-3 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:left-3 bg-white px-1 text-sm"
          for="polling-email"
        >
          Email (Optional)
        </label>
      </div>

      <button
        @click="submitCustomerData"
        :disabled="!isCustomerDataValid"
        :class="[
          'w-full rounded-full py-3.5 font-bold transition-all duration-300',
          isCustomerDataValid
            ? 'bg-primary-green text-white shadow-lg shadow-primary-green/40 hover:bg-primary-green/90 hover:scale-105 cursor-pointer'
            : 'bg-secondary-sage/50 text-text-charcoal/50 cursor-not-allowed'
        ]"
      >
        Continue to Vote
      </button>
    </div>

    <!-- Polling Section (shown after customer data submitted) -->
    <div v-else-if="pollLoaded">
      <!-- Customer Info Display -->
      <div class="bg-secondary-sage/20 rounded-lg p-4 mb-4">
        <p class="text-sm font-semibold text-primary-green mb-1">Voting as:</p>
        <p class="text-text-charcoal font-medium">{{ customerData.name }}</p>
        <p class="text-text-charcoal/70 text-sm">{{ customerData.phone }}</p>
      </div>

      <!-- Poll Question -->
      <h4 class="text-center text-lg font-semibold text-text-charcoal mb-4">
        {{ currentPollQuestion }}
      </h4>

      <!-- Poll Results -->
      <div class="flex flex-col gap-5 mt-4">
        <div v-for="option in pollOptions" :key="option.id" class="group">
          <div class="flex justify-between items-center mb-1 text-sm font-medium text-text-charcoal">
            <span>{{ option.name }}</span>
            <span class="font-semibold text-primary-green">{{ option.percentage }}%</span>
          </div>
          <div class="w-full bg-secondary-sage/30 rounded-full h-4 relative overflow-hidden shadow-inner">
            <div
              class="progress-bar-fill bg-accent-amber h-4 rounded-full"
              :style="{ width: option.percentage + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <p class="text-center text-xs text-text-charcoal/60 mt-4">
        {{ hasVoted ? 'Thank you for voting!' : 'Choose one to cast your vote!' }}
      </p>

      <!-- Voting Buttons -->
      <div class="flex flex-col gap-3 mt-2">
        <button
          v-for="option in pollOptions"
          :key="`vote-${option.id}`"
          @click="vote(option.id)"
          :disabled="hasVoted"
          :class="[
            'w-full rounded-full border-2 py-3 font-bold transition-all duration-300',
            hasVoted && votedFor === option.id
              ? 'border-accent-amber bg-accent-amber text-white ring-4 ring-accent-amber/30'
              : 'border-accent-amber bg-transparent text-accent-amber hover:bg-accent-amber hover:text-white hover:shadow-lg hover:shadow-accent-amber/30',
            hasVoted && 'cursor-not-allowed opacity-70'
          ]"
        >
          {{ hasVoted && votedFor === option.id ? '✓ Voted for ' : 'Vote for ' }}{{ option.name }}
        </button>
      </div>

      <!-- Reset Button (for demo purposes) -->
      <button
        v-if="hasVoted"
        @click="resetPoll"
        class="w-full mt-4 text-sm text-text-charcoal/60 hover:text-primary-green transition-colors"
      >
        Vote again with different account
      </button>
    </div>

    <!-- No Active Poll Message -->
    <div v-else-if="!pollLoaded && !loading && !error" class="text-center py-8">
      <p class="text-text-charcoal">Tidak ada polling aktif saat ini.</p>
    </div>
  </div>
</template>

<script>

import api from '@/services/api';

import { handleApiResponse, handleApiError } from '@/services/api';


export default {
  name: 'PollingCard',
  data() {
    return {
      hasSubmittedData: false,
      hasVoted: false,
      votedFor: null,
      pollLoaded: false,
      loading: true,
      error: null,
      currentPollId: null,
      currentPollQuestion: '',
      customerData: {
        name: '',
        phone: '',
        email: ''
      },
      pollOptions: []
    }
  },
  computed: {
    isCustomerDataValid() {
      return this.customerData.name.trim().length >= 3 &&
             this.customerData.phone.trim().length >= 10
    }
  },
  methods: {
    async loadPollingData() {
      try {
        this.loading = true;
        this.error = null;

        // Gunakan api.get
        const response = await api.get('/polling/active');
        // Gunakan handleApiResponse
        const processedResponse = handleApiResponse(response);

        if (processedResponse.success && processedResponse.data) {
          const poll = processedResponse.data;
          this.currentPollId = poll.id;
          this.currentPollQuestion = poll.question;

          this.pollOptions = poll.options.map(opt => ({
            id: opt.id,
            name: opt.option_text,
            votes: opt.votes,
            percentage: poll.total_votes > 0 ? Math.round((opt.votes / poll.total_votes) * 100) : 0
          }));

          this.pollLoaded = true;
        } else {
          this.pollLoaded = false;
          // Jangan set error jika cuma gak ada polling aktif
          // this.error = processedResponse.message || 'Tidak ada polling aktif.';
        }
      } catch (err) {
        console.error('Load polling error:', err);
        // Gunakan handleApiError
        const processedError = handleApiError(err);
        this.error = processedError.message || 'Terjadi kesalahan saat mengambil data polling.';
        this.pollLoaded = false;
      } finally {
        this.loading = false;
      }
    },

    submitCustomerData() {
      if (!this.isCustomerDataValid) return
      this.hasSubmittedData = true
      console.log('Customer data submitted:', this.customerData)
    },

   async vote(optionId) {
  if (this.hasVoted || !this.hasSubmittedData || !this.currentPollId) return;

  try {
    // Gunakan api.post
    const response = await api.post(`/polling/${this.currentPollId}/vote`, {
      name: this.customerData.name,
      phone: this.customerData.phone,
      email: this.customerData.email,
      option_id: optionId
    });
    // Gunakan handleApiResponse
    const processedResponse = handleApiResponse(response);

    if (processedResponse.success) {
      this.hasVoted = true;
      this.votedFor = optionId;
      // alert(processedResponse.message || `Terima kasih ${this.customerData.name}! Suaramu telah direkam.`);
      await this.loadPollingData();
    } else {
      // Handle error dari API
      alert(processedResponse.message || 'Gagal menyimpan suara.');
    }
  } catch (err) {
    console.error('Vote error:', err);
    // Gunakan handleApiError
    const processedError = handleApiError(err);
    // Cek apakah errornya karena konflik (sudah vote)
    if (processedError.error?.status === 409) {
      alert(processedError.message || 'Nomor ini sudah melakukan vote.');
    } else {
      alert(processedError.message || 'Terjadi kesalahan saat mengirim suara.');
    }
  }
},

    resetPoll() {
      this.hasSubmittedData = false;
      this.hasVoted = false;
      this.votedFor = null;
      this.customerData = {
        name: '',
        phone: '',
        email: ''
      }
    }
  },
  async mounted() {
    await this.loadPollingData();
  }
}
</script>