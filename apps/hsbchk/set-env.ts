const fs = require('fs');
const async = require('async');

// Configure Angular `environment.ts` file path
const targetPath = `./src/environments/environment.ts`;
const appConfigPath = `./src/assets/config/app-config.json`;

// Load node modules
const colors = require('colors');
require('dotenv').config();

// Debug environment variables
const displayProperties = `"displayProperties": {
  "account": {
    "pages": [
      {
        "title": "ACCOUNT_PAGE.LIFE_TALK",
        "content_url": "https://retailbank.hsbc.com.hk/ins/en/lifetalk/blog/"
      },
      {
        "key": "tnc",
        "title": "ACCOUNT_PAGE.TNC",
        "content_url": "https://cdn.perxtech.io/content/hsbc-hk/tnc.html"
      },
      {
        "key": "privacy-policy",
        "title": "ACCOUNT_PAGE.PRIVACY_POLICY",
        "content_url": "https://cdn.perxtech.io/content/hsbc-hk/ppolicy.html"
      }
    ]
  }
}`;

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
  apiHost: '${process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'}',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : true},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : true},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}',
  defaultLang: '${process.env.DEFAULT_LANG ? process.env.DEFAULT_LANG : 'en'}'
};
`;

const appConfigFile = `{
  "app": "hsbchk",
  "apiHost": "${process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'}",
  "production": ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  "preAuth": ${process.env.PREAUTH ? process.env.PREAUTH : true},
  "isWhistler": ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : true},
  "baseHref": "${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}",
  "defaultLang": "${process.env.DEFAULT_LANG ? process.env.DEFAULT_LANG : 'en'}",

  "showSubtitleLogin": ${process.env.SHOW_LOGIN_SUBTITLE ? process.env.SHOW_LOGIN_SUBTITLE : false},
  "showForgetPasswordOnLogin": ${process.env.SHOW_FORGET_PASSWORD_ON_LOGIN ? process.env.SHOW_FORGET_PASSWORD_ON_LOGIN : false},
  "redirectBeforeLogin": ${process.env.REDIRECT_BEFORE_LOGIN ? process.env.REDIRECT_BEFORE_LOGIN : '"/welcome"'},

  "countryCodePrefix": "${process.env.COUNTRY_CODE_PREFIX ? process.env.COUNTRY_CODE_PREFIX : ''}",
  "showHomePage": ${process.env.SHOW_HOME_PAGE ? process.env.SHOW_HOME_PAGE : false},
  "showHistoryPage": ${process.env.SHOW_HISTORY_PAGE ? process.env.SHOW_HISTORY_PAGE : true},
  "showAccountsPage": ${process.env.SHOW_ACCOUNTS_PAGE ? process.env.SHOW_ACCOUNTS_PAGE : true},

  "showNewsfeedOnHomepage": ${process.env.SHOW_NEWSFEED_HOMEPAGE ? process.env.SHOW_NEWSFEED_HOMEPAGE : false},
  "showLoyaltyBlockOnHomePage": ${process.env.SHOW_LOYALTY_BLOCK_ON_HOMEPAGE ? process.env.SHOW_LOYALTY_BLOCK_ON_HOMEPAGE : true},
  "showLoyaltyProgress": ${process.env.SHOW_LOYALTY_PROGRESS ? process.env.SHOW_LOYALTY_PROGRESS : false},
  "showCatalogOnHomePage": ${process.env.SHOW_CATALOG_ON_HOMEPAGE ? process.env.SHOW_CATALOG_ON_HOMEPAGE : true},
  "showQuizOnHomePage" : ${process.env.SHOW_QUIZ_ON_HOMEPAGE ? process.env.SHOW_QUIZ_ON_HOMEPAGE : false},
  "showCampaignRewardsCounterOnHomepage": ${process.env.SHOW_CAMPAIGN_REWARDS_COUNTER_ON_HOMEPAGE ? process.env.SHOW_CAMPAIGN_REWARDS_COUNTER_ON_HOMEPAGE : false},
  "showRewardsOnHomepage": ${process.env.SHOW_REWARDS_ON_HOMEPAGE ? process.env.SHOW_REWARDS_ON_HOMEPAGE : false},
  "showCampaignLandingPage": ${process.env.SHOW_CAMPAIGN_LANDING_PAGE ? process.env.SHOW_CAMPAIGN_LANDING_PAGE : false},

  "showQrPageSubtitle": ${process.env.SHOW_QRPAGE_SUBTITLE ? process.env.SHOW_QRPAGE_SUBTITLE : false},
  "showUserQR": ${process.env.SHOW_USER_QR ? process.env.SHOW_USER_QR : true},
  "showExpiryOnRewardDetail": ${process.env.SHOW_EXPIRY_REWARD_DETAIL ? process.env.SHOW_EXPIRY_REWARD_DETAIL : true},
  "showUserInfoOnAccountsPage": ${process.env.SHOW_USERINFO_ACCOUNTS ? process.env.SHOW_USERINFO_ACCOUNTS : false},
  "showTransactionHistoryOnAccountsPage": ${process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS ? process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS : false},
  "showLuckyDrawDetailsOnAccountsPage": ${process.env.SHOW_LUCK_ON_ACCOUNTPAGE ? process.env.SHOW_LUCK_ON_ACCOUNTPAGE : false},
  "showReferralOnAccountsPage": ${process.env.SHOW_REFER_ON_ACCOUNTPAGE ? process.env.SHOW_REFER_ON_ACCOUNTPAGE : false},
  "showVoucherBookingFromRewardsPage":  ${process.env.SHOW_VOUCHER_BOOKING_FROM_REWARDS ? process.env.SHOW_VOUCHER_BOOKING_FROM_REWARDS : false},
  "custom": {
    "stampsType": "${process.env.STAMPS_TYPE ? process.env.STAMPS_TYPE : 'stamp_card'}",
    "redirectAfterLogin": "${process.env.REDIRECT_AFTER_LOGIN ? process.env.REDIRECT_AFTER_LOGIN : '/wallet'}"
  },
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
