import type { Config } from 'tailwindcss'

/**
 * Preset Tailwind do Meeds DS.
 *
 * Uso no tailwind.config do app:
 *   import preset from '@meeds/ds/tailwind-preset'
 *   export default {
 *     presets: [preset],
 *     content: ['./index.html', './src/**\/*.{ts,tsx}', './node_modules/@meeds/ds/dist/**\/*.js'],
 *   }
 *
 * Todas as cores vêm de CSS vars (ver styles.css), então marca por tenant
 * é só sobrescrever --ds-primary* em runtime.
 */
const preset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--ds-primary) / <alpha-value>)',
          light: 'rgb(var(--ds-primary-light) / <alpha-value>)',
          dark: 'rgb(var(--ds-primary-dark) / <alpha-value>)',
          hover: 'rgb(var(--ds-primary-hover) / <alpha-value>)',
        },
        app: {
          bg: 'rgb(var(--ds-app-bg) / <alpha-value>)',
          surface: 'rgb(var(--ds-app-surface) / <alpha-value>)',
          border: 'rgb(var(--ds-app-border) / <alpha-value>)',
          text: 'rgb(var(--ds-app-text) / <alpha-value>)',
          muted: 'rgb(var(--ds-app-muted) / <alpha-value>)',
          dark: 'rgb(var(--ds-app-dark) / <alpha-value>)',
          darker: 'rgb(var(--ds-app-darker) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgb(var(--ds-success) / <alpha-value>)',
          soft: 'rgb(var(--ds-success-soft) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--ds-warning) / <alpha-value>)',
          soft: 'rgb(var(--ds-warning-soft) / <alpha-value>)',
          strong: 'rgb(var(--ds-warning-strong) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'rgb(var(--ds-danger) / <alpha-value>)',
          dark: 'rgb(var(--ds-danger-dark) / <alpha-value>)',
          soft: 'rgb(var(--ds-danger-soft) / <alpha-value>)',
        },
      },
      boxShadow: {
        'glow-primary': '0 6px 18px -4px rgb(var(--ds-primary) / 0.5)',
        'glow-primary-lg': '0 10px 28px -6px rgb(var(--ds-primary) / 0.6)',
        card: '0 8px 40px rgba(0, 0, 0, 0.3)',
        modal: '0 12px 48px rgba(0, 0, 0, 0.4)',
      },
      zIndex: {
        dropdown: '1000',
        overlay: '1100',
        modal: '1110',
        popover: '1120',
        toast: '1200',
      },
      fontSize: {
        '2xs': ['10px', '14px'],
      },
      animation: {
        'slide-in': 'ds-slide-in 0.3s ease-out',
        'fade-in': 'ds-fade-in 0.2s ease-out',
        'pulse-dot': 'ds-pulse-dot 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'ds-slide-in': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'ds-fade-in': {
          from: { transform: 'translateY(-8px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'ds-pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
}

export default preset
