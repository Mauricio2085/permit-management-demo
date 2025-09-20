/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sst: {
          blue: "#2563eb", // confianza, seriedad
          green: "#16a34a", // seguridad, bienestar
          yellow: "#facc15", // prevención, advertencia
          gray: "#4b5563", // neutral
          red: "#dc2626", // alerta, peligro
        },
      },
    },
  },
  plugins: [],
};
