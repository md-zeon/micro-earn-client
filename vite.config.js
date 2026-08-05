import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("firebase")) return "firebase";
          if (id.includes("@tiptap") || id.includes("prosemirror")) return "tiptap";
          if (id.includes("recharts") || id.includes("/d3-") || id.includes("victory-vendor")) return "charts";
          if (id.includes("/motion/") || id.includes("motion-dom") || id.includes("motion-utils")) return "motion";
          if (id.includes("gsap")) return "gsap";
          if (id.includes("swiper")) return "swiper";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("react-hook-form") || id.includes("/zod/") || id.includes("@hookform")) return "forms";
          if (id.includes("@tanstack/react-query")) return "query";
          if (id.includes("react-helmet-async")) return "router";
          if (id.includes("react-router")) return "router";
          if (id.includes("react-dom")) return "react";
          if (id.includes("/react/")) return "react";
        },
      },
    },
  },
});
