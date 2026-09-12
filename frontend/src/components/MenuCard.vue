<template>
    <div
        class="menu-card group relative overflow-hidden rounded-2xl border border-background-beige/10 bg-background-beige/[0.03] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-amber/30 hover:bg-background-beige/[0.05]"
    >
        <!-- ========================================
             IMAGE
        ========================================= -->
        <div class="relative aspect-[4/3] overflow-hidden">
            <img
                :src="item.image"
                :alt="item.alt"
                class="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
            />

            <!-- Duotone-ish overlay for cohesion with the dark palette -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-primary-green/70 via-primary-green/0 to-primary-green/10 mix-blend-multiply"
            ></div>

            <div
                class="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
            ></div>

            <!-- Category tag -->
            <div
                class="absolute left-4 top-4 inline-flex items-center rounded-full border border-background-beige/25 bg-primary-green/40 px-3 py-1 backdrop-blur-md"
            >
                <span
                    class="text-[10px] font-semibold uppercase tracking-[0.2em] text-background-beige/90"
                >
                    {{ item.category }}
                </span>
            </div>

            <!-- Hover reveal: order affordance -->
            <div
                class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
                <span
                    class="flex h-12 w-12 items-center justify-center rounded-full border border-accent-amber/60 bg-primary-green/70 text-accent-amber backdrop-blur-md transition-transform duration-500 group-hover:scale-100 scale-90"
                >
                    <span class="material-symbols-outlined text-xl">
                        arrow_outward
                    </span>
                </span>
            </div>
        </div>

        <!-- ========================================
             DETAILS
        ========================================= -->
        <div class="flex items-start justify-between gap-3 p-5 md:p-6">
            <h3
                class="font-display text-lg font-bold leading-snug text-background-beige md:text-xl"
            >
                {{ item.name }}
            </h3>

            <div class="flex flex-shrink-0 flex-col items-end pt-0.5">
                <span
                    class="font-display text-base font-semibold text-accent-amber md:text-lg"
                >
                    {{ formattedPrice }}
                </span>
            </div>
        </div>

        <!-- Hairline accent at the very bottom, echoes the hero's gold hairlines -->
        <div
            class="h-px w-full origin-left scale-x-0 bg-accent-amber/60 transition-transform duration-500 group-hover:scale-x-100"
        ></div>
    </div>
</template>

<script>
export default {
    name: "MenuCard",

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    computed: {
        formattedPrice() {
            return "Rp " + this.item.price.toLocaleString("id-ID");
        },
    },
};
</script>

<style scoped>
.menu-card {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.menu-card:hover {
    box-shadow: 0 25px 55px rgba(0, 0, 0, 0.28);
}
</style>