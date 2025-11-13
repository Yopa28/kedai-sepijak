<template>
    <div
        class="flex flex-col gap-6 rounded-xl bg-white p-8 shadow-2xl"
        id="feedback-form-container"
    >
        <div class="text-center">
            <h3 class="font-display text-3xl font-bold text-primary-green">
                Feedback & Suggestions Form
            </h3>
            <p class="text-text-charcoal/70 mt-1">
                Share your experience to make Sepijak even better.
            </p>
        </div>

        <div class="relative w-full h-2 bg-secondary-sage/30 rounded-full my-4">
            <div
                class="absolute top-0 left-0 h-2 bg-primary-green rounded-full transition-all duration-500"
                :style="{ width: progressWidth }"
            ></div>
            <div class="absolute flex justify-between w-full -top-3">
                <span
                    v-for="step in 3"
                    :key="step"
                    :class="[
                        'h-8 w-8 rounded-full border-4 border-white flex items-center justify-center font-bold text-sm shadow-md',
                        currentStep >= step
                            ? 'bg-primary-green text-white'
                            : 'bg-secondary-sage text-text-charcoal',
                    ]"
                >
                    {{ step }}
                </span>
            </div>
        </div>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 mt-8">
            <div class="flex flex-col gap-5">
                <div class="relative input-field">
                    <select
                        v-model="formData.role"
                        class="w-full rounded-lg border-2 border-secondary-sage bg-white px-4 py-3 text-text-charcoal transition-colors focus:border-primary-green focus:outline-none focus:ring-0 cursor-pointer"
                        id="role"
                        required
                    >
                        <option value="" disabled selected>
                            Pilih Role Yang Dinilai
                        </option>
                        <option
                            v-for="role in roleOptions"
                            :key="role.value"
                            :value="role.value"
                        >
                            {{ role.label }}
                        </option>
                    </select>
                    <label
                        class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-primary-green"
                        for="role"
                    >
                        Role
                    </label>
                </div>

                <div class="relative input-field">
                    <input
                        v-model="formData.employee_name"
                        class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
                        id="employee_name"
                        placeholder="Nama Karyawan"
                        type="text"
                        required
                    />
                    <label
                        class="absolute left-3 -top-2.5 text-text-charcoal/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green peer-focus:left-3 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:left-3 bg-white px-1 text-sm"
                        for="employee_name"
                    >
                        Nama Karyawan
                    </label>
                </div>

                <div class="relative input-field">
                    <input
                        v-model="formData.contact"
                        class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
                        id="nomor"
                        placeholder="Contact (Phone / Bill ID)"
                        type="text"
                        required
                    />
                    <label
                        class="absolute left-3 -top-2.5 text-text-charcoal/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green peer-focus:left-3 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:left-3 bg-white px-1 text-sm"
                        for="nomor"
                    >
                        Contact (Phone / Bill ID)
                    </label>
                </div>

               <div class="flex gap-3">
  <div class="relative w-1/2">
    <input
      v-model="formData.date_of_visit"
      type="date"
      id="date"
      class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent focus:border-primary-green focus:outline-none"
      required
    />
    <label
      for="date"
      class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-primary-green"
    >
      Date of Visit
    </label>
  </div>

  <div class="relative w-1/2">
    <input
      v-model="formData.time_of_visit"
      type="time"
      id="time"
      class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent focus:border-primary-green focus:outline-none"
      required
    />
    <label
      for="time"
      class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-primary-green"
    >
      Time of Visit
    </label>
  </div>
</div>


                <div class="relative input-field">
                    
                    
                </div>
            </div>
<!-- Rating Criteria Sections -->
<div class="space-y-6">
  <!-- Pelayanan (Service) -->
  <div class="bg-gray-50 p-4 rounded-lg">
    <h4 class="font-semibold text-text-charcoal mb-4">Penilaian Pelayanan</h4>

    <!-- Sikap Pelayan -->
<div class="mb-4">
  <p class="text-sm font-medium text-text-charcoal mb-2">Sikap Pelayan</p>
  <div
    class="rating-stars flex flex-row justify-center items-center space-x-1"
    style="display: inline-flex; text-align: center;"
    :key="formData.ratings.pelayanan.sikap_pelayan"
  >
    <template v-for="star in 5" :key="`sikap-${star}`">
      <input
        :id="`sikap-star${star}`"
        v-model="formData.ratings.pelayanan.sikap_pelayan"
        :value="star"
        name="sikap_pelayan"
        type="radio"
        class="hidden"
      />
      <label
        :for="`sikap-star${star}`"
        :title="ratingLabels[star - 1]"
        :style="{
          fontSize: '2rem', /* Ukuran bintang lebih besar */
          fontWeight: 'bold',
          cursor: 'pointer',
          color: star <= (formData.ratings.pelayanan.sikap_pelayan || 0) ? '#f59e0b' : '#d1d5db',
          marginRight: '0.3rem'
        }"
      >
        ★
      </label>
    </template>
  </div>
</div>

    <!-- Waktu Pesanan -->
<div class="mb-4">
  <p class="text-sm font-medium text-text-charcoal mb-2">Waktu Pesanan</p>
  <div
    class="rating-stars flex flex-row justify-center items-center space-x-1"
    style="display: inline-flex; text-align: center;"
    :key="formData.ratings.pelayanan.waktu_pesanan"
  >
    <template v-for="star in 5" :key="`waktu-${star}`">
      <input
        :id="`waktu-star${star}`"
        v-model="formData.ratings.pelayanan.waktu_pesanan"
        :value="star"
        name="waktu_pesanan"
        type="radio"
        class="hidden"
      />
      <label
        :for="`waktu-star${star}`"
        :title="ratingLabels[star - 1]"
        :style="{
          fontSize: '2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: star <= (formData.ratings.pelayanan.waktu_pesanan || 0) ? '#f59e0b' : '#d1d5db',
          marginRight: '0.3rem'
        }"
      >
        ★
      </label>
    </template>
  </div>
</div>
</div>

<!-- Menu -->
<div class="bg-gray-50 p-4 rounded-lg">
  <h4 class="font-semibold text-text-charcoal mb-4">Penilaian Menu</h4>

  <!-- Rasa Menu -->
  <div class="mb-4">
    <p class="text-sm font-medium text-text-charcoal mb-2">Rasa Menu</p>
    <div
      class="rating-stars flex flex-row justify-center items-center space-x-1"
      style="display: inline-flex; text-align: center;"
      :key="formData.ratings.menu.rasa_menu"
    >
      <template v-for="star in 5" :key="`rasa-${star}`">
        <input
          :id="`rasa-star${star}`"
          v-model="formData.ratings.menu.rasa_menu"
          :value="star"
          name="rasa_menu"
          type="radio"
          class="hidden"
        />
        <label
          :for="`rasa-star${star}`"
          :title="ratingLabels[star - 1]"
          :style="{
            fontSize: '2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: star <= (formData.ratings.menu.rasa_menu || 0) ? '#f59e0b' : '#d1d5db',
            marginRight: '0.3rem'
          }"
        >
          ★
        </label>
      </template>
    </div>
  </div>
</div>

<!-- Kebersihan -->
<div class="bg-gray-50 p-4 rounded-lg">
  <h4 class="font-semibold text-text-charcoal mb-4">Penilaian Kebersihan</h4>
  <div
    class="rating-stars flex flex-row justify-center items-center space-x-1"
    style="display: inline-flex; text-align: center;"
    :key="formData.ratings.kebersihan"
  >
    <template v-for="star in 5" :key="`kebersihan-${star}`">
      <input
        :id="`kebersihan-star${star}`"
        v-model="formData.ratings.kebersihan"
        :value="star"
        name="kebersihan"
        type="radio"
        class="hidden"
      />
      <label
        :for="`kebersihan-star${star}`"
        :title="ratingLabels[star - 1]"
        :style="{
          fontSize: '2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: star <= (formData.ratings.kebersihan || 0) ? '#f59e0b' : '#d1d5db',
          marginRight: '0.3rem'
        }"
      >
        ★
      </label>
    </template>
  </div>
</div>
</div>

            <!-- Your Feedback Message -->
            <div class="relative input-field">
                <textarea
                    v-model="formData.message"
                    class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
                    id="pesan"
                    placeholder="Your Feedback"
                    rows="4"
                ></textarea>
                <label
                    class="absolute left-3 -top-2.5 text-text-charcoal/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green peer-focus:left-3 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:left-3 bg-white px-1 text-sm"
                    for="pesan"
                >
                    Your Feedback
                </label>
            </div>

            <!-- Error Message -->
            <div
                v-if="errorMessage"
                class="p-4 rounded-lg bg-red-100 border border-red-400 text-red-700"
            >
                <p class="text-sm font-semibold">{{ errorMessage }}</p>
            </div>

            <!-- Success Message -->
            <div
                v-if="successMessage"
                class="p-4 rounded-lg bg-green-100 border border-green-400 text-green-700"
            >
                <p class="text-sm font-semibold">{{ successMessage }}</p>
            </div>

            <!-- Voluntary Consent Checkbox -->
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <input
                    v-model="formData.voluntary_consent"
                    type="checkbox"
                    id="voluntary_consent"
                    class="mt-1 h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                    required
                />
                <label for="voluntary_consent" class="text-sm text-text-charcoal leading-relaxed">
                    <span class="font-medium">Persetujuan Sukarela:</span> Saya dengan sukarela memberikan feedback ini untuk membantu meningkatkan kualitas pelayanan Kedai Sepijak. Feedback yang saya berikan adalah jujur dan berdasarkan pengalaman saya.
                </label>
            </div>

            <button
                class="w-full rounded-full bg-primary-green py-3.5 font-bold text-white shadow-lg shadow-primary-green/40 transition-all duration-300 hover:bg-primary-green/90 hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                :disabled="isSubmitting || !formData.voluntary_consent"
            >
                <span v-if="!isSubmitting">Send Feedback</span>
                <span v-else class="flex items-center justify-center gap-2">
                    <svg
                        class="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Sending...
                </span>
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
            currentStep: 1,
            isSubmitting: false,
            formData: {
                role: "",
                employee_name: "",
                contact: "",
                date_of_visit: "",
                time_of_visit: "",
                ratings: {
                    pelayanan: {
                        sikap_pelayan: null,
                        waktu_pesanan: null
                    },
                    menu: {
                        rasa_menu: null
                    },
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
        progressWidth() {
            return `${(this.currentStep / 3) * 100}%`;
        },
    },
    methods: {
        async handleSubmit() {
            this.isSubmitting = true;
            this.errorMessage = "";
            this.successMessage = "";

            try {
                // Validation
                if (!this.formData.role || !this.formData.employee_name || !this.formData.contact || 
                    !this.formData.date_of_visit || !this.formData.time_of_visit) {
                    throw new Error('Please fill in all required fields');
                }

                // Check if all ratings are provided
                const ratings = [
                    this.formData.ratings.pelayanan.sikap_pelayan,
                    this.formData.ratings.pelayanan.waktu_pesanan,
                    this.formData.ratings.menu.rasa_menu,
                    this.formData.ratings.kebersihan
                ];

                
                // Check each rating individually for better error messages
                const missingRatings = [];
                if (!this.formData.ratings.pelayanan.sikap_pelayan || this.formData.ratings.pelayanan.sikap_pelayan < 1 || this.formData.ratings.pelayanan.sikap_pelayan > 5) {
                    missingRatings.push('Sikap Pelayan');
                }
                if (!this.formData.ratings.pelayanan.waktu_pesanan || this.formData.ratings.pelayanan.waktu_pesanan < 1 || this.formData.ratings.pelayanan.waktu_pesanan > 5) {
                    missingRatings.push('Waktu Pesanan');
                }
                if (!this.formData.ratings.menu.rasa_menu || this.formData.ratings.menu.rasa_menu < 1 || this.formData.ratings.menu.rasa_menu > 5) {
                    missingRatings.push('Rasa Menu');
                }
                if (!this.formData.ratings.kebersihan || this.formData.ratings.kebersihan < 1 || this.formData.ratings.kebersihan > 5) {
                    missingRatings.push('Kebersihan');
                }

                if (missingRatings.length > 0) {
                    throw new Error(`Please provide ratings for: ${missingRatings.join(', ')}`);
                }

                if (!this.formData.voluntary_consent) {
                    throw new Error('Please agree to the voluntary consent');
                }

                // Ensure message is not empty for backend compatibility
                if (!this.formData.message || this.formData.message.trim() === '') {
                    this.formData.message = 'Feedback submitted via form';
                }

                const payload = {
                    role: this.formData.role?.trim(),
                    employee_name: this.formData.employee_name?.trim(),
                    contact: this.formData.contact?.trim(),
                    date_of_visit: this.formData.date_of_visit,
                    time_of_visit: this.formData.time_of_visit,
                    ratings: {
                        pelayanan: {
                            sikap_pelayan: Number(this.formData.ratings.pelayanan.sikap_pelayan),
                            waktu_pesanan: Number(this.formData.ratings.pelayanan.waktu_pesanan)
                        },
                        menu: {
                            rasa_menu: Number(this.formData.ratings.menu.rasa_menu)
                        },
                        kebersihan: Number(this.formData.ratings.kebersihan)
                    },
                    message: this.formData.message?.trim() || "",
                    voluntary_consent: this.formData.voluntary_consent,
                };

                const response = await submitFeedback(payload);

                if (response.success) {
                    this.successMessage = "Thank you for your feedback! We appreciate your input.";
                    setTimeout(() => {
                        this.resetForm();
                        this.successMessage = "";
                    }, 3000);
                } else {
                    this.errorMessage = response.message || "Failed to submit feedback. Please try again.";
                }
            } catch (error) {
                console.error("Error submitting feedback:", error);
                this.errorMessage = error.message || "Failed to submit feedback. Please check your connection and try again.";
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
                    pelayanan: {
                        sikap_pelayan: null,
                        waktu_pesanan: null
                    },
                    menu: {
                        rasa_menu: null
                    },
                    kebersihan: null
                },
                message: "",
                voluntary_consent: false
            };
            this.currentStep = 1;
        },
    },
};
</script>

<style scoped>
.rating-stars {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.rating-stars input[type="radio"] {
  display: none;
}

.rating-stars label {
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.rating-stars label:hover {
  color: #fbbf24 !important;
}
</style>
