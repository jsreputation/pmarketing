// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const fs = require('fs');
const async = require('async');

// Configure Angular `environment.ts` file path
const targetPath = `./src/environments/environment.ts`;
const appConfigPath = `./src/assets/config/app-config.json`;
const rssFeedsPath = `./src/assets/config/RSS_FEEDS.json`;

// Load node modules
const colors = require('colors');
require('dotenv').config();

// Debug environment variables

// create environment folder
let envFolderPath ='./src/environments';
if (!fs.existsSync(envFolderPath)){
  fs.mkdirSync(envFolderPath);
}
// create config folder
let configFolderPath ='./src/assets/config';
if (!fs.existsSync(configFolderPath)){
  fs.mkdirSync(configFolderPath);
}


const rssFeeds = `{
  "data": [
    {
      "url": "${process.env.RSS_FEEDS ? process.env.RSS_FEEDS : ''}",
      "page": "home"
    }
  ]
}`;

const displayProperties = `"displayProperties": {
  "account": {
      "pages": [
          {
              "key": "contact-us",
              "title": "Contact Us",
              "content_url": "${process.env.CONTACTUSURL ? process.env.CONTACTUSURL : ''}"
          },
          {
              "key": "tnc",
              "title": "Terms and Conditions",
              "content_url": "${process.env.TNCURL ? process.env.TNCURL : ''}"
          }
      ]
  }
}`;

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
  apiHost: '${process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'}',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : true},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}',
  defaultLang: '${process.env.DEFAULT_LANG ? process.env.DEFAULT_LANG : 'en'}'
};
`;

const appConfigFile = `{
  "app": "phillipssg",
  "apiHost": "${process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'}",
  "production": ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  "preAuth": ${process.env.PREAUTH ? process.env.PREAUTH : true},
  "isWhistler": ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  "baseHref": "${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}",
  "defaultLang": "${process.env.DEFAULT_LANG ? process.env.DEFAULT_LANG : 'en'}",
  "showSubtitleLogin": ${process.env.SHOW_LOGIN_SUBTITLE ? process.env.SHOW_LOGIN_SUBTITLE : false},
  "showHomePage": ${process.env.SHOW_HOME_PAGE ? process.env.SHOW_HOME_PAGE : false},
  "showHistoryPage": ${process.env.SHOW_HISTORY_PAGE ? process.env.SHOW_HISTORY_PAGE : true},
  "showAccountsPage": ${process.env.SHOW_ACCOUNTS_PAGE ? process.env.SHOW_ACCOUNTS_PAGE : false},

  "showLoyaltyBlockOnHomePage": ${process.env.SHOW_LOYALTY_BLOCK_ON_HOMEPAGE ? process.env.SHOW_LOYALTY_BLOCK_ON_HOMEPAGE : true},
  "showLoyaltyProgress": ${process.env.SHOW_LOYALTY_PROGRESS ? process.env.SHOW_LOYALTY_PROGRESS : true},
  "showCatalogOnHomePage": ${process.env.SHOW_CATALOG_ON_HOMEPAGE ? process.env.SHOW_CATALOG_ON_HOMEPAGE : true},
  "showQuizOnHomePage" : ${process.env.SHOW_QUIZ_ON_HOMEPAGE ? process.env.SHOW_QUIZ_ON_HOMEPAGE : false},
  "showCampaignRewardsCounterOnHomepage": ${process.env.SHOW_CAMPAIGN_REWARDS_COUNTER_ON_HOMEPAGE ? process.env.SHOW_CAMPAIGN_REWARDS_COUNTER_ON_HOMEPAGE : false},
  "showRewardsOnHomepage": ${process.env.SHOW_REWARDS_ON_HOMEPAGE ? process.env.SHOW_REWARDS_ON_HOMEPAGE : true},
  "showCampaignLandingPage": ${process.env.SHOW_CAMPAIGN_LANDING_PAGE ? process.env.SHOW_CAMPAIGN_LANDING_PAGE : false},

  "showQrPageSubtitle": ${process.env.SHOW_QRPAGE_SUBTITLE ? process.env.SHOW_QRPAGE_SUBTITLE : false},
  "showUserQR": ${process.env.SHOW_USER_QR ? process.env.SHOW_USER_QR : true},
  "showExpiryOnRewardDetail": ${process.env.SHOW_EXPIRY_REWARD_DETAIL ? process.env.SHOW_EXPIRY_REWARD_DETAIL : true},
  "showUserInfoOnAccountsPage": ${process.env.SHOW_USERINFO_ACCOUNTS ? process.env.SHOW_USERINFO_ACCOUNTS : false},
  "showTransactionHistoryOnAccountsPage": ${process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS ? process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS : false},
  "showVoucherBookingFromRewardsPage":  ${process.env.SHOW_VOUCHER_BOOKING_FROM_REWARDS ? process.env.SHOW_VOUCHER_BOOKING_FROM_REWARDS : false},
  "custom": {
    "stampsType": "${process.env.STAMPS_TYPE ? process.env.STAMPS_TYPE : 'stamp_card'}",
    "redirectAfterLogin": "${process.env.REDIRECT_AFTER_LOGIN ? process.env.REDIRECT_AFTER_LOGIN : '/wallet'}"
  },
  ${displayProperties}
}
`;

async.each([[targetPath, envConfigFile], [appConfigPath, appConfigFile], [rssFeedsPath, rssFeeds]],
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
