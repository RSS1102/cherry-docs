import fs from 'fs'
import { Plugin } from 'vite'
export default function vitePluginCherryMarkdown(): Plugin {
  return {
    name: 'vite-plugin-cherry-markdown',
    transform(code, id) {
      const md = fs.readFileSync("./index.md").toString()
      console.log(md)
    },
  }
}