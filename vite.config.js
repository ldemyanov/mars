import { defineConfig } from 'vite';
import legacyPlugin from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    legacyPlugin({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.filter',
        'es.array.for-each',
        'es.array.flat-map',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    })
  ],
  css: {
    postcss: {
      config: {
        path: __dirname,
      },
    },
  },
  build: {
    target: ['es2015'],
  }
});