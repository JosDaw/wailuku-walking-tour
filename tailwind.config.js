/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#09814a',
          secondary: '#0ecf75',
          accent: '#EDF6F3',
          neutral: '#DAEFE8',
          'base-100': '#ffffff',
          info: '#FDCA73',
          success: '#1c3f2f',
          warning: '#256047',
          error: '#277da1',
        },
      },
    ],
  },
}
