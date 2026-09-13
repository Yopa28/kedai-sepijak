<template>
  <main class="min-h-screen overflow-x-hidden bg-background-beige">

    <!-- =========================
         HERO
    ========================== -->
    <section id="home">
      <HeroSection />
    </section>


    <!-- =========================
         ABOUT
    ========================== -->
    <section id="about">
      <AboutSection />
    </section>


    <!-- =========================
         MENU
    ========================== -->
    <section id="menu">
      <MenuSection />
    </section>


    <!-- =========================
         FEEDBACK / POLLING CTA
    ========================== -->
    <section
      id="feedback"
      class="bg-background-beige px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div class="mx-auto w-full max-w-7xl">

        <!-- Section Heading -->
        <div class="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span
            class="text-sm font-semibold uppercase tracking-[0.18em] text-primary-green"
          >
            Suara Kamu
          </span>

          <h2
            class="mt-3 text-3xl font-bold leading-tight text-primary-green sm:text-4xl lg:text-5xl"
          >
            Bantu Kami Jadi Lebih Baik
          </h2>

          <p
            class="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base"
          >
            Ceritakan pengalaman kamu di Kedai Sepijak dan ikut menentukan
            apa yang ingin kami hadirkan selanjutnya.
          </p>
        </div>


        <!-- CTA Cards -->
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">

          <!-- Feedback -->
          <div
            class="group relative overflow-hidden rounded-2xl border border-primary-green/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8"
          >
            <div class="relative z-10">

              <!-- Icon -->
              <div
                class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green"
              >
                <span class="material-symbols-outlined text-2xl">
                  rate_review
                </span>
              </div>

              <h3
                class="text-xl font-bold text-primary-green sm:text-2xl"
              >
                Bagikan Pengalamanmu
              </h3>

              <p
                class="mt-3 max-w-lg text-sm leading-7 text-gray-600 sm:text-base"
              >
                Punya pengalaman menarik di Kedai Sepijak?
                Berikan feedback agar kami bisa terus memberikan
                pelayanan yang lebih baik.
              </p>

              <div class="mt-7">
                <RouterLink
                  to="/feedback"
                  class="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-primary-green px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-green/90 sm:w-auto"
                >
                  Berikan Feedback

                  <span class="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </RouterLink>
              </div>

            </div>
          </div>


          <!-- Polling -->
          <div
            class="group relative overflow-hidden rounded-2xl border border-primary-green/10 bg-primary-green p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8"
          >
            <div class="relative z-10">

              <!-- Icon -->
              <div
                class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white"
              >
                <span class="material-symbols-outlined text-2xl">
                  how_to_vote
                </span>
              </div>

              <h3
                class="text-xl font-bold text-white sm:text-2xl"
              >
                Ikut Polling
              </h3>

              <p
                class="mt-3 max-w-lg text-sm leading-7 text-white/75 sm:text-base"
              >
                Menurut kamu, menu atau fasilitas apa yang
                sebaiknya kami hadirkan berikutnya?
                Suaramu bisa membantu kami menentukan pilihan.
              </p>

              <div class="mt-7">
                <RouterLink
                  to="/polling"
                  class="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary-green transition-colors duration-200 hover:bg-gray-100 sm:w-auto"
                >
                  Ikut Polling

                  <span class="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </RouterLink>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- =========================
         TESTIMONIAL
    ========================== -->
    <section id="testimonial">
      <TestimonialSection />
    </section>


    <!-- =========================
         CONTACT
    ========================== -->
    <section id="contact">
      <ContactSection />
    </section>

  </main>
</template>


<script setup>
import { onMounted } from "vue";

import HeroSection from "@/components/HeroSection.vue";
import AboutSection from "@/components/AboutSection.vue";
import MenuSection from "@/components/MenuSection.vue";
import TestimonialSection from "@/components/TestimonialSection.vue";
import ContactSection from "@/components/ContactSection.vue";


/*
|--------------------------------------------------------------------------
| Scroll ke atas ketika Home dibuka
|--------------------------------------------------------------------------
*/
onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>


<style scoped>
/*
|--------------------------------------------------------------------------
| Prevent horizontal overflow
|--------------------------------------------------------------------------
*/

main {
  width: 100%;
  max-width: 100%;
}


/*
|--------------------------------------------------------------------------
| Mobile
|--------------------------------------------------------------------------
*/

@media (max-width: 640px) {
  main {
    overflow-x: hidden;
  }
}
</style>