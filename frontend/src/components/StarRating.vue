<template>
    <span
        class="inline-flex items-center"
        :style="{ gap: gap + 'px' }"
    >
        <span
            v-for="star in 5"
            :key="star"
            class="relative inline-block flex-shrink-0"
            :style="{ width: size + 'px', height: size + 'px' }"
        >
            <!-- Background (empty) star -->
            <svg
                viewBox="0 0 24 24"
                :style="{ width: size + 'px', height: size + 'px' }"
                fill="none"
            >
                <path
                    d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-4.043-7.416 4.043 1.48-8.279-6.064-5.828 8.332-1.151z"
                    stroke="#dda552"
                    stroke-opacity="0.35"
                    stroke-width="1.4"
                />
            </svg>

            <!-- Filled overlay, clipped to the exact percentage for this star -->
            <span
                class="absolute left-0 top-0 overflow-hidden"
                :style="{ width: fillPercent(star) + '%', height: size + 'px' }"
            >
                <svg
                    viewBox="0 0 24 24"
                    :style="{ width: size + 'px', height: size + 'px' }"
                >
                    <path
                        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-4.043-7.416 4.043 1.48-8.279-6.064-5.828 8.332-1.151z"
                        fill="#dda552"
                    />
                </svg>
            </span>
        </span>
    </span>
</template>

<script>
export default {
    name: "StarRating",

    props: {
        rating: {
            type: Number,
            required: true,
        },

        size: {
            type: Number,
            default: 20,
        },

        gap: {
            type: Number,
            default: 2,
        },
    },

    methods: {
        fillPercent(star) {
            const diff = this.rating - (star - 1);

            if (diff >= 1) return 100;
            if (diff <= 0) return 0;

            return Math.round(diff * 100);
        },
    },
};
</script>