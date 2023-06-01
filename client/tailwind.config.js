/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          100: '#DD9161',
          200: '#C17043',
          300: '#A85931',
          400: '#8F4320'
        },
        secondary: {
          100: '#7A796B',
          200: '#5D5B50',
          300: '#48463C',
          400: '#3A382F'
        },
        white: '#fafafa',
        dark: '#121212'
      }
    }
  }
}
