import { Plugin } from 'vite'
import { checkCurrentDirectory } from './utils'
import router from './route';

export default function vitePluginCherryMarkdown(): Plugin {
  return {
    name: 'vite-plugin-cherry-markdown',
    transform(code, id) {

    },
    load(id) {

      if (id.includes('router')) {
        const directories = checkCurrentDirectory("./docs");
        const routes = directories.map((directory) => {
          return {
            path: directory.path,
            name: directory.path,
            component: `() => Promise.resolve(defineComponent({
             template: \`${directory.html}\`
             }))`
          }
        });
        const routesStr = routes.map(route =>
          `{path: "${route.path}", name: "${route.name}", component: ${route.component}}`
        ).join(',');

        return `
               import { createRouter, createWebHistory } from 'vue-router'
               import { defineComponent, h } from 'vue'

              const router = createRouter({
                history: createWebHistory(),
                  routes: [${routesStr}]
              })
              export default router
        `
      }
    },
  }
}