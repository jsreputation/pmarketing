// Load node modules
// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
import { writeFile } from 'fs'; // fs = require('fs');
const colors = require('colors');
const path = require('path');
require('dotenv').config();

// Configure Angular `environment.ts` file path
const targetPath = path.resolve(__dirname, './src/environments/environment.ts');

// create environment folders
['./src/environments', './src/assets/config']
  .map(relativePath => path.resolve(__dirname, relativePath))
  .filter(fullPath => !fs.existsSync(fullPath))
  .forEach(fullPath => fs.mkdirSync(fullPath));


// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
  apiHost: '${process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'}',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : false},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}'
};
`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    throw console.error(err);
  }
  console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
});
