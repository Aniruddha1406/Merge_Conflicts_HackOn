/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0C831F',
          'green-light': '#1CC649',
          'green-dark': '#075212',
          yellow: '#F4C430',
          dark: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideInRight: { '0%': { transform: 'translateX(100%)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        bounceSubtle: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.15)',
        green: '0 4px 15px rgba(12, 131, 31, 0.3)',
      },
    },
  },
  plugins: [],
}
