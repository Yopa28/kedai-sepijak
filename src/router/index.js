// ============================================
// Vue Router Configuration
// Kedai Sepijak Frontend
// ============================================

import { createRouter, createWebHistory } from 'vue-router';

// Import views
import Home from '../views/Home.vue';
import FeedbackPage from '../views/FeedbackPage.vue';
import PollingPage from '../views/PollingPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Kedai Sepijak - Home',
            description: 'Kedai kopi tradisional di Purwokerto'
        }
    },
    {
        path: '/feedback',
        name: 'Feedback',
        component: FeedbackPage,
        meta: {
            title: 'Feedback - Kedai Sepijak',
            description: 'Share your experience and feedback'
        }
    },
    {
        path: '/polling',
        name: 'Polling',
        component: PollingPage,
        meta: {
            title: 'Polling Event - Kedai Sepijak',
            description: 'Vote for the next event at Kedai Sepijak'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            };
        } else {
            return { top: 0, behavior: 'smooth' };
        }
    }
});

// Navigation guard for page titles
router.beforeEach((to, from, next) => {
    // Set page title
    document.title = to.meta.title || 'Kedai Sepijak';

    // Set meta description
    if (to.meta.description) {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', to.meta.description);
        }
    }

    next();
});

export default router;
