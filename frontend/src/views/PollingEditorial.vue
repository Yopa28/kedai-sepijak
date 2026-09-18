<template>
  <main class="editorial-poll-page">
    <section class="editorial-poll-hero"><div class="editorial-poll-inner"><p class="editorial-section-label">Suara komunitas</p><h1>Apa yang harus kita<br /><em>lakukan berikutnya?</em></h1><p>Bantu Sepijak memilih acara berikutnya. Satu suara dari kamu ikut menentukan suasana yang kami hadirkan.</p></div></section>
    <section class="editorial-poll-body"><div class="editorial-poll-layout"><aside><p class="editorial-section-label">Cara kerja</p><ol><li><span>01</span>Isi data diri</li><li><span>02</span>Pilih acara favorit</li><li><span>03</span>Kirimkan suara</li><li><span>04</span>Lihat hasilnya</li></ol><p class="editorial-rule">Setiap nomor telepon hanya dapat digunakan sekali untuk menjaga voting tetap adil.</p></aside><div><PollingCard /></div></div></section>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import PollingCard from "@/components/PollingCard.vue";
onMounted(() => { window.scrollTo(0, 0); document.title = "Polling Acara - Kedai Sepijak"; });
</script>

<style scoped>
.editorial-poll-page { min-height: 100vh; background: #f5f1e8; color: #1b211d; }.editorial-poll-hero { background: #103a2e; color: #faf9f5; padding: 150px 24px 80px; }.editorial-poll-inner, .editorial-poll-layout { width: min(1120px, 100%); margin: 0 auto; }.editorial-section-label { color: #d9a441; font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }.editorial-poll-hero h1 { margin: 18px 0; font-family: Georgia, serif; font-size: clamp(42px, 6vw, 75px); letter-spacing: -.06em; line-height: .95; }.editorial-poll-hero h1 em { color: #d9a441; font-weight: 400; }.editorial-poll-hero p:last-child { max-width: 420px; color: rgba(250,249,245,.7); font-size: 15px; line-height: 1.7; }.editorial-poll-body { padding: 90px 24px 120px; }.editorial-poll-layout { display: grid; grid-template-columns: .65fr 1.35fr; gap: 80px; align-items: start; }.editorial-poll-layout aside { position: sticky; top: 110px; }.editorial-poll-layout ol { display: flex; flex-direction: column; gap: 17px; margin: 28px 0 34px; padding: 0; list-style: none; }.editorial-poll-layout li { display: flex; gap: 14px; border-top: 1px solid rgba(22,76,59,.2); padding-top: 13px; color: #164c3b; font-family: Georgia, serif; font-size: 17px; }.editorial-poll-layout li span { color: #d9a441; font-size: 14px; }.editorial-rule { border-left: 2px solid #d9a441; padding-left: 13px; color: #6b716c; font-size: 12px; line-height: 1.6; }.editorial-poll-layout > div { border-top: 2px solid #164c3b; background: #faf9f5; padding: 30px; }
@media (max-width: 760px) { .editorial-poll-layout { grid-template-columns: 1fr; gap: 45px; }.editorial-poll-layout aside { position: static; }.editorial-poll-body { padding-top: 60px; }.editorial-poll-layout > div { padding: 18px; } }
</style>
