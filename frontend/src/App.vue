<template>
    <div class="relative flex min-h-screen w-full flex-col">
        <HeaderComponent v-if="!isAdminRoute" />
        <main :class="['flex-grow', { 'customer-content': !isAdminRoute }]">
            <router-view />
        </main>
        <FooterComponent v-if="!isAdminRoute" />
        <nav v-if="!isAdminRoute" class="mobile-action-bar" aria-label="Aksi cepat">
            <router-link to="/menu"><span class="material-symbols-outlined">menu_book</span>Menu</router-link>
            <a href="/#contact"><span class="material-symbols-outlined">location_on</span>Lokasi</a>
            <a href="tel:08882510000"><span class="material-symbols-outlined">call</span>Hubungi</a>
        </nav>
    </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
    name: "App",
    components: {
        HeaderComponent,
        FooterComponent,
    },
    setup() {
        const route = useRoute();

        // Check if current route is admin route
        const isAdminRoute = computed(() => {
            return route.path.startsWith("/admin");
        });

        return {
            isAdminRoute,
        };
    },
};
</script>

<style>
/* Global styles if needed */
</style>

<style>
.mobile-action-bar { display: none; }
@media (max-width: 767px) {
    .customer-content { padding-bottom: 62px; }
    .mobile-action-bar { position: fixed; right: 0; bottom: 0; left: 0; z-index: 45; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid rgba(22, 76, 59, .16); background: rgba(250, 249, 245, .96); padding: 8px 14px calc(8px + env(safe-area-inset-bottom)); backdrop-filter: blur(12px); }
    .mobile-action-bar a { display: flex; flex-direction: column; align-items: center; gap: 3px; color: #164c3b; font-size: 10px; font-weight: 750; text-decoration: none; }
    .mobile-action-bar a:first-child { color: #a36d1c; }
    .mobile-action-bar .material-symbols-outlined { font-size: 20px; }
}
</style>
