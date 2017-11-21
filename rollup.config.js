import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const entry = './src/angular-redactor';
const format = 'es';
const plugins = [
  eslint(),
  babel({
    exclude: 'node_modules/**',
  }),
  resolve({
    module: true,
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
