import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/

const baseConfig = defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
});

export default baseConfig;
