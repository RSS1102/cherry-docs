import * as fs from 'fs';
import { default as CherryEngine } from 'cherry-markdown/dist/cherry-markdown.engine.core.common';
import { normalizePath } from 'vite';
import { basename, join, relative } from 'path';




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

