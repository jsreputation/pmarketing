// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const fs = require('fs');
const async = require('async');

// Configure Angular `environment.ts` file path
const targetPath = `./src/environments/environment.ts`;
const appConfigPath = `./src/assets/config/app-config.json`;
// Load node modules
const colors = require('colors');
require('dotenv').config();

// Debug environment variables

const displayProperties = `"display_properties": {
    "account": {
        "pages": [
            {
                "key": "contact-us",
                "title": "Contact Us",
                "content_url": "https://cdn.uat.whistler.perxtech.io/dev1/tenants/222222222/762b80fa-e4b3-11e9-81b4-2a2ae2dbcce4"
            },
            {
                "key": "tnc",
                "title": "Terms and Conditions",
                "content_url": "https://cdn.uat.whistler.perxtech.io/dev1/tenants/222222222/762b84ba-e4b3-11e9-81b4-2a2ae2dbcce4"
            }
        ]
    },
    "currency": "VND",
    "time_zone": 15,
    "theme.font": "Lato",
    "theme.logo": "https://cdn.uat.whistler.perxtech.io/dev1/tenants/222222222/b4e04bcc-6dc4-4eea-a9d1-9aa18ca43aa3",
    "theme.style": "Light",
    "theme.title": "",
    "theme.accent": "#0500cc",
    "theme.primary": "#edcf27",
    "showHistoryPage": true,
    "campaign_base_url": "https://generic-blackcomb-dev1.uat.whistler.perxtech.io/loading",
    "theme.header_color": "#0500cc",
    "theme.button_text_color": "#ffffff",
    "theme.button_background_color": "#0500cc"
  }`;

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
  apiHost: '${process.env.APIHOST ? process.env.APIHOST : 'https://api.getperx.io'}',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : false},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}',
  defaultLang: '${process.env.DEFAULT_LANG ? process.env.DEFAULT_LANG : 'en'}'
};
`;

const appConfigFile = `{
  "apiHost": "${process.env.APIHOST ? process.env.APIHOST : 'https://api.getperx.io'}",
  "production": ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  "preAuth": ${process.env.PREAUTH ? process.env.PREAUTH : false},
  "isWhistler": ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  "baseHref": "${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}",
  "defaultLang": "${process.env.DEFAULT_LANG ? process.env.DEFAULT_LANG : 'en'}",
  "showSubtitleLogin": ${process.env.SHOW_LOGIN_SUBTITLE ? process.env.SHOW_LOGIN_SUBTITLE : true},
  "showHomePage": ${process.env.SHOW_HOME_PAGE ? process.env.SHOW_HOME_PAGE : true},
  "showHistoryPage": ${process.env.SHOW_HISTORY_PAGE ? process.env.SHOW_HISTORY_PAGE : false},
  "showNewsfeedOnHomepage": ${process.env.SHOW_NEWSFEED_HOMEPAGE ? process.env.SHOW_NEWSFEED_HOMEPAGE : true},
  "showQrPageSubtitle": ${process.env.SHOW_QRPAGE_SUBTITLE ? process.env.SHOW_QRPAGE_SUBTITLE : true},
  "showExpiryOnRewardDetail": ${process.env.SHOW_EXPIRY_REWARD_DETAIL ? process.env.SHOW_EXPIRY_REWARD_DETAIL : false},
  "showUserInfoOnAccountsPage": ${process.env.SHOW_USERINFO_ACCOUNTS ? process.env.SHOW_USERINFO_ACCOUNTS : true},
  "showTransactionHistoryOnAccountsPage": ${process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS ? process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS : true},
  "showVoucherBookingFromRewardsPage": ${process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS ? process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS : true},
  "showBarcodeOnHomeProfilePage": ${process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS ? process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS : true},
  ${displayProperties}
}
`;

async.each([[targetPath, envConfigFile], [appConfigPath, appConfigFile]],
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
