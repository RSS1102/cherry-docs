import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent, h } from 'vue'
import { checkCurrentDirectory } from '../../../vite-plugin/src/utils';

const directories = checkCurrentDirectory("./docs");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: directories.map((directory) => {
    return {
      path: `/${Object.keys(directory)[0]}`,
      name: Object.keys(directory)[0],
      component: () => Promise.resolve(defineComponent({
        render: () => h('div', 'Hello World')
      }))
    }
  })
})

export default router
