<template>
    <div class="min-h-screen bg-background-beige">
        <!-- Header with Back Button -->
        <div
            class="sticky top-0 z-50 bg-primary-green/95 backdrop-blur-lg shadow-xl"
        >
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <router-link
                        to="/"
                        class="inline-flex items-center gap-2 text-background-beige hover:text-accent-amber transition-colors duration-300"
                    >
                        <span class="material-symbols-outlined"
                            >arrow_back</span
                        >
                        <span class="font-semibold">Back to Home</span>
                    </router-link>
                    <h1
                        class="font-display text-2x1 font-bold text-background-beige"
                    >
                        Feedback & Suggestions
                    </h1>
                    <div class="w-32"></div>
                </div>
            </div>
        </div>

        <!-- Hero Banner -->
        <section class="bg-primary-green py-16 relative overflow-hidden">
            <div
                class="absolute inset-0 bg-gradient-to-r from-primary-green via-primary-green/95 to-primary-green/90"
            ></div>
            <div
                class="absolute top-10 right-10 w-32 h-32 bg-accent-amber rounded-full opacity-20 blur-3xl animate-pulse"
            ></div>
            <div
                class="absolute bottom-10 left-10 w-40 h-40 bg-secondary-sage rounded-full opacity-20 blur-3xl animate-pulse"
                style="animation-delay: 1s"
            ></div>

            <div class="container mx-auto px-6 relative z-10">
                <div class="max-w-3xl mx-auto text-center" data-aos="fade-up">
                    <div
                        class="inline-block mb-6"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    >
                        <div
                            class="bg-accent-amber/20 backdrop-blur-sm p-4 rounded-full inline-block"
                        >
                            <span
                                class="material-symbols-outlined text-6xl text-accent-amber"
                                >rate_review</span
                            >
                        </div>
                    </div>
                    <h1
                        class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background-beige mb-6"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Kami Menghargai Umpan Balik Anda
                    </h1>
                    <p
                        class="text-xl text-secondary-sage mb-4"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Bagikan pengalaman Anda dan bantu kami meningkatkannya
                    </p>
                    <p
                        class="text-lg text-background-beige/80 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        Umpan balik Anda sangat penting bagi kami. Beri tahu
                        kami tentang kunjungan Anda, beri peringkat layanan
                        kami, dan beri tahu kami bagaimana kami dapat melayani
                        Anda dengan lebih baik.
                    </p>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <section class="py-20">
            <div class="container mx-auto px-6">
                <div class="max-w-3xl mx-auto">
                    <!-- Info Cards -->
                    <div
                        class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <span
                                class="material-symbols-outlined text-4xl text-accent-amber mb-3 block"
                                >timer</span
                            >
                            <p class="font-semibold text-primary-green">
                                Takes 2 Minutes
                            </p>
                            <p class="text-sm text-text-charcoal/70">
                                Quick & Easy
                            </p>
                        </div>
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <span
                                class="material-symbols-outlined text-4xl text-accent-amber mb-3 block"
                                >shield</span
                            >
                            <p class="font-semibold text-primary-green">
                                Anonymous Option
                            </p>
                            <p class="text-sm text-text-charcoal/70">
                                Your Privacy Matters
                            </p>
                        </div>
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <span
                                class="material-symbols-outlined text-4xl text-accent-amber mb-3 block"
                                >verified</span
                            >
                            <p class="font-semibold text-primary-green">
                                Direct to Management
                            </p>
                            <p class="text-sm text-text-charcoal/70">
                                We Read Every Comment
                            </p>
                        </div>
                    </div>

                    <!-- Feedback Form Component -->
                    <div data-aos="fade-up" data-aos-delay="600">
                        <FeedbackForm />
                    </div>

                    <!-- Additional Info -->
                    <div
                        class="mt-12 p-6 bg-secondary-sage/20 rounded-xl border-2 border-secondary-sage/40"
                        data-aos="fade-up"
                        data-aos-delay="700"
                    >
                        <h3
                            class="font-display text-xl font-bold text-primary-green mb-4 flex items-center gap-2"
                        >
                            <span class="material-symbols-outlined">info</span>
                            Apa yang terjadi selanjutnya?
                        </h3>
                        <ul class="space-y-3 text-text-charcoal/80">
                            <li class="flex items-start gap-3">
                                <span
                                    class="material-symbols-outlined text-accent-amber mt-1"
                                    >check_circle</span
                                >
                                <span
                                    >Masukan Anda akan ditinjau oleh tim manajemen kami dalam 24 jam</span
                                >
                            </li>
                            <li class="flex items-start gap-3">
                                <span
                                    class="material-symbols-outlined text-accent-amber mt-1"
                                    >check_circle</span
                                >
                                <span
                                    >Kami menggunakan masukan Anda untuk meningkatkan layanan dan pilihan menu kami</span
                                >
                            </li>
                            <li class="flex items-start gap-3">
                                <span
                                    class="material-symbols-outlined text-accent-amber mt-1"
                                    >check_circle</span
                                >
                                <span
                                    >Saran yang luar biasa dapat diterapkan dan Anda akan diberikan diskon</span
                                >
                            </li>
                            <li class="flex items-start gap-3">
                                <span
                                    class="material-symbols-outlined text-accent-amber mt-1"
                                    >check_circle</span
                                >
                                <span
                                    >Jika Anda memberikan informasi kontak, kami mungkin akan menghubungi untuk klarifikasi atau tindak lanjut</span
                                >
                            </li>
                        </ul>
                    </div>

                    <!-- Stats Section -->
                    <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-md"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <div
                                class="text-3xl font-bold text-accent-amber mb-2"
                            >
                                1000+
                            </div>
                            <div class="text-sm text-text-charcoal/70">
                                Umpan Balik Diterima
                            </div>
                        </div>
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-md"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div
                                class="text-3xl font-bold text-accent-amber mb-2"
                            >
                                4.8
                            </div>
                            <div class="text-sm text-text-charcoal/70">
                                Rating Rata-Rata
                            </div>
                        </div>
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-md"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <div
                                class="text-3xl font-bold text-accent-amber mb-2"
                            >
                                95%
                            </div>
                            <div class="text-sm text-text-charcoal/70">
                                Tingkat Kepuasan
                            </div>
                        </div>
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-md"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            <div
                                class="text-3xl font-bold text-accent-amber mb-2"
                            >
                                24h
                            </div>
                            <div class="text-sm text-text-charcoal/70">
                                Waktu Tanggapan
                            </div>
                        </div>
                    </div>

                    <!-- Other Options -->
                    <div
                        class="mt-16 text-center"
                        data-aos="fade-up"
                        data-aos-delay="800"
                    >
                        <p class="text-text-charcoal/70 mb-6">
                            Ingin ikut serta dalam acara kami?
                        </p>
                        <router-link
                            to="/polling"
                            class="inline-flex items-center gap-2 bg-primary-green text-background-beige font-bold px-8 py-4 rounded-full hover:bg-accent-amber hover:text-primary-green transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <span>Pilih Acara Berikutnya</span>
                            <span class="material-symbols-outlined"
                                >how_to_vote</span
                            >
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import FeedbackForm from "../components/FeedbackForm.vue";

export default {
    name: "FeedbackPage",
    components: {
        FeedbackForm,
    },
    mounted() {
        // Scroll to top when component is mounted
        window.scrollTo(0, 0);
    },
};
</script>

<style scoped>
.feedback-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
    flex-wrap: wrap;
}

.tab-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--color-primary-green, #2d5016);
    background: white;
    color: var(--color-primary-green, #2d5016);
    border-radius: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
}

.tab-button:hover {
    background: var(--color-primary-green, #2d5016);
    color: white;
    transform: translateY(-2px);
}

.tab-button.active {
    background: var(--color-primary-green, #2d5016);
    color: white;
    box-shadow: 0 4px 15px rgba(45, 80, 22, 0.3);
}

/* Additional styles if needed */
</style>
