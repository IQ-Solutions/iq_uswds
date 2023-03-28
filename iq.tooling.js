const path = require('path');
const iq_uswds_path = path.resolve(__dirname);
const { src, dest, task } = require("gulp");
const uswds = require(`${iq_uswds_path}/node_modules/@uswds/compile`);
const log = console.log;
const fractal = require(`${iq_uswds_path}/fractal.config.js`);

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
  themePath: path.resolve(__dirname),
  project_title: "IQ USWDS",
  component_path: __dirname + "/src/components",
  assets_path: __dirname + "/assets",
  build_path: __dirname + "/build",
  basePath: path.resolve(path.resolve(__dirname), "src", "components"),
  uswds_path: "../contrib/uswds_base/templates",
  template_path: "templates",
  theme_name: "iq_uswds",
};

const fractalInit = () => {
  const twing_basepath = settings.basePath;
  fractal.set("project.title", settings.project_title);
  fractal.components.set("path", settings.component_path);
  fractal.components.set("default.preview", "@iqsolutions");

  fractal.web.set("static.mount", "fractal");
  fractal.web.set("static.path", settings.assets_path);
  fractal.web.set("builder.dest", settings.build_path);

  const loader = new TwingLoaderFilesystem([settings.basePath]);
  loader.addPath(settings.basePath, "components");
  loader.addPath(
    path.resolve(settings.themePath, settings.template_path),
    settings.theme_name
  );
  loader.addPath(
    path.resolve(settings.themePath, settings.uswds_path),
    "uswds"
  );

  const twingEnvironment = new twingAdapter.TwingDrupalEnvironment(loader, {
    autoescape: false,
    auto_reload: true,
  });

  twingEnvironment.addFilter(evenlyDistribute);

  const twing = twingAdapter.createAdapter({
    environment: twingEnvironment,
    twing_basepath,
  });

  fractal.components.engine(twing);
  fractal.components.set("ext", ".twig");
}

function startFractal() {
  fractalInit();
  const server = fractal.fractal.web.server({
    sync: true,
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.urls.sync.local}`);
  });
}

function buildFractal () {
  fractalInit();
  const builder = fractal.fractal.web.builder();
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
exports.startFractal = task('fractal:start', startFractal);
exports.buildFractal = task('fractal:build', buildFractal);
exports.copyImages = task('images:copy', copyImages);
exports.compile = uswds.compile;
exports.watch = uswds.watch;
exports.compileSass = uswds.compileSass;
exports.watch = uswds.watch;
exports.copyAll = uswds.copyAll;
