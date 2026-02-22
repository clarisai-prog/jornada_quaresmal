import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Nome exato do repositório no GitHub — define a base URL do GitHub Pages
const REPO = "jornada-quaresmal-pwa-v5";

export default defineConfig({
  // ✅ base obrigatório para GitHub Pages
  base: `/${REPO}/`,

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve("client", "src"),
    },
  },

  root: path.resolve("client"),

  build: {
    outDir: path.resolve("dist/public"),
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});
