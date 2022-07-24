/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  safelist: [
    {
      pattern: /.+/,
    },
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
};

// Update Tailwind CSS:
// npm install -D tailwindcss@latest