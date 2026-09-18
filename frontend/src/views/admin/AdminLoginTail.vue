<template>
  <main class="login-page">
    <section class="login-brand-panel">
      <div class="login-brand">
        <img class="login-brand-logo" src="@/assets/images/logo-sepijak.png" alt="Logo Kedai Sepijak" />
        <span>Kedai Sepijak</span>
      </div>
      <div class="brand-message">
        <p class="login-kicker">Coffee shop operations</p>
        <h1>Semua aktivitas kedai, dalam satu ruang kerja.</h1>
        <p>Kelola feedback pelanggan, polling event, dan performa tim dengan data yang lebih mudah dibaca.</p>
      </div>
      <div class="brand-footer"><span class="brand-status-dot"></span> Admin workspace <span>v1.3</span></div>
    </section>

    <section class="login-form-panel">
      <div class="login-form-wrap">
        <div class="login-mobile-brand">
          <img class="login-brand-logo login-brand-logo-small" src="@/assets/images/logo-sepijak.png" alt="Logo Kedai Sepijak" />
          <strong>Kedai Sepijak</strong>
        </div>
        <div class="form-intro">
          <p class="login-kicker">Welcome back</p>
          <h2>Masuk ke dashboard</h2>
          <p>Gunakan akun admin untuk melanjutkan.</p>
        </div>

        <div v-if="error" class="login-alert" role="alert">
          <AlertCircle :size="18" />
          <span>{{ error }}</span>
          <button type="button" aria-label="Tutup pesan" @click="clearError"><X :size="16" /></button>
        </div>

        <form class="login-form" @submit.prevent="handleLogin">
          <label class="field-label" for="username">Username</label>
          <div class="field-control">
            <UserRound :size="17" />
            <input id="username" v-model="credentials.username" type="text" required autocomplete="username" placeholder="Masukkan username" :disabled="loading" />
          </div>

          <div class="field-label-row"><label class="field-label" for="password">Password</label></div>
          <div class="field-control">
            <LockKeyhole :size="17" />
            <input id="password" v-model="credentials.password" :type="showPassword ? 'text' : 'password'" required autocomplete="current-password" placeholder="Masukkan password" :disabled="loading" />
            <button type="button" class="password-toggle" :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'" @click="showPassword = !showPassword">
              <EyeOff v-if="showPassword" :size="17" /><Eye v-else :size="17" />
            </button>
          </div>

          <label class="remember-row"><input id="remember-me" v-model="rememberMe" type="checkbox" :disabled="loading" /><span>Ingat saya</span></label>

          <button class="login-submit" type="submit" :disabled="loading">
            <LoaderCircle v-if="loading" class="spin" :size="17" />
            <span>{{ loading ? "Memproses..." : "Masuk ke dashboard" }}</span>
            <ArrowRight v-if="!loading" :size="17" />
          </button>
        </form>

        <div v-if="showCaptchaWidget" class="captcha-box">
          <p>Silakan selesaikan captcha untuk melanjutkan.</p>
          <div id="recaptcha-container"></div>
          <small v-if="recaptchaError">{{ recaptchaError }}</small>
        </div>

        <div class="secure-note"><ShieldCheck :size="16" /><span>Akses terbatas untuk administrator Kedai Sepijak.</span></div>
        <p class="login-copyright">© 2026 Kedai Sepijak. All rights reserved.</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AlertCircle, ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, ShieldCheck, UserRound, X } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { loadRecaptcha } from "@/utils/recaptcha";

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const router = useRouter();
const authStore = useAuthStore();
const credentials = ref({ username: "", password: "" });
const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const error = ref(null);
const showCaptchaWidget = ref(false);
const recaptchaToken = ref("");
const recaptchaError = ref("");
let widgetId = null;
let grecaptchaInstance = null;

async function handleLogin() {
  if (!credentials.value.username || !credentials.value.password) {
    error.value = "Username dan password harus diisi";
    return;
  }
  loading.value = true;
  error.value = null;
  recaptchaError.value = "";
  try {
    const result = await authStore.login(credentials.value.username, credentials.value.password, { recaptchaToken: recaptchaToken.value || undefined });
    if (result.success) { router.push("/admin/dashboard"); return; }
    if (result.captchaRequired && !showCaptchaWidget.value) await showCaptcha();
    error.value = result.message || "Login gagal. Periksa username dan password Anda.";
  } catch (err) {
    error.value = err.message || "Terjadi kesalahan saat login";
    console.error("Login error:", err);
  } finally { loading.value = false; }
}

async function showCaptcha() {
  if (!recaptchaSiteKey) { recaptchaError.value = "Captcha tidak dikonfigurasi"; showCaptchaWidget.value = true; return; }
  const grecaptcha = await loadRecaptcha();
  showCaptchaWidget.value = true;
  if (widgetId !== null && grecaptchaInstance) grecaptchaInstance.reset(widgetId);
  widgetId = grecaptcha.render("recaptcha-container", {
    sitekey: recaptchaSiteKey,
    callback: (token) => { recaptchaToken.value = token; recaptchaError.value = ""; },
    "error-callback": () => { recaptchaError.value = "Gagal memuat captcha"; },
    "expired-callback": () => { recaptchaToken.value = ""; recaptchaError.value = "Token captcha telah kadaluwarsa"; },
  });
  grecaptchaInstance = grecaptcha;
}
function clearError() { error.value = null; }
</script>

<style scoped>
.login-page { display: grid; min-height: 100vh; grid-template-columns: minmax(340px, .9fr) minmax(420px, 1.1fr); background: #f6f8fa; color: #17211d; }
.login-brand-panel { display: flex; flex-direction: column; justify-content: space-between; background: #14251f; padding: 42px clamp(32px, 6vw, 90px); color: #dbe8e2; }
.login-brand, .login-mobile-brand { display: flex; align-items: center; gap: 11px; }.login-brand { color: #fff; font-size: 16px; font-weight: 750; }.login-brand-logo { height: 42px; width: 42px; border-radius: 50%; object-fit: cover; }.login-brand-logo-small { height: 36px; width: 36px; }.login-kicker { margin: 0 0 12px; color: #bd8a4c; font-size: 11px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }.brand-message { max-width: 480px; }.brand-message h1 { margin: 0; color: #fff; font-size: clamp(34px, 4vw, 55px); font-weight: 750; letter-spacing: -.045em; line-height: 1.03; }.brand-message > p:last-child { max-width: 390px; margin: 22px 0 0; color: #9bb2a8; font-size: 14px; line-height: 1.7; }.brand-footer { display: flex; align-items: center; gap: 8px; color: #6f8c80; font-size: 11px; }.brand-footer span:last-child { margin-left: auto; }.brand-status-dot { height: 6px; width: 6px; border-radius: 50%; background: #66bd88; }
.login-form-panel { display: grid; place-items: center; padding: 36px 28px; }.login-form-wrap { width: min(100%, 410px); }.login-mobile-brand { display: none; }.form-intro { margin-bottom: 30px; }.form-intro h2 { margin: 0; color: #17211d; font-size: 30px; font-weight: 760; letter-spacing: -.04em; }.form-intro > p:last-child { margin: 8px 0 0; color: #738078; font-size: 13px; }.login-alert { display: flex; align-items: flex-start; gap: 9px; margin-bottom: 20px; border: 1px solid #fecaca; border-radius: 8px; background: #fff1f2; padding: 12px; color: #b91c1c; font-size: 12px; line-height: 1.45; }.login-alert span { flex: 1; }.login-alert button { border: 0; background: transparent; color: inherit; cursor: pointer; }
.login-form { display: flex; flex-direction: column; gap: 9px; }.field-label { margin-top: 10px; color: #3e4b45; font-size: 12px; font-weight: 700; }.field-label-row { display: flex; align-items: center; justify-content: space-between; }.field-control { display: flex; min-height: 44px; align-items: center; gap: 9px; border: 1px solid #dce3df; border-radius: 7px; background: #fff; padding: 0 12px; color: #8a9890; transition: border-color 150ms ease, box-shadow 150ms ease; }.field-control:focus-within { border-color: #6e9d87; box-shadow: 0 0 0 3px rgba(75, 132, 104, .12); }.field-control input { min-width: 0; flex: 1; border: 0; outline: 0; color: #17211d; font-size: 13px; }.field-control input::placeholder { color: #a0aaa4; }.password-toggle { display: grid; place-items: center; border: 0; background: transparent; color: #89968f; cursor: pointer; }.remember-row { display: flex; align-items: center; gap: 8px; margin: 11px 0 13px; color: #6d7b73; font-size: 12px; }.remember-row input { height: 15px; width: 15px; accent-color: #1e4d3b; }
.login-submit { display: flex; min-height: 45px; align-items: center; justify-content: center; gap: 8px; border: 0; border-radius: 7px; background: #1e4d3b; color: #fff; font-size: 13px; font-weight: 750; cursor: pointer; transition: background 150ms ease, transform 150ms ease; }.login-submit:hover:not(:disabled) { background: #286349; transform: translateY(-1px); }.login-submit:disabled { cursor: wait; opacity: .65; }.spin { animation: spin .8s linear infinite; }.captcha-box { margin-top: 18px; border: 1px dashed #a8c7b5; border-radius: 8px; background: #f1f8f3; padding: 14px; }.captcha-box p { margin: 0 0 10px; color: #315b45; font-size: 12px; }.captcha-box small { display: block; margin-top: 8px; color: #b91c1c; }.secure-note { display: flex; align-items: center; gap: 7px; margin-top: 26px; color: #7c8b82; font-size: 11px; }.login-copyright { margin: 42px 0 0; color: #a2ada6; font-size: 10px; text-align: center; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 760px) { .login-page { display: block; }.login-brand-panel { display: none; }.login-form-panel { min-height: 100vh; padding: 28px 22px; }.login-mobile-brand { display: flex; margin-bottom: 52px; color: #17211d; font-size: 15px; }.form-intro h2 { font-size: 27px; } }
</style>
