const { TwingFilter } = require('twing');

const evenlyDistribute = new TwingFilter('evenly_distribute', (input, options = []) => {
  const numBuckets = options.length > 0 ? parseInt(options[0]) : 4;

  const inputMenu = input || [];

  // This can be a Map
  const menuItems = Array.isArray(inputMenu) ? [...inputMenu] : [...inputMenu.values()];

  const output = [];

  for (let i = numBuckets; i > 0; i--) {
    const results = menuItems.splice(0, Math.ceil(menuItems.length / numBuckets));

    if (results.length > 0) {
      output.push(results);
    }
  }

  return Promise.resolve(output);

}, { is_variadic: true });

module.exports = evenlyDistribute;