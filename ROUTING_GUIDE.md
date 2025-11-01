# 🔀 Vue Router Setup Guide - Kedai Sepijak

## ✅ Routing Successfully Implemented!

Feedback dan Polling sekarang sudah dipisah menjadi halaman yang berbeda dengan Vue Router.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Routes Available](#routes-available)
- [File Structure](#file-structure)
- [Navigation](#navigation)
- [How It Works](#how-it-works)
- [Testing Routes](#testing-routes)
- [Adding New Routes](#adding-new-routes)

---

## 🎯 Overview

### What Changed?

**BEFORE:**
```
Single Page Application
- All sections in one page (Home)
- Scroll to Feedback/Polling sections
- No separate URLs
```

**AFTER:**
```
Multi-Page Application with Router
- Home page (/)
- Feedback page (/feedback)
- Polling page (/polling)
- Separate URLs for each page
- Better SEO and user experience
```

---

## 🗺️ Routes Available

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home.vue` | Main landing page with hero, about, menu, testimonials, contact |
| `/feedback` | `FeedbackPage.vue` | Dedicated feedback form page |
| `/polling` | `PollingPage.vue` | Dedicated polling/voting page |
| `*` (404) | Redirect to `/` | Any undefined route redirects to home |

---

## 📁 File Structure

```
src/
├── views/
│   ├── Home.vue              ✅ Home page with all main sections
│   ├── FeedbackPage.vue      ✅ Dedicated feedback page
│   └── PollingPage.vue       ✅ Dedicated polling page
├── router/
│   └── index.js              ✅ Router configuration
├── components/
│   ├── HeaderComponent.vue   ✅ Updated with router-link
│   ├── FeedbackForm.vue      ✅ Reusable feedback form
│   ├── PollingCard.vue       ✅ Reusable polling card
│   ├── HeroSection.vue
│   ├── AboutSection.vue
│   ├── MenuSection.vue
│   ├── TestimonialSection.vue
│   ├── ContactSection.vue
│   └── FooterComponent.vue
├── App.vue                   ✅ Updated with <router-view>
└── main.js                   ✅ Router registered
```

---

## 🧭 Navigation

### Header Navigation

**Desktop Menu:**
- Home → `/`
- Menu → `/#menu` (scroll to section)
- Feedback → `/feedback`
- Polling → `/polling`
- Contact → `/#contact` (scroll to section)

**Mobile Menu:**
- Hamburger icon (responsive)
- Same links as desktop
- Auto-close on route change

**Logo:**
- Click logo to return to home (`/`)

### Call-to-Action Buttons

**Home Page:**
- "Give Feedback" button → `/feedback`
- "Vote Now" button → `/polling`

**Feedback Page:**
- "Back to Home" → `/`
- "Vote for Next Event" → `/polling`

**Polling Page:**
- "Back to Home" → `/`
- "Give Feedback" → `/feedback`

---

## ⚙️ How It Works

### 1. Router Configuration (`src/router/index.js`)

```javascript
import { createRouter, createWebHistory } from 'vue-router';

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
            title: 'Feedback - Kedai Sepijak'
        }
    },
    {
        path: '/polling',
        name: 'Polling',
        component: PollingPage,
        meta: {
            title: 'Polling Event - Kedai Sepijak'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else if (to.hash) {
            return { el: to.hash, behavior: 'smooth' };
        } else {
            return { top: 0, behavior: 'smooth' };
        }
    }
});
```

**Features:**
- ✅ HTML5 History Mode (clean URLs without #)
- ✅ Scroll behavior (scroll to top on route change)
- ✅ Hash support for anchor links (#menu, #contact)
- ✅ Page title updates automatically
- ✅ Meta description updates

---

### 2. App.vue with Router View

```vue
<template>
    <div class="relative flex min-h-screen w-full flex-col">
        <HeaderComponent />
        <main class="flex-grow">
            <router-view />  <!-- Routes render here -->
        </main>
        <FooterComponent />
    </div>
</template>
```

**Components:**
- `HeaderComponent` - Always visible (sticky header)
- `<router-view>` - Dynamic content based on route
- `FooterComponent` - Always visible

---

### 3. Navigation with router-link

```vue
<!-- Declarative Navigation -->
<router-link to="/">Home</router-link>
<router-link to="/feedback">Feedback</router-link>
<router-link to="/polling">Polling</router-link>

<!-- Active Class -->
<router-link 
    to="/feedback"
    :class="{ 'text-accent-amber': $route.path === '/feedback' }"
>
    Feedback
</router-link>

<!-- Programmatic Navigation -->
<script>
export default {
    methods: {
        goToFeedback() {
            this.$router.push('/feedback');
        }
    }
}
</script>
```

---

## 🧪 Testing Routes

### Manual Testing

**1. Navigate to Home**
```
http://localhost:5173/
```
Expected: See hero, about, menu sections

**2. Navigate to Feedback**
```
http://localhost:5173/feedback
```
Expected: See feedback form page

**3. Navigate to Polling**
```
http://localhost:5173/polling
```
Expected: See polling page

**4. Test 404**
```
http://localhost:5173/random-page
```
Expected: Redirect to home (/)

**5. Test Hash Navigation**
```
http://localhost:5173/#menu
```
Expected: Scroll to menu section

### Navigation Testing

1. Click logo → Should go to home
2. Click "Feedback" in header → Should go to /feedback
3. Click "Polling" in header → Should go to /polling
4. Click "Back to Home" → Should go to home
5. Click browser back button → Should work correctly

---

## 🎨 Page Structure

### Home Page (`/`)

**Sections:**
1. Hero Section - Welcome banner
2. About Section - About the cafe
3. Menu Section - Menu items
4. CTA Section - Feedback & Polling cards (NEW!)
5. Testimonial Section - Customer reviews
6. Contact Section - Location & contact info

**Features:**
- Call-to-action cards for Feedback & Polling
- Glassmorphism design
- Smooth animations
- Responsive layout

---

### Feedback Page (`/feedback`)

**Sections:**
1. Sticky Header with Back Button
2. Hero Banner - Large page title
3. Info Cards - Quick information (2 min, anonymous, direct to management)
4. Feedback Form Component
5. "What Happens Next" Section
6. Statistics Cards
7. Link to Polling Page

**Features:**
- Dedicated page for better focus
- Clear instructions
- Stats display (1000+ feedback, 4.8 rating, etc.)
- Professional layout

---

### Polling Page (`/polling`)

**Sections:**
1. Sticky Header with Back Button
2. Hero Banner - Large page title
3. Info Cards - Quick information (one vote, real-time, winner announced)
4. Polling Card Component
5. "How It Works" - Step by step guide
6. Voting Rules - Clear guidelines
7. Previous Events Section
8. Link to Feedback Page

**Features:**
- Dedicated page for better engagement
- Clear voting process
- Rules and guidelines
- Previous events showcase

---

## 📱 Responsive Design

### Desktop (1024px+)
- Full header with all links
- Two-column layouts
- Large buttons and text

### Tablet (768px - 1023px)
- Adjusted spacing
- Some single-column layouts
- Medium-sized elements

### Mobile (<768px)
- Hamburger menu
- Single-column layout
- Stacked elements
- Full-width buttons

---

## ➕ Adding New Routes

### Step 1: Create View Component

**File:** `src/views/NewPage.vue`
```vue
<template>
    <div class="min-h-screen bg-background-beige">
        <!-- Sticky Header with Back Button -->
        <div class="sticky top-0 z-50 bg-primary-green/95 backdrop-blur-lg shadow-xl">
            <div class="container mx-auto px-6 py-4">
                <router-link to="/" class="text-background-beige">
                    <span class="material-symbols-outlined">arrow_back</span>
                    Back to Home
                </router-link>
            </div>
        </div>

        <!-- Your content here -->
        <section class="py-20">
            <div class="container mx-auto px-6">
                <h1>New Page Content</h1>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'NewPage',
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
```

### Step 2: Add Route

**File:** `src/router/index.js`
```javascript
import NewPage from '../views/NewPage.vue';

const routes = [
    // ... existing routes
    {
        path: '/new-page',
        name: 'NewPage',
        component: NewPage,
        meta: {
            title: 'New Page - Kedai Sepijak',
            description: 'Description of new page'
        }
    }
];
```

### Step 3: Add Navigation Link

**File:** `src/components/HeaderComponent.vue`
```vue
<router-link 
    to="/new-page"
    class="text-sm font-medium text-secondary-sage hover:text-background-beige transition-colors"
>
    New Page
</router-link>
```

---

## 🔧 Advanced Features

### Route Guards

**Example: Protected Route**
```javascript
{
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true }
}

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else {
        next();
    }
});
```

### Lazy Loading

**Optimize performance with code splitting:**
```javascript
const routes = [
    {
        path: '/feedback',
        name: 'Feedback',
        component: () => import('../views/FeedbackPage.vue')
    }
];
```

### Route Parameters

**Dynamic routes:**
```javascript
{
    path: '/menu/:id',
    name: 'MenuItem',
    component: MenuItemDetail,
    props: true
}

// Access in component
this.$route.params.id
```

### Query Parameters

**Pass query params:**
```javascript
// Navigate with query
this.$router.push({ path: '/feedback', query: { waiter: 'budi' } });

// Access in component
this.$route.query.waiter
```

---

## 🐛 Troubleshooting

### Issue 1: 404 on Refresh

**Problem:** Page refreshes show 404 error

**Solution:** Configure server for SPA
```nginx
# Nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

```apache
# Apache (.htaccess)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### Issue 2: Scroll Position Not Reset

**Problem:** New page starts at scroll position of previous page

**Solution:** Already implemented in `scrollBehavior`
```javascript
scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' };
}
```

### Issue 3: Active Link Not Highlighting

**Problem:** Current route not highlighted in navigation

**Solution:** Use conditional class binding
```vue
<router-link 
    to="/feedback"
    :class="{ 'text-accent-amber': $route.path === '/feedback' }"
>
    Feedback
</router-link>
```

---

## 📊 URL Structure

| Page | URL | Full URL |
|------|-----|----------|
| Home | `/` | `http://localhost:5173/` |
| Feedback | `/feedback` | `http://localhost:5173/feedback` |
| Polling | `/polling` | `http://localhost:5173/polling` |
| Menu Section | `/#menu` | `http://localhost:5173/#menu` |
| Contact Section | `/#contact` | `http://localhost:5173/#contact` |

---

## ✅ Summary

**What Was Done:**

✅ Installed Vue Router 4
✅ Created router configuration
✅ Created 3 views: Home, FeedbackPage, PollingPage
✅ Updated App.vue with router-view
✅ Updated HeaderComponent with router-link
✅ Added mobile menu with hamburger icon
✅ Implemented scroll behavior
✅ Added page title updates
✅ Added active link highlighting
✅ Added back buttons on subpages
✅ Created CTA section on home page
✅ Fully responsive navigation

**Benefits:**

✅ Better user experience - focused pages
✅ Better SEO - separate URLs for content
✅ Shareable links - direct links to feedback/polling
✅ Cleaner code - separated concerns
✅ Better navigation - clear page structure
✅ Mobile friendly - responsive menu

---

## 🎉 Result

**Feedback dan Polling sekarang halaman terpisah!**

- `/` - Home page
- `/feedback` - Feedback page with form
- `/polling` - Polling page with voting

**Navigation works perfectly!**
- Header links updated
- Mobile menu included
- Back buttons added
- Active states working
- Smooth scrolling enabled

---

**Version**: 1.4.0  
**Last Updated**: November 1, 2024  
**Status**: ✅ Production Ready

**Vue Router Implementation Complete! 🎉🔀**