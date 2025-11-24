/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,

  corePlugins: {
    preflight: false,
  },

  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        "faperj-blue": "#0056b3",
        "faperj-green": "#0d8f66"
      }
    }
  },

  plugins: []
};
