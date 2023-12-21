import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import run from '@rollup/plugin-run';

export default {
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [typescript(), nodeResolve(), commonjs(), run()]
};