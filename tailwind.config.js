/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8FAFC',
        surface: '#FFFFFF',
        hairline: '#E2E8F0',
        obsidian: '#0F172A',
        darkCanvas: '#0B0F19',
        darkSurface: '#111827',
        darkBorder: '#1F2937',
        petrol: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        jade: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          600: '#059669',
          700: '#047857',
        },
        crimson: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          600: '#E11D48',
          700: '#BE123C',
        },
        ochre: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          600: '#D97706',
          700: '#B45309',
        },
        electric: '#06B6D4',
        limeForensic: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'forensic': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
        'forensic-md': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        'forensic-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        'laser': '0 0 15px 3px rgba(6, 182, 212, 0.6), 0 0 30px 6px rgba(6, 182, 212, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
