module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
      },
    },
    colors: {
      'current': '#eb6825',
      'paleBlue': "#e5f9fe",
      'cyanBlue' :"#0093b9",
      'lightapricot': "#ffece6",
      'coral' :'#f47a51',
      'gray0': '#cbd5e1',
      'success': "#87D068",
      'error': "#D92663",
      'gray1': '#999',
      'gainsboro': '#f6f7f8',
      "iceBlue": "#e8ebee",
      "lightGray": "#b1b1b1",
      "grayish": "#a8abb3",
      "misty": "#77798c"
    },
  },
  plugins: [require('flowbite/plugin')],
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
};