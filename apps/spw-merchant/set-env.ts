// Load node modules
// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const fs = require('fs');
const async = require('async');
const path = require('path');
require('dotenv').config();

// Configure Angular `environment.ts` file path
const angularTargetPath = path.resolve(__dirname, './src/environments/environment.ts');
const appConfigPath = path.resolve(__dirname, './src/assets/config/app-config.json');

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

const appConfigFile = `{
  "app": "spw-merchant",
  "appVersion": "${process.env.PERX_APP_VERSION ? process.env.PERX_APP_VERSION : 'dev-build'}",
  "apiHost": "${process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'}",
  "production": ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  "preAuth": ${process.env.PREAUTH ? process.env.PREAUTH : false},
  "isWhistler": ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  "baseHref": "${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}",
  "sourceType": "${process.env.SOURCE_TYPE ? process.env.SOURCE_TYPE : ''}"
}
`;

async.each([[angularTargetPath, envConfigFile], [appConfigPath, appConfigFile]],
    (item: [[string, string], [string, string]], callback: any) => {

        fs.writeFile(item[0], item[1], (err: any) => {
            if (err) {
                throw console.error(err);
            }

            callback();
        });
    });
