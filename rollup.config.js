import uglify from 'rollup-plugin-uglify';

const plugins = [];
let dest = './angular-redactor-filepicker.js';

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify());
  dest = './angular-redactor-filepicker.min.js';
}

export default {
  output: {
    file: './angular-redactor-filepicker.js',
    format: 'umd',
  },
  input: './src/angular-redactor',
  plugins,
}
