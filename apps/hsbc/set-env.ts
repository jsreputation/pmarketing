// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const fs = require('fs');
const path = require('path');

const isModule = fs.existsSync(path.join(__dirname, '../../node_modules')) ||
  fs.existsSync(path.join(__dirname, '../../../node_modules'));

// Configure Angular `environment.ts` file path
const dirPath = path.join(__dirname, 'src/environments');
const targetPath = `${dirPath}/environment.ts`;

// Load node modules
const colors = require('colors');
require('dotenv').config();

// Debug environment variables

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `/* autogenerated with \`set-env.ts\` */

export const environment = {
  apiHost: '${process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'}',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : false},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}'
};
`;

if (!isModule) {
  // tslint:disable-next-line:no-console
  console.debug(colors.magenta('The file `environment.ts` will be written with the following content: \n'));

  // tslint:disable-next-line:no-console
  console.debug(colors.grey(envConfigFile));
}

fs.mkdirSync(dirPath, { recursive: true });

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    throw console.error(err);
  }

  if (!isModule) {
    // tslint:disable-next-line:no-console
    console.debug(colors.magenta(`Angular environment.ts file generated correctly \nat ${targetPath} \n`));
  }
});
