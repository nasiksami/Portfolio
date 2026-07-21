/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // Overridden, not extended: squaring off every corner is a load-bearing
    // part of the art direction, so no `rounded-*` utility can reintroduce a
    // radius by accident. `full` survives for the few true circles (dots).
    borderRadius: {
      none: '0',
      DEFAULT: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '9999px',
    },
    extend: {
      fontFamily: {
        // Archivo carries both a weight and a WIDTH axis; the width axis is
        // what the hero and section headers animate. See `.display` in
        // index.css, which drives both axes from custom properties.
        display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Semantic tokens only. Which raw palette they resolve to depends on
        // the theme class and `.invert-surface` — see index.css.
        surface: {
          base: 'rgb(var(--surface-base) / <alpha-value>)',
          raised: 'rgb(var(--surface-raised) / <alpha-value>)',
          overlay: 'rgb(var(--surface-overlay) / <alpha-value>)',
        },
        content: {
          primary: 'rgb(var(--content-primary) / <alpha-value>)',
          secondary: 'rgb(var(--content-secondary) / <alpha-value>)',
          muted: 'rgb(var(--content-muted) / <alpha-value>)',
        },
        edge: 'rgb(var(--edge) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
      },
      maxWidth: {
        prose: '38rem',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        ticker: 'ticker 48s linear infinite',
      },
    },
  },
  plugins: [],
};
