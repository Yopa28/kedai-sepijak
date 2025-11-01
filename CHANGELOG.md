# Changelog - Kedai Sepijak

All notable changes to this project will be documented in this file.

## [1.3.0] - 2024-11-01

### ✨ Added - Hero Section Redesign!

#### Visual Enhancements
- **Background Image**: Full-width background dengan coffee shop interior
- **Multiple Image Gallery**: 3 gambar berkualitas tinggi dari Unsplash
  - Main image: Cup of coffee (500px height)
  - Top-right small: Coffee brewing (floating element)
  - Bottom-left small: Coffee beans (floating element)
- **Gradient Overlays**: Multi-layer gradients untuk readability
- **Glassmorphism Effects**: Backdrop blur pada cards dan buttons

#### New Elements Added
- **Stats Counter**: 
  - 5+ Tahun Berdiri
  - 50+ Menu Tersedia
  - 1000+ Pelanggan Puas
- **Floating Rating Badge**: 4.8 rating dengan shadow effect
- **Scroll Indicator**: Animated "Scroll Down" dengan bounce effect
- **Decorative Elements**: Animated blur circles dengan pulse effect

#### Design Improvements
- **Color Scheme Update**: 
  - Primary text: Background-beige untuk contrast dengan dark background
  - Accent highlights: Amber color untuk emphasis
  - Glassmorphism cards dengan backdrop-blur
- **Enhanced Buttons**:
  - Primary button: Amber background dengan hover effects
  - Secondary button: Border dengan backdrop-blur
- **Feature Cards Redesign**:
  - Glassmorphism effect (white/10 backdrop-blur)
  - Hover animation: -translate-y-2 dengan shadow enhancement
  - Icon dengan background circle dan scale animation
  - Longer descriptions untuk better context

#### Images Used (Unsplash)
- Background: Coffee shop interior (photo-1554118811-1e0d58224f24)
- Main hero: Cup of coffee (photo-1501339847302-ac426a4a7cbb)
- Small image 1: Coffee brewing (photo-1509042239860-f550ce710b93)
- Small image 2: Coffee beans (photo-1511920170033-f8396924c348)

#### Animation Enhancements
- Pulse animation untuk decorative elements
- Float animation untuk images (custom CSS)
- Bounce animation untuk scroll indicator
- Scale animation untuk icon hover states

### 🎨 Design System Updates
- **Glassmorphism**: Introduced backdrop-blur effects
- **Layer System**: Proper z-index layering
- **Responsive**: Hidden image gallery on mobile (text-focused)
- **Accessibility**: Maintained contrast ratios with overlays

### 📊 Performance Impact
- CSS bundle: 54.68 kB (gzip: 7.90 kB) - +0.48 kB
- JS bundle: 120.50 kB (gzip: 42.92 kB) - +0.77 kB
- Total impact: +1.25 kB gzipped
- Images: Loaded from Unsplash CDN (optimized)

---

## [1.2.0] - 2024-11-01

### ✨ Added - Slide Animations!

#### AOS (Animate On Scroll) Integration
- **Library Added**: AOS (Animate On Scroll)
- **Global Configuration** in `main.js`:
  - Duration: 800ms
  - Easing: ease-in-out
  - Once: true (animation happens only once)
  - Offset: 100px
- **Smooth Scroll**: Added to global CSS

#### Animation Types Implemented
- **fade-up**: Elements fade in while moving up
- **fade-down**: Elements fade in while moving down
- **fade-left**: Elements slide in from right to left
- **fade-right**: Elements slide in from left to right
- **zoom-in**: Elements scale from small to normal size
- **slide animations**: Smooth sliding effects

#### Sections with Animations

##### Hero Section
- Icon: zoom-in effect with 200ms delay
- Heading: fade-up with 300ms delay
- Tagline: fade-up with 400ms delay
- Description: fade-up with 500ms delay
- CTA Buttons: fade-up with 600ms delay
- Right image: fade-left with 400ms delay
- Feature cards: staggered fade-up (100ms, 200ms, 300ms)

##### About Section
- Left content: fade-right
- Title: fade-up with 100ms delay
- Description: fade-up with 200ms delay
- Right image: fade-left with 300ms delay
- Image: zoom-in with 400ms delay
- Decorative box: fade-up with 500ms delay

##### Menu Section
- Section header: fade-up
- Title: fade-up with 100ms delay
- Subtitle: fade-up with 200ms delay
- Category filters: fade-up with 300ms delay
- Menu cards: staggered zoom-in (100ms + index * 100ms)
- "See All" button: fade-up with 400ms delay

##### Feedback Section
- Section header: fade-up
- Title: fade-up with 100ms delay
- Description: fade-up with 200ms delay
- Feedback form: fade-right with 300ms delay
- Polling card: fade-left with 400ms delay

##### Testimonial Section
- Section header: fade-up
- Title and description added
- Testimonial cards: staggered fade-up (100ms + index * 100ms)
- Quote: zoom-in with 400ms delay

##### Contact Section
- Section header: fade-up
- Title: fade-up with 100ms delay
- Description: fade-up with 200ms delay
- Contact card wrapper: zoom-in with 300ms delay
- Contact info: fade-right with 400ms delay
- Address: fade-up with 500ms delay
- Hours: fade-up with 600ms delay
- Phone: fade-up with 700ms delay
- Map: fade-left with 500ms delay

### 🎨 Animation Patterns
- **Sequential delays**: 100ms increments for natural flow
- **Staggered lists**: Dynamic delays based on index
- **Directional logic**: Left content slides right, right content slides left
- **Performance optimized**: Animations trigger once, smooth 60fps

### 📚 Documentation Added
- **ANIMATIONS.md**: Complete animation guide
  - Library documentation
  - Configuration details
  - Implementation by section
  - Best practices
  - Troubleshooting guide
  - Performance metrics

### 🚀 Performance Impact
- CSS bundle: +12 kB (AOS styles)
- JS bundle: +18 kB (AOS library)
- Total build: 50.66 kB CSS, 115.74 kB JS (gzipped)
- Performance: Minimal impact, optimized for production

---

## [1.1.0] - 2024-11-01

### ✅ Fixed
- **Navbar Double Issue** - Removed duplicate navbar by fixing `HeroSection.vue`
  - Previously, `HeroSection.vue` contained a copy of the header component
  - Now properly displays a hero/welcome section with call-to-action buttons

### ✨ Added

#### Hero Section Enhancement
- Complete redesign of hero section with:
  - Welcome heading and tagline
  - Two CTA buttons: "Lihat Menu" and "Hubungi Kami"
  - Three feature cards highlighting key values:
    - Biji Kopi Pilihan
    - Dibuat dengan Cinta
    - Suasana Hangat
  - Decorative elements and placeholder for coffee shop image
  - Responsive grid layout

#### Feedback Form - Waiter Selection
- **New dropdown field** for selecting which waiter served the customer
- List of available waiters:
  - Budi
  - Siti
  - Ahmad
  - Dewi
  - Rudi
  - Fitri
  - Joko
  - Maya
- Properly integrated with form validation
- Styled with consistent design system

#### Polling - Customer Data Validation
- **Two-step polling process**:
  1. **Step 1**: Customer data collection
     - Full Name (required, minimum 3 characters)
     - Phone Number (required, minimum 10 digits)
     - Email (optional)
     - Validation before proceeding
  2. **Step 2**: Voting interface
     - Display customer info
     - Show poll results with progress bars
     - Vote buttons for each option
     - Success confirmation after voting

- **Enhanced Features**:
  - Customer data display after submission
  - Disabled voting until customer data is valid
  - Visual feedback for selected vote (ring effect)
  - Reset functionality to vote again with different account
  - Form validation with real-time feedback
  - Success alert with customer name personalization

### 🎨 UI/UX Improvements
- Better visual hierarchy in hero section
- Smooth transitions and hover effects
- Material Icons integration throughout
- Consistent color scheme with brand colors
- Improved form layouts with floating labels
- Enhanced button states (hover, active, disabled)
- Progress bar animations

### 🔧 Technical Details
- All components follow Vue 3 Composition API standards
- Proper form validation logic
- Computed properties for data validation
- Method separation for better code organization
- No console errors or warnings
- Production build optimized (24.46 kB CSS, 97.99 kB JS)

---

## [1.0.0] - 2024-10-31

### 🎉 Initial Release
- Complete Tailwind CSS setup
- Custom brand colors and typography
- Vue 3 + Vite configuration
- Basic component structure:
  - HeaderComponent
  - HeroSection (originally was duplicate navbar)
  - AboutSection
  - MenuSection
  - FeedbackSection
  - TestimonialSection
  - ContactSection
  - FooterComponent
- Rating stars component
- Progress bars with animations
- Material Icons integration
- Responsive design foundation

---

## Upcoming Features

### 🔮 Planned
- [ ] Mobile navigation menu (hamburger)
- [ ] Image upload for feedback
- [ ] Real-time polling results update
- [ ] Backend integration for form submissions
- [ ] Email notifications for feedback
- [ ] Admin dashboard for managing polls and feedback
- [ ] Multi-language support (Indonesian/English)
- [ ] Dark mode toggle
- [ ] Customer loyalty points system
- [ ] Online ordering integration

---

## Notes

### Bug Fixes Required
- Test mobile responsive on various devices
- Add loading states for form submissions
- Implement error handling for failed submissions

### Performance Optimizations
- Consider lazy loading for images
- Implement virtual scrolling for long lists
- Add service worker for offline capability

---

**Maintained by**: Development Team  
**Last Updated**: November 1, 2024