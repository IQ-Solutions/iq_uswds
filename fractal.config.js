const yaml = require("yaml");
const { readFileSync } = require("fs");
const twingAdapter = require("@iq-solutions/fractal-twing");
const { TwingLoaderFilesystem } = require("twing");
const path = require("path");
const fractal = (module.exports = require("@frctl/fractal").create());
const evenlyDistribute = require("./src/js/evenlyDistribute");

const configFile = readFileSync("./iq.tooling.yml", "utf8");
const config = yaml.parse(configFile);

const theme_path = config.fractal.themePath ? path.resolve(config.fractal.themePath)
  : path.resolve(__dirname);
const component_path = __dirname + (config.fractal.component_path ?
  config.fractal.component_path : "/src/components");
const assets_path = __dirname + (config.fractal.assets_path ?
  config.fractal.assets_path : "/assets");
const build_path = __dirname + (config.fractal.build_path ?
  config.fractal.build_path : __dirname + "/build");
const base_path = path.resolve(theme_path, "src", "components");
const uswds_path = config.fractal.uswds_path ?config.fractal.uswds_path
  : "../contrib/uswds_base/templates";
const template_path = config.fractal.template_path ? config.fractal.template_path
  : "templates";
const theme_name = config.fractal.theme_name ? config.fractal.theme_name
  : "iq_uswds";

fractal.set("project.title", config.fractal.project_title);
fractal.components.set("path", component_path);
fractal.components.set("default.preview", "@iqsolutions");

fractal.web.set("static.mount", "fractal");
fractal.web.set("static.path", assets_path);
fractal.web.set("builder.dest", build_path);

const loader = new TwingLoaderFilesystem([base_path]);
loader.addPath(base_path, "components");
loader.addPath(
  path.resolve(theme_path, template_path),
  theme_name
);
loader.addPath(path.resolve(theme_path, uswds_path), "uswds");

const twingEnvironment = new twingAdapter.TwingDrupalEnvironment(loader, {
  autoescape: false,
  auto_reload: true,
});

twingEnvironment.addFilter(evenlyDistribute);

const twing = twingAdapter.createAdapter({
  environment: twingEnvironment,
  base_path,
});

fractal.components.engine(twing);
fractal.components.set("ext", ".twig");
