import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  resolve: {
    alias: {
      "~pages": resolve(__dirname, "src/pages"),
      "~stores": resolve(__dirname, "src/stores"),
      "~components": resolve(__dirname, "src/components"),
      "~models": resolve(__dirname, "src/models"),
      "~routes": resolve(__dirname, "src/routes/routes"),
    },
  },
});
