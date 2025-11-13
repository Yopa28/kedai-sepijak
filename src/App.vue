<template>
    <div class="relative flex min-h-screen w-full flex-col">
        <HeaderComponent v-if="!isAdminRoute" />
        <main class="flex-grow">
            <router-view />
        </main>
        <FooterComponent v-if="!isAdminRoute" />
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
