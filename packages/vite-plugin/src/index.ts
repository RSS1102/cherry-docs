import fs, { existsSync, mkdirSync } from 'fs'
import outdent from 'outdent';
import { Plugin } from 'vite'
import { checkCurrentDirectory } from './utils'
import { dirname } from 'path';

export default function vitePluginCherryMarkdown(): Plugin {
  return {
    name: 'vite-plugin-cherry-markdown',
    resolveId(id) {
      console.log(id);
      if (id.startsWith('images/')) {
        return `/${id}`;
      }
    },
    load(id) {
      if (id.includes('src/main.ts')) {
        const directories = checkCurrentDirectory("docs");

        const routes = directories.map((directory) => {
          const filePath = directory.filePath.replace('.md', '.vue').replace('docs', 'src/_docs');
          const fileDir = dirname(filePath);

          if (!existsSync(fileDir)) {
            mkdirSync(fileDir, { recursive: true });
          }

          fs.writeFileSync(filePath,
            `<template>
           ${directory.html}
           </template>`);

          return `{
            path: '${directory.path}',
            component: () => import('/src/_docs${directory.path + '.vue'}')
          }`.replace(/\n/g, '');
        });


        return `
        import { createRouter, createWebHistory } from 'vue-router'
        import { createSSRApp, defineComponent, h } from 'vue'
        import App from './App.vue'

        const app = createSSRApp(App)
        const router = createRouter({
          history: createWebHistory(),
          routes: [${routes}]
        })
        app.use(router)
        app.mount('#app')
        `
      }
    },
  }
}