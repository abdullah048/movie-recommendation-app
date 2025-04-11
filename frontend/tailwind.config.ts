import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          '50': '#D6C7FF',
          '100': '#AB8BFF',
        },
        black: {
          100: '#030014',
          150: '#0F0D23',
        },
        'light-gray': {
          100: '#A8B5DB',
          150: '#CECEFB1A',
          200: '#CECEFB66',
          300: '#9CA4AB',
        },
      },
      fontFamily: {
        'dm-sans': 'var(--font-dm-sans)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '8': '8px',
      },
      screens: {
        xs: { max: '375px' },
      },
      padding: {
        '50': '50px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
