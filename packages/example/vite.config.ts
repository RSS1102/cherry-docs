import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginCherryMarkdown from '../vite-plugin/src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginCherryMarkdown()], 
})
