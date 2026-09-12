<template>
    <section
        class="relative overflow-hidden bg-gradient-to-b from-secondary-sage/30 via-background-beige to-background-beige py-20 text-text-charcoal sm:py-28"
    >
        <!-- Decorative Elements -->
        <div
            class="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary-green/5 blur-3xl"
        ></div>

        <div
            class="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-accent-amber/10 blur-3xl"
        ></div>

        <!-- Subtle texture, ties back to the dark sections -->
        <div
            class="pointer-events-none absolute inset-0 opacity-[0.025]"
            style="background-image: radial-gradient(circle at 1px 1px, #0f3d32 1px, transparent 0); background-size: 24px 24px;"
        ></div>

        <div class="container relative z-10 mx-auto px-6">

            <!-- ========================= -->
            <!-- HEADER -->
            <!-- ========================= -->
            <div
                class="mx-auto mb-14 max-w-2xl text-center"
                data-aos="fade-up"
            >
                <div
                    class="mb-5 flex items-center justify-center gap-3"
                >
                    <span class="h-px w-8 bg-accent-amber/70"></span>
                    <span
                        class="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-green/70"
                    >
                        Ulasan Pelanggan
                    </span>
                    <span class="h-px w-8 bg-accent-amber/70"></span>
                </div>

                <h2
                    class="mb-4 font-display text-4xl font-bold leading-tight text-primary-green md:text-5xl"
                >
                    Apa Kata
                    <span class="relative inline-block text-accent-amber">
                        Mereka
                        <svg
                            class="absolute left-0 -bottom-1.5 w-full h-2.5 text-accent-amber/50"
                            viewBox="0 0 200 12"
                            preserveAspectRatio="none"
                            fill="none"
                        >
                            <path
                                d="M2 9C40 3 100 2 198 6"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                        </svg>
                    </span>
                </h2>

                <p
                    class="font-body text-base leading-relaxed text-text-charcoal/65 md:text-lg"
                >
                    Cerita dan pengalaman pelanggan setelah menikmati
                    waktu mereka di Kedai Sepijak.
                </p>
            </div>


            <!-- ========================= -->
            <!-- GOOGLE RATING -->
            <!-- ========================= -->
            <div
                class="mx-auto mb-16 max-w-4xl"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <div
                    class="relative overflow-hidden rounded-3xl bg-primary-green p-8 shadow-[0_25px_60px_-15px_rgba(15,61,50,0.45)] md:p-10"
                >
                    <!-- Decorative glow inside the dark card -->
                    <div
                        class="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-accent-amber/10 blur-3xl"
                    ></div>

                    <div
                        class="pointer-events-none absolute inset-0 opacity-[0.04]"
                        style="background-image: radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0); background-size: 22px 22px;"
                    ></div>

                    <div
                        class="relative flex flex-col items-center justify-between gap-9 md:flex-row"
                    >

                        <!-- Rating -->
                        <div class="flex flex-col items-center gap-6 sm:flex-row">
                            <div
                                class="flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-accent-amber/30 bg-background-beige/5"
                            >
                                <span
                                    class="font-display text-4xl font-bold leading-none text-accent-amber"
                                >
                                    {{ googleRating }}
                                </span>

                                <span
                                    class="mt-1 text-[11px] uppercase tracking-wider text-background-beige/50"
                                >
                                    dari 5
                                </span>
                            </div>

                            <div class="text-center sm:text-left">
                                <div
                                    class="mb-2 flex items-center justify-center sm:justify-start"
                                >
                                    <StarRating :rating="googleRating" :size="24" :gap="3" />
                                </div>

                                <p
                                    class="font-body text-sm text-background-beige/70"
                                >
                                    Berdasarkan
                                    <span
                                        class="font-semibold text-background-beige"
                                    >
                                        {{ googleReviewCount }} ulasan
                                    </span>
                                    di Google
                                </p>

                                <div
                                    class="mt-2 flex items-center justify-center gap-2 text-xs text-background-beige/45 sm:justify-start"
                                >
                                    <span
                                        class="material-symbols-outlined text-base text-accent-amber/80"
                                    >
                                        verified
                                    </span>

                                    Rating dari Google
                                </div>
                            </div>
                        </div>

                        <!-- Divider (desktop only) -->
                        <div
                            class="hidden h-16 w-px bg-background-beige/10 md:block"
                        ></div>

                        <!-- CTA -->
                        <div class="text-center md:text-right">
                            <p
                                class="mb-3 max-w-xs font-body text-sm leading-relaxed text-background-beige/60"
                            >
                                Penasaran dengan pengalaman pelanggan
                                lainnya?
                            </p>

                            <a
                                :href="googleMapsUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group inline-flex items-center gap-2 rounded-xl bg-accent-amber px-5 py-3 font-body text-sm font-bold text-primary-green shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-amber/25"
                            >
                                Lihat di Google

                                <span
                                    class="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    arrow_forward
                                </span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>


            <!-- ========================= -->
            <!-- REVIEW CARDS -->
            <!-- ========================= -->
            <div
                class="grid grid-cols-1 gap-6 lg:grid-cols-3"
            >
                <article
                    v-for="(review, index) in reviews"
                    :key="index"
                    class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary-green/10 bg-white p-7 shadow-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-amber/40 hover:shadow-xl hover:shadow-primary-green/10"
                    data-aos="fade-up"
                    :data-aos-delay="150 + index * 100"
                >
                    <!-- Top hairline accent, revealed on hover -->
                    <div
                        class="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent-amber transition-transform duration-500 group-hover:scale-x-100"
                    ></div>

                    <!-- Quote Icon -->
                    <div
                        class="pointer-events-none absolute -right-2 -top-6 font-display text-[110px] font-bold leading-none text-primary-green/[0.06]"
                    >
                        &ldquo;
                    </div>

                    <!-- Top -->
                    <div
                        class="relative mb-5 flex items-center justify-between"
                    >
                        <!-- Stars -->
                        <StarRating :rating="review.rating" :size="19" :gap="1" />

                        <!-- Google -->
                        <div
                            class="flex items-center gap-1.5 rounded-full border border-primary-green/10 bg-background-beige px-3 py-1.5"
                        >
                            <svg width="13" height="13" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
                                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                                <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.2-5.6l-6.6-5.6C29.6 34.7 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
                                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.8l6.6 5.6C39.9 37.5 44 31.7 44 24c0-1.3-.1-2.7-.4-3.5z"/>
                            </svg>

                            <span
                                class="text-[11px] font-medium text-text-charcoal/55"
                            >
                                Google
                            </span>
                        </div>
                    </div>


                    <!-- Review Text -->
                    <div class="relative flex-1">
                        <p
                            class="font-body text-[15px] leading-7 text-text-charcoal/75"
                        >
                            "{{ review.text }}"
                        </p>
                    </div>


                    <!-- Divider -->
                    <div
                        class="my-6 h-px w-full bg-primary-green/10"
                    ></div>


                    <!-- Reviewer -->
                    <div
                        class="flex items-center justify-between"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                                :style="{ background: avatarColor(index) }"
                            >
                                {{ initials(review.name) }}
                            </div>

                            <div>
                                <p
                                    class="font-body text-sm font-bold text-primary-green"
                                >
                                    {{ review.name }}
                                </p>

                                <p
                                    class="text-xs text-text-charcoal/45"
                                >
                                    Pelanggan Kedai Sepijak
                                </p>
                            </div>
                        </div>
                    </div>

                </article>
            </div>


            <!-- ========================= -->
            <!-- BOTTOM -->
            <!-- ========================= -->
            <div
                class="mt-12 text-center"
                data-aos="fade-up"
                data-aos-delay="450"
            >
                <a
                    :href="googleMapsUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-green transition-colors hover:text-accent-amber"
                >
                    Baca lebih banyak ulasan di Google

                    <span
                        class="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1"
                    >
                        arrow_forward
                    </span>
                </a>
            </div>

        </div>
    </section>
</template>


<script>
import StarRating from "./StarRating.vue";

export default {
    name: "TestimonialSection",

    components: {
        StarRating,
    },

    data() {
        return {
            // ==========================================
            // GOOGLE RATING
            // ==========================================

            googleRating: 4.2,

            googleReviewCount: 69,

            googleMapsUrl:
                "https://maps.app.goo.gl/qXmzXZrqM4SkXkiV7",

            // ==========================================
            // GOOGLE REVIEWS
            // ==========================================

            reviews: [
                {
                    name: "Afifah Ghina K",
                    rating: 5,
                    text: "Tempatnya instagramable, cocok untuk kasih makan ig. Ada 2 lantai, seating indoor dan outdoor lumayan banyak, ada meeting room juga. Harga makanan masih affordable, dapat porsi lumayan banyak, untuk rasa juga enak. Sadly, waktu aku kesana pelayanannya beneran lama bgt huhuhu mungkin gegara kesana pas malam minggu yaa. Tapi, overall good guys, masih worth to try untuk nongkrong! 🤓♥️",
                },
                {
                    name: "Agus Darmawan",
                    rating: 5,
                    text: "Lama banget gak ke sini setelah ganti merk y, sekarang namanya Kedai Sepijak. Satu area dengan taman bale kemambang, cocok buat ngopi maupun nongkrong dengan view taman dan sekitarnya. Harga juga murce, mulai dari aneka kopi, teh, milkshake, jus dan aneka makanan berat maupun ringan lainnya. Pelayanan juga cukup bagus tinggal lebih dirawat saja.",
                },
                {
                    name: "Desi Mella Ayuni",
                    rating: 5,
                    text: "Tempatnya sangat cozy, nyaman, dan cocok untuk nongkrong, untuk makanan dan minuman pun sangat worth to price, bahkan orang WNA pun cocok dengan makanannya.",
                },
            ],
        };
    },

    methods: {
        initials(name) {
            return name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase();
        },

        avatarColor(index) {
            const palette = [
                "#0f3d32",
                "#dda552",
                "#5f7d68",
            ];

            return palette[index % palette.length];
        },
    },
};
</script>