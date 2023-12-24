import * as fs from 'fs';
import { normalizePath } from '../../cherry-markdown-press/src/utils';
import { join, basename, relative, dirname, resolve } from 'path';
import { default as CherryEngine } from 'cherry-markdown/dist/cherry-markdown.engine.core.common';

/**
 * @description 解析路径
 * @param {string} filename
 * @returns {string} filePath
 */
export const resolvePath = (filename: string): string => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return resolve(__dirname, filename);
}

const html = CherryEngine.markhtml("# guide");
console.log(html);

const targetFile = 'docs'
const targetFilePath = normalizePath(process.cwd() + "/" + targetFile)

const checkCurrentDirectory = (targetFilePath: string): any[] => {
  let directories: any[] = [];
  try {
    const currentDirectoryFiles = fs.readdirSync(targetFilePath);
    currentDirectoryFiles.forEach((file) => {
      const fullPath = join(targetFilePath.toString(), file);
      const isDirectory = fs.statSync(fullPath).isDirectory();
      if (isDirectory) {
        directories = directories.concat(checkCurrentDirectory(fullPath));
      } else if (fullPath.endsWith('.md')) {
        const fileName = basename(fullPath, '.md');
        const relativePath = normalizePath(relative(process.cwd(), fullPath)).replace('.md', '').replace(targetFile + '/', '');
        const markdown = fs.readFileSync(fullPath, 'utf8');
        // const html = CherryEngine.markhtml(markdown);
        // console.log(html);

        const fileObject = {
          [relativePath]: {
            name: fileName,
            path: fullPath,
            markdown,
            // html
          }
        };
        directories.push(fileObject);
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }
  return directories;
}

const directories = checkCurrentDirectory(targetFilePath);
console.log(JSON.stringify(directories, null, 2));

