import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), glsl()],
  resolve: {
    alias: {
      "@": "/src",
      "@app": "/src/app",
      "@components": "/src/components",
      "@sections": "/src/sections",
      "@three": "/src/three",
      "@hooks": "/src/hooks",
      "@store": "/src/store",
      "@api": "/src/api",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
    },
  },
  server: {
    middlewareMode: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          three: [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
          gsap: ["gsap"],
          sections: ["@sections"],
        },
      },
    },
    target: "esnext",
  },
});
