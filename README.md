# Kedai Sepijak - Website Kedai Kopi Tradisional

Website modern untuk Kedai Sepijak, kedai kopi tradisional di Purwokerto dengan cita rasa autentik.

## 🆕 Latest Updates (v1.2.0)

### 🎬 NEW: Slide Animations!
- **Smooth Scroll Animations** - AOS library integrated throughout all sections
- **Professional Effects** - fade, slide, zoom animations on scroll
- **Optimized Performance** - Only +8.3 kB impact (gzipped)
- **All Sections Animated** - Hero, About, Menu, Feedback, Testimonials, Contact

[See animation guide →](./ANIMATIONS.md) | [Full changelog →](./CHANGELOG.md)

### Previous Updates (v1.1.0)
- ✅ **Navbar Double** - Fixed duplicate navbar issue in HeroSection
- ✅ **Hero Section** - Complete redesign dengan welcome content dan feature cards
- ✅ **Feedback Form** - Added waiter/pelayan selection dropdown
- ✅ **Polling System** - Added customer data validation before voting

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### Installation

1. **Clone atau buka project ini**

2. **Install dependencies**
```bash
npm install
```

3. **Jalankan development server**
```bash
npm run dev
```

4. **Buka browser**
```
http://localhost:5173
```

## 📦 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.4
- **CSS Processing**: PostCSS + Autoprefixer
- **Fonts**: 
  - Playfair Display (Headings)
  - Nunito Sans (Body text)
- **Icons**: Material Symbols Outlined

## 🎨 Design System

### Brand Colors
```css
Primary Green:    #1E4D3B  /* Main brand color */
Secondary Sage:   #C6D3C1  /* Light accent */
Background Beige: #F8F5F0  /* Main background */
Accent Amber:     #E5A65A  /* Highlights & CTAs */
Text Charcoal:    #2B2B2B  /* Main text */
```

### Typography
- **Display Font**: Playfair Display (serif) - untuk headings
- **Body Font**: Nunito Sans (sans-serif) - untuk paragraphs

### Border Radius
- Default: 1rem
- Large: 1.25rem
- Extra Large: 1.5rem
- Full: 9999px (circles)

## 📁 Project Structure

```
Kedai_Sepijak/
├── src/
│   ├── assets/
│   │   ├── styles.css         # Tailwind imports + custom styles
│   │   └── vue.svg            # Assets
│   ├── components/
│   │   ├── HeaderComponent.vue
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── MenuSection.vue
│   │   ├── FeedbackSection.vue
│   │   ├── TestimonialSection.vue
│   │   ├── ContactSection.vue
│   │   └── FooterComponent.vue
│   ├── App.vue                # Root component
│   └── main.js                # Entry point
├── public/                    # Static assets
├── index.html                 # HTML template
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev
```
Menjalankan development server dengan hot-reload di `http://localhost:5173`

### Build
```bash
npm run build
```
Build production-ready files ke folder `dist/`

### Preview
```bash
npm run preview
```
Preview hasil build production secara lokal

## 🎯 Features

### Core Features
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Custom Components** - Rating stars, progress bars, input fields
- ✅ **Smooth Animations** - CSS animations untuk UX yang lebih baik
- ✅ **SEO Friendly** - Semantic HTML structure
- ✅ **Fast Performance** - Optimized dengan Vite
- ✅ **Custom Styling** - Tailwind CSS dengan custom theme

### New in v1.2.0
- ✅ **Slide Animations** - Smooth scroll animations di semua sections
- ✅ **AOS Library** - Animate On Scroll untuk professional effects
- ✅ **Smooth Scrolling** - Navigation yang smooth antar sections
- ✅ **Performance Optimized** - Minimal impact, 60fps animations

### New in v1.1.0
- ✅ **Hero Section** - Welcome page dengan CTAs dan feature highlights
- ✅ **Waiter Selection** - Dropdown untuk pilih pelayan di feedback form
- ✅ **Voter Validation** - Customer data collection sebelum polling
- ✅ **Anti-Spam Protection** - Two-step validation untuk votes

## 📖 Documentation

- **[ANIMATIONS.md](./ANIMATIONS.md)** - Complete animation guide (NEW!)
- **[ANIMATION_SUMMARY.md](./ANIMATION_SUMMARY.md)** - Quick animation summary (NEW!)
- **[TAILWIND_SETUP.md](./TAILWIND_SETUP.md)** - Complete Tailwind CSS setup guide
- **[TAILWIND_REFERENCE.md](./TAILWIND_REFERENCE.md)** - Quick reference untuk custom utilities
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history dan updates
- **[FEATURES.md](./FEATURES.md)** - Detailed feature documentation

## 🎬 Animation Examples

### Adding Animations to Elements
```html
<!-- Basic fade up animation -->
<div data-aos="fade-up">Content appears with fade up effect</div>

<!-- Slide from left -->
<div data-aos="fade-right" data-aos-delay="200">
  Slides in from left with 200ms delay
</div>

<!-- Zoom in effect -->
<div data-aos="zoom-in" data-aos-delay="300">
  Zooms in from small to normal size
</div>

<!-- Dynamic delay in loop -->
<div 
  v-for="(item, index) in items"
  data-aos="fade-up"
  :data-aos-delay="100 + index * 100"
>
  Each item animates with staggered delay
</div>
```

### Available Animation Types
- **Fade**: `fade-up`, `fade-down`, `fade-left`, `fade-right`
- **Zoom**: `zoom-in`, `zoom-out`
- **Slide**: `slide-up`, `slide-down`, `slide-left`, `slide-right`

[See complete animation guide →](./ANIMATIONS.md)

## 🎨 Tailwind Usage Examples

### Custom Colors
```html
<div class="bg-primary-green text-background-beige">
  <h1 class="text-accent-amber">Kedai Sepijak</h1>
</div>
```

### Custom Fonts
```html
<h1 class="font-display text-4xl">Heading</h1>
<p class="font-body">Body text</p>
```

### Rating Stars
```html
<div class="rating-stars">
  <input type="radio" id="star5" value="5">
  <label for="star5">★</label>
  <!-- ... -->
</div>
```

### Material Icons
```html
<span class="material-symbols-outlined">local_cafe</span>
<span class="material-symbols-outlined text-accent-amber">star</span>
```

## 🔧 Configuration Files

### Tailwind Config (`tailwind.config.js`)
Berisi custom colors, fonts, dan spacing yang disesuaikan dengan brand Kedai Sepijak.

### PostCSS Config (`postcss.config.js`)
Menggunakan Tailwind CSS dan Autoprefixer untuk compatibility.

### Vite Config (`vite.config.js`)
Basic Vite setup dengan Vue 3 plugin.

## 🐛 Troubleshooting

### Tailwind classes tidak bekerja?
1. Pastikan dev server sudah restart: `npm run dev`
2. Clear cache: hapus folder `node_modules/.vite`
3. Reinstall: `rm -rf node_modules && npm install`

### Build error?
1. Check Node.js version: `node --version` (minimal v16)
2. Clear dan reinstall: `npm ci`
3. Check untuk syntax errors di file .vue

### Custom colors tidak muncul?
1. Pastikan menggunakan nama yang benar dari `tailwind.config.js`
2. Format: `text-primary-green` (kebab-case, bukan camelCase)
3. Restart dev server setelah mengubah config

## 📝 Development Guidelines

1. **Component Structure**: Satu component per file di `src/components/`
2. **Styling**: Gunakan Tailwind utilities, custom CSS hanya jika perlu
3. **Naming**: Gunakan PascalCase untuk component files
4. **Colors**: Selalu gunakan custom colors dari theme
5. **Fonts**: Gunakan `font-display` untuk headings, `font-body` untuk text

## 🚀 Deployment

### Build untuk production
```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/` dan siap di-deploy ke:
- Netlify
- Vercel
- GitHub Pages
- atau hosting lainnya

### Deploy ke Netlify (recommended)
1. Push code ke GitHub
2. Connect repository di Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy ke Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

## 🎯 Feature Highlights

### Feedback Form
- Customer information collection
- **Waiter selection dropdown** (NEW!)
- 5-star rating system with animations
- Detailed feedback textarea
- Form validation and success confirmation

### Polling System
- **Two-step validation process** (NEW!)
  - Step 1: Customer data collection (name, phone, email)
  - Step 2: Vote casting with results display
- Anti-spam protection
- Real-time progress bars
- Vote confirmation with customer name
- Reset functionality for testing

### Hero Section (Redesigned!)
- Welcome message and tagline
- Call-to-action buttons
- Feature cards highlighting key values
- Responsive layout with decorative elements

## 📄 License

Copyright © 2024 Kedai Sepijak. All rights reserved.

## 🤝 Contributing

Ini adalah project private untuk Kedai Sepijak. Untuk kontribusi atau pertanyaan, silakan hubungi tim development.

## 📞 Contact

- **Website**: [Coming Soon]
- **Location**: Purwokerto, Indonesia

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Recent Changes

**v1.2.0** (Latest)
- ✨ Added smooth slide animations to all sections
- 🎬 Integrated AOS (Animate On Scroll) library
- 📚 Complete animation documentation
- 🚀 Optimized performance with minimal impact

**v1.1.0**
- Fixed navbar duplication issue
- Added waiter selection in feedback form
- Implemented customer validation for polling
- Redesigned hero section with CTAs

**v1.0.0**
- Initial release with Tailwind CSS setup
- Basic components and sections
- Rating and polling features

---

**Built with ❤️ using Vue 3 + Vite + Tailwind CSS**