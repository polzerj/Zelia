import { defineConfig } from "vite";

export default defineConfig({
    root: "./src/",
    publicDir: "./public",
    build: {
        outDir: "../dist",
    },
    server: {
        https: true,
        host: "0.0.0.0",
    }
});
