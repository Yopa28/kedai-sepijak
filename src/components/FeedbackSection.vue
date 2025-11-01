<template>
    <section
        class="bg-background-beige py-20 text-text-charcoal sm:py-28"
        id="feedback"
    >
        <div class="container mx-auto px-6">
            <div class="text-center mb-12" data-aos="fade-up">
                <h2
                    class="font-display text-4xl font-bold text-primary-green md:text-5xl mb-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Feedback & Polling
                </h2>
                <p
                    class="font-body text-text-charcoal/70 text-lg"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Bantu kami meningkatkan layanan dengan feedback Anda dan
                    ikuti polling event kami
                </p>
            </div>

            <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                <div data-aos="fade-right" data-aos-delay="300">
                    <FeedbackForm />
                </div>
                <div data-aos="fade-left" data-aos-delay="400">
                    <PollingCard />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import FeedbackForm from "./FeedbackForm.vue";
import PollingCard from "./PollingCard.vue";

export default {
    name: "FeedbackSection",
    components: {
        FeedbackForm,
        PollingCard,
    },
};
</script>
