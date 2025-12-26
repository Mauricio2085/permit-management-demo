/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup/setupTests.ts",
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    css: false,
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
