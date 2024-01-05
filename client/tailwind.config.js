/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/*.jsx"
  ],
  theme: {
    extend: {
      colors:{
        'dark-bg':'#181818',
        'receiver-bg':'#2f2f2f',
        'sender-msg':'#222222'
      }
    },
  },
  plugins: [],
}

