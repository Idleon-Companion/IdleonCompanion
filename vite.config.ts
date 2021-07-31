import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { "~": resolve(__dirname, "src") },
  },
  plugins: [vue(), WindiCSS()],
});
