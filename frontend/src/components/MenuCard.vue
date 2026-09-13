<template>
    <div
        class="menu-card group relative flex flex-col overflow-hidden rounded-2xl border border-background-beige/10 bg-background-beige/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-accent-amber/40 hover:bg-background-beige/[0.06] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]"
    >
        <!-- ========================================
             IMAGE
        ========================================= -->
        <div class="relative aspect-[4/3] overflow-hidden bg-black">
            <!-- Gambar dibiarkan natural tanpa filter blend agar warna makanan menggugah selera -->
            <img
                :src="item.image"
                :alt="item.alt"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:opacity-90"
            />

            <!-- Gradient gelap HANYA di bagian atas dan bawah untuk memastikan teks badge terbaca, membiarkan tengah terang -->
            <div
                class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10 pointer-events-none"
            ></div>

            <!-- Category tag: Efek Frosted Glassmorphism Premium -->
            <div
                class="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-3.5 py-1.5 backdrop-blur-md shadow-lg"
            >
                <span
                    class="text-[9px] font-bold uppercase tracking-[0.2em] text-white"
                >
                    {{ item.category }}
                </span>
            </div>

            <!-- Hover reveal: order affordance dengan animasi diagonal mulus -->
            <div
                class="absolute inset-0 flex items-center justify-center bg-primary-green/20 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100"
            >
                <span
                    class="flex h-14 w-14 translate-y-4 translate-x-4 items-center justify-center rounded-full bg-accent-amber text-primary-green shadow-xl transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
                >
                    <span class="material-symbols-outlined text-2xl font-bold">
                        arrow_outward
                    </span>
                </span>
            </div>
        </div>

        <!-- ========================================
             DETAILS
        ========================================= -->
        <div class="flex flex-1 flex-col justify-between p-5 md:p-6 z-10">
            <h3
                class="font-display text-lg font-bold leading-snug text-background-beige transition-colors duration-300 group-hover:text-white md:text-xl"
            >
                {{ item.name }}
            </h3>

            <div class="mt-2 flex items-center">
                <span
                    class="font-display text-base font-bold text-accent-amber md:text-lg"
                >
                    {{ formattedPrice }}
                </span>
            </div>
        </div>

        <!-- Hairline accent di bagian bawah -->
        <div
            class="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent-amber transition-transform duration-500 ease-out group-hover:scale-x-100"
        ></div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const formattedPrice = computed(() => {
    return "Rp " + props.item.price.toLocaleString("id-ID");
});
</script>