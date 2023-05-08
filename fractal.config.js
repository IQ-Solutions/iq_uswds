const yaml = require("yaml");
const { readFileSync } = require("fs");
const twingAdapter = require("@iq-solutions/fractal-twing");
const { TwingLoaderFilesystem } = require("twing");
const path = require("path");
const fractal = (module.exports = require("@frctl/fractal").create());
const evenlyDistribute = require("./src/js/evenlyDistribute");

const configFile = readFileSync("./iq.tooling.yml", "utf8");
const config = yaml.parse(configFile);

const fractal_path = path.resolve(config.fractal.fractal_path);
const theme_path = path.resolve(config.fractal.themePath);
const component_path = path.resolve(config.fractal.component_path);
const assets_path = path.resolve(config.fractal.assets_path);
const build_path = path.resolve(config.fractal.build_path);
const base_path = path.resolve(theme_path, "src", "components");
const uswds_path = config.fractal.uswds_path ? config.fractal.uswds_path
  : "../contrib/uswds_base/templates";
const template_path = config.fractal.template_path ? config.fractal.template_path
  : "templates";
const theme_name = config.fractal.theme_name ? config.fractal.theme_name
  : "iq_uswds";
const templatePath = path.resolve(theme_path, template_path);
const uswdsPath = path.resolve(theme_path, uswds_path);

fractal.set("project.title", config.fractal.project_title);
fractal.components.set("path", component_path);
fractal.components.set("default.preview", "@iqsolutions");

fractal.web.set("static.mount", fractal_path);
fractal.web.set("static.path", assets_path);
fractal.web.set("builder.dest", build_path);

const loader = new TwingLoaderFilesystem([base_path]);
loader.addPath(base_path, "components");
loader.addPath(templatePath, theme_name);
loader.addPath(uswdsPath, "uswds");

const twingEnvironment = new twingAdapter.TwingDrupalEnvironment(loader, {
  autoescape: false,
  auto_reload: true,
});

twingEnvironment.addFilter(evenlyDistribute);

const twing = twingAdapter.createAdapter({
  environment: twingEnvironment,
  basePath: base_path,
});

fractal.components.engine(twing);
fractal.components.set("ext", ".twig");
