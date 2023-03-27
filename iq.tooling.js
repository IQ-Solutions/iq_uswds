const { src, dest, task } = require("gulp");
const uswds = require("@uswds/compile");
const log = console.log;
const fractal = require('./fractal.config.js');

const logger = fractal.cli.console;

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

let settings = {
  img_dest: "./assets/img",
  img_source: "./src/images/**/**",
};

function inititateIqUswds() {

}

function startFractal() {
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.urls.sync.local}`);
  });
}

function buildFractal () {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.start().then(() => {
    logger.success('Fractal build completed!');
  });
}

function copyImages() {
  log(`Copying from ${settings.img_source} to ${settings.img_dest}`);
  return src(settings.img_source).pipe(dest(settings.img_dest));
}

exports.settings = settings;
exports.fractal = fractal;
exports.startFractal = task('fractal:start', startFractal);
exports.buildFractal = task('fractal:build', buildFractal);
exports.copyImages = task('images:copy', copyImages);
exports.compile = uswds.compile;
exports.watch = uswds.watch;
exports.compileSass = uswds.compileSass;
exports.watch = uswds.watch;
exports.copyAll = uswds.copyAll;
