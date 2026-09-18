<template>
  <main class="editorial-form-page">
    <section class="editorial-form-hero"><div class="editorial-page-inner"><p class="editorial-section-label">Punya cerita?</p><h1>Kami ingin<br /><em>mendengarnya.</em></h1><p>Feedback Anda membantu Kedai Sepijak menjadi lebih baik, satu kunjungan pada satu waktu.</p></div></section>
    <section class="editorial-form-body"><div class="editorial-form-inner"><aside><p class="editorial-section-label">Tiga langkah sederhana</p><ol><li><span>01</span><strong>Siapa yang ingin Anda nilai?</strong></li><li><span>02</span><strong>Bagaimana pengalaman Anda?</strong></li><li><span>03</span><strong>Ceritakan lebih lanjut.</strong></li></ol><RouterLink to="/polling" class="editorial-text-link">Ikut polling berikutnya <ArrowUpRight :size="15" /></RouterLink></aside><div class="editorial-form-container"><FeedbackForm /></div></div></section>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { ArrowUpRight } from "lucide-vue-next";
import FeedbackForm from "@/components/FeedbackForm.vue";
onMounted(() => window.scrollTo(0, 0));
</script>

<style scoped>
.editorial-form-page { min-height: 100vh; background: #f5f1e8; color: #1b211d; }.editorial-form-hero { background: #164c3b; color: #faf9f5; padding: 150px 24px 78px; }.editorial-page-inner, .editorial-form-inner { width: min(1120px, 100%); margin: 0 auto; }.editorial-section-label { color: #d9a441; font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }.editorial-form-hero h1 { margin: 18px 0; font-family: Georgia, serif; font-size: clamp(45px, 6vw, 78px); letter-spacing: -.06em; line-height: .94; }.editorial-form-hero h1 em { color: #d9a441; font-weight: 400; }.editorial-form-hero p:last-child { max-width: 380px; color: rgba(250,249,245,.72); font-size: 15px; line-height: 1.7; }.editorial-form-body { padding: 90px 24px 120px; }.editorial-form-inner { display: grid; grid-template-columns: .7fr 1.3fr; gap: 80px; align-items: start; }.editorial-form-inner aside { position: sticky; top: 110px; }.editorial-form-inner ol { display: flex; flex-direction: column; gap: 20px; margin: 28px 0 38px; padding: 0; list-style: none; }.editorial-form-inner li { display: flex; gap: 14px; border-top: 1px solid rgba(22,76,59,.2); padding-top: 14px; }.editorial-form-inner li span { color: #d9a441; font-family: Georgia, serif; font-size: 15px; }.editorial-form-inner li strong { color: #164c3b; font-family: Georgia, serif; font-size: 17px; font-weight: 500; }.editorial-text-link { display: inline-flex; align-items: center; gap: 7px; border-bottom: 1px solid #164c3b; padding-bottom: 5px; color: #164c3b; font-size: 12px; font-weight: 750; text-decoration: none; }.editorial-form-container { border-top: 2px solid #164c3b; background: #faf9f5; padding: 30px; }
@media (max-width: 760px) { .editorial-form-inner { grid-template-columns: 1fr; gap: 45px; }.editorial-form-inner aside { position: static; }.editorial-form-body { padding-top: 60px; }.editorial-form-container { padding: 18px; } }
</style>
