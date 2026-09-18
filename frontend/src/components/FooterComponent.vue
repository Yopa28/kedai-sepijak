<template>
    <footer class="bg-primary-green text-background-beige">
        <div class="container mx-auto px-6">

            <!-- ============================= -->
            <!-- MAIN FOOTER -->
            <!-- ============================= -->
            <div
                class="grid grid-cols-1 gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1fr] lg:gap-16 lg:py-16"
            >

                <!-- ============================= -->
                <!-- BRAND -->
                <!-- ============================= -->
                <div class="max-w-sm">
                    <!-- Logo -->
                    <a
                        href="#"
                        class="mb-5 inline-flex items-center"
                        aria-label="Kedai Sepijak"
                    >
                        <img
                            :src="logoSepijak"
                            alt="Logo Kedai Sepijak"
                            class="h-16 w-16 object-contain"
                        />
                    </a>

                    <!-- Brand Name -->
                    <h3
                        class="mb-3 font-display text-2xl font-bold text-background-beige"
                    >
                        Kedai Sepijak
                    </h3>

                    <!-- Description -->
                    <p
                        class="max-w-xs text-sm leading-6 text-secondary-sage"
                    >
                        Ruang untuk berhenti sejenak, menikmati rasa,
                        dan berbagi cerita.
                    </p>

                    <!-- Instagram -->
                    <a
    href="https://www.instagram.com/kedaisepijak/?hl=id"
    target="_blank"
    rel="noopener noreferrer"
    class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-secondary-sage transition-colors duration-300 hover:text-background-beige"
>
    <span
        class="material-symbols-outlined text-lg"
    >
        photo_camera
    </span>

    Instagram

    <span
        class="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1"
    >
        arrow_forward
    </span>
</a>
                </div>


                <!-- ============================= -->
                <!-- QUICK LINKS -->
                <!-- ============================= -->
                <div>
                    <h4
                        class="mb-5 font-display text-lg font-bold text-background-beige"
                    >
                        Jelajahi
                    </h4>

                    <nav
                        class="flex flex-col gap-3"
                        aria-label="Footer navigation"
                    >
                        <a
                            v-for="link in quickLinks"
                            :key="link.name"
                            :href="link.href"
                            class="group flex w-fit items-center gap-2 text-sm text-secondary-sage transition-colors duration-300 hover:text-background-beige"
                        >
                            <!-- Small hover line -->
                            <span
                                class="h-px w-0 bg-accent-amber transition-all duration-300 group-hover:w-4"
                            ></span>

                            {{ link.name }}
                        </a>
                    </nav>
                </div>


                <!-- ============================= -->
                <!-- CONTACT -->
                <!-- ============================= -->
                <div>
                    <h4
                        class="mb-5 font-display text-lg font-bold text-background-beige"
                    >
                        Hubungi Kami
                    </h4>

                    <div class="space-y-5">

                        <!-- Address -->
                        <div class="flex items-start gap-3">
                            <span
                                class="material-symbols-outlined mt-0.5 text-lg text-accent-amber"
                            >
                                location_on
                            </span>

                            <p
                                class="text-sm leading-6 text-secondary-sage"
                            >
                                {{ contactInfo.address }}
                            </p>
                        </div>


                        <!-- Phone -->
                        <a
                            :href="`tel:${contactInfo.phone}`"
                            class="group flex w-fit items-center gap-3 text-sm text-secondary-sage transition-colors duration-300 hover:text-background-beige"
                        >
                            <span
                                class="material-symbols-outlined text-lg text-accent-amber"
                            >
                                call
                            </span>

                            <span>
                                {{ contactInfo.phone }}
                            </span>
                        </a>


                        <!-- Hours -->
                        <div class="flex items-center gap-3">
                            <span
                                class="material-symbols-outlined text-lg text-accent-amber"
                            >
                                schedule
                            </span>

                            <p
                                class="text-sm text-secondary-sage"
                            >
                                {{ contactInfo.hours }}
                            </p>
                        </div>

                    </div>
                </div>


                <!-- ============================= -->
                <!-- FIND US -->
                <!-- ============================= -->
                <div>
                    <h4
                        class="mb-5 font-display text-lg font-bold text-background-beige"
                    >
                        Temukan Kami
                    </h4>

                    <p
                        class="mb-5 max-w-xs text-sm leading-6 text-secondary-sage"
                    >
                        Berkunjung, duduk sebentar, dan nikmati
                        suasana Kedai Sepijak.
                    </p>

                    <!-- Google Maps -->
                    <a
                        :href="googleMapsUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group inline-flex items-center gap-2 border-b border-secondary-sage/40 pb-1 text-sm font-medium text-background-beige transition-all duration-300 hover:border-accent-amber hover:text-accent-amber"
                    >
                        <span>
                            Buka Google Maps
                        </span>

                        <span
                            class="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1"
                        >
                            arrow_forward
                        </span>
                    </a>
                </div>

            </div>


            <!-- ============================= -->
            <!-- FOOTER BOTTOM -->
            <!-- ============================= -->
            <div
                class="flex flex-col gap-4 border-t border-background-beige/15 py-6 text-xs text-secondary-sage sm:flex-row sm:items-center sm:justify-between"
            >

                <!-- Copyright -->
                <p>
                    © 2026 Kedai Sepijak. All rights reserved.
                </p>

                <!-- Bottom Links -->
                <div
                    class="flex flex-wrap items-center gap-4 sm:gap-5"
                >
                    <a
                        :href="googleMapsUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="transition-colors duration-300 hover:text-background-beige"
                    >
                        Google Maps ↗
                    </a>

                    <span
                        class="text-background-beige/20"
                    >
                        |
                    </span>

                    <span>
                        Purwokerto, Jawa Tengah
                    </span>
                </div>

            </div>

        </div>
    </footer>
</template>


<script>
import logoSepijak from "@/assets/images/logo-sepijak.png";

export default {
    name: "FooterComponent",

    data() {
        return {
            // =============================
            // QUICK LINKS
            // =============================
            quickLinks: [
                {
                    name: "Home",
                    href: "/",
                },
                {
                    name: "Menu",
                    href: "/menu",
                },
                {
                    name: "Feedback",
                    href: "/feedback",
                },
                {
                    name: "Polling",
                    href: "/polling",
                },
                {
                    name: "Contact",
                    href: "/#contact",
                },
            ],

            // =============================
            // CONTACT INFO
            // =============================
            contactInfo: {
                address:
                    "Sky Lounge Taman Mas Kemambang, Bancarkembar, Purwokerto Utara, Banyumas, Jawa Tengah, Indonesia",

                phone:
                    "0888-2510-000",

                hours:
                    "Setiap hari · 08.00 — 01.00",
            },

            // =============================
            // GOOGLE MAPS
            // =============================
            googleMapsUrl:
                "https://maps.app.goo.gl/qXmzXZrqM4SkXkiV7",
        };
    },

    // =============================
    // COMPUTED
    // =============================
    computed: {
        logoSepijak() {
            return logoSepijak;
        },
    },
};
</script>