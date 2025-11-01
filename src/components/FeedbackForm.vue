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
                    <input
                        v-model="formData.name"
                        class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
                        id="nama"
                        placeholder="Name"
                        type="text"
                        required
                    />
                    <label
                        class="absolute left-3 -top-2.5 text-text-charcoal/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-green peer-focus:left-3 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:left-3 bg-white px-1 text-sm"
                        for="nama"
                    >
                        Name
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

                <div class="relative input-field">
                    <input
                        v-model="formData.date_of_visit"
                        class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
                        id="tanggal"
                        placeholder="Date of Visit"
                        type="date"
                        required
                    />
                    <label
                        class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-primary-green"
                        for="tanggal"
                    >
                        Date of Visit
                    </label>
                </div>

                <div class="relative input-field">
                    <select
                        v-model="formData.waiter_id"
                        class="w-full rounded-lg border-2 border-secondary-sage bg-white px-4 py-3 text-text-charcoal transition-colors focus:border-primary-green focus:outline-none focus:ring-0 cursor-pointer"
                        id="pelayan"
                        required
                        :disabled="waitersLoading"
                    >
                        <option value="" disabled selected>
                            {{
                                waitersLoading
                                    ? "Loading waiters..."
                                    : "Pilih Pelayan yang Melayani"
                            }}
                        </option>
                        <option
                            v-for="waiter in waiters"
                            :key="waiter.id"
                            :value="waiter.id"
                        >
                            {{ waiter.name }}
                        </option>
                    </select>
                    <label
                        class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-primary-green"
                        for="pelayan"
                    >
                        Pelayan yang Melayani
                    </label>
                </div>
            </div>

            <div class="flex flex-col items-center gap-2 pt-2">
                <p class="font-semibold text-text-charcoal">Service Rating</p>
                <div class="rating-stars flex flex-row-reverse justify-center">
                    <input
                        v-for="star in 5"
                        :key="star"
                        :id="`star${star}`"
                        v-model="formData.rating"
                        :value="star"
                        name="rating"
                        type="radio"
                    />
                    <label
                        v-for="star in 5"
                        :key="`label-${star}`"
                        :for="`star${star}`"
                        :title="ratingLabels[star - 1]"
                    >
                        ★
                    </label>
                </div>
            </div>

            <div class="relative input-field">
                <textarea
                    v-model="formData.message"
                    class="peer w-full rounded-lg border-2 border-secondary-sage bg-transparent px-4 py-3 text-text-charcoal placeholder-transparent transition-colors focus:border-primary-green focus:outline-none focus:ring-0"
                    id="pesan"
                    placeholder="Your Feedback"
                    rows="4"
                    required
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

            <button
                class="w-full rounded-full bg-primary-green py-3.5 font-bold text-white shadow-lg shadow-primary-green/40 transition-all duration-300 hover:bg-primary-green/90 hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                :disabled="isSubmitting"
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
                    Submitting...
                </span>
            </button>
        </form>
    </div>
</template>

<script>
import { submitFeedback } from "../services/feedbackAPI";
import { getAllWaiters } from "../services/waitersAPI";

export default {
    name: "FeedbackForm",
    data() {
        return {
            currentStep: 1,
            isLoading: false,
            isSubmitting: false,
            waitersLoading: false,
            formData: {
                name: "",
                contact: "",
                date_of_visit: "",
                waiter_id: "",
                rating: null,
                message: "",
            },
            waiters: [],
            ratingLabels: ["Very Poor", "Poor", "Average", "Good", "Excellent"],
            errorMessage: "",
            successMessage: "",
        };
    },
    computed: {
        progressWidth() {
            return `${(this.currentStep / 3) * 100}%`;
        },
    },
    mounted() {
        this.loadWaiters();
    },
    methods: {
        async loadWaiters() {
            this.waitersLoading = true;
            this.errorMessage = "";

            try {
                const response = await getAllWaiters({ status: "active" });

                if (response.success) {
                    this.waiters = response.data;
                } else {
                    this.errorMessage = "Failed to load waiters";
                    // Fallback to default waiters
                    this.waiters = [
                        { id: 1, name: "Budi" },
                        { id: 2, name: "Siti" },
                        { id: 3, name: "Ahmad" },
                        { id: 4, name: "Dewi" },
                        { id: 5, name: "Rudi" },
                        { id: 6, name: "Fitri" },
                        { id: 7, name: "Joko" },
                        { id: 8, name: "Maya" },
                    ];
                }
            } catch (error) {
                console.error("Error loading waiters:", error);
                this.errorMessage = "Failed to load waiters";
                // Fallback to default waiters
                this.waiters = [
                    { id: 1, name: "Budi" },
                    { id: 2, name: "Siti" },
                    { id: 3, name: "Ahmad" },
                    { id: 4, name: "Dewi" },
                    { id: 5, name: "Rudi" },
                    { id: 6, name: "Fitri" },
                    { id: 7, name: "Joko" },
                    { id: 8, name: "Maya" },
                ];
            } finally {
                this.waitersLoading = false;
            }
        },

        async handleSubmit() {
            this.isSubmitting = true;
            this.errorMessage = "";
            this.successMessage = "";

            try {
                const response = await submitFeedback({
                    name: this.formData.name,
                    contact: this.formData.contact,
                    date_of_visit: this.formData.date_of_visit,
                    waiter_id: parseInt(this.formData.waiter_id),
                    rating: parseInt(this.formData.rating),
                    message: this.formData.message,
                });

                if (response.success) {
                    this.successMessage =
                        "Thank you for your feedback! We appreciate your input.";
                    setTimeout(() => {
                        this.resetForm();
                        this.successMessage = "";
                    }, 3000);
                } else {
                    this.errorMessage =
                        response.message ||
                        "Failed to submit feedback. Please try again.";
                }
            } catch (error) {
                console.error("Error submitting feedback:", error);
                this.errorMessage =
                    "Failed to submit feedback. Please check your connection and try again.";
            } finally {
                this.isSubmitting = false;
            }
        },

        resetForm() {
            this.formData = {
                name: "",
                contact: "",
                date_of_visit: "",
                waiter_id: "",
                rating: null,
                message: "",
            };
            this.currentStep = 1;
        },
    },
};
</script>
