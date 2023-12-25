import fs from 'fs'
import { Plugin } from 'vite'
import { checkCurrentDirectory } from './utils'
const { default: CherryEngine } = require('cherry-markdown/dist/cherry-markdown.engine.core.common');

const cherryEngineInstance = new CherryEngine({});

export default function vitePluginCherryMarkdown(): Plugin {
  return {
    name: 'vite-plugin-cherry-markdown',
    transform(code, id) {
      const directories = checkCurrentDirectory("./docs");
      // console.log(JSON.stringify(directories, null, 2));

      const html = cherryEngineInstance.makeHtml("## Hello World");
      console.log(html);
    },
  }
}