'use strict';

import pkg from './package.json';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [{
    file: "dist/" + pkg.main,
    format: 'cjs',
    sourcemap: true,
  }, {
    file: "dist/" + pkg.browser,
    format: 'amd',
    name: 'metadata',
    sourcemap: true,
  }],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    terser(),
  ],
}
