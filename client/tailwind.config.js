/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slow-pan': 'slow-pan 36s ease-in-out infinite alternate',
      },
      keyframes: {
        'slow-pan': {
          '0%': { transform: 'scale(1.1) translate(0%, 0%)' },
          '100%': { transform: 'scale(1.22) translate(-2.5%, -1.5%)' },
        },
      },
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--ink-faint) / <alpha-value>)',
        },
        accent: {
          DEFAULT: '#2dd4bf',
          dim: '#0f766e',
          glow: '#5eead4',
        },
        night: {
          950: '#0c0f14',
          900: '#12161e',
          850: '#171c26',
          800: '#1e2430',
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgb(45 212 191 / 0.35)',
        card: '0 4px 24px -4px rgb(0 0 0 / 0.25)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgb(var(--grid-line) / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid-line) / 0.5) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
    },
  },
  plugins: [],
};
