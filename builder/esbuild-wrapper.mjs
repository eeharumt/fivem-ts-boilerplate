import { exec } from "child_process";
import esbuild from "esbuild";
import { writeFile } from "fs/promises";

/**
 * Creates a build process using esbuild.
 * @param watch - Whether to enable watch mode.
 * @param baseOptions - The base build options for esbuild.
 * @param environments - An array of environments with their names and esbuild options.
 * @param onBuild - A callback function that gets called after a successful build.
 */
export async function createBuilder(watch, baseOptions, environments, onBuild) {
  const outfiles = {};
  const plugins = [
    {
      name: "build",
      setup(build) {
        build.onEnd(async (result) => {
          if (result.errors.length !== 0) {
            return;
          }
          console.log(`Successfully built ${build.initialOptions.outfile}`);

          if (watch) {
            const command = process.env["RUN_AFTER_BUILD"];
            if (command) {
              console.log(`Executing : ${command}`);
              exec(command, (error, stdout, stderr) => {
                if (error) {
                  console.error(`exec error: ${error}`);
                  return;
                }
                console.log(`${stdout}`);
                stderr && console.error(stderr);
              });
            }
          }
        });
      },
    },
  ];

  await Promise.all(
    environments.map(async ({ name, options }) => {
      outfiles[name] = `dist/${name}.js`;
      options = {
        logLevel: "info",
        charset: "utf8",
        bundle: true,
        entryPoints: [`./src/${name}.ts`],
        outfile: outfiles[name],
        keepNames: true,
        legalComments: "none",
        treeShaking: true,
        sourcemap: true,
        ...baseOptions,
        ...options,
      };
      options.plugins = [...(options.plugins || []), ...plugins];

      if (watch) {
        const ctx = await esbuild.context(options).catch(() => process.exit(1));
        return ctx.watch();
      } else {
        return await esbuild.build(options).catch(() => process.exit(1));
      }
    }),
  );

  await writeFile(".yarn.installed", new Date().toISOString());
  await onBuild(outfiles);

  if (!watch) process.exit(0);
}