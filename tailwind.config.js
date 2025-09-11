/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, // Garante que classes Tailwind tenham precedência
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Componentes da sua aplicação
    "./node_modules/@mui/material/**/*.{js,ts,jsx,tsx}", // Componentes do MUI
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Desativa reset CSS do Tailwind
  },
};

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'faperj-blue': '#0056b3', // Cor base para o tema
      },
    },
  },
  plugins: [],
}