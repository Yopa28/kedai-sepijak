<template>
    <section
        id="home"
        class="hero-section relative min-h-screen flex items-center overflow-hidden"
    >
        <!-- ========================================
             BACKGROUND
        ========================================= -->
        <!-- Pastikan background ikut tercetak dengan pengaturan global CSS -->
        <div
            class="absolute inset-0 z-0 bg-gradient-to-br from-primary-green via-[#12332a] to-[#0a1f19]"
        ></div>

        <!-- Fine noise / texture overlay for depth (Disembunyikan saat cetak) -->
        <div
            class="absolute inset-0 z-0 opacity-[0.04] pointer-events-none print:hidden"
            style="background-image: radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0); background-size: 22px 22px;"
        ></div>

        <!-- Soft decorative glow (Disembunyikan saat cetak) -->
        <div
            class="absolute top-1/4 right-0 w-[520px] h-[520px] rounded-full bg-accent-amber/[0.06] blur-[120px] pointer-events-none print:hidden"
        ></div>

        <div
            class="absolute bottom-0 left-0 w-[460px] h-[460px] rounded-full bg-secondary-sage/[0.05] blur-[120px] pointer-events-none print:hidden"
        ></div>

        <!-- Hairline top border for a "framed" premium feel -->
        <div
            class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-amber/30 to-transparent z-10 print:hidden"
        ></div>

        <!-- ========================================
             MAIN CONTENT
        ========================================= -->
        <div
            class="container mx-auto px-6 lg:px-10 relative z-10 pt-24 lg:pt-28 pb-16"
        >
            <div
                class="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-14 xl:gap-20 items-center"
            >
                <!-- ==================================
                     LEFT CONTENT
                =================================== -->
                <div
                    class="text-center lg:text-left"
                    data-aos="fade-right"
                >
                    <!-- Small Label -->
                    <div
                        class="inline-flex items-center gap-3 mb-8"
                        data-aos="fade-down"
                        data-aos-delay="100"
                    >
                        <span class="w-8 h-px bg-accent-amber/70"></span>

                        <span
                            class="text-accent-amber/90 text-[11px] font-semibold tracking-[0.3em] uppercase"
                        >
                            Kedai Sepijak
                        </span>

                        <span class="w-8 h-px bg-accent-amber/70 lg:hidden"></span>
                    </div>

                    <!-- Title -->
                    <h1
                        class="font-display text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-bold text-background-beige leading-[0.98] tracking-tight mb-6"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Kedai
                        <span class="relative inline-block text-accent-amber ml-3 sm:ml-4">
                            Sepijak
                            <!-- SVG coretan disembunyikan saat cetak agar judul lebih rapi -->
                            <svg
                                class="absolute left-0 -bottom-2 w-full h-3 text-accent-amber/50 print:hidden"
                                viewBox="0 0 200 12"
                                preserveAspectRatio="none"
                                fill="none"
                            >
                                <path
                                    d="M2 9C40 3 100 2 198 6"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                />
                            </svg>
                        </span>
                    </h1>

                    <!-- Subtitle -->
                    <p
                        class="font-body text-base md:text-lg xl:text-xl text-secondary-sage/95 font-medium tracking-wide leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Kedai Ngopi
                        <span class="text-background-beige/30 mx-2.5">/</span>
                        Kedai Makan
                        <span class="text-background-beige/30 mx-2.5">/</span>
                        Ruang Bertemu
                        <span class="text-background-beige/30 mx-2.5">/</span>
                        Ruang Kerja
                    </p>

                    <!-- Description -->
                    <p
                        class="font-body text-base md:text-lg text-background-beige/70 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        Nikmati secangkir kopi dengan cita rasa autentik dalam
                        suasana yang hangat dan nyaman. Setiap tegukan adalah
                        cerita, setiap kunjungan adalah kenangan.
                    </p>

                    <!-- CTA (Tombol disembunyikan saat dicetak karena tidak interaktif di kertas) -->
                    <div
                        class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start print:hidden"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <!-- Menu -->
                        <a
                            href="#menu"
                            aria-label="Lihat Menu Kedai Sepijak"
                            class="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-accent-amber text-primary-green font-body font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-500 shadow-[0_15px_40px_-10px_rgba(218,165,82,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(218,165,82,0.65)] hover:-translate-y-0.5"
                        >
                            <span class="relative z-10 uppercase">Lihat Menu</span>

                            <span
                                class="material-symbols-outlined text-lg relative z-10 transition-transform duration-500 group-hover:translate-x-1"
                            >
                                arrow_forward
                            </span>

                            <span
                                class="absolute inset-0 bg-background-beige translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                            ></span>
                        </a>

                        <!-- Contact -->
                        <a
                            href="#contact"
                            aria-label="Hubungi Kedai Sepijak"
                            class="group inline-flex items-center justify-center gap-3 border border-background-beige/30 text-background-beige font-body font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-500 hover:border-background-beige/70 hover:bg-background-beige/[0.06] hover:-translate-y-0.5"
                        >
                            <span>Hubungi Kami</span>

                            <span
                                class="material-symbols-outlined text-lg transition-transform duration-500 group-hover:rotate-12"
                            >
                                call
                            </span>
                        </a>
                    </div>

                    <!-- ==================================
                         STATS
                    =================================== -->
                    <div
                        class="flex justify-center lg:justify-start gap-10 md:gap-14 max-w-xl mx-auto lg:mx-0 mt-10 pt-7 border-t border-background-beige/10"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <!-- Stat 1 -->
                        <div class="text-center lg:text-left">
                            <div
                                class="font-display text-3xl md:text-4xl font-bold text-background-beige"
                            >
                                5<span class="text-accent-amber">+</span>
                            </div>

                            <div
                                class="text-[11px] tracking-[0.15em] uppercase text-background-beige/50 font-medium mt-2"
                            >
                                Tahun Berdiri
                            </div>
                        </div>

                        <!-- Stat 2 -->
                        <div class="text-center lg:text-left">
                            <div
                                class="font-display text-3xl md:text-4xl font-bold text-background-beige"
                            >
                                50<span class="text-accent-amber">+</span>
                            </div>

                            <div
                                class="text-[11px] tracking-[0.15em] uppercase text-background-beige/50 font-medium mt-2"
                            >
                                Menu Pilihan
                            </div>
                        </div>

                        <!-- Stat 3 -->
                        <div class="text-center lg:text-left">
                            <div
                                class="font-display text-3xl md:text-4xl font-bold text-background-beige"
                            >
                                1K<span class="text-accent-amber">+</span>
                            </div>

                            <div
                                class="text-[11px] tracking-[0.15em] uppercase text-background-beige/50 font-medium mt-2"
                            >
                                Pelanggan
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ==================================
                     RIGHT IMAGE COMPOSITION
                =================================== -->
                <div
                    class="relative max-w-2xl mx-auto w-full"
                    data-aos="fade-left"
                    data-aos-delay="300"
                >
                    <!-- Decorative Glow (Disembunyikan saat cetak) -->
                    <div
                        class="absolute -inset-6 bg-accent-amber/[0.08] rounded-[2.5rem] blur-3xl print:hidden"
                    ></div>

                    <!-- Main Image -->
                    <div
                        class="relative z-10 rounded-[1.75rem] overflow-hidden border border-background-beige/15 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.55)] group"
                        data-aos="zoom-in"
                        data-aos-delay="500"
                    >
                        <!-- Optimasi LCP: fetchpriority="high" dan loading="eager" -->
                        <img
                            :src="kedaiSuasana"
                            alt="Suasana Kedai Sepijak"
                            fetchpriority="high"
                            loading="eager"
                            class="w-full h-[420px] sm:h-[480px] lg:h-[540px] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] print:object-contain print:h-auto print:max-h-[300px]"
                        />

                        <!-- Image Overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-b from-[#0a1f19]/80 via-transparent to-[#0a1f19]/50 print:hidden"
                        ></div>

                        <!-- Image Caption -->
                        <div
                            class="absolute top-0 left-0 right-0 p-6 md:p-8 pr-28 sm:pr-32 print:relative print:p-0 print:pt-4 print:text-black"
                        >
                            <div class="flex items-center gap-2 mb-3">
                                <span class="w-5 h-px bg-accent-amber/80 print:bg-black"></span>
                                <span
                                    class="text-accent-amber print:text-black text-[11px] font-semibold tracking-[0.25em] uppercase"
                                >
                                    Tempat Bertemu &amp; Bersantai
                                </span>
                            </div>

                            <h2
                                class="font-display italic text-xl md:text-2xl font-medium text-background-beige print:text-black leading-snug"
                            >
                                "Ruang untuk setiap cerita."
                            </h2>
                        </div>
                    </div>

                    <!-- ==================================
                         FLOATING PHOTO CLUSTER 
                    =================================== -->
                    <div
                        class="absolute z-20 -bottom-10 -right-6 sm:-right-10 w-[13.5rem] h-32 sm:w-72 sm:h-40 print:hidden"
                        data-aos="fade-up"
                        data-aos-delay="650"
                    >
                        <!-- Back card -->
                        <div
                            class="absolute top-0 left-0 w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-[3px] border-primary-green shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] -rotate-6 transition-transform duration-500 group-hover:-rotate-3"
                        >
                            <img
                                :src="kedaiMenu"
                                alt="Menu Kedai Sepijak"
                                loading="lazy"
                                class="w-full h-full object-cover"
                            />

                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                            ></div>

                            <div
                                class="absolute bottom-2 left-2.5 text-background-beige text-[10px] font-semibold tracking-wide uppercase"
                            >
                                Menu
                            </div>
                        </div>

                        <!-- Front card -->
                        <div
                            class="absolute bottom-0 right-0 w-32 h-24 sm:w-44 sm:h-32 rounded-xl overflow-hidden border-[3px] border-background-beige shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] rotate-3 hover:rotate-0 transition-all duration-500 hover:-translate-y-1"
                        >
                            <img
                                :src="kedaiKopi"
                                alt="Kopi Kedai Sepijak"
                                loading="lazy"
                                class="w-full h-full object-cover"
                            />

                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            ></div>

                            <div
                                class="absolute bottom-2 left-2.5 flex items-center gap-1 text-background-beige text-[10px] font-semibold tracking-wide uppercase"
                            >
                                <span
                                    class="material-symbols-outlined text-accent-amber"
                                    style="font-size: 0.85rem;"
                                >
                                    coffee
                                </span>
                                Kopi
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ========================================
                 FEATURE CARDS
            ========================================= -->
            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 mt-20 lg:mt-24"
            >
                <!-- Feature 1 -->
                <div
                    class="feature-card group print:border-black print:text-black print:bg-white"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div class="feature-icon print:text-black print:bg-gray-100 print:border-gray-300">
                        <span class="material-symbols-outlined">grain</span>
                    </div>

                    <div>
                        <h3 class="feature-title print:text-black">Biji Kopi Pilihan</h3>

                        <p class="feature-description print:text-black">
                            Dipilih langsung dari petani lokal terbaik untuk
                            menghasilkan cita rasa kopi yang sempurna.
                        </p>
                    </div>
                </div>

                <!-- Feature 2 -->
                <div
                    class="feature-card group print:border-black print:text-black print:bg-white"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div class="feature-icon print:text-black print:bg-gray-100 print:border-gray-300">
                        <span class="material-symbols-outlined">favorite</span>
                    </div>

                    <div>
                        <h3 class="feature-title print:text-black">Dibuat dengan Cinta</h3>

                        <p class="feature-description print:text-black">
                            Setiap cangkir diseduh dengan perhatian penuh oleh
                            barista berpengalaman kami.
                        </p>
                    </div>
                </div>

                <!-- Feature 3 -->
                <div
                    class="feature-card group print:border-black print:text-black print:bg-white"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <div class="feature-icon print:text-black print:bg-gray-100 print:border-gray-300">
                        <span class="material-symbols-outlined">groups</span>
                    </div>

                    <div>
                        <h3 class="feature-title print:text-black">Suasana Hangat</h3>

                        <p class="feature-description print:text-black">
                            Tempat berkumpul yang nyaman untuk keluarga, teman,
                            maupun rekan kerja.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ========================================
             SCROLL INDICATOR (Disembunyikan saat cetak)
        ========================================= -->
        <a
            href="#menu"
            aria-label="Scroll ke bagian menu"
            class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-background-beige/50 hover:text-background-beige transition-colors duration-300 print:hidden"
            data-aos="fade-up"
            data-aos-delay="1000"
        >
            <span class="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <span class="w-px h-8 bg-gradient-to-b from-background-beige/60 to-transparent scroll-line"></span>
        </a>
    </section>
</template>

<script setup>
/* 
  Sintaks Vue 3 <script setup> 
  Tidak perlu export default atau return data. 
  Import langsung tersedia di <template>.
*/
import kedaiInterior from "@/assets/images/kedai-interior.jpg";
import kedaiSuasana from "@/assets/images/kedai-suasana.jpg";
import kedaiMenu from "@/assets/images/kedai-menu.jpg";
import kedaiKopi from "@/assets/images/kedai-kopi.jpg";
</script>

<script>
// Jika Anda membutuhkan deklarasi properti komponen eksternal (opsional)
export default {
    name: "HeroSection",
};
</script>

<style scoped>
/* ========================================
   GLOBAL PRINT FIX (Opsional ditaruh di sini jika belum ada di file utama)
======================================== */
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}

/* ========================================
   HERO
======================================== */
.hero-section {
    background: #0f3d32;
}

/* ========================================
   SCROLL LINE ANIMATION
======================================== */
.scroll-line {
    animation: scroll-move 1.8s ease-in-out infinite;
    transform-origin: top;
}

@keyframes scroll-move {
    0% { transform: scaleY(0.3); opacity: 0.3; }
    50% { transform: scaleY(1); opacity: 1; }
    100% { transform: scaleY(0.3); opacity: 0.3; }
}

/* ========================================
   FEATURE CARD
======================================== */
.feature-card {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 1.35rem;
    padding: 2rem 1.85rem;
    border-radius: 1.1rem;

    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-top: 1px solid rgba(218, 165, 82, 0.35);

    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);

    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);

    transition:
        transform 0.4s ease,
        background 0.4s ease,
        border-color 0.4s ease,
        box-shadow 0.4s ease;
}

.feature-card:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.045);
    border-color: rgba(255, 255, 255, 0.14);
    box-shadow: 0 25px 55px rgba(0, 0, 0, 0.28);
}

/* ========================================
   FEATURE ICON
======================================== */
.feature-icon {
    flex-shrink: 0;

    width: 3.25rem;
    height: 3.25rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 9999px;

    background: rgba(218, 165, 82, 0.12);
    border: 1px solid rgba(218, 165, 82, 0.3);

    color: #dda552;

    transition: transform 0.4s ease, background 0.4s ease;
}

.feature-card:hover .feature-icon {
    transform: scale(1.08);
    background: rgba(218, 165, 82, 0.22);
}

.feature-icon .material-symbols-outlined {
    font-size: 1.6rem;
}

/* ========================================
   FEATURE TEXT
======================================== */
.feature-title {
    color: #f6f0df;
    font-family: inherit;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    margin-bottom: 0.55rem;
    line-height: 1.3;
}

.feature-description {
    color: rgba(246, 240, 223, 0.62);
    font-size: 0.875rem;
    line-height: 1.7;
    margin: 0;
}

/* ========================================
   RESPONSIVE
======================================== */
@media (max-width: 1023px) {
    .hero-section {
        min-height: auto;
    }
}

@media (max-width: 640px) {
    .feature-card {
        padding: 1.5rem;
    }

    .feature-icon {
        width: 2.85rem;
        height: 2.85rem;
    }

    .feature-icon .material-symbols-outlined {
        font-size: 1.4rem;
    }

    .feature-title {
        font-size: 1rem;
    }

    .feature-description {
        font-size: 0.8rem;
    }
}
</style>