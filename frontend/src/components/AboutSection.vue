<template>
    <section
        id="about"
        class="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-background-beige text-text-charcoal"
    >
        <!-- ================================
             BACKGROUND AMBIENT (DEPTH)
        ================================= -->
        <!-- Ornamen pudar di pojok kanan bawah agar background tidak flat -->
        <div 
            class="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-primary-green opacity-[0.025] blur-[80px] pointer-events-none"
        ></div>
        
        <!-- Ornamen pudar di pojok kiri atas -->
        <div 
            class="absolute -left-20 top-10 h-[300px] w-[300px] rounded-full bg-accent-amber opacity-[0.03] blur-[60px] pointer-events-none"
        ></div>

        <div class="container relative z-10 mx-auto px-6 lg:px-10">
            <div
                class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20"
            >
                <!-- ================================
                     LEFT CONTENT
                ================================= -->
                <div
                    class="max-w-xl"
                    data-aos="fade-right"
                >
                    <!-- Section Label -->
                    <p
                        class="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-green/60"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Tentang Kami
                    </p>

                    <!-- Title -->
                    <h2
                        class="font-display text-4xl font-bold leading-tight tracking-tight text-primary-green sm:text-5xl lg:text-6xl"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        Tentang Kedai
                        <span class="block text-accent-amber">
                            Sepijak
                        </span>
                    </h2>

                    <!-- Description -->
                    <p
                        class="mt-6 font-body text-base leading-relaxed text-text-charcoal/75 sm:text-lg"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        {{ aboutDescription }}
                    </p>

                    <!-- ================================
                         HIGHLIGHTS (MICRO-INTERACTIONS)
                    ================================= -->
                    <div
                        class="mt-10 grid grid-cols-1 gap-2 border-t border-primary-green/10 pt-8 sm:grid-cols-3 sm:gap-4"
                        data-aos="fade-up"
                        data-aos-delay="350"
                    >
                        <!-- Kopi -->
                        <div
                            class="group flex items-center gap-4 cursor-pointer rounded-xl p-3 transition-all duration-300 hover:bg-primary-green/[0.04] hover:-translate-y-1"
                        >
                            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent-amber/10 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                                <span class="material-symbols-outlined text-2xl text-accent-amber transition-colors group-hover:text-primary-green">
                                    coffee
                                </span>
                            </div>

                            <div>
                                <p class="font-body text-sm font-bold text-primary-green transition-colors group-hover:text-accent-amber">
                                    Kopi
                                </p>
                                <p class="font-body text-xs text-text-charcoal/60 mt-0.5">
                                    Cita rasa pilihan
                                </p>
                            </div>
                        </div>

                        <!-- Makanan -->
                        <div
                            class="group flex items-center gap-4 cursor-pointer rounded-xl p-3 transition-all duration-300 hover:bg-primary-green/[0.04] hover:-translate-y-1"
                        >
                            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent-amber/10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                <span class="material-symbols-outlined text-2xl text-accent-amber transition-colors group-hover:text-primary-green">
                                    restaurant
                                </span>
                            </div>

                            <div>
                                <p class="font-body text-sm font-bold text-primary-green transition-colors group-hover:text-accent-amber">
                                    Makanan
                                </p>
                                <p class="font-body text-xs text-text-charcoal/60 mt-0.5">
                                    Teman cerita
                                </p>
                            </div>
                        </div>

                        <!-- Ruang -->
                        <div
                            class="group flex items-center gap-4 cursor-pointer rounded-xl p-3 transition-all duration-300 hover:bg-primary-green/[0.04] hover:-translate-y-1"
                        >
                            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent-amber/10 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                                <span class="material-symbols-outlined text-2xl text-accent-amber transition-colors group-hover:text-primary-green">
                                    groups
                                </span>
                            </div>

                            <div>
                                <p class="font-body text-sm font-bold text-primary-green transition-colors group-hover:text-accent-amber">
                                    Ruang
                                </p>
                                <p class="font-body text-xs text-text-charcoal/60 mt-0.5">
                                    Bertemu & bekerja
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ================================
                     RIGHT IMAGE (ELEVATED PARALLAX)
                ================================= -->
                <div
                    class="relative w-full"
                    data-aos="fade-left"
                    data-aos-delay="200"
                >
                    <!-- Image Wrapper -->
                    <div
                        class="group relative overflow-hidden rounded-[2rem] shadow-[0_15px_40px_-10px_rgba(20,40,30,0.15)] transition-all duration-700 hover:shadow-[0_25px_50px_-12px_rgba(20,40,30,0.25)] hover:-translate-y-2"
                    >
                        <img
                            :src="aboutImage"
                            :alt="aboutImageAlt"
                            loading="lazy"
                            class="h-[400px] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07] sm:h-[480px] lg:h-[540px]"
                        />

                        <!-- Gradient Overlay for Bottom Text -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-primary-green/80 via-primary-green/20 to-transparent transition-opacity duration-700 group-hover:opacity-90"
                        ></div>
                        
                        <!-- Glare / Lighting Effect on Hover -->
                        <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 transition-all duration-700 group-hover:via-white/10 pointer-events-none"></div>

                        <!-- Image Caption -->
                        <div
                            class="absolute bottom-0 left-0 right-0 p-8 sm:p-10 transform transition-transform duration-700 group-hover:-translate-y-2"
                        >
                            <p
                                class="font-body text-xs font-bold uppercase tracking-[0.2em] text-accent-amber/90"
                            >
                                Kedai Sepijak
                            </p>

                            <p
                                class="mt-2 font-display text-2xl font-semibold text-background-beige sm:text-3xl leading-snug"
                            >
                                Ruang untuk menikmati dan berbagi cerita.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Decorative Element Behind Image -->
                    <div class="absolute -right-6 -bottom-6 -z-10 h-32 w-32 rounded-br-[2rem] border-b-4 border-r-4 border-accent-amber/30 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import suasanaKedai from "@/assets/images/suasana-kedai.jpg";

const aboutDescription =
    "Kedai Sepijak adalah ruang hangat bagi siapa pun yang ingin menikmati secangkir kopi, berbagi cerita, atau sekadar beristirahat sejenak dari rutinitas. Berdiri di Purwokerto, kami memadukan konsep Kedai Ngopi, Kedai Makan, serta Ruang Bertemu dan Bekerja, menciptakan suasana yang nyaman untuk semua kalangan mulai dari mahasiswa, pekerja lepas, hingga komunitas kreatif lokal.";

const aboutImage = suasanaKedai;

const aboutImageAlt = "Suasana Kedai Sepijak dengan interior yang hangat dan nyaman";
</script>