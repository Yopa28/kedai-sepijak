<template>
  <div class="flex flex-col gap-6 rounded-xl bg-white p-8 shadow-2xl" id="feedback-form-container">
    <div class="text-center">
      <h3 class="font-display text-3xl font-bold text-primary-green">
        Feedback & Suggestions Form
      </h3>
      <p class="text-text-charcoal/70 mt-1">
        Share your experience to make Sepijak even better.
      </p>
    </div>

    <div class="feedback-progress" aria-label="Progress feedback">
      <div v-for="step in 3" :key="step" class="feedback-step" :class="{ active: currentStep >= step, complete: currentStep > step }">
        <span>{{ currentStep > step ? '✓' : `0${step}` }}</span>
        <i v-if="step < 3"></i>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 mt-8">
      <div class="flex flex-col gap-5">
        
        <div class="relative input-field">
          <select
            v-model="formData.role"
            @change="handleRoleChange"
            class="w-full rounded-lg border-2 border-secondary-sage bg-white px-4 py-3 text-text-charcoal transition-colors focus:border-primary-green focus:outline-none focus:ring-0 cursor-pointer"
            id="role"
            required
          >
            <option value="" disabled selected>Pilih Role Yang Dinilai</option>
            <option v-for="role in roleOptions" :key="role.value" :value="role.value">
              {{ role.label }}
            </option>
          </select>
          <label class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-primary-green" for="role">
            Role
          </label>
        </div>

        <div v-if="formData.role" class="relative input-field">
          <input
            v-model="formData.employee_name"
            class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
            id="employee_name"
            placeholder="Nama Karyawan"
            type="text"
            required
          />
          <label class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-text-charcoal/60 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green transition-all" for="employee_name">
            Nama Karyawan ({{ displayedRoleName }})
          </label>
        </div>

        <div class="relative input-field">
          <input
            v-model="formData.contact"
            class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
            id="nomor"
            placeholder="Contact"
            type="text"
            required
          />
          <label class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-text-charcoal/60 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green transition-all" for="nomor">
            Contact (Phone / Bill ID)
          </label>
        </div>

        <div class="flex gap-3">
          <div class="relative w-1/2">
            <input v-model="formData.date_of_visit" type="date" id="date" class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent focus:border-primary-green focus:outline-none" required />
            <label for="date" class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-primary-green">Date of Visit</label>
          </div>
          <div class="relative w-1/2">
            <input v-model="formData.time_of_visit" type="time" id="time" class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent focus:border-primary-green focus:outline-none" required />
            <label for="time" class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-primary-green">Time of Visit</label>
          </div>
        </div>
      </div>

      <div v-if="formData.role" class="space-y-6 transition-all duration-300 ease-in-out">
        
        <div v-if="isServiceRole" class="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h4 class="font-semibold text-text-charcoal mb-4">
            Penilaian Pelayanan ({{ formData.role }})
          </h4>

          <div class="mb-4">
            <p class="text-sm font-medium text-text-charcoal mb-2">Sikap & Keramahan</p>
            <div class="rating-stars flex flex-row justify-center items-center space-x-1">
              <template v-for="star in 5" :key="`sikap-${star}`">
                <input :id="`sikap-star${star}`" v-model="formData.ratings.pelayanan.sikap_pelayan" :value="star" type="radio" class="hidden" />
                <label :for="`sikap-star${star}`" :title="ratingLabels[star - 1]" :style="{ color: star <= (formData.ratings.pelayanan.sikap_pelayan || 0) ? '#f59e0b' : '#d1d5db' }">★</label>
              </template>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-sm font-medium text-text-charcoal mb-2">Kecepatan Pelayanan</p>
            <div class="rating-stars flex flex-row justify-center items-center space-x-1">
              <template v-for="star in 5" :key="`waktu-${star}`">
                <input :id="`waktu-star${star}`" v-model="formData.ratings.pelayanan.waktu_pesanan" :value="star" type="radio" class="hidden" />
                <label :for="`waktu-star${star}`" :title="ratingLabels[star - 1]" :style="{ color: star <= (formData.ratings.pelayanan.waktu_pesanan || 0) ? '#f59e0b' : '#d1d5db' }">★</label>
              </template>
            </div>
          </div>
        </div>

        <div v-if="isMenuRole" class="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h4 class="font-semibold text-text-charcoal mb-4">Penilaian Produk (Barista)</h4>
          <div class="mb-4">
            <p class="text-sm font-medium text-text-charcoal mb-2">Rasa & Kualitas Minuman</p>
            <div class="rating-stars flex flex-row justify-center items-center space-x-1">
              <template v-for="star in 5" :key="`rasa-${star}`">
                <input :id="`rasa-star${star}`" v-model="formData.ratings.menu.rasa_menu" :value="star" type="radio" class="hidden" />
                <label :for="`rasa-star${star}`" :title="ratingLabels[star - 1]" :style="{ color: star <= (formData.ratings.menu.rasa_menu || 0) ? '#f59e0b' : '#d1d5db' }">★</label>
              </template>
            </div>
          </div>
        </div>

        <div v-if="isCleaningRole" class="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h4 class="font-semibold text-text-charcoal mb-4">Penilaian Kebersihan</h4>
          <div class="rating-stars flex flex-row justify-center items-center space-x-1">
            <template v-for="star in 5" :key="`kebersihan-${star}`">
              <input :id="`kebersihan-star${star}`" v-model="formData.ratings.kebersihan" :value="star" type="radio" class="hidden" />
              <label :for="`kebersihan-star${star}`" :title="ratingLabels[star - 1]" :style="{ color: star <= (formData.ratings.kebersihan || 0) ? '#f59e0b' : '#d1d5db' }">★</label>
            </template>
          </div>
        </div>
      </div>
      
      <div v-else class="p-8 text-center text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p>Silakan pilih <b>Role</b> terlebih dahulu untuk menampilkan formulir penilaian.</p>
      </div>

      <div class="relative input-field">
        <textarea
          v-model="formData.message"
          class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
          id="pesan"
          placeholder="Your Feedback"
          rows="4"
        ></textarea>
        <label class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-text-charcoal/60 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green transition-all" for="pesan">
          Kritik & Saran Tambahan
        </label>
      </div>

      <div v-if="errorMessage" class="p-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
        <p class="text-sm font-semibold">{{ errorMessage }}</p>
      </div>
      <div v-if="successMessage" class="p-4 rounded-lg bg-green-100 border border-green-400 text-green-700">
        <p class="text-sm font-semibold">{{ successMessage }}</p>
      </div>

      <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <input v-model="formData.voluntary_consent" type="checkbox" id="voluntary_consent" class="mt-1 h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded" required />
        <label for="voluntary_consent" class="text-sm text-text-charcoal leading-relaxed">
          <span class="font-medium">Persetujuan Sukarela:</span> Saya memberikan feedback ini secara sukarela.
        </label>
      </div>

      <button
        class="w-full rounded-full bg-primary-green py-3.5 font-bold text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        :disabled="isSubmitting || !formData.voluntary_consent"
      >
        <span v-if="!isSubmitting">Kirim Penilaian</span>
        <span v-else>Mengirim feedback...</span>
      </button>
    </form>
  </div>
</template>

<script>
import { submitFeedback } from "../services/feedbackAPI";

export default {
  name: "FeedbackForm",
  data() {
    return {
      isSubmitting: false,
      formData: {
        role: "",
        employee_name: "",
        contact: "",
        date_of_visit: "",
        time_of_visit: "",
        ratings: {
          pelayanan: { sikap_pelayan: null, waktu_pesanan: null },
          menu: { rasa_menu: null },
          kebersihan: null
        },
        message: "",
        voluntary_consent: false
      },
      ratingLabels: ["Very Poor", "Poor", "Average", "Good", "Excellent"],
      roleOptions: [
        { value: "kasir", label: "Kasir" },
        { value: "waiters", label: "Waiters" },
        { value: "Barista", label: "Barista" },
        { value: "Petugas Kebersihan", label: "Petugas Kebersihan" }
      ],
      errorMessage: "",
      successMessage: "",
    };
  },
  computed: {
    // Helper untuk menampilkan nama role di label input
    displayedRoleName() {
      if (!this.formData.role) return "";
      return this.formData.role.charAt(0).toUpperCase() + this.formData.role.slice(1);
    },
    // Logic untuk menentukan bagian mana yang muncul
    isServiceRole() {
      return ['waiters', 'kasir'].includes(this.formData.role);
    },
    isMenuRole() {
      return this.formData.role === 'Barista';
    },
    isCleaningRole() {
      return this.formData.role === 'Petugas Kebersihan';
    },
    currentStep() {
      if (!this.formData.role) return 1;
      const ratings = this.formData.ratings;
      const hasRating = this.isServiceRole
        ? ratings.pelayanan.sikap_pelayan && ratings.pelayanan.waktu_pesanan
        : this.isMenuRole
          ? ratings.menu.rasa_menu
          : ratings.kebersihan;
      return hasRating ? 3 : 2;
    }
  },
  methods: {
    // Reset rating saat user mengganti role agar data bersih
    handleRoleChange() {
      this.formData.ratings = {
        pelayanan: { sikap_pelayan: null, waktu_pesanan: null },
        menu: { rasa_menu: null },
        kebersihan: null
      };
      this.formData.employee_name = ""; // Opsional: reset nama juga
    },

    async handleSubmit() {
      this.isSubmitting = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        // Validasi Umum
        if (!this.formData.role || !this.formData.employee_name || !this.formData.contact || 
            !this.formData.date_of_visit || !this.formData.time_of_visit) {
          throw new Error('Mohon lengkapi data kunjungan dan nama karyawan.');
        }

        // VALIDASI DINAMIS (Hanya cek rating yang sedang tampil)
        const missingRatings = [];
        
        // 1. Jika Role Service (Waiters/Kasir)
        if (this.isServiceRole) {
          if (!this.formData.ratings.pelayanan.sikap_pelayan) missingRatings.push('Sikap Pelayan');
          if (!this.formData.ratings.pelayanan.waktu_pesanan) missingRatings.push('Waktu Pesanan');
        }

        // 2. Jika Role Barista
        if (this.isMenuRole) {
          if (!this.formData.ratings.menu.rasa_menu) missingRatings.push('Rasa Menu');
        }

        // 3. Jika Role Kebersihan
        if (this.isCleaningRole) {
          if (!this.formData.ratings.kebersihan) missingRatings.push('Kebersihan');
        }

        if (missingRatings.length > 0) {
          throw new Error(`Mohon beri penilaian bintang untuk: ${missingRatings.join(', ')}`);
        }

        if (!this.formData.voluntary_consent) {
          throw new Error('Harap centang persetujuan sukarela.');
        }

        // Buat filtered ratings berdasarkan role yang dipilih
        let filteredRatings = {};
        
        if (this.isServiceRole) {
          // Kasir atau Waiters: hanya kirim pelayanan
          filteredRatings = {
            pelayanan: this.formData.ratings.pelayanan
          };
        } else if (this.isMenuRole) {
          // Barista: hanya kirim menu
          filteredRatings = {
            menu: this.formData.ratings.menu
          };
        } else if (this.isCleaningRole) {
          // Kebersihan: hanya kirim kebersihan
          filteredRatings = {
            kebersihan: this.formData.ratings.kebersihan
          };
        }

        // Siapkan Payload
        const payload = {
            role: this.formData.role,
            employee_name: this.formData.employee_name,
            contact: this.formData.contact,
            date_of_visit: this.formData.date_of_visit,
            time_of_visit: this.formData.time_of_visit,
            message: this.formData.message || "",
            voluntary_consent: this.formData.voluntary_consent,
            // Kirim hanya ratings yang relevan dengan role
            ratings: filteredRatings 
        };

        const response = await submitFeedback(payload);

        if (response.success) {
          this.successMessage = "Terima kasih! Feedback Anda telah terkirim.";
          setTimeout(() => {
            this.resetForm();
            this.successMessage = "";
          }, 3000);
        } else {
          this.errorMessage = response.message || "Gagal mengirim feedback.";
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        this.errorMessage = error.message || "Terjadi kesalahan koneksi.";
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.formData = {
        role: "",
        employee_name: "",
        contact: "",
        date_of_visit: "",
        time_of_visit: "",
        ratings: {
          pelayanan: { sikap_pelayan: null, waktu_pesanan: null },
          menu: { rasa_menu: null },
          kebersihan: null
        },
        message: "",
        voluntary_consent: false
      };
    },
  },
};
</script>

<style scoped>
.feedback-progress { display: flex; align-items: center; width: 100%; margin: 4px 0 8px; }
.feedback-step { display: flex; flex: 1; align-items: center; gap: 8px; color: #98a79d; font-size: 11px; font-weight: 750; }
.feedback-step:last-child { flex: 0 0 auto; }
.feedback-step span { display: grid; height: 27px; width: 27px; flex: 0 0 auto; place-items: center; border: 1px solid #c6d3c1; border-radius: 50%; background: #fff; }
.feedback-step i { height: 1px; width: 100%; margin-right: 8px; background: #c6d3c1; }
.feedback-step.active { color: #164c3b; }.feedback-step.active span { border-color: #164c3b; background: #164c3b; color: #fff; }.feedback-step.complete span { background: #d9a441; border-color: #d9a441; color: #164c3b; }.feedback-step.complete i { background: #d9a441; }
.rating-stars label {
  font-size: 2.5rem; /* Ukuran bintang diperbesar sedikit biar enak di klik */
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  padding: 0 5px;
}
.rating-stars label:hover {
  transform: scale(1.2); /* Efek membesar saat di hover */
  color: #fbbf24 !important;
}
</style>