/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {

      colors : {
        'light':{
          'primary': "#1e1e1e",
          'navbar': "#33485f"
          
        },
        'dark':{
          'primary': "#62a8a2",
          
        },
        
        'hover': "#404040",
        'indigo': '#5c6ac4',
        'blue': '#007ace',
        'red': '#B01F21',
        'dark-red':'#1d0000',

        'yellow': {
          '100':'#F8F7E4',
          '200':'#E7DA7F',
          '300':'#DED87B',
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
        'white':'#f5f5f5',
        'black':'#161616',
        'primary': "#62a8a2",
        'secondary': "#18181B",
        'light':{
          'active':'#bdbdbd3b',
          'hover':'#EEE9DA'
        },
        'dark':{
          'active':'#43434365',
          'hover':'#1a1a1a'
        }
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        ticket: ['Rubik Iso', 'Rubikso-Regular', 'cursive']
      },
    },
    backgroundImage: {
      'ticket-pattern': "url('/assets/img/bg-ticket.png')",
      'dark-gradient': 'linear-gradient(to right top, #181818, #1e1e22, #22252d, #242d38, #233543);',
      'light-gradient':'linear-gradient(to right top, #daffe5, #dcffe6, #deffe8, #dfffe9, #e1ffea);'
    }
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}
