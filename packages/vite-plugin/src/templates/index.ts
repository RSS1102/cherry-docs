import fs, { existsSync, mkdirSync } from 'fs'
import path, { dirname } from 'path';
export const resolveTemplate = (routes: string[]) => {

  const fileName = 'home.vue';
  const fileDir = path.join(__dirname + '/' + fileName);
  const filePath = path.join(process.cwd(), 'src/_docs/template/', fileName);

  if (!existsSync(dirname(filePath))) {
    mkdirSync(dirname(filePath), { recursive: true });
  }
  fs.copyFileSync(fileDir, filePath);

  routes.push(`{
            path: '/',
            component: () => import('/src/_docs/template/' + '${fileName}')
          }`);
}