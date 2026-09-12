<template>
    <section
        id="menu"
        class="relative overflow-hidden bg-primary-green py-20 sm:py-24 lg:py-28"
    >
        <!-- Subtle texture, ties back to hero -->
        <div
            class="pointer-events-none absolute inset-0 opacity-[0.035]"
            style="background-image: radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0); background-size: 22px 22px;"
        ></div>

        <!-- Soft glow, same language as hero -->
        <div
            class="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-accent-amber/[0.06] blur-[120px]"
        ></div>

        <div
            class="container relative z-10 mx-auto flex flex-col items-center px-6 lg:px-10"
        >
            <!-- ========================================
                 HEADER — asymmetric, editorial eyebrow instead
                 of a plain centered title
            ========================================= -->
            <div
                class="flex w-full max-w-3xl flex-col items-center text-center"
                data-aos="fade-up"
            >
                <div
                    class="mb-5 flex items-center gap-3"
                    data-aos="fade-down"
                    data-aos-delay="100"
                >
                    <span class="h-px w-8 bg-accent-amber/70"></span>
                    <span
                        class="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-amber/90"
                    >
                        Pilihan Kami
                    </span>
                    <span class="h-px w-8 bg-accent-amber/70"></span>
                </div>

                <h2
                    class="font-display text-4xl font-bold leading-[1.05] tracking-tight text-background-beige sm:text-5xl lg:text-[3.75rem]"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {{ menuTitle }}
                </h2>

                <p
                    class="mt-5 max-w-xl font-body text-base leading-relaxed text-background-beige/60 sm:text-lg"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    {{ menuSubtitle }}
                </p>
            </div>

            <!-- ========================================
                 CATEGORY FILTER — underline tabs, not
                 filled pill buttons
            ========================================= -->
            <div
                class="mt-11 flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-9 gap-y-3 border-b border-background-beige/10 pb-0"
                data-aos="fade-up"
                data-aos-delay="350"
            >
                <button
                    v-for="category in categories"
                    :key="category"
                    @click="selectedCategory = category"
                    :class="[
                        'relative pb-4 font-body text-sm font-semibold uppercase tracking-wider transition-colors duration-300',
                        selectedCategory === category
                            ? 'text-background-beige'
                            : 'text-background-beige/40 hover:text-background-beige/75',
                    ]"
                >
                    {{ category }}

                    <span
                        class="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent-amber transition-transform duration-300 ease-out"
                        :class="selectedCategory === category ? 'scale-x-100' : 'scale-x-0'"
                    ></span>
                </button>
            </div>

            <!-- ========================================
                 MENU GRID
            ========================================= -->
            <div
                class="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
            >
                <MenuCard
                    v-for="(item, index) in filteredMenuItems"
                    :key="item.id"
                    :item="item"
                    data-aos="fade-up"
                    :data-aos-delay="100 + index * 80"
                />
            </div>

            <!-- ========================================
                 SEE ALL MENU
            ========================================= -->
            <router-link
                to="/menu"
                class="group mt-14 inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-accent-amber/50 px-8 font-body text-sm font-bold uppercase tracking-wide text-accent-amber transition-all duration-500 hover:border-accent-amber hover:bg-accent-amber hover:text-primary-green hover:-translate-y-0.5"
                data-aos="fade-up"
                data-aos-delay="400"
            >
                <span>Lihat Semua Menu</span>

                <span
                    class="material-symbols-outlined text-lg transition-transform duration-500 group-hover:translate-x-1"
                >
                    arrow_forward
                </span>
            </router-link>
        </div>
    </section>
</template>

<script>
import MenuCard from "./MenuCard.vue";

import ayamBakar from "@/assets/images/ayambakar.jpg";
import ayamBali from "@/assets/images/ayam-bali.jpg";
import nasiCampur from "@/assets/images/nasi-campur.jpg";
import manualBrew from "@/assets/images/manual-brew.jpg";
import premiumCoffe from "@/assets/images/premium-coffe.jpg";
import nonCoffe from "@/assets/images/noncoffe.jpg";

export default {
    name: "MenuSection",

    components: {
        MenuCard,
    },

    data() {
        return {
            menuTitle: "Menu Kami",

            menuSubtitle:
                "Pilihan kopi, makanan, dan minuman untuk menemani setiap cerita di Kedai Sepijak.",

            selectedCategory: "All",

            categories: [
                "All",
                "Makanan",
                "Kopi",
                "Non-Kopi",
            ],

            menuItems: [
                {
                    id: 1,
                    name: "Ayam Bakar",
                    price: 25000,
                    category: "Makanan",
                    image: ayamBakar,
                    alt: "Ayam Bakar Kedai Sepijak",
                },

                {
                    id: 2,
                    name: "Ayam Bali",
                    price: 28000,
                    category: "Makanan",
                    image: ayamBali,
                    alt: "Ayam Bali Kedai Sepijak",
                },

                {
                    id: 3,
                    name: "Nasi Campur Bali",
                    price: 30000,
                    category: "Makanan",
                    image: nasiCampur,
                    alt: "Nasi Campur Bali Kedai Sepijak",
                },

                {
                    id: 4,
                    name: "Manual Brew",
                    price: 25000,
                    category: "Kopi",
                    image: manualBrew,
                    alt: "Manual Brew Kedai Sepijak",
                },

                {
                    id: 5,
                    name: "Premium Coffe",
                    price: 30000,
                    category: "Kopi",
                    image: premiumCoffe,
                    alt: "Premium Coffe Kedai Sepijak",
                },

                {
                    id: 6,
                    name: "Non Coffe",
                    price: 22000,
                    category: "Non-Kopi",
                    image: nonCoffe,
                    alt: "Minuman Non Coffe Kedai Sepijak",
                },
            ],
        };
    },

    computed: {
        filteredMenuItems() {
            if (this.selectedCategory === "All") {
                return this.menuItems;
            }

            return this.menuItems.filter(
                (item) => item.category === this.selectedCategory,
            );
        },
    },
};
</script>