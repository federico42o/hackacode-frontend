/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {

      colors : {
        'primary': "#f5f5f5",
        'secondary': "#1e1e1e",
        'hover': "#404040",
        'indigo': '#5c6ac4',
        'blue': '#007ace',
        'red': '#de3618',
        'yellow': '#fbbf24',
        'green': {
          '300':'#10b981',
          '400':'#059669',
          '500':'#047857',
          '600':'#42855B'
                },
        'white': '#ffffff',
        'black': '#000000',
        'gray': {
          '50': '#f9fafb',
          '100': '#f3f4f6',
          '200': '#e5e7eb',
        },
      },
      backgroundColor:{
        'light': "#f5f5f5",
        'dark': "#1e1e1e",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
    backgroundImage: {
      'ticket-pattern': "url('/assets/img/bg-ticket.png')",
    }
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}
