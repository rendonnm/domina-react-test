import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { federation } from "@module-federation/vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? process.env.VITE_BASE_URL || "/" : "/",
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: (outputChunk) =>
        outputChunk.fileName === "remoteEntry.js",
    }),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./UsersMainPage": "./src/federation/UsersMainPageWithStyles.tsx",
      },
      remotes: {},
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
        "react-router-dom": {
          singleton: true,
        },
        "@tanstack/react-query": {
          singleton: true,
        },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
