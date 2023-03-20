const { src, dest, series, parallel, watch } = require("gulp");
const fractal = require('./fractal.config.js');

const logger = fractal.cli.console;

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
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
}
