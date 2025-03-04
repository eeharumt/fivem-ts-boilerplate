import { exec } from "child_process";
import { exists } from "fs";
import { createBuilder } from "./esbuild-wrapper.mjs";

const watch = process.argv.includes("--watch");

createBuilder(
  watch,
  {
    dropLabels: !watch ? ["DEV"] : undefined,
  },
  [
    {
      name: "server",
      options: {
        platform: "node",
        target: ["node22"],
        format: "cjs",
      },
    },
    {
      name: "client",
      options: {
        platform: "browser",
        target: ["es2021"],
        format: "iife",
      },
    },
  ],
  async (outfiles) => {
    // const files = await getFiles("dist/web", "static", "locales");
  }
);
