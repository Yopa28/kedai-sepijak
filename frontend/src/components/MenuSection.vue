<template>
    <section class="bg-primary-green py-20 sm:py-28" id="menu">
        <div class="container mx-auto flex flex-col items-center gap-10 px-6">
            <div class="text-center" data-aos="fade-up">
                <h2
                    class="font-display text-4xl font-bold leading-tight tracking-tight text-background-beige md:text-5xl"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    {{ menuTitle }}
                </h2>
                <p
                    class="mt-2 text-base font-normal leading-normal text-secondary-sage"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {{ menuSubtitle }}
                </p>
            </div>

            <div
                class="flex flex-wrap justify-center gap-3"
                data-aos="fade-up"
                data-aos-delay="300"
            >
                <button
                    v-for="category in categories"
                    :key="category"
                    @click="selectedCategory = category"
                    :class="[
                        'rounded-full px-5 py-2 text-sm font-semibold transition-all',
                        selectedCategory === category
                            ? 'bg-background-beige text-primary-green scale-105'
                            : 'bg-primary-green/50 text-secondary-sage hover:bg-secondary-sage hover:text-primary-green',
                    ]"
                >
                    {{ category }}
                </button>
            </div>

            <div
                class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-8"
            >
                <MenuCard
                    v-for="(item, index) in filteredMenuItems"
                    :key="item.id"
                    :item="item"
                    data-aos="zoom-in"
                    :data-aos-delay="100 + index * 100"
                />
            </div>

            <router-link
                to="/menu"
                class="mt-8 flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-transparent border-2 border-secondary-sage text-secondary-sage text-base font-bold leading-normal tracking-wide transition-all hover:bg-secondary-sage hover:text-primary-green hover:scale-105"
                data-aos="fade-up"
                data-aos-delay="400"
            >
                <span class="truncate">See All Menu</span>
            </router-link>
        </div>
    </section>
</template>

<script>
import MenuCard from "./MenuCard.vue";

export default {
    name: "MenuSection",
    components: {
        MenuCard,
    },
    data() {
        return {
            menuTitle: "Menu Kami",
            menuSubtitle:
                "Nikmati berbagai pilihan kopi dan makanan lezat kami yang dibuat dengan bahan-bahan segar dan berkualitas tinggi.",
            selectedCategory: "All",
            categories: ["All", "Kopi", "Non-Kopi", "Pastry"],
            menuItems: [
                {
                    id: 1,
                    name: "Signature Coffee Blend",
                    price: 25000,
                    category: "Kopi",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb0pKL93fn1dRzQuA18mCwvhNwDRpuTVgO0J568iR3v00otd1sI4pIC8iI7lPu5jLMZF_ITo3yNPQZwJQex7ox7AYPQf1WenmIYq7zUGhyxIAZLmiMWyktZy2BPmIv14rqHpiVI6bYAHo39fC-_HcZuI2gfjffESbocNwVLhmnbXXMB68RsrD1B7IoyaJmzjsp50RYVf3WutexLxEW4h3-SVWDDR2uGaUr0qizEmGYsnBZL99xNywdRd8xtsg0QsrusMnfgCODfW_5",
                    alt: "A cup of signature blend coffee with latte art",
                },
                {
                    id: 2,
                    name: "Matcha Latte",
                    price: 28000,
                    category: "Non-Kopi",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIoRHoSZGMwHyHFrta-266yXsYWH383q_FsTZosSRkjNBhPbOG-xaHdc-WNlVXIvjF1ZgliX_Xt51R1YnlJN2NqzmLS56a0w-snhfjQy2-FCPBsuKrobPS4eW8oYt42-HYyZ4Pp1UG2Sa8ni0kDGL-C2LVmE9bq3pZG1grnT-dtyGoXVP8a8E5gCTgmM7GYKVhoCcJineSPdPNk_jiwhvxeE3kJ3hYwS7rKdacSVjA1osy19co-uOoF-9NkAY3Dopa9RwxlpCUsF0s",
                    alt: "A vibrant green matcha latte in a ceramic cup",
                },
                {
                    id: 3,
                    name: "Almond Croissant",
                    price: 22000,
                    category: "Pastry",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr_8eKnwnxvbvgUhhF1Adqx5cN8ze_idImPzEFrspz_j-Hgzj6bb9ENIxGqubslzJxOQcGdPJmfT4jud2muck_9J8vlXMrQ4aa3PJDEB-HqBh5zI5S8SKI-O5uOMJ1h3pvUSu9Vq9C8goMuyZa8iEMWKjnjdtYKLwns4ZZtykUTZyhIc0pGIWQjMCX1SA06Ml-uh8oHzapGifPUqr3c0mHQBKoVYWir23cdUWp2UAPEZSKkdbyoecY_0fclxiAJJTRa84OZITee0hR",
                    alt: "A flaky golden almond croissant on a plate",
                },
                {
                    id: 4,
                    name: "Cappuccino",
                    price: 24000,
                    category: "Kopi",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1-9_PoE1P03RZ35BMSc_7WXiSMufhmPQNuIwNK7NumOCRhlaJXjb7zk9B646X96yFX_OFMmj-f3UnIvIMSnOqg-IQacPPMqgEXVAp2BD8wCBEqysaCAI7S3SY_bo8mB_r1LUeqReOQeR3SwGzOkZY6zB3pChqj8veGCKS9yCF5wvPZE54waIhwZ7NcbpcApNKUOnTj3qCbwXX9E_hKPjpNJHG9jNBN8fWogn4kLHxcX8RxUft1yInF490bhGueC0A2TWEhK319EM0",
                    alt: "A classic cappuccino with foam art",
                },
                {
                    id: 5,
                    name: "Red Velvet Latte",
                    price: 30000,
                    category: "Non-Kopi",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0DIwTbQZkCOuDBU8MdyW-Z-RAVjj7kaEKnTaVb2PMF0ReX3uGDcYThhzRxWmVXwLcBzeY1ocbojChgEEdBGlNLB7bCKzjvzkzdoduHQEL69Oa7tu1kG4Eq9UlbDWUq6IDM2f_05XfXFfM72koBMiGQcZSblMKjWHJRFeWDM_vWXfdrXEppY-IvrEN7uOCXSQSzMgvzSF_C20A1wtElft33VA4OH43Oo6KVkpgJIHWzl3-SKAOuCVMQdt6umraFMP268H2LlNb2Dnq",
                    alt: "A refreshing red velvet latte in a glass",
                },
                {
                    id: 6,
                    name: "Pain Au Chocolat",
                    price: 23000,
                    category: "Pastry",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAk1aTemk_zLw0u78BEsrRlECs_echqPFcSju2bDdzEQw5z5ksHjuLIZzuMuoML00CnetkMs72JKnubiOrt5FNSfRXuFY7Sqw_KBqzYUFIGXQHPxmN67tQUqDbZqBhnH0fSmSxGmpx8M6EC7PpNQDGpmTRfZI_mmRNABEfx-28DhX7DNM2WHIhoZBbysn9kV4X87NxTshMcKyICN4ADXGSQxCbw0rTs79QsUdZnwkC4GfVukTMFRjUcvf3tGGkdHwp6le7PvbSjf-bp",
                    alt: "A delicious pain au chocolat pastry",
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
