/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ts-exercises-platform/',
  plugins: [
    react(),
    // @ts-expect-error for some reason vite doesn't resolve the plugin by default, so simply adding `.default` does the trick. however `.default` is not listed as a valid type, thus we have this ts-expect-error. https://github.com/vdesjs/vite-plugin-monaco-editor/issues/21
    monacoEditorPlugin.default({
      languageWorkers: [
        'css',
        'html',
        'json',
        'typescript',
        'editorWorkerService',
      ],
    }),
  ],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#root': path.resolve(__dirname),
    },
  },
});
