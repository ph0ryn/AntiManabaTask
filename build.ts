import { cp } from "node:fs/promises";

await Bun.build({
  entrypoints: ["src/index.ts"],
  outdir: "dist",
  minify: false,
  define: {
    "process.env.FEATURE_FLAGS": JSON.stringify({}),
  },
});

await cp("appsscript.json", "dist/appsscript.json");
