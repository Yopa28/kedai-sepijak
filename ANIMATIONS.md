# 🎬 Animation Guide - Kedai Sepijak

Dokumentasi lengkap untuk animasi dan efek slide yang digunakan di website Kedai Sepijak.

---

## 📦 Library Used

**AOS (Animate On Scroll)**
- Version: Latest
- Documentation: https://michalsnik.github.io/aos/
- Repository: https://github.com/michalsnik/aos

### Installation
```bash
npm install aos
```

---

## ⚙️ Configuration

### Global Setup (`src/main.js`)

```javascript
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 800,              // Animation duration (ms)
  easing: "ease-in-out",      // Easing function
  once: true,                 // Animation happens only once
  offset: 100,                // Offset from trigger point (px)
  delay: 0,                   // Global delay (ms)
  anchorPlacement: "top-bottom", // Trigger point
});
```

### Smooth Scroll (`src/assets/styles.css`)

```css
html {
  scroll-behavior: smooth;
}
```

---

## 🎨 Animation Types Used

### 1. **Fade Animations**

#### fade-up
- Element fades in while moving up
- Used for: Headings, text content, buttons

```html
<div data-aos="fade-up">Content</div>
```

#### fade-down
- Element fades in while moving down
- Used for: Dropdowns, notifications

```html
<div data-aos="fade-down">Content</div>
```

#### fade-left
- Element fades in while moving from right to left
- Used for: Right-side content, images

```html
<div data-aos="fade-left">Content</div>
```

#### fade-right
- Element fades in while moving from left to right
- Used for: Left-side content, text blocks

```html
<div data-aos="fade-right">Content</div>
```

---

### 2. **Zoom Animations**

#### zoom-in
- Element scales from small to normal size
- Used for: Icons, logos, featured content

```html
<div data-aos="zoom-in">Content</div>
```

#### zoom-out
- Element scales from large to normal size
- Used for: Modal overlays, special effects

```html
<div data-aos="zoom-out">Content</div>
```

---

### 3. **Slide Animations**

#### slide-up
- Element slides in from bottom
- Used for: Cards, panels

```html
<div data-aos="slide-up">Content</div>
```

#### slide-left / slide-right
- Element slides from left or right edge
- Used for: Side panels, navigation

```html
<div data-aos="slide-left">Content</div>
<div data-aos="slide-right">Content</div>
```

---

## 📍 Implementation by Section

### 🏠 Hero Section

#### Left Content
```html
<div data-aos="fade-right">
  <div data-aos="zoom-in" data-aos-delay="200">
    <span class="material-symbols-outlined">local_cafe</span>
  </div>
  <h1 data-aos="fade-up" data-aos-delay="300">Kedai Sepijak</h1>
  <p data-aos="fade-up" data-aos-delay="400">Tagline</p>
  <p data-aos="fade-up" data-aos-delay="500">Description</p>
  <div data-aos="fade-up" data-aos-delay="600">CTA Buttons</div>
</div>
```

#### Right Content
```html
<div data-aos="fade-left" data-aos-delay="400">
  Image/Illustration
</div>
```

#### Feature Cards
```html
<div data-aos="fade-up" data-aos-delay="100">Card 1</div>
<div data-aos="fade-up" data-aos-delay="200">Card 2</div>
<div data-aos="fade-up" data-aos-delay="300">Card 3</div>
```

---

### 📖 About Section

```html
<!-- Left: Text Content -->
<div data-aos="fade-right">
  <h1 data-aos="fade-up" data-aos-delay="100">Title</h1>
  <p data-aos="fade-up" data-aos-delay="200">Description</p>
</div>

<!-- Right: Image -->
<div data-aos="fade-left" data-aos-delay="300">
  <img data-aos="zoom-in" data-aos-delay="400" />
  <div data-aos="fade-up" data-aos-delay="500">Decorative box</div>
</div>
```

---

### 🍽️ Menu Section

```html
<!-- Section Header -->
<div data-aos="fade-up">
  <h2 data-aos="fade-up" data-aos-delay="100">Menu Kami</h2>
  <p data-aos="fade-up" data-aos-delay="200">Subtitle</p>
</div>

<!-- Category Filters -->
<div data-aos="fade-up" data-aos-delay="300">
  Category buttons
</div>

<!-- Menu Cards -->
<MenuCard 
  v-for="(item, index) in items"
  data-aos="zoom-in"
  :data-aos-delay="100 + index * 100"
/>

<!-- See All Button -->
<button data-aos="fade-up" data-aos-delay="400">See All</button>
```

---

### 📝 Feedback Section

```html
<!-- Section Header -->
<div data-aos="fade-up">
  <h2 data-aos="fade-up" data-aos-delay="100">Feedback & Polling</h2>
  <p data-aos="fade-up" data-aos-delay="200">Description</p>
</div>

<!-- Two Column Grid -->
<div data-aos="fade-right" data-aos-delay="300">
  <FeedbackForm />
</div>

<div data-aos="fade-left" data-aos-delay="400">
  <PollingCard />
</div>
```

---

### 💬 Testimonial Section

```html
<!-- Section Header -->
<div data-aos="fade-up">
  <h2>Apa Kata Mereka</h2>
  <p>Testimoni dari pelanggan setia</p>
</div>

<!-- Testimonial Cards -->
<TestimonialCard
  v-for="(item, index) in testimonials"
  data-aos="fade-up"
  :data-aos-delay="100 + index * 100"
/>

<!-- Quote -->
<p data-aos="zoom-in" data-aos-delay="400">Quote text</p>
```

---

### 📍 Contact Section

```html
<!-- Section Header -->
<div data-aos="fade-up">
  <h2 data-aos="fade-up" data-aos-delay="100">Kunjungi Kami</h2>
  <p data-aos="fade-up" data-aos-delay="200">Description</p>
</div>

<!-- Contact Card -->
<div data-aos="zoom-in" data-aos-delay="300">
  <!-- Left: Contact Info -->
  <div data-aos="fade-right" data-aos-delay="400">
    <h3>Temukan Kami</h3>
    <p data-aos="fade-up" data-aos-delay="500">Address</p>
    <p data-aos="fade-up" data-aos-delay="600">Hours</p>
    <p data-aos="fade-up" data-aos-delay="700">Phone</p>
  </div>
  
  <!-- Right: Map -->
  <div data-aos="fade-left" data-aos-delay="500">
    <iframe>Google Maps</iframe>
  </div>
</div>
```

---

## ⏱️ Delay Patterns

### Standard Pattern
- **0ms**: Container/wrapper
- **100ms**: First child
- **200ms**: Second child
- **300ms**: Third child
- And so on...

### Staggered Pattern (Lists)
```javascript
// For menu items, testimonials, etc.
:data-aos-delay="100 + index * 100"
```

### Example
```html
<!-- Item 1: 100ms -->
<!-- Item 2: 200ms -->
<!-- Item 3: 300ms -->
<!-- Item 4: 400ms -->
```

---

## 🎯 Best Practices

### 1. **Direction Guidelines**
- **Left content**: Use `fade-right` (slides in from left)
- **Right content**: Use `fade-left` (slides in from right)
- **Headers**: Use `fade-up`
- **Icons/Logos**: Use `zoom-in`

### 2. **Delay Guidelines**
- Parent container: 0ms or no delay
- First child: 100-200ms
- Subsequent children: +100ms each
- Maximum delay: 800ms (keep it snappy)

### 3. **Performance Tips**
- Use `once: true` to prevent re-animation on scroll up
- Limit animations to visible viewport
- Don't animate too many elements simultaneously
- Keep duration under 1000ms

### 4. **Accessibility**
- Ensure animations don't cause motion sickness
- Respect `prefers-reduced-motion` (handled by AOS)
- Keep content readable during animation

---

## 🔧 Advanced Customization

### Custom Duration
```html
<div data-aos="fade-up" data-aos-duration="1000">
  Slower animation (1s)
</div>
```

### Custom Easing
```html
<div data-aos="fade-up" data-aos-easing="ease-in-out-cubic">
  Custom easing
</div>
```

### Custom Offset
```html
<div data-aos="fade-up" data-aos-offset="200">
  Triggers 200px before reaching viewport
</div>
```

### Anchor Element
```html
<div data-aos="fade-up" data-aos-anchor="#trigger-element">
  Animation based on another element
</div>
```

### Disable on Mobile
```html
<div 
  data-aos="fade-up" 
  data-aos-anchor-placement="top-bottom"
  data-aos-once="true"
>
  Content
</div>
```

---

## 🎨 Animation Combinations

### Hero Text
```html
<div data-aos="fade-right">
  <div data-aos="zoom-in" data-aos-delay="200">Icon</div>
  <h1 data-aos="fade-up" data-aos-delay="300">Heading</h1>
  <p data-aos="fade-up" data-aos-delay="400">Subheading</p>
</div>
```

### Card Grid
```html
<div class="grid">
  <div 
    v-for="(item, i) in items"
    data-aos="zoom-in"
    :data-aos-delay="100 + i * 100"
  >
    Card content
  </div>
</div>
```

### Split Content
```html
<div class="grid lg:grid-cols-2">
  <div data-aos="fade-right" data-aos-delay="200">
    Left content
  </div>
  <div data-aos="fade-left" data-aos-delay="300">
    Right content
  </div>
</div>
```

---

## 📱 Responsive Behavior

AOS automatically handles responsive behavior, but you can customize:

```javascript
AOS.init({
  // Disable on mobile
  disable: 'mobile',
  
  // Or use media query
  disable: window.innerWidth < 768,
  
  // Or use function
  disable: function() {
    return /Mobile|Android/.test(navigator.userAgent);
  }
});
```

---

## 🐛 Troubleshooting

### Animations Not Working?

1. **Check AOS is initialized**
```javascript
// In main.js
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
```

2. **Check data attributes**
```html
<!-- Correct -->
<div data-aos="fade-up">Content</div>

<!-- Wrong -->
<div aos="fade-up">Content</div>
<div data-aos-animation="fade-up">Content</div>
```

3. **Refresh AOS after dynamic content**
```javascript
// After adding new elements
AOS.refresh();
```

4. **Check element visibility**
- Element must be in viewport to trigger
- Check `offset` value
- Verify element is not `display: none`

---

## 📊 Performance Metrics

### Current Build Stats
```
dist/assets/index-LrtmIQgE.css   50.66 kB │ gzip:  7.42 kB
dist/assets/index-B1od_i9K.js   115.74 kB │ gzip: 42.15 kB
```

- AOS CSS: ~12 kB (included in bundle)
- AOS JS: ~18 kB (included in bundle)
- Impact: Minimal, optimized for production

---

## 🎓 Learning Resources

### Official Docs
- AOS Documentation: https://michalsnik.github.io/aos/
- Examples: https://github.com/michalsnik/aos#examples
- API Reference: https://github.com/michalsnik/aos#api

### Alternative Libraries
- **GSAP**: More powerful but heavier
- **Framer Motion**: React-specific
- **Intersection Observer API**: Native browser API
- **Vue Transition**: Built-in Vue animations

---

## 💡 Tips & Tricks

### 1. Combine with Tailwind
```html
<div 
  data-aos="fade-up"
  class="transition-all duration-300 hover:scale-105"
>
  AOS for scroll, Tailwind for hover
</div>
```

### 2. Sequential Animations
```html
<div data-aos="fade-right">
  <div data-aos="fade-up" data-aos-delay="100">First</div>
  <div data-aos="fade-up" data-aos-delay="200">Second</div>
  <div data-aos="fade-up" data-aos-delay="300">Third</div>
</div>
```

### 3. Entrance Effects
```html
<!-- Page load: immediate -->
<div data-aos="zoom-in" data-aos-delay="0">Logo</div>

<!-- Scroll: delayed -->
<div data-aos="fade-up" data-aos-offset="100">Content</div>
```

---

## 📋 Quick Reference

| Animation | Direction | Use Case |
|-----------|-----------|----------|
| `fade-up` | Bottom → Top | Headings, text |
| `fade-down` | Top → Bottom | Dropdowns |
| `fade-left` | Right → Left | Right content |
| `fade-right` | Left → Right | Left content |
| `zoom-in` | Small → Normal | Icons, images |
| `zoom-out` | Large → Normal | Modals |
| `slide-up` | Below → Position | Cards |
| `slide-left` | Right → Position | Panels |
| `slide-right` | Left → Position | Panels |

---

## 🚀 Future Enhancements

- [ ] Add parallax effects
- [ ] Implement scroll-triggered animations
- [ ] Add page transition animations
- [ ] Create custom animation presets
- [ ] Add loading animations
- [ ] Implement skeleton screens

---

**Created**: November 1, 2024  
**Version**: 1.2.0  
**Status**: ✅ Active & Optimized

**Slide animations are now LIVE! 🎉**