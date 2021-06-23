// Load node modules
// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const fs = require('fs');
const async = require('async');
const colors = require('colors');
const path = require('path');
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

const displayProperties = `"displayProperties": {
  "account": {
      "pages": [
          {
              "key": "tnc",
              "title": "TNC"
          },
          {
              "key": "privacy-policy",
              "title": "PRIVACY_POLICY"
          },
          {
              "key": "faq",
              "title": "FAQS"
          }
      ]
  }
}`;

// create environment folders
['./src/environments', './src/assets/config']
  .map((relativePath) => path.resolve(__dirname, relativePath))
  .filter((fullPath) => !fs.existsSync(fullPath))
  .forEach((fullPath) => fs.mkdirSync(fullPath));

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
  apiHost: '${
    process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'
  }',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : false},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}'
};
`;

const appConfigFile = `{
  "app": "abenson",
  "appVersion": "${process.env.PERX_APP_VERSION ? process.env.PERX_APP_VERSION : 'dev-build'}",
  "apiHost": "${
    process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'
  }",
  "production": ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  "preAuth": ${process.env.PREAUTH ? process.env.PREAUTH : false},
  "isWhistler": ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : false},
  "baseHref": "${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}",
  "sourceType": "${process.env.SOURCE_TYPE ? process.env.SOURCE_TYPE : ''}",
  "redirectAfterLogin": "${
    process.env.redirectAfterLogin ? process.env.redirectAfterLogin : '/wallet'
  }",

  "showNewsfeedOnHomepage": ${
    process.env.SHOW_NEWSFEED_HOMEPAGE
      ? process.env.SHOW_NEWSFEED_HOMEPAGE
      : false
  },
  "showLoyaltyBlockOnHomePage": ${
    process.env.SHOW_LOYALTY_BLOCK_ON_HOMEPAGE
      ? process.env.SHOW_LOYALTY_BLOCK_ON_HOMEPAGE
      : true
  },
  "showLoyaltyProgress": ${
    process.env.SHOW_LOYALTY_PROGRESS ? process.env.SHOW_LOYALTY_PROGRESS : true
  },
  "showCatalogOnHomePage": ${
    process.env.SHOW_CATALOG_ON_HOMEPAGE
      ? process.env.SHOW_CATALOG_ON_HOMEPAGE
      : false
  },
  "showQuizOnHomePage" : ${
    process.env.SHOW_QUIZ_ON_HOMEPAGE
      ? process.env.SHOW_QUIZ_ON_HOMEPAGE
      : false
  },
  "showSurveyOnHomePage" : ${
    process.env.SHOW_SURVEY_ON_HOMEPAGE
      ? process.env.SHOW_SURVEY_ON_HOMEPAGE
      : false
  },
  "showStampCampaignsOnHomePage" : ${process.env.SHOW_STAMP_CAMPAIGNS_ON_HOMEPAGE
      ? process.env.SHOW_STAMP_CAMPAIGNS_ON_HOMEPAGE
      : false},
  "showReferralCampaignsOnHomePage" : ${process.env.SHOW_REFERRAL_CAMPAIGNS_ON_HOMEPAGE
      ? process.env.SHOW_REFERRAL_CAMPAIGNS_ON_HOMEPAGE
      : false},
  "showCampaignRewardsCounterOnHomepage": ${
    process.env.SHOW_CAMPAIGN_REWARDS_COUNTER_ON_HOMEPAGE
      ? process.env.SHOW_CAMPAIGN_REWARDS_COUNTER_ON_HOMEPAGE
      : false
  },
  "showRewardsOnHomepage": ${
    process.env.SHOW_REWARDS_ON_HOMEPAGE
      ? process.env.SHOW_REWARDS_ON_HOMEPAGE
      : true
  },
  "showCampaignLandingPage": ${
    process.env.SHOW_CAMPAIGN_LANDING_PAGE
      ? process.env.SHOW_CAMPAIGN_LANDING_PAGE
      : false
  },
  "showPopupCampaign": ${
    process.env.SHOW_POPUP_HOMEPAGE ? process.env.SHOW_POPUP_HOMEPAGE : false
  },
  "showUserInfoOnAccountsPage": ${
    process.env.SHOW_USERINFO_ACCOUNTS
      ? process.env.SHOW_USERINFO_ACCOUNTS
      : true
  },

  "custom": {
    "loginMethod": "${
      process.env.LOGIN_METHOD ? process.env.LOGIN_METHOD : 'phone'
    }",
    "comingSoon": ${process.env.COMING_SOON ? process.env.COMING_SOON : false},
    "cardBrandingImage": "${
      process.env.CARD_BRANDING_IMG
        ? process.env.CARD_BRANDING_IMG
        : 'assets/abenson_plus_banner.png'
    }"
  },
  ${displayProperties}
}
`;

// console.log(
//   colors.magenta(
//     'The file `environment.ts` will be written with the following content: \n'
//   )
// );
// console.log(colors.grey(envConfigFile));

async.each(
  [
    [angularTargetPath, envConfigFile],
    [appConfigPath, appConfigFile],
  ],
  (item: [[string, string], [string, string]], callback: any) => {
    // console.log(
    //   colors.magenta(
    //     `The file '${item[0]}' will be written with the following content: \n`
    //   )
    // );
    // console.log(colors.grey(item[1]));

    fs.writeFile(item[0], item[1], (err: any) => {
      if (err) {
        throw console.error(err);
      }
      // console.log(colors.magenta(`file generated correctly at ${item[0]} \n`));
      callback();
    });
  }
);
