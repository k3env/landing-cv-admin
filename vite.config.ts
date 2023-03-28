import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~pages": path.resolve(__dirname, "src/pages"),
      "~stores": path.resolve(__dirname, "src/stores"),
      "~components": path.resolve(__dirname, "src/components"),
      "~models": path.resolve(__dirname, "src/models"),
      "~routes": path.resolve(__dirname, "src/routes/routes"),
    },
  },
});
