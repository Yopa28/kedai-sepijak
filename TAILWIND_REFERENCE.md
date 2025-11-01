# Tailwind CSS Quick Reference - Kedai Sepijak

## 🎨 Custom Colors

| Class | Hex Code | Usage |
|-------|----------|-------|
| `bg-primary-green` / `text-primary-green` / `border-primary-green` | #1E4D3B | Primary brand color - dark green |
| `bg-secondary-sage` / `text-secondary-sage` / `border-secondary-sage` | #C6D3C1 | Secondary color - light sage |
| `bg-background-beige` / `text-background-beige` / `border-background-beige` | #F8F5F0 | Main background color |
| `bg-accent-amber` / `text-accent-amber` / `border-accent-amber` | #E5A65A | Accent/highlight color - amber |
| `bg-text-charcoal` / `text-text-charcoal` / `border-text-charcoal` | #2B2B2B | Main text color - dark charcoal |

### Examples:
```html
<!-- Background -->
<div class="bg-primary-green">Dark green background</div>

<!-- Text -->
<p class="text-accent-amber">Amber colored text</p>

<!-- Border -->
<button class="border-2 border-secondary-sage">Button with sage border</button>

<!-- Hover states -->
<button class="bg-primary-green hover:bg-accent-amber">Hover effect</button>
```

## 🔤 Custom Fonts

| Class | Font Family | Weight Options |
|-------|-------------|----------------|
| `font-display` | Playfair Display (serif) | 700, 800, 900, 700 italic |
| `font-body` | Nunito Sans (sans-serif) | 400, 600, 700 |

### Examples:
```html
<h1 class="font-display text-4xl font-bold">Main Heading</h1>
<p class="font-body text-base">Body paragraph text</p>
```

## 📐 Custom Border Radius

| Class | Value | Description |
|-------|-------|-------------|
| `rounded` | 1rem | Default rounded |
| `rounded-lg` | 1.25rem | Large rounded |
| `rounded-xl` | 1.5rem | Extra large rounded |
| `rounded-full` | 9999px | Fully rounded (circles) |

### Examples:
```html
<div class="rounded bg-primary-green p-4">Default rounded card</div>
<img class="rounded-full w-20 h-20" src="..." alt="Profile">
<button class="rounded-xl px-6 py-3">Rounded button</button>
```

## ⭐ Rating Stars Component

Custom rating component with interactive stars.

```html
<div class="rating-stars">
  <input type="radio" id="star5" name="rating" value="5">
  <label for="star5">★</label>
  
  <input type="radio" id="star4" name="rating" value="4">
  <label for="star4">★</label>
  
  <input type="radio" id="star3" name="rating" value="3">
  <label for="star3">★</label>
  
  <input type="radio" id="star2" name="rating" value="2">
  <label for="star2">★</label>
  
  <input type="radio" id="star1" name="rating" value="1">
  <label for="star1">★</label>
</div>
```

**Features:**
- Hidden radio inputs
- Large stars (2.5rem)
- Hover effects with amber color
- Selected state with glow animation
- Scale transform on checked star

## 📝 Input Field Component

Custom input with focus styles.

```html
<div class="input-field">
  <input 
    type="text" 
    class="w-full px-4 py-2 border border-secondary-sage rounded"
    placeholder="Your name"
  >
</div>

<div class="input-field">
  <textarea 
    class="w-full px-4 py-2 border border-secondary-sage rounded"
    placeholder="Your message"
    rows="4"
  ></textarea>
</div>
```

**Focus Effect:** Green shadow on focus (rgba(30, 77, 59, 0.25))

## 📊 Progress Bar

Animated progress bar with custom animation.

```html
<div class="w-full bg-secondary-sage rounded-full h-4 overflow-hidden">
  <div class="progress-bar-fill bg-accent-amber h-full rounded-full" style="width: 75%"></div>
</div>
```

**Animation:** Smooth fill from 0% to set width over 1.5s

## 🎭 Material Icons

Material Symbols Outlined icons integration.

```html
<span class="material-symbols-outlined">star</span>
<span class="material-symbols-outlined">local_cafe</span>
<span class="material-symbols-outlined">restaurant</span>
<span class="material-symbols-outlined">favorite</span>
```

**Default Size:** 24px (can be overridden with Tailwind)

```html
<span class="material-symbols-outlined text-4xl">star</span>
<span class="material-symbols-outlined text-accent-amber">favorite</span>
```

## ✨ Custom Animations

### Glowing Star
Applied automatically to checked rating stars.
```css
/* Pulses with amber glow */
animation: glowing-star 1.5s ease-in-out infinite;
```

### Fill Progress
Applied to `.progress-bar-fill` elements.
```css
/* Animates width from 0% to set value */
animation: fill-progress 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
```

## 🎯 Common Component Patterns

### Card
```html
<div class="bg-white rounded-lg shadow-lg p-6">
  <h3 class="font-display text-2xl text-primary-green mb-4">Card Title</h3>
  <p class="font-body text-text-charcoal">Card content goes here...</p>
</div>
```

### Button Primary
```html
<button class="bg-primary-green text-background-beige font-body font-semibold px-6 py-3 rounded-lg hover:bg-accent-amber transition-colors duration-300">
  Click Me
</button>
```

### Button Secondary
```html
<button class="bg-secondary-sage text-primary-green font-body font-semibold px-6 py-3 rounded-lg hover:bg-accent-amber hover:text-white transition-colors duration-300">
  Secondary Action
</button>
```

### Section Container
```html
<section class="py-16 px-4 bg-background-beige">
  <div class="max-w-6xl mx-auto">
    <h2 class="font-display text-4xl text-primary-green text-center mb-12">
      Section Title
    </h2>
    <!-- Content -->
  </div>
</section>
```

### Hero Text
```html
<div class="text-center">
  <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-green mb-4">
    Kedai Sepijak
  </h1>
  <p class="font-body text-lg md:text-xl text-text-charcoal max-w-2xl mx-auto">
    Kopi tradisional dengan cita rasa autentik
  </p>
</div>
```

## 🎨 Color Combinations

### High Contrast
```html
<div class="bg-primary-green text-background-beige">
  High contrast, easy to read
</div>
```

### Soft & Elegant
```html
<div class="bg-background-beige text-text-charcoal">
  Soft, elegant look
</div>
```

### Accent Highlights
```html
<h2 class="text-primary-green">
  Regular text with <span class="text-accent-amber">highlighted word</span>
</h2>
```

## 🔧 Utility Classes Cheat Sheet

### Spacing (using Tailwind defaults)
- `p-4` = padding: 1rem
- `px-6` = padding left/right: 1.5rem
- `py-3` = padding top/bottom: 0.75rem
- `m-4` = margin: 1rem
- `mx-auto` = margin left/right: auto (centering)

### Flexbox
```html
<div class="flex items-center justify-center gap-4">
  <!-- Flex container with centered items and gap -->
</div>
```

### Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive grid layout -->
</div>
```

### Responsive Design
```html
<div class="text-sm md:text-base lg:text-lg">
  <!-- sm: mobile, md: tablet, lg: desktop -->
</div>
```

### Transitions
```html
<button class="transition-all duration-300 ease-in-out hover:scale-105">
  Smooth transitions
</button>
```

---

**Pro Tip:** Combine these utilities to create consistent, beautiful UI components throughout the Kedai Sepijak website!