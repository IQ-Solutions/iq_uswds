/* gulpfile.js */

const { series, parallel, task } = require("gulp");
const iqTooling = require("./iq.tooling");

/**
 * Exports
 * Add as many as you need
 */
exports.copyImages = task("copy:images", iqTooling.copyImages);
exports.compile = task("uswds:compile", iqTooling.uswds.compile);
exports.watch = task("uswds:watch", iqTooling.uswds.watch);
exports.compileSass = task("uswds:compileSass", iqTooling.uswds.compileSass);
exports.copyAssets = task("uswds:copyAssets", iqTooling.uswds.copyAssets);
exports.buildDev = series(
  parallel("uswds:compile", "copy:images")
);
exports.build = series(parallel("uswds:compile", "copy:images"));
