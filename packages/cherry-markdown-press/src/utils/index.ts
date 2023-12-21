import { win32, posix, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';


/**
 * @description 标准化路径
 * @param {string}filename
 * @returns {string} filePath
 */
export const normalizePath = (filename: string): string => {
  return filename.split(win32.sep).join(posix.sep);
}

/**
 * @description 解析路径
 * @param {string} filename
 * @returns {string} filePath
 */
export const resolvePath = (filename: string): string => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return resolve(__dirname, filename);
}
