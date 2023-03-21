/* gulpfile.js */

const uswds = require("@uswds/compile");
const { series, parallel } = require("gulp");
const iqTooling = require("./iq.tooling");

/**
 * USWDS version
 */

uswds.settings.version = 3;

/**
 * Path settings
 * Set as many as you need
 */

uswds.paths.dist.css = './assets/css';
uswds.paths.dist.theme = './src/scss';

/**
 * Exports
 * Add as many as you need
 */

exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;
exports.fractal = series(uswds.compileSass, parallel(uswds.watch, iqTooling.startFractal))