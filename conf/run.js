require('babel-register')({
	presets:['stage-0'],
  plugins: ['transform-es2015-modules-commonjs']
});
require('../src/main.js');