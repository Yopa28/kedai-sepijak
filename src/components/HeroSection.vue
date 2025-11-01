<template>
    <section
        class="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
            <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
                alt="Coffee shop interior"
                class="w-full h-full object-cover"
            />
            <!-- Gradient Overlays -->
            <div
                class="absolute inset-0 bg-gradient-to-r from-primary-green/95 via-primary-green/85 to-transparent"
            ></div>
            <div
                class="absolute inset-0 bg-gradient-to-t from-background-beige/30 via-transparent to-transparent"
            ></div>
        </div>

        <!-- Decorative Elements -->
        <div
            class="absolute top-20 right-10 w-32 h-32 bg-accent-amber rounded-full opacity-20 blur-3xl animate-pulse"
        ></div>
        <div
            class="absolute bottom-40 left-10 w-40 h-40 bg-secondary-sage rounded-full opacity-20 blur-3xl animate-pulse"
            style="animation-delay: 1s"
        ></div>

        <div class="container mx-auto px-6 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Left Content -->
                <div class="text-center lg:text-left" data-aos="fade-right">
                    <div
                        class="inline-block mb-4"
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        <div
                            class="bg-accent-amber/20 backdrop-blur-sm p-4 rounded-full inline-block"
                        >
                            <span
                                class="material-symbols-outlined text-6xl text-accent-amber"
                                >local_cafe</span
                            >
                        </div>
                    </div>
                    <h1
                        class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-background-beige mb-6 leading-tight drop-shadow-lg"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Kedai Sepijak
                    </h1>
                    <p
                        class="font-body text-xl md:text-2xl text-secondary-sage mb-4 font-semibold"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        Kedai Ngopi | Kedai Makan | Ruang Bertemu | Ruang Kerja
                    </p>
                    <p
                        class="font-body text-base md:text-lg text-background-beige/90 mb-8 max-w-2xl mx-auto lg:mx-0"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        Nikmati secangkir kopi dengan cita rasa autentik dalam
                        suasana yang hangat dan nyaman. Setiap tegukan adalah
                        cerita, setiap kunjungan adalah kenangan.
                    </p>

                    <!-- CTA Buttons -->
                    <div
                        class="flex flex-wrap gap-4 justify-center lg:justify-start"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <a
                            href="#menu"
                            class="inline-flex items-center gap-2 bg-accent-amber text-primary-green font-body font-bold px-8 py-4 rounded-full hover:bg-background-beige transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            <span>Lihat Menu</span>
                            <span class="material-symbols-outlined"
                                >restaurant_menu</span
                            >
                        </a>
                        <a
                            href="#contact"
                            class="inline-flex items-center gap-2 bg-transparent border-2 border-background-beige text-background-beige font-body font-bold px-8 py-4 rounded-full hover:bg-background-beige hover:text-primary-green transition-all duration-300 backdrop-blur-sm"
                        >
                            <span>Hubungi Kami</span>
                            <span class="material-symbols-outlined">call</span>
                        </a>
                    </div>

                    <!-- Stats -->
                    <div
                        class="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto lg:mx-0"
                        data-aos="fade-up"
                        data-aos-delay="700"
                    >
                        <div class="text-center">
                            <div
                                class="text-3xl font-bold text-accent-amber font-display"
                            >
                                5+
                            </div>
                            <div class="text-sm text-background-beige/80">
                                Tahun Berdiri
                            </div>
                        </div>
                        <div class="text-center">
                            <div
                                class="text-3xl font-bold text-accent-amber font-display"
                            >
                                50+
                            </div>
                            <div class="text-sm text-background-beige/80">
                                Menu Tersedia
                            </div>
                        </div>
                        <div class="text-center">
                            <div
                                class="text-3xl font-bold text-accent-amber font-display"
                            >
                                1000+
                            </div>
                            <div class="text-sm text-background-beige/80">
                                Pelanggan Puas
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Content - Image Gallery -->
                <div
                    class="relative hidden lg:block"
                    data-aos="fade-left"
                    data-aos-delay="400"
                >
                    <!-- Main Image -->
                    <div
                        class="relative rounded-2xl overflow-hidden shadow-2xl"
                        data-aos="zoom-in"
                        data-aos-delay="500"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2078&auto=format&fit=crop"
                            alt="Cup of coffee"
                            class="w-full h-[500px] object-cover"
                        />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-primary-green/50 to-transparent"
                        ></div>
                    </div>

                    <!-- Small Image Top Right -->
                    <div
                        class="absolute -top-10 -right-10 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-background-beige"
                        data-aos="fade-down"
                        data-aos-delay="600"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop"
                            alt="Coffee brewing"
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <!-- Small Image Bottom Left -->
                    <div
                        class="absolute -bottom-10 -left-10 w-56 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-background-beige"
                        data-aos="fade-up"
                        data-aos-delay="700"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop"
                            alt="Coffee beans"
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <!-- Floating Badge -->
                    <div
                        class="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-accent-amber text-primary-green rounded-2xl p-4 shadow-2xl"
                        data-aos="zoom-in"
                        data-aos-delay="800"
                    >
                        <div class="text-center">
                            <div class="text-3xl font-bold font-display">
                                ⭐ 4.8
                            </div>
                            <div class="text-xs font-semibold mt-1">Rating</div>
                        </div>
                    </div>

                    <!-- Decorative circles -->
                    <div
                        class="absolute -top-5 right-1/4 w-20 h-20 bg-secondary-sage rounded-full opacity-30 blur-xl"
                    ></div>
                    <div
                        class="absolute -bottom-5 right-1/3 w-24 h-24 bg-accent-amber rounded-full opacity-30 blur-xl"
                    ></div>
                </div>
            </div>

            <!-- Features Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 lg:mt-32">
                <div
                    class="group relative p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-background-beige/20 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div
                        class="bg-accent-amber/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    >
                        <span
                            class="material-symbols-outlined text-4xl text-accent-amber"
                            >grain</span
                        >
                    </div>
                    <h3
                        class="font-display text-xl font-bold text-background-beige mb-3"
                    >
                        Biji Kopi Pilihan
                    </h3>
                    <p class="font-body text-background-beige/80 text-sm">
                        Dipilih langsung dari petani lokal terbaik untuk
                        menghasilkan cita rasa kopi yang sempurna
                    </p>
                </div>

                <div
                    class="group relative p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-background-beige/20 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div
                        class="bg-accent-amber/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    >
                        <span
                            class="material-symbols-outlined text-4xl text-accent-amber"
                            >favorite</span
                        >
                    </div>
                    <h3
                        class="font-display text-xl font-bold text-background-beige mb-3"
                    >
                        Dibuat dengan Cinta
                    </h3>
                    <p class="font-body text-background-beige/80 text-sm">
                        Setiap cangkir diseduh dengan perhatian penuh oleh
                        barista berpengalaman kami
                    </p>
                </div>

                <div
                    class="group relative p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-background-beige/20 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <div
                        class="bg-accent-amber/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    >
                        <span
                            class="material-symbols-outlined text-4xl text-accent-amber"
                            >groups</span
                        >
                    </div>
                    <h3
                        class="font-display text-xl font-bold text-background-beige mb-3"
                    >
                        Suasana Hangat
                    </h3>
                    <p class="font-body text-background-beige/80 text-sm">
                        Tempat berkumpul yang nyaman untuk semua kalangan,
                        keluarga, teman, atau rekan kerja
                    </p>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div
            class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
            data-aos="fade-up"
            data-aos-delay="900"
        >
            <div class="flex flex-col items-center gap-2 animate-bounce">
                <span class="text-background-beige/70 text-sm font-semibold"
                    >Scroll Down</span
                >
                <span class="material-symbols-outlined text-background-beige/70"
                    >expand_more</span
                >
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "HeroSection",
};
</script>

<style scoped>
@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}
</style>
