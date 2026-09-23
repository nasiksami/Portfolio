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
      // One modular scale (major third, 1.25) from a fluid 17→18px base; the
      // steps are CSS custom properties in index.css. Line-heights tighten as
      // size grows; body copy stays at 1.65.
      fontSize: {
        xs: ['var(--step--2)', { lineHeight: '1.5' }],
        sm: ['var(--step--1)', { lineHeight: '1.6' }],
        base: ['var(--step-0)', { lineHeight: '1.65' }],
        lg: ['var(--step-1)', { lineHeight: '1.5' }],
        xl: ['var(--step-2)', { lineHeight: '1.3' }],
        '2xl': ['var(--step-3)', { lineHeight: '1.2' }],
        '3xl': ['var(--step-4)', { lineHeight: '1.1' }],
        '4xl': ['var(--step-5)', { lineHeight: '1' }],
      },
      // ch-based, so the measure holds whatever the size. Public Sans averages
      // ~1.27 characters per ch: 54ch measured at 60–70 characters a line.
      maxWidth: {
        prose: '54ch',
      },
    },
  },
  plugins: [],
};
