<template>
    <div class="relative flex min-h-screen w-full flex-col">
        <HeaderComponent />
        <main class="flex-grow">
            <router-view />
        </main>
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
    name: "App",
    components: {
        HeaderComponent,
        FooterComponent,
    },
};
</script>

<style>
/* Global styles if needed */
</style>
