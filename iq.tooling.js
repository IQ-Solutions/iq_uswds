const yaml = require("yaml");
const { readFileSync } = require("fs");
const path = require("path");
const iq_uswds_path = path.resolve(__dirname);
const { src, dest, task } = require("gulp");
const uswds = require(`${iq_uswds_path}/node_modules/@uswds/compile`);
const log = console.log;
const fractal = require(`${iq_uswds_path}/fractal.config.js`);

const configFile = readFileSync("./iq.tooling.yml", "utf8");
const config = yaml.parse(configFile);

const logger = fractal.cli.console;

/**
 * USWDS version
 */
uswds.settings.version = config.uswds.version;

/**
 * Path settings
 * Set as many as you need
 */

uswds.paths.dist.css = config.uswds.dist_css_path;
uswds.paths.dist.theme = config.uswds.dist_theme;

function startFractal() {
  const server = fractal.fractal.web.server({
    sync: true,
  });
  server.on("error", (err) => logger.error(err.message));
  return server.start().then(() => {
    logger.success(
      `Fractal server is now running at ${server.urls.sync.local}`
    );
  });
}

function buildFractal() {
  const builder = fractal.fractal.web.builder();
  builder.on("progress", (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, "info")
  );
  builder.on("error", (err) => logger.error(err.message));
  return builder.start().then(() => {
    logger.success("Fractal build completed!");
  });
}

function copyImages() {
  log(
    `Copying from ${config.iqTooling.img_source} to ${config.iqTooling.img_dest}`
  );
  return src(config.iqTooling.img_source).pipe(dest(config.iqTooling.img_dest));
}

exports.startFractal = startFractal;
exports.buildFractal = buildFractal;
exports.copyImages = copyImages;
exports.uswds = uswds;
