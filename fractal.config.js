const twingAdapter = require('@iq-solutions/fractal-twing');
const { TwingLoaderFilesystem } = require('twing');
const path = require('path');
const fractal = module.exports = require('@frctl/fractal').create();
const evenlyDistribute = require('./src/js/evenlyDistribute');

fractal.set('project.title', 'IQ USWDS');
fractal.components.set('path', __dirname + '/src/components');
fractal.components.set("default.preview", "@iqsolutions");

fractal.web.set('static.mount', 'fractal');
fractal.web.set('static.path', __dirname + '/assets');
fractal.web.set('builder.dest', __dirname + '/build');

const themePath = path.resolve(__dirname);
const basePath = path.resolve(themePath, 'src', 'components');

const loader = new TwingLoaderFilesystem([basePath]);
loader.addPath(basePath, 'components');
loader.addPath(path.resolve(themePath, 'templates'), 'nia');
loader.addPath(path.resolve(themePath, '../contrib/uswds_base/templates'), 'uswds');

const twingEnvironment = new twingAdapter.TwingDrupalEnvironment(loader, {
  autoescape: false,
  auto_reload: true,
});

twingEnvironment.addFilter(evenlyDistribute);

const twing = twingAdapter.createAdapter({
  environment: twingEnvironment,
  basePath,
});

fractal.components.engine(twing);
fractal.components.set('ext', '.twig');

exports.fractal = fractal;
