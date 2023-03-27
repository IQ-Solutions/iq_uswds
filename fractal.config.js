const twingAdapter = require('@iq-solutions/fractal-twing');
const { TwingLoaderFilesystem } = require('twing');
const path = require('path');
const fractal = module.exports = require('@frctl/fractal').create();
const evenlyDistribute = require('./src/js/evenlyDistribute');

let settings = {
  themePath: path.resolve(__dirname),
  project_title: 'IQ USWDS',
  component_path: __dirname + '/src/components',
  assets_path: __dirname + '/assets',
  build_path: __dirname + '/build',
  basePath: path.resolve(path.resolve(__dirname), 'src', 'components'),
  uswds_path: '../contrib/uswds_base/templates',
  template_path: 'templates',
  theme_name: 'iq_uswds',
};

const init = () => {
  const twing_basepath = settings.basePath;
  fractal.set('project.title', settings.project_title);
  fractal.components.set('path',settings.component_path);
  fractal.components.set("default.preview", "@iqsolutions");

  fractal.web.set('static.mount', 'fractal');
  fractal.web.set('static.path', settings.assets_path);
  fractal.web.set('builder.dest', settings.build_path);

  const loader = new TwingLoaderFilesystem([settings.basePath]);
  loader.addPath(settings.basePath, 'components');
  loader.addPath(path.resolve(settings.themePath, settings.template_path), settings.theme_name);
  loader.addPath(path.resolve(settings.themePath, settings.uswds_path), 'uswds');

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
  fractal.components.set('ext', '.twig');
}

exports.settings = settings;
exports.init = init;
exports.fractal = fractal;
