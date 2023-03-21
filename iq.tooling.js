const { src, dest, task } = require("gulp");
const fractal = require('./fractal.config.js');

const logger = fractal.cli.console;

// Images destination
const IMG_DEST = "./assets/img";

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
  return src(`./src/images/**/**`).pipe(dest(`${IMG_DEST}`));
}

exports.startFractal = task('fractal:start', startFractal);
exports.buildFractal = task('fractal:build', buildFractal);
exports.copyImages = task('images:copy', copyImages);