import fs, { existsSync, mkdirSync } from 'fs'
import { Plugin } from 'vite'
import { checkCurrentDirectory } from './utils'
import { dirname } from 'path';
import { resolveTemplate } from './templates';

export default function vitePluginCherryMarkdown(): Plugin {
  return {
    name: 'vite-plugin-cherry-markdown',
    resolveId(id) {
      if (id.startsWith('images/')) {
        return `/assets/${id}`;
      }
    },
    load(id) {
      if (id.includes('src/main.ts')) {

        const routes = [`{
                  path: '/',
                  component: () => import('/src/_docs/template/home.vue')
                }`]



        const directories = checkCurrentDirectory("docs");

        directories.map((directory) => {
          directory.intro.map((intro) => {
            const filePath = intro.filePath.replace('.md', '.vue').replace('docs', 'src/_docs');
            const fileDir = dirname(filePath);

            if (!existsSync(fileDir)) mkdirSync(fileDir, { recursive: true });
            fs.writeFileSync(filePath,
              `<template>
                  <div class="cherry-markdown theme__violet" data-toolbar-theme="dark" data-inline-code-theme="red" data-code-block-theme="twilight">
                 ${intro.html}
                 </div>
                 </template>`
            );
          });
          routes.push(
            `{
                  path: '/${directory.rootPath}',
                  component: () => import('/src/_docs/template/layout.vue'),
                  children:[
                   ${directory.intro.map((intro) => `
                    {
                    path: '${intro.path}',
                    component: () => import('/src/_docs${intro.path}.vue')
                    }`
            )}
           ]
          }`
          );
        });
        resolveTemplate();

        return `
              import { createRouter, createWebHistory } from 'vue-router'
              import { createSSRApp, defineComponent, h } from 'vue'
              import 'cherry-markdown/dist/cherry-markdown.css'
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