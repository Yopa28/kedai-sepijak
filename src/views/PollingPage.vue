<template>
    <div class="min-h-screen bg-background-beige">
        <!-- Header with Back Button -->
        <div class="sticky top-0 z-50 bg-primary-green/95 backdrop-blur-lg shadow-xl">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <router-link
                        to="/"
                        class="inline-flex items-center gap-2 text-background-beige hover:text-accent-amber transition-colors duration-300"
                    >
                        <span class="material-symbols-outlined">arrow_back</span>
                        <span class="font-semibold">Back to Home</span>
                    </router-link>
                    <h1 class="font-display text-2xl font-bold text-background-beige">
                        Event Polling
                    </h1>
                    <div class="w-32"></div>
                </div>
            </div>
        </div>

        <!-- Hero Banner -->
        <section class="bg-primary-green py-16 relative overflow-hidden">
            <div
                class="absolute inset-0 bg-gradient-to-r from-primary-green via-primary-green/95 to-primary-green/90"
            ></div>
            <div
                class="absolute top-10 right-10 w-32 h-32 bg-accent-amber rounded-full opacity-20 blur-3xl animate-pulse"
            ></div>
            <div
                class="absolute bottom-10 left-10 w-40 h-40 bg-secondary-sage rounded-full opacity-20 blur-3xl animate-pulse"
                style="animation-delay: 1s"
            ></div>

            <div class="container mx-auto px-6 relative z-10">
                <div class="max-w-3xl mx-auto text-center" data-aos="fade-up">
                    <div
                        class="inline-block mb-6"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    >
                        <div
                            class="bg-accent-amber/20 backdrop-blur-sm p-4 rounded-full inline-block"
                        >
                            <span
                                class="material-symbols-outlined text-6xl text-accent-amber"
                                >how_to_vote</span
                            >
                        </div>
                    </div>
                    <h1
                        class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background-beige mb-6"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Help Us Choose the Next Event
                    </h1>
                    <p
                        class="text-xl text-secondary-sage mb-4"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Your vote determines what happens at Kedai Sepijak
                    </p>
                    <p
                        class="text-lg text-background-beige/80 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        Cast your vote to help us decide the next exciting event. Each
                        customer gets one vote. Make your voice heard!
                    </p>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <section class="py-20">
            <div class="container mx-auto px-6">
                <div class="max-w-4xl mx-auto">
                    <!-- Info Cards -->
                    <div
                        class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <span
                                class="material-symbols-outlined text-4xl text-accent-amber mb-3 block"
                                >person</span
                            >
                            <p class="font-semibold text-primary-green">
                                One Vote Per Customer
                            </p>
                            <p class="text-sm text-text-charcoal/70">Fair & Democratic</p>
                        </div>
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <span
                                class="material-symbols-outlined text-4xl text-accent-amber mb-3 block"
                                >trending_up</span
                            >
                            <p class="font-semibold text-primary-green">
                                Real-time Results
                            </p>
                            <p class="text-sm text-text-charcoal/70">See Live Updates</p>
                        </div>
                        <div
                            class="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <span
                                class="material-symbols-outlined text-4xl text-accent-amber mb-3 block"
                                >event</span
                            >
                            <p class="font-semibold text-primary-green">
                                Winner Announced
                            </p>
                            <p class="text-sm text-text-charcoal/70">Event Coming Soon</p>
                        </div>
                    </div>

                    <!-- Polling Card Component -->
                    <div data-aos="fade-up" data-aos-delay="600">
                        <PollingCard />
                    </div>

                    <!-- How It Works -->
                    <div
                        class="mt-12 p-8 bg-white rounded-2xl shadow-xl"
                        data-aos="fade-up"
                        data-aos-delay="700"
                    >
                        <h3
                            class="font-display text-2xl font-bold text-primary-green mb-6 flex items-center gap-2"
                        >
                            <span class="material-symbols-outlined">info</span>
                            How It Works
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 class="font-bold text-primary-green mb-3 flex items-center gap-2">
                                    <span class="bg-accent-amber text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                    Fill Your Details
                                </h4>
                                <p class="text-text-charcoal/80">
                                    Enter your name and phone number to validate your vote. This ensures one vote per customer and prevents spam.
                                </p>
                            </div>
                            <div>
                                <h4 class="font-bold text-primary-green mb-3 flex items-center gap-2">
                                    <span class="bg-accent-amber text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                    Choose Your Event
                                </h4>
                                <p class="text-text-charcoal/80">
                                    Review all event options and select the one you're most excited about. Read descriptions carefully!
                                </p>
                            </div>
                            <div>
                                <h4 class="font-bold text-primary-green mb-3 flex items-center gap-2">
                                    <span class="bg-accent-amber text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                    Submit Your Vote
                                </h4>
                                <p class="text-text-charcoal/80">
                                    Click the vote button to cast your ballot. You'll see instant confirmation once your vote is recorded.
                                </p>
                            </div>
                            <div>
                                <h4 class="font-bold text-primary-green mb-3 flex items-center gap-2">
                                    <span class="bg-accent-amber text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                                    See Results
                                </h4>
                                <p class="text-text-charcoal/80">
                                    Watch the results update in real-time. The winning event will be announced and scheduled soon!
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Rules & Guidelines -->
                    <div
                        class="mt-12 p-6 bg-secondary-sage/20 rounded-xl border-2 border-secondary-sage/40"
                        data-aos="fade-up"
                        data-aos-delay="800"
                    >
                        <h3
                            class="font-display text-xl font-bold text-primary-green mb-4 flex items-center gap-2"
                        >
                            <span class="material-symbols-outlined">rule</span>
                            Voting Rules
                        </h3>
                        <ul class="space-y-3 text-text-charcoal/80">
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-accent-amber mt-1"
                                    >check_circle</span
                                >
                                <span
                                    ><strong>One vote per customer:</strong> Each phone number can only vote once to ensure fairness</span
                                >
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-accent-amber mt-1"
                                    >check_circle</span
                                >
                                <span
                                    ><strong>Valid contact required:</strong> Name must be at least 3 characters, phone number at least 10 digits</span
                                >
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-accent-amber mt-1"
                                    >check_circle</span
                                >
                                <span
                                    ><strong>No vote changing:</strong> Once submitted, votes cannot be changed. Choose carefully!</span
                                >
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-accent-amber mt-1"
                                    >check_circle</span
                                >
                                <span
                                    ><strong>Voting period:</strong> Poll is open until we reach 100 votes or 2 weeks, whichever comes first</span
                                >
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-accent-amber mt-1"
                                    >check_circle</span
                                >
                                <span
                                    ><strong>Winner announcement:</strong> The winning event will be scheduled within 1 month of poll closing</span
                                >
                            </li>
                        </ul>
                    </div>

                    <!-- Previous Events -->
                    <div
                        class="mt-12"
                        data-aos="fade-up"
                        data-aos-delay="900"
                    >
                        <h3 class="font-display text-2xl font-bold text-primary-green mb-6 text-center">
                            Previous Events Based on Your Votes
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div class="text-4xl mb-3">🎸</div>
                                <h4 class="font-bold text-primary-green mb-2">
                                    Acoustic Night
                                </h4>
                                <p class="text-sm text-text-charcoal/70 mb-3">
                                    Live music with local artists
                                </p>
                                <div class="text-xs text-accent-amber font-semibold">
                                    Winner - March 2024
                                </div>
                            </div>
                            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div class="text-4xl mb-3">☕</div>
                                <h4 class="font-bold text-primary-green mb-2">
                                    Coffee Cupping
                                </h4>
                                <p class="text-sm text-text-charcoal/70 mb-3">
                                    Tasting session with barista
                                </p>
                                <div class="text-xs text-accent-amber font-semibold">
                                    Winner - February 2024
                                </div>
                            </div>
                            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div class="text-4xl mb-3">📚</div>
                                <h4 class="font-bold text-primary-green mb-2">
                                    Book Club Night
                                </h4>
                                <p class="text-sm text-text-charcoal/70 mb-3">
                                    Discussion & coffee pairing
                                </p>
                                <div class="text-xs text-accent-amber font-semibold">
                                    Winner - January 2024
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Other Options -->
                    <div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="1000">
                        <p class="text-text-charcoal/70 mb-6">
                            Want to share your dining experience?
                        </p>
                        <router-link
                            to="/feedback"
                            class="inline-flex items-center gap-2 bg-primary-green text-background-beige font-bold px-8 py-4 rounded-full hover:bg-accent-amber hover:text-primary-green transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <span>Give Feedback</span>
                            <span class="material-symbols-outlined">rate_review</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import PollingCard from "../components/PollingCard.vue";

export default {
    name: "PollingPage",
    components: {
        PollingCard,
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
