const path = require("path");
const yaml = require("yaml");
const { readFileSync } = require("fs");
const configFile = readFileSync("./iq.tooling.yml", "utf8");
const config = yaml.parse(configFile);
module.exports = require(path.resolve(`${config.iq_uswds_path}/fractal.config`));
