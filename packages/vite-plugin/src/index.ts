import fs from 'fs'
import { Plugin } from 'vite'
import { checkCurrentDirectory } from './utils'

export default function vitePluginCherryMarkdown(): Plugin {
  return {
    name: 'vite-plugin-cherry-markdown',
    load(id) {
      if (id.includes('src/main.ts')) {
        const directories = checkCurrentDirectory("docs");
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
        import { createApp, defineComponent, h } from 'vue'
        import App from './App.vue'

        const app = createApp(App)
        const router = createRouter({
          history: createWebHistory(),
          routes: [${routesStr}]
        })
        app.use(router)
        app.mount('#app')
        `
      }
    },
  }
}