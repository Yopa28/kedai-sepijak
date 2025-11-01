<template>
    <section
        class="bg-gradient-to-b from-secondary-sage/20 via-background-beige to-background-beige py-20 text-text-charcoal sm:py-28"
    >
        <div class="container mx-auto px-6 text-center">
            <div class="mb-12" data-aos="fade-up">
                <h2
                    class="font-display text-4xl font-bold text-primary-green md:text-5xl mb-4"
                >
                    Apa Kata Mereka
                </h2>
                <p class="font-body text-text-charcoal/70 text-lg">
                    Testimoni dari pelanggan setia kami
                </p>
            </div>

            <div class="relative grid grid-cols-1 gap-8 md:grid-cols-3">
                <TestimonialCard
                    v-for="(testimonial, index) in testimonials"
                    :key="testimonial.id"
                    :testimonial="testimonial"
                    :isCenter="index === 1"
                    data-aos="fade-up"
                    :data-aos-delay="100 + index * 100"
                />
            </div>

            <p
                class="mt-24 font-display text-4xl italic text-primary-green"
                data-aos="zoom-in"
                data-aos-delay="400"
            >
                "More than just coffee — it's about taste, time, and
                connection."
            </p>
        </div>
    </section>
</template>

<script>
import TestimonialCard from "./TestimonialCard.vue";

export default {
    name: "TestimonialSection",
    components: {
        TestimonialCard,
    },
    data() {
        return {
            testimonials: [
                {
                    id: 1,
                    name: "Sarah L.",
                    rating: 5,
                    text: "The place is very comfortable for work, the coffee is a winner! Will definitely be back.",
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWxt9-7DzaLNGHLv5rBnZWN1CpnLsY_i-9HxQ_iabtCM_8G0pASehNasA_DQxil2oH1tIVsW4i8HEn8_zKvyyAH6im2qqBLg2YtAuhrTAfAFG1z_7JR0STqfDVJhnwRDIE0QxtTTYRrD_sUJyoNeOKcHojxDrxckMYCtOHB8AJO6VbKZUpNfC7ttQthRsOVwp3KnB1ZTivhIzvqRHg5F_5G4Dc7guqcYteQh_CQEm06Lsk2blSoVqamN3YkB_JNUajv2YVph59F3yl",
                },
                {
                    id: 2,
                    name: "Budi S.",
                    rating: 4.5,
                    text: "The atmosphere is beautiful and calm, perfect for relaxing in the afternoon. The croissant is delicious!",
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwkApbBY5mGqXCrYsndn2T3rjQCUo43UGyp3LSzuc2a47LSpB90P7BAa17gnGvZx67U-9PgViBa-BIaksbu3RVtvzoJQXEO5ZuNenQK_7Xz8QbsmETc4DzG0kvkDzvDPhm3Oq_8SIJRC8xsJLgJo1XO0RllIvUb-kyGzWyePwTl3i7DfzN2VV_iasihXU7BvYXNJ698X-0SAp0P6dBEYIYRXji-9pxYsZ1uU-4et_muqa_rwiln8VhcJFQ9siSC1sOjEKhygKobL99",
                },
                {
                    id: 3,
                    name: "Rina A.",
                    rating: 5,
                    text: "The service is friendly and fast. The matcha latte is a must-try!",
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlSOVpu1SAB1pXYfNoSkC6L1n9OMXDArSNk3r8FMHmvfqIAyf8KexGZYFsLwDGpAiiouLtZg_ku_Dly5yb6sFjqhIR7cATTIdZ8_0mZC4Ko35TNm_LEQVgkFdbmyJJrVwtPu1aSbFZAca86-rJ0QerZV5LFsb8rWKFtfBV1ADGgcxOpCv1UgnCaazrhKaEzNy-LvcblfqtukElOIS2KeRZzNsQUZ8le_m0B3W3J-wDMAId6WsiMitay_xniQC5e8eEd7DeFIJNT33X",
                },
            ],
        };
    },
};
</script>
