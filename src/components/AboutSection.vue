<template>
    <section class="py-20 sm:py-28 bg-background-beige text-text-charcoal">
        <div class="container mx-auto px-6">
            <div
                class="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16"
            >
                <div
                    class="flex flex-col gap-4 lg:col-span-2"
                    data-aos="fade-right"
                >
                    <h1
                        class="font-display text-4xl font-bold leading-tight tracking-tight text-primary-green md:text-5xl"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        {{ aboutTitle }}
                    </h1>
                    <p
                        class="font-body text-base font-normal leading-relaxed text-text-charcoal/80"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {{ aboutDescription }}
                    </p>
                </div>
                <div
                    class="relative w-full h-[500px] lg:col-span-3"
                    data-aos="fade-left"
                    data-aos-delay="300"
                >
                    <img
                        :alt="aboutImageAlt"
                        class="absolute top-0 left-0 h-full w-[calc(100%-4rem)] rounded-xl object-cover shadow-2xl"
                        :src="aboutImage"
                        data-aos="zoom-in"
                        data-aos-delay="400"
                    />
                    <div
                        class="absolute bottom-0 right-0 h-48 w-48 bg-primary-green rounded-xl shadow-lg border-8 border-background-beige"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    ></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "AboutSection",
    data() {
        return {
            aboutTitle: "Tantang Kedai Sepijak",
            aboutDescription:
                "Kedai Sepijak adalah ruang hangat bagi siapa pun yang ingin menikmati secangkir kopi, berbagi cerita, atau sekadar beristirahat sejenak dari rutinitas. Berdiri di Purwokerto, kami memadukan konsep Kedai Ngopi, Kedai Makan, serta Ruang Bertemu dan Bekerja, menciptakan suasana yang nyaman untuk semua kalangan—mulai dari mahasiswa, pekerja lepas, hingga komunitas kreatif lokal.",
            aboutImage:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCDkDBJAY3jbP2B-ynh8dsiZN-Jjt3UffkqWJBjkLEAxK5vzsGEtTXD17fzfTFrPTF0taTd6lDPbJGOwMXjdN48NJC3Z8JFY2dw-JAbrnbk2nI-X7xVCskV3MvpLOfR5FgfAfmye5fR8Rwy23sThmBycEEcF4krxNUYBo07YH8Ho85Na0_u32GRtpTi2MZbJzwKvQB_9butRMeC4QlAzv13EIwrkegHq10SgA4lYXfoawllNuSFGHDeNT7b5d_zHyfXRzntL0bdnUkC",
            aboutImageAlt:
                "Cozy interior of a modern cafe with warm lighting and wooden furniture",
        };
    },
};
</script>
