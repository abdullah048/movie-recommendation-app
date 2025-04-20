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
          200: '#221F3D',
          250: '#121212',
        },
        'light-gray': {
          50: '#FFFFFF4D',
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
        '6': '6px',
        '8': '8px',
        '10': '10px',
        '45': '45px',
      },
      screens: {
        xs: { max: '375px' },
        425: { max: '425px' },
        1440: { min: '1440px' },
      },
      padding: {
        '50': '50px',
      },
      aspectRatio: {
        '2/3': '2/3',
      },
      backdropBlur: {
        10: '10px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
