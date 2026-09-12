<template>
    <section
        id="contact"
        class="bg-background-beige py-20 text-text-charcoal sm:py-28"
    >
        <div class="container mx-auto px-6">

            <!-- ========================= -->
            <!-- HEADER -->
            <!-- ========================= -->
            <div
                class="mb-12 max-w-3xl"
                data-aos="fade-up"
            >
                <div class="mb-5 flex items-center gap-3">
                    <span
                        class="h-px w-10 bg-accent-amber"
                    ></span>

                    <span
                        class="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary-green"
                    >
                        Lokasi
                    </span>
                </div>

                <h2
                    class="font-display text-5xl font-bold leading-[1.05] text-primary-green md:text-6xl"
                >
                    Kunjungi Kami
                </h2>

                <p
                    class="mt-5 max-w-xl font-body text-base leading-7 text-text-charcoal/65 md:text-lg"
                >
                    Datang dan nikmati kopi, makanan, serta suasana
                    Kedai Sepijak di Purwokerto.
                </p>
            </div>


            <!-- ========================= -->
            <!-- CONTENT -->
            <!-- ========================= -->
            <div
                class="grid overflow-hidden border border-primary-green/10 bg-white lg:grid-cols-[0.8fr_1.2fr]"
                data-aos="fade-up"
                data-aos-delay="150"
            >

                <!-- ========================= -->
                <!-- INFO -->
                <!-- ========================= -->
                <div
                    class="flex flex-col justify-between p-8 md:p-10 lg:p-12"
                    data-aos="fade-right"
                    data-aos-delay="250"
                >

                    <div>

                        <h3
                            class="mb-8 font-display text-3xl font-bold text-primary-green"
                        >
                            Temukan Kami
                        </h3>


                        <!-- ADDRESS -->
                        <div
                            class="border-t border-primary-green/10 py-6"
                        >
                            <div
                                class="mb-2 flex items-center gap-2"
                            >
                                <span
                                    class="material-symbols-outlined text-lg text-primary-green"
                                >
                                    location_on
                                </span>

                                <span
                                    class="text-xs font-semibold uppercase tracking-[0.15em] text-primary-green"
                                >
                                    Alamat
                                </span>
                            </div>

                            <p
                                class="max-w-md pl-7 text-sm leading-6 text-text-charcoal/70"
                            >
                                {{ contactInfo.address }}
                            </p>
                        </div>


                        <!-- HOURS -->
                        <div
                            class="border-t border-primary-green/10 py-6"
                        >
                            <div
                                class="mb-2 flex items-center gap-2"
                            >
                                <span
                                    class="material-symbols-outlined text-lg text-primary-green"
                                >
                                    schedule
                                </span>

                                <span
                                    class="text-xs font-semibold uppercase tracking-[0.15em] text-primary-green"
                                >
                                    Jam Operasional
                                </span>
                            </div>

                            <p
                                class="pl-7 text-sm text-text-charcoal/70"
                            >
                                {{ contactInfo.hours }}
                            </p>
                        </div>


                        <!-- PHONE -->
                        <div
                            class="border-y border-primary-green/10 py-6"
                        >
                            <div
                                class="mb-2 flex items-center gap-2"
                            >
                                <span
                                    class="material-symbols-outlined text-lg text-primary-green"
                                >
                                    call
                                </span>

                                <span
                                    class="text-xs font-semibold uppercase tracking-[0.15em] text-primary-green"
                                >
                                    Kontak
                                </span>
                            </div>

                            <a
                                :href="`tel:${contactInfo.phone}`"
                                class="pl-7 text-sm text-text-charcoal/70 transition-colors hover:text-primary-green"
                            >
                                {{ contactInfo.phone }}
                            </a>
                        </div>

                    </div>


                    <!-- ========================= -->
                    <!-- CTA -->
                    <!-- ========================= -->
                    <div class="mt-8">
                        <a
                            :href="googleMapsUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group inline-flex items-center gap-3 border-b border-primary-green pb-1 font-body text-sm font-semibold text-primary-green transition-all hover:border-accent-amber hover:text-accent-amber"
                        >
                            <span>
                                Petunjuk arah ke Kedai Sepijak
                            </span>

                            <span
                                class="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1"
                            >
                                arrow_forward
                            </span>
                        </a>
                    </div>

                </div>


                <!-- ========================= -->
                <!-- MAP -->
                <!-- ========================= -->
                <div
                    class="relative min-h-[420px] overflow-hidden lg:min-h-[580px]"
                    data-aos="fade-left"
                    data-aos-delay="300"
                >
                    <iframe
                        :src="mapUrl"
                        title="Lokasi Kedai Sepijak di Google Maps"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        class="absolute inset-0 h-full w-full"
                        style="border: 0"
                    ></iframe>
                </div>

            </div>


            <!-- ========================= -->
            <!-- BOTTOM NOTE -->
            <!-- ========================= -->
            <div
                class="mt-6 flex flex-col justify-between gap-3 text-xs text-text-charcoal/45 sm:flex-row"
                data-aos="fade-up"
                data-aos-delay="400"
            >
                <span>
                    Kedai Sepijak · Purwokerto, Jawa Tengah
                </span>

                <a
                    :href="googleMapsUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="transition-colors hover:text-primary-green"
                >
                    Lihat di Google Maps ↗
                </a>
            </div>

        </div>
    </section>
</template>


<script>
export default {
    name: "ContactSection",

    data() {
        return {
            contactInfo: {
                address:
                    "Sky Lounge Taman Mas Kemambang, Bancarkembar, Purwokerto Utara, Banyumas, Jawa Tengah, Indonesia",

                hours:
                    "Setiap hari · 08.00 — 01.00",

                phone:
                    "0888-2510-000",
            },

            googleMapsUrl:
                "https://maps.app.goo.gl/qXmzXZrqM4SkXkiV7",

            mapUrl:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.3!2d109.2374172!3d-7.4124204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655f59420e3035%3A0x579acae6beb46848!2sKEDAI%20SEPIJAK%20%7C%20Purwokerto!5e0!3m2!1sen!2sid!4v1732000000000!5m2!1sen!2sid",
        };
    },
};
</script>