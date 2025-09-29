/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración para Vitest
  test: {
    // Habilita APIs globales como describe, it, expect
    globals: true,

    // Usa jsdom para simular el DOM del navegador
    environment: "jsdom",

    // Archivo de setup para configuraciones adicionales
    setupFiles: ["./src/test/setup.ts"],

    // Archivos CSS e imports de estilos se mockean automáticamente
    css: true,

    // Reportes de coverage (opcional)
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/test/", "**/*.d.ts"],
    },
    include: [
      "src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "src/**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
