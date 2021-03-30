import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Generates the build data at compile-time
import { readdirSync, readFileSync, writeFileSync } from "fs";

const builds = {};
readdirSync("./src/builds").forEach((path) => {
  let bytes = readFileSync(`./src/builds/${path}`);
  builds[path] = JSON.parse(bytes.toString());
});
writeFileSync("./src/data/builds.json", JSON.stringify(builds));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
