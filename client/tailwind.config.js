/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Add or modify colors here
        customGreen: '#809e88', // Example RGB value in hex
      },
      // textColor: {
      //   customGreen: '#ffffff', // White text color for customGreen background
      // },

      borderRadius: ['active'],
    },
  },
  plugins: [],
};
