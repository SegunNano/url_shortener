/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './views/**/*.ejs',
    './public/**/*.{html, js}'
  ],
  mode: "jit",
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        textMutedS: 'var(--text-s-muted)',
        textMuted: 'var(--text-muted)',
      }
    },
  },
  plugins: [],
}

