import fs from 'fs'
import { Plugin } from 'vite'
import { checkCurrentDirectory } from './utils'
export default function vitePluginCherryMarkdown(): Plugin {
  return {
    name: 'vite-plugin-cherry-markdown',
    transform(code, id) {
      const directories = checkCurrentDirectory("./docs");
      console.log(JSON.stringify(directories, null, 2));
    },
  }
}