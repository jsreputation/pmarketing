// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const fs = require('fs');
const async = require('async');
// Configure Angular `environment.ts` file path
const angularTargetPath = `./src/environments/environment.ts`;
const appConfigPath = `./src/assets/config/app-config.json`;

// Load node modules
const colors = require('colors');
require('dotenv').config();

// Debug environment variables

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
  apiHost: '${process.env.APIHOST ? process.env.APIHOST : 'https://api.getperx.io'}',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : false},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}'
};
`;

const appConfigFile = `{
  "apiHost": "${process.env.APIHOST ? process.env.APIHOST : 'https://api.getperx.io'}",
  "production": ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  "preAuth": ${process.env.PREAUTH ? process.env.PREAUTH : false},
  "isWhistler": ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  "baseHref": "${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}",
  "sourceType": "${process.env.SOURCE_TYPE ? process.env.SOURCE_TYPE : ''}",
  "campaignId": "${process.env.CAMPAIGN_ID ? process.env.CAMPAIGN_ID : ''}"
}
`;

async.each([[angularTargetPath, envConfigFile], [appConfigPath, appConfigFile]],
  (item: [[string, string], [string, string]], callback: any) => {

    console.log(colors.magenta(`The file '${item[0]}' will be written with the following content: \n`));
    console.log(colors.grey(item[1]));

    fs.writeFile(item[0], item[1], (err: any) => {
      if (err) {
        throw console.error(err);
      }
      console.log(colors.magenta(`file generated correctly at ${item[0]} \n`));
      callback();
    });
  });
