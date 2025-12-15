/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": "#1E4D3B",
        "secondary-sage": "#C6D3C1",
        "background-beige": "#F8F5F0",
        "accent-amber": "#E5A65A",
        "text-charcoal": "#2B2B2B",
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Nunito Sans', 'sans-serif'],
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.25rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}