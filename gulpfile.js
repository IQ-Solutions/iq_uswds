/* gulpfile.js */

const { series, parallel, task } = require("gulp");
const iqTooling = require("./iq.tooling");

iqTooling.settings.project_title = 'Test';

/**
 * Exports
 * Add as many as you need
 */
exports.compile = iqTooling.compile;
exports.watch = iqTooling.watch;
exports.fractal = task('fractal', series(
  iqTooling.compileSass,
  parallel(iqTooling.watch, "fractal:start")
));
exports.build = parallel(iqTooling.compile, "images:copy");
exports.copyUswds = task('copy:uswds', iqTooling.copyAll);
