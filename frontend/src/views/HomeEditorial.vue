<template>
  <main class="editorial-home">
    <section class="editorial-hero">
      <img class="editorial-hero-image" :src="spaceImage" alt="Suasana Kedai Sepijak" fetchpriority="high" />
      <div class="editorial-hero-shade"></div>
      <div class="editorial-hero-content">
        <p class="editorial-eyebrow">Kedai Sepijak · Purwokerto</p>
        <h1>Ruang untuk<br /><em>setiap cerita.</em></h1>
        <p class="editorial-lede">Kopi, makanan, dan tempat untuk berhenti sejenak.</p>
        <div class="editorial-actions">
          <a href="#menu" class="editorial-button editorial-button-gold">Lihat menu <ArrowDown :size="16" /></a>
          <a href="#contact" class="editorial-link editorial-link-light">Kunjungi kami <ArrowUpRight :size="16" /></a>
        </div>
      </div>
      <div class="editorial-hero-caption">Datang untuk kopi.<br />Tinggal untuk suasana.</div>
    </section>

    <section class="editorial-intro editorial-section">
      <div class="editorial-section-label">Tentang Kedai</div>
      <div class="editorial-intro-copy"><h2>Kedai yang dibuat<br /><em>untuk singgah.</em></h2><p>Kedai Sepijak adalah ruang hangat bagi siapa pun yang ingin menikmati kopi, berbagi cerita, bekerja, atau beristirahat sejenak dari rutinitas. Berada di Purwokerto, kami mempertemukan rasa dan orang-orang dalam suasana yang sederhana.</p><div class="editorial-inline-list"><span>Kopi</span><span>Makanan</span><span>Ruang bertemu</span></div></div>
      <figure class="editorial-intro-image"><img :src="interiorImage" alt="Interior Kedai Sepijak" loading="lazy" /><figcaption>Ruang yang terasa dekat.</figcaption></figure>
    </section>

    <section class="editorial-why editorial-section">
      <div class="editorial-section-label">Kenapa Sepijak?</div>
      <div class="editorial-why-list">
        <div><span>01</span><p>Untuk ngopi pelan.</p></div>
        <div><span>02</span><p>Untuk makan setelah hari yang panjang.</p></div>
        <div><span>03</span><p>Untuk pekerjaan yang belum selesai.</p></div>
        <div><span>04</span><p>Untuk bertemu dan berbagi cerita.</p></div>
      </div>
    </section>

    <section id="menu" class="editorial-menu editorial-section">
      <div class="editorial-section-heading"><div><div class="editorial-section-label">Dari Sepijak</div><h2>Beberapa pilihan<br /><em>Signature Sepijak.</em></h2></div><RouterLink to="/menu" class="editorial-link editorial-link-green">Lihat semua menu <ArrowUpRight :size="16" /></RouterLink></div>
      <div class="editorial-menu-grid">
        <article v-for="item in signatureMenu" :key="item.name" class="editorial-menu-item"><div class="editorial-menu-photo"><img :src="item.image" :alt="item.alt" loading="lazy" /><span class="editorial-menu-label">Signature Sepijak</span></div><div class="editorial-menu-meta"><div><h3>{{ item.name }}</h3><p>{{ item.note }}</p></div><strong>Rp {{ item.price.toLocaleString('id-ID') }}</strong></div></article>
      </div>
    </section>

    <section class="editorial-space editorial-section">
      <div class="editorial-space-copy"><div class="editorial-section-label">The space</div><h2>Datang untuk kopi.<br /><em>Tinggal untuk suasana.</em></h2><p>Tempat untuk obrolan panjang, pekerjaan yang belum selesai, dan malam yang tidak perlu terburu-buru.</p></div>
      <div class="editorial-space-images"><img :src="coffeeImage" alt="Kopi Kedai Sepijak" loading="lazy" /><img :src="menuImage" alt="Menu Kedai Sepijak" loading="lazy" /></div>
    </section>

    <section class="editorial-community editorial-section"><div><div class="editorial-section-label">Sepijak Community</div><h2>Bantu kami<br /><em>jadi lebih baik.</em></h2></div><div class="editorial-community-copy"><p>Kedai ini juga punya cerita dari orang-orang yang datang ke dalamnya. Punya pengalaman di Kedai Sepijak? Bagikan ceritamu, atau ikut menentukan apa yang ingin kami hadirkan selanjutnya.</p><div class="editorial-community-links"><RouterLink to="/feedback">Bagikan pengalaman <ArrowUpRight :size="16" /></RouterLink><RouterLink to="/polling">Ikut polling <ArrowUpRight :size="16" /></RouterLink><a href="#testimonial">Lihat cerita pelanggan <ArrowDown :size="16" /></a></div></div></section>

    <section id="testimonial"><TestimonialSection /></section>
    <section id="contact"><ContactSection /></section>
  </main>
</template>

<script setup>
import { ArrowDown, ArrowUpRight } from "lucide-vue-next";
import TestimonialSection from "@/components/TestimonialSection.vue";
import ContactSection from "@/components/ContactSection.vue";
import spaceImage from "@/assets/images/suasana-kedai.jpg";
import interiorImage from "@/assets/images/kedai-interior.jpg";
import coffeeImage from "@/assets/images/manual-brew.jpg";
import menuImage from "@/assets/images/kedai-menu.jpg";
import ayamBakar from "@/assets/images/ayambakar.jpg";
import manualBrew from "@/assets/images/manual-brew.jpg";
import premiumCoffee from "@/assets/images/premium-coffe.jpg";

const signatureMenu = [
  { name: "Manual Brew", note: "Kopi pilihan untuk pagi yang pelan.", price: 25000, image: manualBrew, alt: "Manual brew Kedai Sepijak" },
  { name: "Ayam Bakar", note: "Sajian hangat dari dapur Sepijak.", price: 25000, image: ayamBakar, alt: "Ayam bakar Kedai Sepijak" },
  { name: "Premium Coffee", note: "Teman obrolan setelah matahari turun.", price: 30000, image: premiumCoffee, alt: "Premium coffee Kedai Sepijak" },
];
</script>

<style scoped>
.editorial-home { background: #f5f1e8; color: #1b211d; }
.editorial-hero { position: relative; min-height: min(780px, 92vh); display: flex; align-items: flex-end; overflow: hidden; background: #103a2e; color: #faf9f5; }
.editorial-hero-image { position: absolute; inset: 0; height: 100%; width: 100%; object-fit: cover; object-position: center; }.editorial-hero-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(16,58,46,.88), rgba(16,58,46,.26) 68%, rgba(16,58,46,.16)); }.editorial-hero-content { position: relative; z-index: 1; width: min(760px, 100%); padding: 150px clamp(24px, 8vw, 112px) 105px; }.editorial-eyebrow, .editorial-section-label { color: #d9a441; font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }.editorial-hero h1 { margin: 17px 0 18px; color: #faf9f5; font-size: clamp(48px, 7vw, 92px); font-weight: 700; letter-spacing: -.055em; line-height: .94; }.editorial-hero h1 em, .editorial-intro h2 em, .editorial-menu h2 em, .editorial-space h2 em, .editorial-community h2 em { color: #d9a441; font-weight: 400; }.editorial-lede { max-width: 380px; color: rgba(250,249,245,.76); font-size: 16px; line-height: 1.65; }.editorial-actions { display: flex; align-items: center; gap: 22px; margin-top: 30px; }.editorial-button, .editorial-link, .editorial-community-links a { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 750; text-decoration: none; }.editorial-button { padding: 12px 16px; }.editorial-button-gold { background: #d9a441; color: #103a2e; }.editorial-link { border-bottom: 1px solid currentColor; padding-bottom: 4px; }.editorial-link-light { color: #faf9f5; }.editorial-link-green { color: #164c3b; }.editorial-hero-caption { position: absolute; right: clamp(24px, 6vw, 86px); bottom: 40px; z-index: 1; border-left: 1px solid rgba(250,249,245,.45); padding-left: 13px; color: rgba(250,249,245,.72); font-family: Georgia, serif; font-size: 14px; font-style: italic; line-height: 1.45; }
.editorial-section { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }.editorial-intro { display: grid; grid-template-columns: .7fr 1fr 1.1fr; gap: 42px; align-items: start; padding-top: 130px; padding-bottom: 130px; }.editorial-intro h2, .editorial-menu h2, .editorial-space h2, .editorial-community h2 { margin: 20px 0 0; color: #164c3b; font-size: clamp(34px, 4vw, 56px); letter-spacing: -.05em; line-height: .99; }.editorial-intro-copy > p { margin: 22px 0 0; color: #6b716c; font-size: 15px; line-height: 1.8; }.editorial-inline-list { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 25px; border-top: 1px solid rgba(22,76,59,.18); padding-top: 15px; color: #164c3b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }.editorial-inline-list span::before { content: '·'; margin-right: 7px; color: #d9a441; }.editorial-intro-image { margin: 0; }.editorial-intro-image img { display: block; height: 470px; width: 100%; object-fit: cover; }.editorial-intro-image figcaption { margin-top: 10px; color: #6b716c; font-family: Georgia, serif; font-size: 13px; font-style: italic; }
.editorial-why { display: grid; grid-template-columns: .7fr 1.3fr; gap: 50px; border-top: 1px solid rgba(22,76,59,.2); padding-top: 25px; padding-bottom: 120px; }.editorial-why-list { display: grid; grid-template-columns: 1fr 1fr; gap: 0 28px; }.editorial-why-list div { display: flex; gap: 16px; border-bottom: 1px solid rgba(22,76,59,.15); padding: 18px 0; }.editorial-why-list span { color: #d9a441; font-family: Georgia, serif; font-size: 14px; }.editorial-why-list p { margin: 0; color: #164c3b; font-family: Georgia, serif; font-size: 20px; line-height: 1.1; }
.editorial-menu { padding-bottom: 130px; }.editorial-section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; border-top: 1px solid rgba(22,76,59,.2); padding-top: 25px; }.editorial-menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 45px; }.editorial-menu-item { min-width: 0; }.editorial-menu-photo { position: relative; overflow: hidden; aspect-ratio: 1.12 / 1; background: #e4dfd3; }.editorial-menu-photo img { height: 100%; width: 100%; object-fit: cover; transition: transform .6s ease; }.editorial-menu-item:hover img { transform: scale(1.04); }.editorial-menu-label { position: absolute; bottom: 12px; left: 12px; background: #d9a441; padding: 5px 7px; color: #103a2e; font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }.editorial-menu-meta { display: flex; justify-content: space-between; gap: 10px; padding-top: 13px; }.editorial-menu-meta h3 { margin: 0; color: #164c3b; font-family: Georgia, serif; font-size: 21px; }.editorial-menu-meta p { margin: 5px 0 0; color: #6b716c; font-size: 12px; line-height: 1.5; }.editorial-menu-meta strong { color: #164c3b; font-size: 12px; white-space: nowrap; }
.editorial-space { display: grid; grid-template-columns: .72fr 1.28fr; gap: 70px; align-items: center; background: #164c3b; padding-top: 100px; padding-bottom: 100px; color: #faf9f5; }.editorial-space::before { content: ''; position: absolute; }.editorial-space-copy { padding-left: 35px; }.editorial-space-copy h2 { color: #faf9f5; }.editorial-space-copy p { max-width: 360px; margin-top: 24px; color: rgba(250,249,245,.7); font-size: 14px; line-height: 1.8; }.editorial-space-images { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }.editorial-space-images img { height: 330px; width: 100%; object-fit: cover; }.editorial-space-images img:last-child { margin-top: 48px; }
.editorial-community { display: grid; grid-template-columns: 1fr 1fr; gap: 70px; padding-top: 120px; padding-bottom: 120px; }.editorial-community-copy { align-self: end; max-width: 430px; }.editorial-community-copy p { color: #6b716c; font-size: 16px; line-height: 1.75; }.editorial-community-links { display: flex; flex-wrap: wrap; gap: 24px; margin-top: 28px; }.editorial-community-links a { color: #164c3b; border-bottom: 1px solid #164c3b; padding-bottom: 5px; }
@media (max-width: 800px) { .editorial-intro, .editorial-space, .editorial-community, .editorial-why { grid-template-columns: 1fr; gap: 32px; padding-top: 82px; padding-bottom: 82px; }.editorial-intro-image { grid-row: 2; }.editorial-intro-image img { height: 380px; }.editorial-menu-grid { grid-template-columns: 1fr 1fr; }.editorial-space-copy { padding-left: 0; }.editorial-space-images img { height: 260px; }.editorial-community-copy { max-width: none; } }
@media (max-width: 560px) { .editorial-hero { min-height: 700px; }.editorial-hero-content { padding: 130px 24px 95px; }.editorial-hero h1 { font-size: 55px; }.editorial-hero-caption { display: none; }.editorial-section { width: min(100% - 36px, 1180px); }.editorial-section-heading { align-items: flex-start; flex-direction: column; }.editorial-menu-grid { grid-template-columns: 1fr; gap: 34px; }.editorial-space-images { grid-template-columns: 1fr 1fr; }.editorial-space-images img { height: 210px; }.editorial-actions { align-items: flex-start; flex-direction: column; gap: 18px; } }
</style>
