import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles.css";
import App from "./App.vue";
import router from "./router";

// Import AOS library for scroll animations
import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

// Use Pinia store
app.use(pinia);

// Use Vue Router
app.use(router);

app.mount("#app");

// Initialize AOS with custom settings
AOS.init({
  duration: 800, // Animation duration in ms
  easing: "ease-in-out", // Easing function
  once: true, // Animation happens only once
  offset: 100, // Offset from the original trigger point
  delay: 0, // Delay in ms
  anchorPlacement: "top-bottom", // Animation trigger point
});

// Reinitialize AOS on route change
router.afterEach(() => {
  AOS.refresh();
});
