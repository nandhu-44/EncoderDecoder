import flowbite from 'flowbite-react/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,css,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito-sans': ['Nunito Sans', 'sans-serif']
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
