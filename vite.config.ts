import { defineConfig } from "vite";
import { resolve } from "path";
import WindiCSS from "vite-plugin-windicss";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { "~": resolve(__dirname, "src") },
  },
  plugins: [vue(), WindiCSS()],
});
