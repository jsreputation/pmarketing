// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const { version } = require('./package.json');
const fs = require('fs');
const async = require('async');
import * as path from 'path';
const colors = require('colors');
require('dotenv').config();

// Configure Angular `environment.ts` file path
const angularTargetPath = path.resolve(
  __dirname,
  './src/environments/environment.ts'
);
const appConfigPath = path.resolve(
  __dirname,
  './src/assets/config/app-config.json'
);
const rssFeedsPath = path.resolve(
  __dirname,
  './src/assets/config/RSS_FEEDS.json'
);

// Debug environment variables

const rssFeeds = `{
  "data": [
    {
      "url": "${
  process.env.RSS_FEEDS
    ? process.env.RSS_FEEDS
    : 'https://cdn.perxtech.io/content/starhub/rss.xml'
  }",
      "page": "home"
    }
  ]
}`;

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
  apiHost: '${
  process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'
  }',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : false},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}',
  appVersion: '${version}'
};
`;

const appConfigFile = `{
  "apiHost": "${
  process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'
  }",
  "production": ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  "preAuth": ${process.env.PREAUTH ? process.env.PREAUTH : false},
  "isWhistler": ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  "baseHref": "${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}"
}
`;

async.each(
  [
    [angularTargetPath, envConfigFile],
    [appConfigPath, appConfigFile],
    [rssFeedsPath, rssFeeds]
  ],
  (item: [[string, string], [string, string]], callback: any) => {
    console.log(
      colors.magenta(
        `The file '${item[0]}' will be written with the following content: \n`
      )
    );
    console.log(colors.grey(item[1]));

    fs.writeFile(item[0], item[1], (err: any) => {
      if (err) {
        throw console.error(err);
      }
      console.log(colors.magenta(`file generated correctly at ${item[0]} \n`));
      callback();
    });
  }
);
