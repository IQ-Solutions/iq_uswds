const yaml = require("yaml");
const { readFileSync } = require("fs");
const path = require("path");
const iq_uswds_path = path.resolve(__dirname);
const { src, dest } = require("gulp");
const uswds = require(`${iq_uswds_path}/node_modules/@uswds/compile`);
const log = console.log;

const configFile = readFileSync("./iq.tooling.yml", "utf8");
const config = yaml.parse(configFile);

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

function copyImages() {
  log(
    `Copying from ${config.iqTooling.img_source} to ${config.iqTooling.img_dest}`
  );
  return src(config.iqTooling.img_source).pipe(dest(config.iqTooling.img_dest));
}

exports.copyImages = copyImages;
exports.uswds = uswds;
