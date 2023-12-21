import * as fs from 'fs';
import { normalizePath } from './utils';
import { join, basename, relative } from 'path';
import { error } from 'console';

const targetFilePath = normalizePath(process.cwd() + "/" + 'docs')

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
        const relativePath = normalizePath(relative(process.cwd(), fullPath)).replace('.md', '').replace('docs/', '');
        const fileObject = {
          [relativePath]: {
            name: fileName,
            path: fullPath,

          }
        };
        directories.push(fileObject);
      }
    });
  } catch (e) {
    console.error(e);
    throw error(e);
  }
  return directories;
}

const directories = checkCurrentDirectory(targetFilePath);
console.log(JSON.stringify(directories, null, 2));