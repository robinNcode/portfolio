/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          base: {
            DEFAULT: '#040810',
            light: '#ffffff',
          },
          surface: {
            DEFAULT: '#0a1020',
            light: '#f8fafc',
          },
          card: {
            DEFAULT: '#0d1627',
            light: '#ffffff',
          },
          border: {
            DEFAULT: '#1a2540',
            light: '#e2e8f0',
          },
        },
        cyan: {
          glow: {
            DEFAULT: '#22d3ee',
            light: '#0891b2',
          },
          dim: {
            DEFAULT: '#0891b2',
            light: '#0e7490',
          },
          faint: {
            DEFAULT: 'rgba(34,211,238,0.08)',
            light: 'rgba(6,182,212,0.08)',
          },
        },
        orange: {
          accent: {
            DEFAULT: '#f97316',
            light: '#ea580c',
          },
          dim: {
            DEFAULT: '#ea580c',
            light: '#c2410c',
          },
          faint: {
            DEFAULT: 'rgba(249,115,22,0.08)',
            light: 'rgba(234,88,12,0.08)',
          },
        },
        text: {
          primary: {
            DEFAULT: '#e2e8f0',
            light: '#0f172a',
          },
          secondary: {
            DEFAULT: '#94a3b8',
            light: '#64748b',
          },
          muted: {
            DEFAULT: '#475569',
            light: '#94a3b8',
          },
        },
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(34,211,238,0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(34,211,238,0.45)' },
        },
        scan: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(circle, rgba(34,211,238,0.12) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'dot-grid': '32px 32px',
      },
    },
  },
  plugins: [],
}
