import { readFile, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { parse as parseEnv } from "dotenv";

interface EnvConfig {
  calendarId: string;
  ignore: {
    course: string[];
    task: string[];
  };
}

let envConfig: EnvConfig;

// Load env.json or create from sample
try {
  envConfig = JSON.parse(await readFile("env.json", "utf-8"));
} catch {
  envConfig = { calendarId: "", ignore: { course: [], task: [] } };
  await cp("env.json.sample", "env.json");
}

// Load .env and override calendarId if present
if (existsSync(".env")) {
  const envFile = await readFile(".env", "utf-8");
  const parsed = parseEnv(envFile);
  
  if (parsed.CALENDAR_ID) {
    envConfig.calendarId = parsed.CALENDAR_ID;
  }
}

await Bun.build({
  entrypoints: ["src/index.ts"],
  outdir: "dist",
  minify: false,
  define: {
    "ENV_CONFIG": JSON.stringify(envConfig),
  },
});

await cp("appsscript.json", "dist/appsscript.json");
