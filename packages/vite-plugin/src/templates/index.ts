import fs from 'fs'
import path from 'path';

/**
 * @description 递归copy当前目录下的.vue文件到src/_docs/template目录下
 * @param dir 
 * @param baseDir 
 */
export const resolveTemplate = (dir = __dirname, baseDir = __dirname) => {
  // 当前目录下的文件包含.vue的文件
  const directories = fs.readdirSync(dir, { withFileTypes: true });

  directories.forEach(dirent => {
    const fullPath = path.join(dir, dirent.name);

    if (dirent.isDirectory()) {
      resolveTemplate(fullPath, baseDir); // 递归处理子目录
    } else if (path.extname(dirent.name) === '.vue') {
      const relativePath = path.relative(baseDir, fullPath);
      const filePath = path.join(process.cwd(), 'src/_docs/template/', relativePath);

      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      fs.copyFileSync(fullPath, filePath);
    }
  });
};