import { basename, dirname, join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { normalizePath } from 'vite';
import defaultConfig from './cherry.config';

const { default: CherryEngine } = require('cherry-markdown/dist/cherry-markdown.engine.core.common');

const cherryEngineInstance = new CherryEngine(defaultConfig);

/**
 * @description 解析路径
 * @param {string} filename
 * @returns {string} filePath
 */
export const resolvePath = (filename: string): string => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return resolve(__dirname, filename);
}

/**
 * @description 获取当前文件夹下的所有文件
 * @param {string} targetFilePath
 */
export const checkCurrentDirectory = (targetFilePath: string): Directories[] => {
  let directories: Directories[] = [];
  try {
    const currentDirectoryFiles = fs.readdirSync(targetFilePath);

    currentDirectoryFiles.forEach((file) => {
      const fullPath = join(targetFilePath.toString(), file);
      const isDirectory = fs.statSync(fullPath).isDirectory();

      if (isDirectory) {
        directories = directories.concat(checkCurrentDirectory(fullPath));
      } else if (fullPath.endsWith('.md')) {
        const fileName = basename(fullPath, '.md');

        const relativePath = normalizePath(relative(process.cwd(), fullPath)).replace('.md', '').replace('docs', '');
        const rootPath = relativePath.split('/')[1] || '';

        // if (relativePath === '/index') relativePath = '/';

        const markdown = fs.readFileSync(fullPath, 'utf8');
        const html = cherryEngineInstance.makeHtml(markdown);
        const fileObject = {
          path: relativePath,
          name: fileName,
          filePath: fullPath,
          markdown,
          html,
        }
        const directoryIndex = directories.findIndex(dir => dir.rootPath === rootPath);
        if (directoryIndex !== -1) {
          directories[directoryIndex].intro.push(fileObject);
        } else {
          directories.push({
            rootPath,
            intro: [fileObject]
          });
        }
      };
    });
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }

  return directories;
};