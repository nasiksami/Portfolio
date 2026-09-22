/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', '"Fraunces Fallback Georgia"', '"Fraunces Fallback"', '"Fraunces Fallback DejaVu"', 'Georgia', 'serif'],
        sans: ['"Public Sans"', '"Public Sans Fallback"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      // Every colour reads a channel triple that index.css derives from the
      // single `--sky` position, so utilities never know what time it is.
      colors: {
        surface: {
          base: 'rgb(var(--sky-rgb) / <alpha-value>)',
          raised: 'rgb(var(--ground-rgb) / <alpha-value>)',
          overlay: 'rgb(var(--overlay-rgb) / <alpha-value>)',
        },
        content: {
          primary: 'rgb(var(--ink-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--ink2-rgb) / <alpha-value>)',
          muted: 'rgb(var(--ink3-rgb) / <alpha-value>)',
        },
        edge: 'rgb(var(--edge-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent-rgb) / <alpha-value>)',
        signal: 'rgb(var(--signal-rgb) / <alpha-value>)',
        'on-signal': 'rgb(var(--on-signal-rgb) / <alpha-value>)',
      },
      maxWidth: {
        prose: '42rem',
      },
    },
  },
  plugins: [],
};
