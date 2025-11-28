import { readFile, cp } from "node:fs/promises";

let ignoreConfig;

try {
  ignoreConfig = JSON.parse(await readFile("ignore.json", "utf-8"));
} catch {
  ignoreConfig = { ignore: { course: [], task: [] } };
  await cp("ignore.json.sample", "ignore.json");
}

await Bun.build({
  entrypoints: ["src/index.ts"],
  outdir: "dist",
  minify: false,
  define: {
    "IGNORE_RULE": JSON.stringify(ignoreConfig),
  },
});

await cp("appsscript.json", "dist/appsscript.json");
