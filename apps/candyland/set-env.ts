// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const fs = require('fs');

// Configure Angular `environment.ts` file path
const targetPath = `./src/environments/environment.ts`;

// Load node modules
const colors = require('colors');
require('dotenv').config();

// Debug environment variables

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
  apiHost: '${process.env.APIHOST ? process.env.APIHOST : 'https://api-dev1.uat.whistler.perxtech.io'}',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : false},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}',
  apiCdn: '${process.env.APIFILE ? process.env.APIFILE : 'https://cdn.uat.whistler.perxtech.io/dev1/'}'
};
`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
//
fs.writeFile(targetPath, envConfigFile, (err: any) => {
  if (err) {
    throw console.error(err);
  }
  console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
});
