import { defineConfig } from "vite";

export default defineConfig({
    root: "./src/",
    publicDir: "./public",
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                index: "./src/index.html",
                admin: "./src/admin.html",
            },
        },
        emptyOutDir: true,
    },
    server: {
        https: true,
        host: "0.0.0.0",
    },
});
