const twigAdapter = require('@netzstrategen/fractal-twig');
const fractal = module.exports = require('@frctl/fractal').create();

fractal.set('project.title', 'IQ USWDS');
fractal.components.set('path', __dirname + '/src/components');
fractal.components.set("default.preview", "@iqsolutions");

fractal.web.set('static.mount', 'fractal');
fractal.web.set('static.path', __dirname + '/assets');
fractal.web.set('builder.dest', __dirname + '/build');

const twig = twigAdapter({
  handlePrefix: '@components/',
  drupalRoot: process.cwd(),
});

fractal.components.engine(twig);
fractal.components.set('ext', '.twig');

module.exports = fractal;