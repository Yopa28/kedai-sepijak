# Setup Tailwind CSS - Kedai Sepijak

## ✅ Setup Selesai!

Tailwind CSS sudah berhasil dikonfigurasi dengan benar untuk project Kedai Sepijak.

## 📋 Yang Sudah Dilakukan

### 1. **Instalasi Dependencies**
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35"
  }
}
```

### 2. **Konfigurasi Tailwind (`tailwind.config.js`)**
- ✅ Content paths sudah dikonfigurasi untuk scan file `.vue`, `.js`, `.ts`, `.jsx`, `.tsx`
- ✅ Custom colors sesuai brand Kedai Sepijak:
  - `primary-green`: #1E4D3B
  - `secondary-sage`: #C6D3C1
  - `background-beige`: #F8F5F0
  - `accent-amber`: #E5A65A
  - `text-charcoal`: #2B2B2B
- ✅ Custom fonts:
  - `font-display`: Playfair Display (serif)
  - `font-body`: Nunito Sans (sans-serif)
- ✅ Custom border radius

### 3. **PostCSS Configuration (`postcss.config.js`)**
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4. **CSS Setup (`src/assets/styles.css`)**
Struktur CSS menggunakan Tailwind layers:

#### `@layer base`
- Default styling untuk body dan heading
- Font families applied secara global

#### `@layer components`
- Custom component classes (rating-stars, input-field, dll)
- Material Symbols icons styling

#### `@layer utilities`
- Custom animations (glowing-star, fill-progress)

### 5. **Import Order yang Benar (`src/main.js`)**
```js
import { createApp } from "vue";
import "./assets/styles.css";  // Import CSS SEBELUM App.vue
import App from "./App.vue";

createApp(App).mount("#app");
```

## 🎨 Cara Menggunakan

### Custom Colors
```vue
<div class="bg-primary-green text-background-beige">
  <h1 class="text-accent-amber">Kedai Sepijak</h1>
  <p class="text-secondary-sage">Kopi Tradisional</p>
</div>
```

### Custom Fonts
```vue
<h1 class="font-display">Heading dengan Playfair Display</h1>
<p class="font-body">Paragraph dengan Nunito Sans</p>
```

### Custom Border Radius
```vue
<div class="rounded">Default 1rem</div>
<div class="rounded-lg">1.25rem</div>
<div class="rounded-xl">1.5rem</div>
<div class="rounded-full">Full rounded</div>
```

### Custom Components
```vue
<!-- Rating Stars -->
<div class="rating-stars">
  <input type="radio" id="star5" value="5">
  <label for="star5">★</label>
  <!-- ... -->
</div>

<!-- Input dengan Focus State -->
<div class="input-field">
  <input type="text" class="border rounded">
</div>

<!-- Material Icons -->
<span class="material-symbols-outlined">star</span>
```

## 🚀 Menjalankan Project

### Development Mode
```bash
npm run dev
```

### Build untuk Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 🔍 Verifikasi Setup

✅ Tailwind directives (`@tailwind base/components/utilities`) ada di `styles.css`  
✅ PostCSS config menggunakan tailwindcss plugin  
✅ Tailwind config memiliki content paths yang benar  
✅ CSS diimport di `main.js` sebelum App component  
✅ Build berhasil tanpa error  
✅ Custom colors, fonts, dan utilities tersedia  

## 📁 Struktur File

```
Kedai_Sepijak/
├── src/
│   ├── assets/
│   │   └── styles.css          # Tailwind imports + custom styles
│   ├── components/             # Vue components
│   ├── App.vue                 # Root component
│   └── main.js                 # Entry point (import CSS di sini)
├── index.html                  # HTML template
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies

```

## 🎯 Best Practices yang Diterapkan

1. **Organized CSS Layers**: Menggunakan `@layer` untuk organize styles
2. **Import Order**: CSS diimport sebelum components
3. **Custom Properties**: Semua custom values di tailwind.config.js
4. **Component Classes**: Reusable component classes di @layer components
5. **External Fonts**: Google Fonts diimport di CSS file
6. **Semantic Naming**: Color names yang descriptive (primary-green, accent-amber, etc)

## 🐛 Troubleshooting

### Tailwind classes tidak bekerja?
1. Pastikan `npm install` sudah dijalankan
2. Cek bahwa file berada dalam content paths di `tailwind.config.js`
3. Restart dev server (`npm run dev`)

### Build error?
1. Pastikan semua dependencies terinstall: `npm install`
2. Clear node_modules dan reinstall: `rm -rf node_modules && npm install`

### Custom colors tidak muncul?
1. Pastikan menggunakan format yang benar: `text-primary-green` (bukan `text-primaryGreen`)
2. Cek `tailwind.config.js` untuk memastikan colors sudah terdaftar

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind with Vue 3](https://tailwindcss.com/docs/guides/vite#vue)
- [PostCSS Documentation](https://postcss.org/)
- [Vite Documentation](https://vitejs.dev/)

---

**Setup by**: AI Assistant  
**Date**: 2024  
**Status**: ✅ Production Ready