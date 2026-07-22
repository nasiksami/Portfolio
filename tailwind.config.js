/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
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
        signal: 'rgb(var(--signal) / <alpha-value>)',
        'on-signal': 'rgb(var(--on-signal) / <alpha-value>)',
      },
      maxWidth: {
        prose: '42rem',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'signal-flow': {
          from: { strokeDashoffset: '48' },
          to: { strokeDashoffset: '0' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.38', transform: 'scale(0.96)' },
          '50%': { opacity: '0.9', transform: 'scale(1.04)' },
        },
      },
      animation: {
        ticker: 'ticker 42s linear infinite',
        'signal-flow': 'signal-flow 1.8s linear infinite',
        orbit: 'orbit 24s linear infinite',
        breathe: 'breathe 3.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
