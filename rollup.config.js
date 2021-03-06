import resolve from '@rollup/plugin-node-resolve'
import multiInput from 'rollup-plugin-multi-input'
import multiEntry from '@rollup/plugin-multi-entry'
import del from 'rollup-plugin-delete'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import polyfills from 'rollup-plugin-node-polyfills'
import inject from '@rollup/plugin-inject'
import babel from '@rollup/plugin-babel'
import path from 'path'
import pkg from './package.json'

const dev = !!process.env.ROLLUP_WATCH

const onwarnRollup = (warning, onwarn) => {
  // prevent warn: (!) `this` has been rewritten to `undefined`
  // if ( warning.code === 'THIS_IS_UNDEFINED' ) {
  //   return false
  // }
  // if ( warning.code === 'EVAL' ) {
  //   return false
  // }
  // if ( warning.code === 'SOURCEMAP_ERROR' ) {
  //   return false
  // }
  // if ( warning.plugin === 'typescript' && /Rollup 'sourcemap' option must be set to generate source maps/.test(warning.message)) {
  //   return false
  // }

  console.warn('onwarnRollup',
    [
      `${warning.code}: ${warning.message}`,
      warning.loc && `${warning.loc.file}:${warning.loc.line}:${warning.loc.column}`,
      warning.plugin && `plugin: ${warning.plugin}`,
      warning.pluginCode && `pluginCode: ${warning.pluginCode}`,
      warning.hook && `hook: ${warning.hook}`,
      warning.frame,
    ]
      .map(o => o?.toString()?.trim())
      .filter(o => o)
      .join('\r\n') + '\r\n',
  )

  return false
}

const aliasOptions = {
  entries: [
    {
      find       : 'src',
      replacement: path.resolve(__dirname, 'src'),
    },
  ],
}

const nodeConfig = {
  cache: true,
  input: [
    'src/**/*.ts',
  ],
  output: {
    dir           : 'dist/node',
    format        : 'cjs',
    exports       : 'named',
    entryFileNames: '[name].cjs',
    chunkFileNames: '[name].cjs',
    sourcemap     : dev,
  },
  plugins: [
    del({ targets: 'dist/node/*' }),
    multiInput(),
    alias(aliasOptions),
    json(),
    replace({
      preventAssignment: true,
    }),
    resolve(),
    commonjs({
      transformMixedEsModules: true,
    }),
    typescript({
      sourceMap: dev,
    }),
  ],
  onwarn  : onwarnRollup,
  external: Object.keys(pkg.dependencies)
    .concat(Object.keys(pkg.devDependencies))
    .concat(require('module').builtinModules || Object.keys(process.binding('natives'))),
}

const browserTestsConfig = {
  cache: true,
  input: [
    'src/helpers/test/show-useragent.ts',
    'src/helpers/test/register.ts',
    'src/**/*.test.ts',
  ],
  output: {
    dir      : 'dist/browser',
    format   : 'iife',
    exports  : 'named',
    sourcemap: 'inline',
  },
  plugins: [
    del({ targets: 'dist/browser/browser.test.js' }),
    multiEntry({
      entryFileName: 'browser.test.js',
    }),
    alias(aliasOptions),
    json(),
    replace({
      preventAssignment: true,
    }),
    resolve({
      browser       : true,
      preferBuiltins: false,
    }),
    commonjs({
      transformMixedEsModules: true,
    }),
    inject({
      global: require.resolve('rollup-plugin-node-polyfills/polyfills/global.js'),
    }),
    polyfills(),
    typescript({
      sourceMap      : true,
      compilerOptions: {
        target: 'es5',
      },
    }),
    babel({
      extensions  : ['.ts', '.js', '.cjs', '.mjs'],
      babelHelpers: 'runtime',
      exclude     : [
        'node_modules/rollup*/**',
        'node_modules/tslib/**',
        'node_modules/@babel/**',
        'node_modules/core-js*/**',
      ],
    }),
  ],
  onwarn: onwarnRollup,
}

export default [
  nodeConfig,
  browserTestsConfig,
]
