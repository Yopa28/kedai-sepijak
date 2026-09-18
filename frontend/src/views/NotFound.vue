<template>
  <main class="not-found"><p class="not-found-kicker">Kedai Sepijak</p><div class="not-found-code">404</div><h1>Sepertinya kamu<br /><em>tersesat di jalan.</em></h1><p>Yuk kembali ke Sepijak.</p><RouterLink to="/">Kembali ke beranda <ArrowUpRight :size="16" /></RouterLink></main>
</template>

<script setup>
import { onMounted } from "vue";
import { ArrowUpRight } from "lucide-vue-next";
onMounted(() => { document.title = "Halaman Tidak Ditemukan — Kedai Sepijak"; });
</script>

<style scoped>
.not-found { display: flex; min-height: 100vh; flex-direction: column; align-items: center; justify-content: center; background: #164c3b; padding: 40px 24px; color: #faf9f5; text-align: center; }.not-found-kicker { color: #d9a441; font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }.not-found-code { margin: 20px 0 0; color: rgba(250,249,245,.2); font-family: Georgia, serif; font-size: clamp(100px, 22vw, 240px); font-weight: 700; letter-spacing: -.08em; line-height: .75; }.not-found h1 { margin: 28px 0 14px; font-family: Georgia, serif; font-size: clamp(34px, 5vw, 60px); letter-spacing: -.05em; line-height: 1; }.not-found h1 em { color: #d9a441; font-weight: 400; }.not-found > p:not(.not-found-kicker) { color: rgba(250,249,245,.7); font-size: 14px; }.not-found a { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; border-bottom: 1px solid #d9a441; padding-bottom: 6px; color: #d9a441; font-size: 13px; font-weight: 750; text-decoration: none; }
</style>
