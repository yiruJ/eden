/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4aaf81',    // green — main brand colour
        accent: '#ec2f44',     // red — CTAs and key highlights
        background: '#FAF8F4', // warm off-white
        surface: '#eef6f1',    // light mint — alternating sections
        charcoal: '#1a1a1a',   // near black — main text
        muted: '#6b7280',      // captions, labels, secondary text
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'bounce-x': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'bounce-x': 'bounce-x 1s ease-in-out infinite',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
