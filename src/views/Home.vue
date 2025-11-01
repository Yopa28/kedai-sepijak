<template>
    <div class="min-h-screen bg-background-beige">
        <!-- Hero Section -->
        <HeroSection />

        <!-- About Section -->
        <AboutSection />

        <!-- Menu Section -->
        <MenuSection />

        <!-- Call to Action for Feedback & Polling -->
        <section class="py-20 bg-primary-green relative overflow-hidden">
            <!-- Decorative Elements -->
            <div
                class="absolute top-10 right-10 w-32 h-32 bg-accent-amber rounded-full opacity-20 blur-3xl animate-pulse"
            ></div>
            <div
                class="absolute bottom-10 left-10 w-40 h-40 bg-secondary-sage rounded-full opacity-20 blur-3xl animate-pulse"
                style="animation-delay: 1s"
            ></div>

            <div class="container mx-auto px-6 relative z-10">
                <div
                    class="text-center mb-12"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <h2
                        class="font-display text-4xl md:text-5xl font-bold text-background-beige mb-4"
                    >
                        Share Your Experience
                    </h2>
                    <p class="text-secondary-sage text-lg max-w-2xl mx-auto">
                        We value your opinion! Help us improve by sharing your
                        feedback or vote for the next exciting event.
                    </p>
                </div>

                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                >
                    <!-- Feedback Card -->
                    <div
                        class="group bg-white/10 backdrop-blur-lg border border-background-beige/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2"
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        <div
                            class="bg-accent-amber/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                        >
                            <span
                                class="material-symbols-outlined text-4xl text-accent-amber"
                                >rate_review</span
                            >
                        </div>
                        <h3
                            class="font-display text-2xl font-bold text-background-beige mb-4"
                        >
                            Feedback & Suggestions
                        </h3>
                        <p class="text-background-beige/80 mb-6">
                            Share your dining experience, rate our service, and
                            help us serve you better. Your feedback matters!
                        </p>
                        <router-link
                            to="/feedback"
                            class="inline-flex items-center gap-2 bg-accent-amber text-primary-green font-bold px-6 py-3 rounded-full hover:bg-background-beige transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <span>Give Feedback</span>
                            <span class="material-symbols-outlined"
                                >arrow_forward</span
                            >
                        </router-link>
                    </div>

                    <!-- Polling Card -->
                    <div
                        class="group bg-white/10 backdrop-blur-lg border border-background-beige/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2"
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        <div
                            class="bg-accent-amber/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                        >
                            <span
                                class="material-symbols-outlined text-4xl text-accent-amber"
                                >how_to_vote</span
                            >
                        </div>
                        <h3
                            class="font-display text-2xl font-bold text-background-beige mb-4"
                        >
                            Vote for Next Event
                        </h3>
                        <p class="text-background-beige/80 mb-6">
                            Help us choose the next exciting event! Your vote
                            determines what happens at Kedai Sepijak.
                        </p>
                        <router-link
                            to="/polling"
                            class="inline-flex items-center gap-2 bg-accent-amber text-primary-green font-bold px-6 py-3 rounded-full hover:bg-background-beige transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <span>Vote Now</span>
                            <span class="material-symbols-outlined"
                                >arrow_forward</span
                            >
                        </router-link>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonial Section -->
        <TestimonialSection />

        <!-- Contact Section -->
        <ContactSection />
    </div>
</template>

<script>
import HeroSection from "../components/HeroSection.vue";
import AboutSection from "../components/AboutSection.vue";
import MenuSection from "../components/MenuSection.vue";
import TestimonialSection from "../components/TestimonialSection.vue";
import ContactSection from "../components/ContactSection.vue";

export default {
    name: "Home",
    components: {
        HeroSection,
        AboutSection,
        MenuSection,
        TestimonialSection,
        ContactSection,
    },
    mounted() {
        // Scroll to top when component is mounted
        window.scrollTo(0, 0);
    },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
