/* gulpfile.js */

const { series, parallel, task } = require("gulp");
const iqTooling = require("./iq.tooling");

/**
 * Exports
 * Add as many as you need
 */
exports.fractal = task('fractal', series(
  "uswds:compileSass",
  parallel("uswds:watch", "fractal:start")
));
exports.build = parallel("uswds:compile", "copy:images");
