<template>
    <section
        class="py-20 sm:py-24 lg:py-28 bg-background-beige text-text-charcoal"
    >
        <div class="container mx-auto px-6 lg:px-10">
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
                        class="mt-6 font-body text-base leading-8 text-text-charcoal/75 sm:text-lg"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        {{ aboutDescription }}
                    </p>

                    <!-- Highlights -->
                    <div
                        class="mt-8 grid grid-cols-1 gap-4 border-t border-primary-green/10 pt-6 sm:grid-cols-3 sm:gap-0"
                        data-aos="fade-up"
                        data-aos-delay="350"
                    >
                        <!-- Kopi -->
                        <div
                            class="flex items-center gap-3 sm:border-r sm:border-primary-green/10 sm:pr-5"
                        >
                            <span
                                class="material-symbols-outlined text-xl text-accent-amber"
                            >
                                coffee
                            </span>

                            <div>
                                <p
                                    class="font-body text-sm font-semibold text-primary-green"
                                >
                                    Kopi
                                </p>

                                <p
                                    class="font-body text-xs text-text-charcoal/50"
                                >
                                    Cita rasa pilihan
                                </p>
                            </div>
                        </div>

                        <!-- Makanan -->
                        <div
                            class="flex items-center gap-3 sm:px-5"
                        >
                            <span
                                class="material-symbols-outlined text-xl text-accent-amber"
                            >
                                restaurant
                            </span>

                            <div>
                                <p
                                    class="font-body text-sm font-semibold text-primary-green"
                                >
                                    Makanan
                                </p>

                                <p
                                    class="font-body text-xs text-text-charcoal/50"
                                >
                                    Teman setiap cerita
                                </p>
                            </div>
                        </div>

                        <!-- Ruang -->
                        <div
                            class="flex items-center gap-3 sm:border-l sm:border-primary-green/10 sm:pl-5"
                        >
                            <span
                                class="material-symbols-outlined text-xl text-accent-amber"
                            >
                                groups
                            </span>

                            <div>
                                <p
                                    class="font-body text-sm font-semibold text-primary-green"
                                >
                                    Ruang
                                </p>

                                <p
                                    class="font-body text-xs text-text-charcoal/50"
                                >
                                    Bertemu & bekerja
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ================================
                     RIGHT IMAGE
                ================================= -->
                <div
                    class="relative w-full"
                    data-aos="fade-left"
                    data-aos-delay="200"
                >
                    <!-- Image -->
                    <div
                        class="group relative overflow-hidden rounded-2xl shadow-xl"
                    >
                        <img
                            :src="aboutImage"
                            :alt="aboutImageAlt"
                            class="h-[400px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[480px] lg:h-[540px]"
                        />

                        <!-- Subtle Overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-primary-green/45 via-transparent to-transparent"
                        ></div>

                        <!-- Image Caption -->
                        <div
                            class="absolute bottom-0 left-0 right-0 p-6 sm:p-8"
                        >
                            <p
                                class="font-body text-xs font-medium uppercase tracking-[0.15em] text-background-beige/75"
                            >
                                Kedai Sepijak
                            </p>

                            <p
                                class="mt-1 font-display text-xl font-semibold text-background-beige sm:text-2xl"
                            >
                                Ruang untuk menikmati dan berbagi cerita.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import suasanaKedai from "@/assets/images/suasana-kedai.jpg";

export default {
    name: "AboutSection",

    data() {
        return {
            aboutDescription:
                "Kedai Sepijak adalah ruang hangat bagi siapa pun yang ingin menikmati secangkir kopi, berbagi cerita, atau sekadar beristirahat sejenak dari rutinitas. Berdiri di Purwokerto, kami memadukan konsep Kedai Ngopi, Kedai Makan, serta Ruang Bertemu dan Bekerja, menciptakan suasana yang nyaman untuk semua kalangan mulai dari mahasiswa, pekerja lepas, hingga komunitas kreatif lokal.",

            aboutImage: suasanaKedai,

            aboutImageAlt:
                "Suasana Kedai Sepijak dengan interior yang hangat dan nyaman",
        };
    },
};
</script>