<template>
    <header
        class="sticky top-0 z-50 w-full bg-primary-green/80 backdrop-blur-lg transition-all duration-300 shadow-xl shadow-primary-green/20"
    >
        <div
            class="container mx-auto flex items-center justify-between px-6 py-4"
        >
            <!-- Logo -->
            <router-link
                to="/"
                class="flex items-center gap-3 text-background-beige hover:text-accent-amber transition-colors duration-300"
            >
                <span class="material-symbols-outlined text-3xl">eco</span>
                <h2 class="text-2xl font-bold font-display tracking-wide">
                    Sepijak
                </h2>
            </router-link>

            <!-- Navigation Links -->
            <nav class="hidden items-center gap-8 md:flex">
                <router-link
                    to="/"
                    class="text-sm font-medium text-secondary-sage hover:text-background-beige transition-colors"
                    :class="{ 'text-accent-amber': $route.path === '/' }"
                >
                    Home
                </router-link>
                <router-link
                    to="/menu"
                    class="text-sm font-medium text-secondary-sage hover:text-background-beige transition-colors"
                    :class="{ 'text-accent-amber': $route.path === '/menu' }"
                >
                    Menu
                </router-link>
                <router-link
                    to="/feedback"
                    class="text-sm font-medium text-secondary-sage hover:text-background-beige transition-colors"
                    :class="{
                        'text-accent-amber': $route.path === '/feedback',
                    }"
                >
                    Feedback
                </router-link>
                <router-link
                    to="/polling"
                    class="text-sm font-medium text-secondary-sage hover:text-background-beige transition-colors"
                    :class="{ 'text-accent-amber': $route.path === '/polling' }"
                >
                    Polling
                </router-link>
                <a
                    href="/#contact"
                    class="text-sm font-medium text-secondary-sage hover:text-background-beige transition-colors"
                >
                    Contact
                </a>
            </nav>

            <!-- Mobile Menu Button -->
            <button
                @click="toggleMobileMenu"
                class="md:hidden flex items-center text-background-beige hover:text-accent-amber transition-colors"
            >
                <span class="material-symbols-outlined text-3xl">{{
                    mobileMenuOpen ? "close" : "menu"
                }}</span>
            </button>

            <!-- CTA Button (Desktop) -->
            <button
                class="hidden md:flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-accent-amber text-primary-green text-sm font-bold leading-normal tracking-wide transition-all duration-300 hover:bg-background-beige hover:shadow-lg hover:shadow-accent-amber/30"
            >
                <span class="truncate"></span>
            </button>
        </div>

        <!-- Mobile Menu -->
        <transition name="slide-down">
            <div
                v-if="mobileMenuOpen"
                class="md:hidden bg-primary-green border-t border-secondary-sage/30"
            >
                <nav class="container mx-auto px-6 py-4 flex flex-col gap-4">
                    <router-link
                        to="/"
                        @click="closeMobileMenu"
                        class="text-base font-medium text-secondary-sage hover:text-accent-amber transition-colors py-2"
                        :class="{ 'text-accent-amber': $route.path === '/' }"
                    >
                        Home
                    </router-link>
                    <router-link
                        to="/menu"
                        @click="closeMobileMenu"
                        class="text-base font-medium text-secondary-sage hover:text-accent-amber transition-colors py-2"
                        :class="{ 'text-accent-amber': $route.path === '/menu' }"
                    >
                        Menu
                    </router-link>
                    <router-link
                        to="/feedback"
                        @click="closeMobileMenu"
                        class="text-base font-medium text-secondary-sage hover:text-accent-amber transition-colors py-2"
                        :class="{
                            'text-accent-amber': $route.path === '/feedback',
                        }"
                    >
                        Feedback
                    </router-link>
                    <router-link
                        to="/polling"
                        @click="closeMobileMenu"
                        class="text-base font-medium text-secondary-sage hover:text-accent-amber transition-colors py-2"
                        :class="{
                            'text-accent-amber': $route.path === '/polling',
                        }"
                    >
                        Polling
                    </router-link>
                    <a
                        href="/#contact"
                        @click="closeMobileMenu"
                        class="text-base font-medium text-secondary-sage hover:text-accent-amber transition-colors py-2"
                    >
                        Contact
                    </a>
                    <button
                        class="mt-4 w-full flex items-center justify-center rounded-full py-3 px-5 bg-accent-amber text-primary-green text-sm font-bold leading-normal tracking-wide transition-all duration-300 hover:bg-background-beige"
                    >
                        <span>Order Now</span>
                    </button>
                </nav>
            </div>
        </transition>
    </header>
</template>

<script>
export default {
    name: "HeaderComponent",
    data() {
        return {
            mobileMenuOpen: false,
        };
    },
    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        closeMobileMenu() {
            this.mobileMenuOpen = false;
        },
    },
    watch: {
        $route() {
            // Close mobile menu when route changes
            this.closeMobileMenu();
        },
    },
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease-out;
    max-height: 500px;
    overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
    max-height: 0;
    opacity: 0;
}
</style>
