<template>
    <div class="min-h-screen bg-background-beige font-body">
        <!-- ========================================
             HEADER NAVIGATION
        ========================================= -->
        <div class="sticky top-0 z-50 bg-primary-green/95 backdrop-blur-lg shadow-xl">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <router-link
                        to="/"
                        class="inline-flex items-center gap-2 text-background-beige hover:text-accent-amber transition-colors duration-300"
                    >
                        <span class="material-symbols-outlined">arrow_back</span>
                        <span class="font-semibold text-sm uppercase tracking-wide">Kembali</span>
                    </router-link>
                    <h1 class="font-display text-lg font-bold text-accent-amber tracking-widest uppercase">
                        Kedai Sepijak
                    </h1>
                    <div class="w-32"></div>
                </div>
            </div>
        </div>

        <!-- ========================================
             HERO BANNER
        ========================================= -->
        <section class="bg-primary-green py-16 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-green via-primary-green/95 to-primary-green/90"></div>
            <div class="absolute top-10 right-10 w-32 h-32 bg-accent-amber rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div class="absolute bottom-10 left-10 w-40 h-40 bg-secondary-sage rounded-full opacity-20 blur-3xl animate-pulse" style="animation-delay: 1s"></div>

            <div class="container mx-auto px-6 relative z-10">
                <div class="max-w-3xl mx-auto text-center" data-aos="fade-up">
                    <div class="inline-block mb-6" data-aos="zoom-in" data-aos-delay="100">
                        <div class="bg-accent-amber/20 backdrop-blur-sm p-4 rounded-full inline-block border border-accent-amber/30">
                            <span class="material-symbols-outlined text-5xl text-accent-amber">how_to_vote</span>
                        </div>
                    </div>
                    <h1 class="font-display text-3xl md:text-5xl font-bold text-background-beige mb-4">
                        Bantu Kami Memilih <span class="text-accent-amber">Acara Berikutnya</span>
                    </h1>
                    <p class="text-base md:text-lg text-secondary-sage mb-3" data-aos="fade-up" data-aos-delay="300">
                        Suara Anda menentukan apa yang terjadi di Kedai Sepijak
                    </p>
                    <p class="text-sm md:text-base text-background-beige/80 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400">
                        Berikan suara Anda untuk membantu kami menentukan acara menarik berikutnya. Setiap pelanggan berhak memberikan satu suara. Sampaikan aspirasi Anda!
                    </p>
                </div>
            </div>
        </section>

        <!-- ========================================
             MAIN CONTENT
        ========================================= -->
        <section class="py-16">
            <div class="container mx-auto px-6">
                <div class="max-w-4xl mx-auto">
                    
                    <!-- INFO CARDS -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12" data-aos="fade-up" data-aos-delay="500">
                        <div class="text-center p-5 bg-white rounded-2xl shadow-sm border border-primary-green/10 hover:shadow-md transition-all duration-300">
                            <span class="material-symbols-outlined text-3xl text-accent-amber mb-2 block">person</span>
                            <p class="font-semibold text-primary-green text-sm">Satu Suara per Pelanggan</p>
                            <p class="text-xs text-text-charcoal/60">Adil & Transparan</p>
                        </div>
                        <div class="text-center p-5 bg-white rounded-2xl shadow-sm border border-primary-green/10 hover:shadow-md transition-all duration-300">
                            <span class="material-symbols-outlined text-3xl text-accent-amber mb-2 block">trending_up</span>
                            <p class="font-semibold text-primary-green text-sm">Hasil Real-Time</p>
                            <p class="text-xs text-text-charcoal/60">Pantau Perolehan Suara</p>
                        </div>
                        <div class="text-center p-5 bg-white rounded-2xl shadow-sm border border-primary-green/10 hover:shadow-md transition-all duration-300">
                            <span class="material-symbols-outlined text-3xl text-accent-amber mb-2 block">event</span>
                            <p class="font-semibold text-primary-green text-sm">Pemenang Diumumkan</p>
                            <p class="text-xs text-text-charcoal/60">Acara Segera Digelar</p>
                        </div>
                    </div>

                    <!-- POLLING CARD COMPONENT -->
                    <div data-aos="fade-up" data-aos-delay="600" class="mb-12">
                        <PollingCard />
                    </div>

                    <!-- HOW IT WORKS -->
                    <div class="mt-12 p-8 bg-white rounded-2xl shadow-sm border border-primary-green/10" data-aos="fade-up" data-aos-delay="700">
                        <h3 class="font-display text-2xl font-bold text-primary-green mb-6 flex items-center gap-2">
                            <span class="material-symbols-outlined text-accent-amber">info</span>
                            Cara Kerja Polling
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-accent-amber/20 text-accent-amber flex items-center justify-center font-bold text-sm">1</div>
                                <div>
                                    <h4 class="font-bold text-primary-green mb-1">Isi Data Diri</h4>
                                    <p class="text-sm text-text-charcoal/70">Masukkan nama dan nomor telepon untuk memvalidasi suara guna mencegah duplikasi.</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-accent-amber/20 text-accent-amber flex items-center justify-center font-bold text-sm">2</div>
                                <div>
                                    <h4 class="font-bold text-primary-green mb-1">Pilih Acara Favorit</h4>
                                    <p class="text-sm text-text-charcoal/70">Tinjau semua opsi acara yang tersedia dan pilih yang paling ingin Anda ikuti.</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-accent-amber/20 text-accent-amber flex items-center justify-center font-bold text-sm">3</div>
                                <div>
                                    <h4 class="font-bold text-primary-green mb-1">Kirimkan Suara</h4>
                                    <p class="text-sm text-text-charcoal/70">Klik tombol pilih untuk mencatatkan suara Anda secara instan di sistem.</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-accent-amber/20 text-accent-amber flex items-center justify-center font-bold text-sm">4</div>
                                <div>
                                    <h4 class="font-bold text-primary-green mb-1">Lihat Hasil</h4>
                                    <p class="text-sm text-text-charcoal/70">Hasil suara akan diperbarui secara langsung. Acara pemenang akan segera dijadwalkan!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- VOTING RULES -->
                    <div class="mt-8 p-6 bg-secondary-sage/15 rounded-2xl border border-secondary-sage/30" data-aos="fade-up" data-aos-delay="800">
                        <h3 class="font-display text-xl font-bold text-primary-green mb-4 flex items-center gap-2">
                            <span class="material-symbols-outlined text-accent-amber">rule</span>
                            Aturan Polling
                        </h3>
                        <ul class="space-y-3 text-sm text-text-charcoal/80">
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-accent-amber text-base mt-0.5">check_circle</span>
                                <span><strong>Satu suara per pelanggan:</strong> Setiap nomor telepon hanya dapat digunakan sekali untuk menjaga keadilan.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-accent-amber text-base mt-0.5">check_circle</span>
                                <span><strong>Kontak valid:</strong> Nama minimal 3 karakter dan nomor telepon aktif untuk proses verifikasi.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-accent-amber text-base mt-0.5">check_circle</span>
                                <span><strong>Pilihan tetap:</strong> Suara yang sudah dikirimkan tidak dapat diubah kembali, jadi pilih dengan bijak!</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-accent-amber text-base mt-0.5">check_circle</span>
                                <span><strong>Pengumuman Pemenang:</strong> Acara terpilih akan dijadwalkan dan diumumkan dalam waktu 1 bulan setelah polling ditutup.</span>
                            </li>
                        </ul>
                    </div>

                    <!-- OTHER OPTIONS -->
                    <div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="1000">
                        <p class="text-sm text-text-charcoal/70 mb-4">
                            Ingin membagikan ulasan atau pengalaman bersantap Anda?
                        </p>
                        <router-link
                            to="/feedback"
                            class="inline-flex items-center gap-2 bg-primary-green text-background-beige font-bold text-sm px-8 py-4 rounded-full hover:bg-accent-amber hover:text-primary-green transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <span>Beri Masukan & Ulasan</span>
                            <span class="material-symbols-outlined text-base">rate_review</span>
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
        window.scrollTo(0, 0);
        document.title = 'Polling Acara - Kedai Sepijak';
    },
};
</script>