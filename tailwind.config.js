/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'Arial', 'sans serif'],
      roboto: ['Roboto', 'Arial', 'sans serif'],
    },
    colors: {
      greenColor: '#007A7A',
      darkGreen: '#006262',
      whiteColor: '#ffffff',
      blackColor: '#000000',
      grayColor: '#DADADA',
      redColor: '#ce0202',
      overlay: '#000000c9',
      skyBlue: '#EFF4FE',
      skyBlueText: '#1877F2',
    },
    extend: {
      gridRow: {
        custom: 'grid-start-0',
      },
      gridTemplateColumns: {
        customCol: 'repeat(auto-fit, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [],
};
