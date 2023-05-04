/* gulpfile.js */

const path = require("path");
const yaml = require("yaml");
const { readFileSync } = require("fs");
const configFile = readFileSync("./iq.tooling.yml", "utf8");
const config = yaml.parse(configFile);
const iq_uswds_path = path.resolve(config.iq_uswds_path);
const { series, parallel, task } = require("gulp");
const iqTooling = require(`${iq_uswds_path}/iq.tooling`);

/**
 * Exports
 * Add as many as you need
 */
exports.startFractal = task("fractal:start", iqTooling.startFractal);
exports.buildFractal = task("fractal:build", iqTooling.buildFractal);
exports.copyImages = task("copy:images", iqTooling.copyImages);
exports.compile = task("uswds:compile", iqTooling.uswds.compile);
exports.watch = task("uswds:watch", iqTooling.uswds.watch);
exports.compileSass = task("uswds:compileSass", iqTooling.uswds.compileSass);
exports.copyAssets = task("uswds:copyAssets", iqTooling.uswds.copyAssets);
exports.fractal = task(
  "fractal",
  series("uswds:compileSass", parallel("uswds:watch", "fractal:start"))
);
exports.build = parallel("uswds:compile", "copy:images");
