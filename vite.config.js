import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDirectory, "client", "src"),
      "@shared": path.resolve(rootDirectory, "shared"),
    },
  },
  root: path.resolve(rootDirectory, "client"),
  build: {
    outDir: path.resolve(rootDirectory, "dist"),
    emptyOutDir: true,
  },
});
