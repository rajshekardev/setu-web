// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

import solidJs from "@astrojs/solid-js";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [solidJs({ devtools: true })],

  vite: {
    plugins: [tailwindcss()],
  },
});