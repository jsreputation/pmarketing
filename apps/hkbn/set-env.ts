const fs = require('fs');

// Configure Angular `environment.ts` file path
const targetPath = `./src/environments/environment.ts`;

// Load node modules
const colors = require('colors');
require('dotenv').config();

// Debug environment variables

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

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});
