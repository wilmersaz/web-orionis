import type { Config } from 'tailwindcss';

/**
 * Orionis Design System.
 * Colours, typography and elevation tokens derived from the official
 * brand guidelines (#134675 / #4CC9F0 / #F4C430) and the visual language
 * of the existing API Reference (dark code surfaces, Titillium Web).
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#0B2A48',
          navy: '#134675',
          blue: '#1B5C97',
          steel: '#3E7CB1',
          cyan: '#4CC9F0',
          cyanSoft: '#A8E5F8',
          gold: '#F4C430',
          goldSoft: '#FBE7A1',
          mist: '#EEF4FA',
        },
        ink: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#060B15',
        },
        // Tokens inherited from the Orionis API Reference (dark code surfaces).
        api: {
          bg: 'var(--api-bg)',
          surface: 'var(--api-surface)',
          text: 'var(--api-text)',
          muted: 'var(--api-muted)',
          primary: 'var(--api-primary)',
          accent: 'var(--api-accent)',
          border: 'var(--api-border)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Titillium Web', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11, 42, 72, 0.06), 0 6px 18px rgba(11, 42, 72, 0.06)',
        card: '0 4px 16px rgba(11, 42, 72, 0.10)',
        elevated: '0 24px 60px -20px rgba(11, 42, 72, 0.35)',
        ring: '0 0 0 1px rgba(19, 70, 117, 0.08)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(60% 60% at 50% 0%, rgba(76, 201, 240, 0.22) 0%, rgba(11, 42, 72, 0) 70%)',
        'brand-gradient': 'linear-gradient(120deg, #134675 0%, #1B5C97 45%, #4CC9F0 100%)',
        'gold-gradient': 'linear-gradient(120deg, #F4C430 0%, #FBE7A1 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
