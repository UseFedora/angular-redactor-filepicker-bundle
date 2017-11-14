import babel from 'rollup-plugin-babel';

const entry = './src/angular-redactor';
const format = 'es';
const plugins = [
  babel({
    exclude: 'node_modules/**',
  }),
];

let dest = './angular-redactor-filepicker.js';

export default {
  dest,
  entry,
  format,
  plugins,
}
