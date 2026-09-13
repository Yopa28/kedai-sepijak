<template>
    <header
        :class="[
            'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
            scrolled
                ? 'bg-primary-green shadow-lg shadow-black/10'
                : 'bg-primary-green/95',
        ]"
    >
        <div
            class="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
        >
            <!-- =========================
                 LOGO
            ========================== -->
            <router-link
                to="/"
                class="flex shrink-0 items-center"
                aria-label="Kedai Sepijak - Home"
            >
                <img
                    src="@/assets/images/logo-sepijak.png"
                    alt="Logo Kedai Sepijak"
                    class="h-12 w-auto object-contain sm:h-14"
                />
            </router-link>


            <!-- =========================
                 DESKTOP NAVIGATION
            ========================== -->
            <nav class="hidden items-center gap-7 md:flex lg:gap-9">
                <router-link
                    to="/"
                    class="nav-link"
                    :class="{ active: $route.path === '/' }"
                >
                    Home
                </router-link>

                <router-link
                    to="/menu"
                    class="nav-link"
                    :class="{ active: $route.path === '/menu' }"
                >
                    Menu
                </router-link>

                <router-link
                    to="/feedback"
                    class="nav-link"
                    :class="{ active: $route.path === '/feedback' }"
                >
                    Feedback
                </router-link>

                <router-link
                    to="/polling"
                    class="nav-link"
                    :class="{ active: $route.path === '/polling' }"
                >
                    Polling
                </router-link>

                <a
                    href="/#contact"
                    class="nav-link"
                    :class="{
                        active:
                            $route.path === '/' &&
                            $route.hash === '#contact',
                    }"
                >
                    Contact
                </a>
            </nav>


            <!-- =========================
                 MOBILE MENU BUTTON
            ========================== -->
            <button
                type="button"
                @click="toggleMobileMenu"
                class="flex h-11 w-11 items-center justify-center rounded-xl text-background-beige transition-colors duration-200 hover:bg-white/10 md:hidden"
                :aria-expanded="mobileMenuOpen"
                aria-label="Toggle navigation menu"
            >
                <span class="material-symbols-outlined text-[28px]">
                    {{ mobileMenuOpen ? "close" : "menu" }}
                </span>
            </button>
        </div>


        <!-- =========================
             MOBILE MENU
        ========================== -->
        <transition name="mobile-menu">
            <div
                v-if="mobileMenuOpen"
                class="border-t border-white/10 bg-primary-green md:hidden"
            >
                <nav
                    class="mx-auto flex w-full max-w-7xl flex-col px-5 pb-5 pt-3 sm:px-6"
                >
                    <!-- Home -->
                    <router-link
                        to="/"
                        @click="closeMobileMenu"
                        class="mobile-nav-link"
                        :class="{
                            active: $route.path === '/',
                        }"
                    >
                        <span>Home</span>

                        <span
                            v-if="$route.path === '/'"
                            class="material-symbols-outlined text-[20px]"
                        >
                            arrow_forward
                        </span>
                    </router-link>


                    <!-- Menu -->
                    <router-link
                        to="/menu"
                        @click="closeMobileMenu"
                        class="mobile-nav-link"
                        :class="{
                            active: $route.path === '/menu',
                        }"
                    >
                        <span>Menu</span>

                        <span
                            v-if="$route.path === '/menu'"
                            class="material-symbols-outlined text-[20px]"
                        >
                            arrow_forward
                        </span>
                    </router-link>


                    <!-- Feedback -->
                    <router-link
                        to="/feedback"
                        @click="closeMobileMenu"
                        class="mobile-nav-link"
                        :class="{
                            active: $route.path === '/feedback',
                        }"
                    >
                        <span>Feedback</span>

                        <span
                            v-if="$route.path === '/feedback'"
                            class="material-symbols-outlined text-[20px]"
                        >
                            arrow_forward
                        </span>
                    </router-link>


                    <!-- Polling -->
                    <router-link
                        to="/polling"
                        @click="closeMobileMenu"
                        class="mobile-nav-link"
                        :class="{
                            active: $route.path === '/polling',
                        }"
                    >
                        <span>Polling</span>

                        <span
                            v-if="$route.path === '/polling'"
                            class="material-symbols-outlined text-[20px]"
                        >
                            arrow_forward
                        </span>
                    </router-link>


                    <!-- Contact -->
                    <a
                        href="/#contact"
                        @click="closeMobileMenu"
                        class="mobile-nav-link"
                    >
                        <span>Contact</span>

                        <span
                            class="material-symbols-outlined text-[20px]"
                        >
                            arrow_forward
                        </span>
                    </a>
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
            scrolled: false,
        };
    },

    mounted() {
        window.addEventListener("scroll", this.handleScroll);

        // Cek posisi awal
        this.handleScroll();
    },

    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },

    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },

        closeMobileMenu() {
            this.mobileMenuOpen = false;
        },

        handleScroll() {
            this.scrolled = window.scrollY > 20;
        },
    },

    watch: {
        $route() {
            this.closeMobileMenu();
        },
    },
};
</script>


<style scoped>
/* =========================================
   DESKTOP NAVIGATION
========================================= */

.nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 76px;

    color: rgb(209 221 211);
    font-size: 0.875rem;
    font-weight: 500;

    transition:
        color 0.2s ease,
        opacity 0.2s ease;
}

.nav-link:hover {
    color: #f4ead8;
}


/* Active underline */
.nav-link::after {
    content: "";

    position: absolute;
    left: 0;
    right: 0;
    bottom: 17px;

    height: 2px;

    background-color: #d9a441;

    transform: scaleX(0);
    transform-origin: center;

    transition: transform 0.2s ease;
}

.nav-link.active {
    color: #d9a441;
}

.nav-link.active::after {
    transform: scaleX(1);
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

.mobile-nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-height: 52px;

    border-bottom: 1px solid rgb(255 255 255 / 0.08);

    color: rgb(209 221 211);

    font-size: 1rem;
    font-weight: 500;

    transition:
        color 0.2s ease,
        padding-left 0.2s ease;
}

.mobile-nav-link:last-child {
    border-bottom: none;
}

.mobile-nav-link:hover {
    color: #f4ead8;
}

.mobile-nav-link.active {
    color: #d9a441;
}


/* =========================================
   MOBILE MENU ANIMATION
========================================= */

.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
    transform-origin: top;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}


/* =========================================
   ACCESSIBILITY
========================================= */

@media (prefers-reduced-motion: reduce) {
    .nav-link,
    .mobile-nav-link,
    .mobile-menu-enter-active,
    .mobile-menu-leave-active {
        transition: none;
    }
}
</style>