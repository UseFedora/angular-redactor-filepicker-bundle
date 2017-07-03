import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

const entry = './src/angular-redactor';
const format = 'umd';
const plugins = [
  babel({
    exclude: 'node_modules/**',
  }),
];

let dest = './angular-redactor-filepicker.js';

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify());
  dest = './angular-redactor-filepicker.min.js';
}

export default {
  dest,
  entry,
  format,
  plugins,
}
