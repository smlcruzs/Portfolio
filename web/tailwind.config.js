/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: "#0a192f",      // Fundo Principal (Azul Marinho Profundo)
          light: "#112240",     // Fundo dos Cards (Um pouco mais claro)
          lighter: "#233554",   // Bordas e detalhes
          cyan: "#64ffda",      // O "Brilho" (Texto destaque, botões, dados)
          slate: "#8892b0",     // Texto secundário (Cinza azulado)
          white: "#e6f1ff",     // Texto principal
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'], 
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'neon': '0 0 10px rgba(100, 255, 218, 0.1), 0 0 20px rgba(100, 255, 218, 0.1)',
      }
    },
  },
  plugins: [],
}