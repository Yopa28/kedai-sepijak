<template>
    <section
        class="py-20 sm:py-28 bg-background-beige text-text-charcoal"
        id="contact"
    >
        <div class="container mx-auto px-6">
            <div class="text-center mb-12" data-aos="fade-up">
                <h2
                    class="font-display text-4xl font-bold text-primary-green md:text-5xl mb-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Kunjungi Kami
                </h2>
                <p
                    class="font-body text-text-charcoal/70 text-lg"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Rasakan kehangatan dan suasana alami di Kedai Sepijak
                </p>
            </div>

            <div
                class="grid grid-cols-1 items-center gap-0 overflow-hidden rounded-xl bg-white shadow-2xl lg:grid-cols-2"
                data-aos="zoom-in"
                data-aos-delay="300"
            >
                <div
                    class="flex flex-col gap-6 p-8 lg:p-12"
                    data-aos="fade-right"
                    data-aos-delay="400"
                >
                    <h3
                        class="font-display text-3xl font-bold leading-tight text-primary-green md:text-4xl"
                    >
                        Temukan Kami
                    </h3>
                    <div class="flex flex-col gap-4 text-text-charcoal/90 mt-4">
                        <p
                            class="flex items-start gap-3"
                            data-aos="fade-up"
                            data-aos-delay="500"
                        >
                            <span
                                class="material-symbols-outlined mt-1 text-primary-green"
                                >location_on</span
                            >
                            <span
                                ><strong>Address:</strong>
                                {{ contactInfo.address }}</span
                            >
                        </p>
                        <p
                            class="flex items-start gap-3"
                            data-aos="fade-up"
                            data-aos-delay="600"
                        >
                            <span
                                class="material-symbols-outlined mt-1 text-primary-green"
                                >schedule</span
                            >
                            <span
                                ><strong>Opening Hours:</strong>
                                {{ contactInfo.hours }}</span
                            >
                        </p>
                        <p
                            class="flex items-start gap-3"
                            data-aos="fade-up"
                            data-aos-delay="700"
                        >
                            <span
                                class="material-symbols-outlined mt-1 text-primary-green"
                                >call</span
                            >
                            <span
                                ><strong>Contact:</strong>
                                {{ contactInfo.phone }}</span
                            >
                        </p>
                    </div>
                </div>
                <div
                    class="h-80 w-full lg:h-full"
                    data-aos="fade-left"
                    data-aos-delay="500"
                >
                    <iframe
                        allowfullscreen
                        class="h-full w-full"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        :src="mapUrl"
                        style="border: 0"
                    ></iframe>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "ContactSection",
    data() {
        return {
            contactInfo: {
                address:
                    "Sky Lounge Taman Mas Kemambang, Bancarkembar, Purwokerto Utara, Banyumas, Jawa Tengah, Indonesia",
                hours: "DAILY OPEN | 08.00 - 01.00",
                phone: "08123456789",
            },
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15826.99373977598!2d109.2458448!3d-7.4093922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655e8b068285c5%3A0x7d6b3a5a7b6c59d!2sPurwokerto%2C%20Banyumas%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1672531200000!5m2!1sen!2sid",
        };
    },
};
</script>
