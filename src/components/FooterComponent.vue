<template>
    <footer class="bg-primary-green text-background-beige/90">
        <div class="container mx-auto px-6 py-16">
            <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                <div class="flex flex-col gap-4">
                    <h4
                        class="font-display text-xl font-bold text-background-beige"
                    >
                        Tentang Kedai Sepijak
                    </h4>
                    <p class="text-sm leading-relaxed text-secondary-sage">
                        Ruang untuk berhenti sejenak, terhubung kembali dengan
                        alam, rasa, dan cerita.
                    </p>
                </div>

                <div class="flex flex-col gap-4">
                    <h4
                        class="font-display text-xl font-bold text-background-beige"
                    >
                        Tautan Cepat
                    </h4>
                    <a
                        v-for="link in quickLinks"
                        :key="link.name"
                        :href="link.href"
                        class="text-sm text-secondary-sage transition-colors hover:text-background-beige"
                    >
                        {{ link.name }}
                    </a>
                </div>

                <div class="flex flex-col gap-4">
                    <h4
                        class="font-display text-xl font-bold text-background-beige"
                    >
                        Kontak & Jam Buka
                    </h4>
                    <p class="text-sm text-secondary-sage">
                        {{ contactInfo.address }}
                    </p>
                    <p class="text-sm text-secondary-sage">
                        {{ contactInfo.phone }}
                    </p>
                    <p class="text-sm text-secondary-sage">
                        {{ contactInfo.hours }}
                    </p>
                </div>

                <div class="flex flex-col gap-4">
                    <h4
                        class="font-display text-xl font-bold text-background-beige"
                    >
                        Buletin
                    </h4>
                    <p class="text-sm leading-relaxed text-secondary-sage">
                        Dapatkan informasi terbaru tentang acara dan promosi.
                    </p>
                    <form @submit.prevent="handleNewsletter" class="flex mt-2">
                        <input
                            v-model="newsletterEmail"
                            class="w-full rounded-l-md border-0 bg-background-beige/20 text-sm text-background-beige placeholder-secondary-sage focus:ring-2 focus:ring-inset focus:ring-accent-amber"
                            placeholder="Your Email"
                            type="email"
                            required
                        />
                        <button
                            type="submit"
                            class="rounded-r-md bg-accent-amber px-4 text-sm font-bold text-primary-green transition-colors hover:bg-background-beige"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div
                class="mt-16 border-t border-background-beige/20 pt-8 text-center text-sm text-secondary-sage"
            >
                <p>© 2025 Kedai Sepijak Purwokerto — Sandyyopa.</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterComponent",
    data() {
        return {
            newsletterEmail: "",
            quickLinks: [
                { name: "Home", href: "#" },
                { name: "Menu", href: "#menu" },
                { name: "Feedback", href: "#feedback" },
                { name: "Contact", href: "#contact" },
            ],
            contactInfo: {
                address:
                    "Sky Lounge Taman Mas Kemambang, Bancarkembar, Purwokerto Utara, Banyumas, Jawa Tengah, Indonesia",
                phone: "08123456789",
                hours: "Daily Open | 08.00 - 01.00",
            },
        };
    },
    methods: {
        handleNewsletter() {
            console.log("Newsletter subscription:", this.newsletterEmail);
            alert(`Thank you for subscribing with ${this.newsletterEmail}!`);
            this.newsletterEmail = "";
        },
    },
};
</script>
