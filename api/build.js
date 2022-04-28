const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild
    .build({
        entryPoints: ["./src/index.ts"],
        outdir: "./dist",
        bundle: true,
        platform: "node",
        target: "node16",
        plugins: [nodeExternalsPlugin()],
    })
    .catch(() => process.exit(1));
