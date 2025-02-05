// tailwind.config.js
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      boxShadow: {
        light:
          'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -7px 6px 2px inset',
        'light-hover':
          'rgba(50, 50, 93, 0.35) 0px 55px 110px -15px, rgba(0, 0, 0, 0.4) 0px 35px 70px -25px, rgba(10, 37, 64, 0.45) 0px -9px 8px 3px inset',
        dark: 'rgba(255, 255, 255, 0.15) 0px 10px 100px -20px, rgba(255, 255, 255, 0.2) 0px 20px 20px -30px, rgba(200, 200, 200, 0.25) 0px -5px 6px 0px inset',
        'dark-hover':
          'rgba(255, 255, 255, 0.15) 0px 10px 100px -20px, rgba(255, 255, 255, 0.2) 0px 20px 20px -30px, rgba(200, 200, 200, 0.25) 0px -7px 6px 2px inset',
      },
      keyframes: {
        upAndDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'mini-bounce': {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-4px)',
          },
          '60%': {
            transform: 'translateY(-2px)',
          },
        },
      },
      animation: {
        'up-and-down': 'upAndDown 3s infinite',
        'spin-slow': 'spin 10s linear infinite',
        'spin-fast': 'spin 1s linear infinite',
        'scroll-left': 'scroll-left 50s linear infinite',
        'mini-bounce': 'mini-bounce 3s infinite',
      },
    },
  },
}
