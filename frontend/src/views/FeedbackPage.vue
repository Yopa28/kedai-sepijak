<template>
    <div class="min-h-screen bg-background-beige font-body">
        <!-- ========================================
             HEADER NAVIGATION
        ========================================= -->
        <div class="sticky top-0 z-50 bg-primary-green/95 backdrop-blur-lg shadow-xl">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <router-link
                        to="/"
                        class="inline-flex items-center gap-2 text-background-beige hover:text-accent-amber transition-colors duration-300"
                    >
                        <span class="material-symbols-outlined">arrow_back</span>
                        <span class="font-semibold">Back to Home</span>
                    </router-link>
                    <h1 class="font-display text-lg font-bold text-background-beige">
                        Feedback & Suggestions
                    </h1>
                    <div class="w-32"></div>
                </div>
            </div>
        </div>

        <!-- ========================================
             HERO BANNER
        ========================================= -->
        <section class="bg-primary-green py-16 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-green via-primary-green/95 to-primary-green/90"></div>
            <div class="absolute top-10 right-10 w-32 h-32 bg-accent-amber rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div class="absolute bottom-10 left-10 w-40 h-40 bg-secondary-sage rounded-full opacity-20 blur-3xl animate-pulse" style="animation-delay: 1s"></div>

            <div class="container mx-auto px-6 relative z-10">
                <div class="max-w-3xl mx-auto text-center" data-aos="fade-up">
                    <div class="inline-block mb-6" data-aos="zoom-in" data-aos-delay="100">
                        <div class="bg-accent-amber/20 backdrop-blur-sm p-4 rounded-full inline-block">
                            <span class="material-symbols-outlined text-5xl text-accent-amber">rate_review</span>
                        </div>
                    </div>
                    <h1 class="font-display text-3xl md:text-5xl font-bold text-background-beige mb-4">
                        Kami Menghargai Umpan Balik Anda
                    </h1>
                    <p class="text-base md:text-lg text-secondary-sage mb-3" data-aos="fade-up" data-aos-delay="300">
                        Bagikan pengalaman Anda dan bantu kami meningkatkannya
                    </p>
                    <p class="text-sm md:text-base text-background-beige/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400">
                        Umpan balik Anda sangat penting bagi kami. Beri tahu kami tentang kunjungan Anda, beri peringkat layanan kami, dan beri tahu kami bagaimana kami dapat melayani Anda dengan lebih baik.
                    </p>
                </div>
            </div>
        </section>

        <!-- ========================================
             MAIN CONTENT
        ========================================= -->
        <section class="py-16">
            <div class="container mx-auto px-6">
                <div class="max-w-3xl mx-auto">
                    
                    <!-- INFO CARDS -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10" data-aos="fade-up" data-aos-delay="500">
                        <div class="text-center p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary-green/5">
                            <span class="material-symbols-outlined text-3xl text-accent-amber mb-2 block">timer</span>
                            <p class="font-semibold text-primary-green text-sm">Takes 2 Minutes</p>
                            <p class="text-xs text-text-charcoal/70">Quick & Easy</p>
                        </div>
                        <div class="text-center p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary-green/5">
                            <span class="material-symbols-outlined text-3xl text-accent-amber mb-2 block">shield</span>
                            <p class="font-semibold text-primary-green text-sm">Anonymous Option</p>
                            <p class="text-xs text-text-charcoal/70">Your Privacy Matters</p>
                        </div>
                        <div class="text-center p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary-green/5">
                            <span class="material-symbols-outlined text-3xl text-accent-amber mb-2 block">verified</span>
                            <p class="font-semibold text-primary-green text-sm">Direct to Management</p>
                            <p class="text-xs text-text-charcoal/70">We Read Every Comment</p>
                        </div>
                    </div>

                    <!-- FEEDBACK FORM COMPONENT (Ukurannya pas, tidak terlalu besar) -->
                    <div data-aos="fade-up" data-aos-delay="600" class="bg-white rounded-2xl shadow-lg border border-primary-green/10 p-6 md:p-8 mb-12">
                        <FeedbackForm />
                    </div>

                    <!-- ADDITIONAL INFO -->
                    <div class="p-6 bg-secondary-sage/20 rounded-xl border border-secondary-sage/40 mb-12" data-aos="fade-up" data-aos-delay="700">
                        <h3 class="font-display text-lg font-bold text-primary-green mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined text-accent-amber">info</span>
                            Apa yang terjadi selanjutnya?
                        </h3>
                        <ul class="space-y-2.5 text-sm text-text-charcoal/80">
                            <li class="flex items-start gap-2.5">
                                <span class="material-symbols-outlined text-accent-amber text-base mt-0.5">check_circle</span>
                                <span>Masukan Anda akan ditinjau oleh tim manajemen kami dalam 24 jam</span>
                            </li>
                            <li class="flex items-start gap-2.5">
                                <span class="material-symbols-outlined text-accent-amber text-base mt-0.5">check_circle</span>
                                <span>Kami menggunakan masukan Anda untuk meningkatkan layanan dan pilihan menu kami</span>
                            </li>
                            <li class="flex items-start gap-2.5">
                                <span class="material-symbols-outlined text-accent-amber text-base mt-0.5">check_circle</span>
                                <span>Saran yang luar biasa dapat diterapkan dan Anda akan diberikan diskon</span>
                            </li>
                            <li class="flex items-start gap-2.5">
                                <span class="material-symbols-outlined text-accent-amber text-base mt-0.5">check_circle</span>
                                <span>Jika Anda memberikan informasi kontak, kami mungkin akan menghubungi untuk klarifikasi atau tindak lanjut</span>
                            </li>
                        </ul>
                    </div>

                    <!-- OTHER OPTIONS -->
                    <div class="text-center" data-aos="fade-up" data-aos-delay="800">
                        <p class="text-sm text-text-charcoal/70 mb-4">
                            Ingin ikut serta dalam acara kami?
                        </p>
                        <router-link
                            to="/polling"
                            class="inline-flex items-center gap-2 bg-primary-green text-background-beige font-bold text-sm px-6 py-3 rounded-full hover:bg-accent-amber hover:text-primary-green transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <span>Pilih Acara Berikutnya</span>
                            <span class="material-symbols-outlined text-base">how_to_vote</span>
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
/* Style tambahan jika diperlukan */
</style>