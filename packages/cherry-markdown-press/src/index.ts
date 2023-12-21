import { normalizePath } from './utils';

const targetFilePath = normalizePath(process.cwd() + "/" + 'docs')

console.log(targetFilePath)