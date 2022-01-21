// Load node modules
// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const fs = require('fs');
const async = require('async');
const path = require('path');
const colors = require('colors');
require('dotenv').config();

// Configure Angular `environment.ts` file path
const targetPath = path.resolve(__dirname, './src/environments/environment.ts');
const appConfigPath = path.resolve(
  __dirname,
  './src/assets/config/app-config.json'
);
const rssFeedsPath = path.resolve(
  __dirname,
  './src/assets/config/RSS_FEEDS.json'
);

// create environment folders
['./src/environments', './src/assets/config']
  .map((relativePath) => path.resolve(__dirname, relativePath))
  .filter((fullPath) => !fs.existsSync(fullPath))
  .forEach((fullPath) => fs.mkdirSync(fullPath));

const rssFeeds = `{
  "data": [
    {
      "url": "${process.env.RSS_FEEDS ? process.env.RSS_FEEDS : ''}",
      "page": "home"
    }
  ]
}`;

const displayProperties = `{
  "account": {
      "pages": [
          {
              "key": "contact-us",
              "title": "CONTACT_US",
              "content_url": "${
                process.env.CONTACTUSURL ? process.env.CONTACTUSURL : ''
              }"
          },
          {
            "key": "faqs",
            "title": "FAQS",
            "content_url": "${
              process.env.FAQSURL ? process.env.FAQSURL : ''
            }"
          },
          {
              "key": "tnc",
              "title": "TNC",
              "content_url": "${process.env.TNCURL ? process.env.TNCURL : ''}"
          }
      ]
  }
}`;

const displayPropertiesWithoutFaq = `{
  "account": {
      "pages": [
        {
          "key": "contact-us",
          "title": "CONTACT_US",
          "content_url": "${
            process.env.CONTACTUSURL ? process.env.CONTACTUSURL : ''
          }"
      },
      {
          "key": "tnc",
          "title": "TNC",
          "content_url": "${process.env.TNCURL ? process.env.TNCURL : ''}"
      }
      ]
  }
}`;


// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
  apiHost: '${
    process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'
  }',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : true},
  isWhistler: ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : true},
  baseHref: '${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}',
  defaultLang: '${process.env.DEFAULT_LANG ? process.env.DEFAULT_LANG : 'en'}'
};
`;


const appConfigFile = `{
  "app": "${process.env.APP ? process.env.APP : 'prudential-pulse'}",
  "appVersion": "${process.env.PERX_APP_VERSION ? process.env.PERX_APP_VERSION : 'dev-build'}",
  "apiHost": "${
    process.env.APIHOST ? process.env.APIHOST : 'https://api.perxtech.io'
  }",
  "production": ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  "preAuth": ${process.env.PREAUTH ? process.env.PREAUTH : true},
  "isWhistler": ${process.env.IS_WHISTLER ? process.env.IS_WHISTLER : true},
  "baseHref": "${process.env.BASE_HREF ? process.env.BASE_HREF : '/'}",
  "defaultLang": "${
    process.env.DEFAULT_LANG ? process.env.DEFAULT_LANG : 'en'
  }",
  "showSubtitleLogin": ${
    process.env.SHOW_LOGIN_SUBTITLE ? process.env.SHOW_LOGIN_SUBTITLE : false
  },
  "countryCodePrefix": "${process.env.COUNTRY_CODE_PREFIX ? process.env.COUNTRY_CODE_PREFIX : ''}",
  "showHomePage": ${
    process.env.SHOW_HOME_PAGE ? process.env.SHOW_HOME_PAGE : false
  },
  "showHistoryPage": ${
    process.env.SHOW_HISTORY_PAGE ? process.env.SHOW_HISTORY_PAGE : true
  },
  "showAccountsPage": ${
    process.env.SHOW_ACCOUNTS_PAGE ? process.env.SHOW_ACCOUNTS_PAGE : true
  },
  "showForgetPasswordOnLogin": ${
    process.env.SHOW_FORGET_PASSWORD_ON_LOGIN
      ? process.env.SHOW_FORGET_PASSWORD_ON_LOGIN
      : true
  },
  "showLoyaltyBlockOnHomePage": ${
    process.env.SHOW_LOYALTY_BLOCK_ON_HOMEPAGE
      ? process.env.SHOW_LOYALTY_BLOCK_ON_HOMEPAGE
      : false
  },
  "showLoyaltyProgress": ${
    process.env.SHOW_LOYALTY_PROGRESS ? process.env.SHOW_LOYALTY_PROGRESS : true
  },
  "showCatalogOnHomePage": ${
    process.env.SHOW_CATALOG_ON_HOMEPAGE
      ? process.env.SHOW_CATALOG_ON_HOMEPAGE
      : true
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
  "showRewardNavButton": ${
    process.env.SHOW_REWARDS_NAV_BUTTON
      ? process.env.SHOW_REWARDS_NAV_BUTTON
      : false
  },
  "showMacaronOnRewardDetails": ${
    process.env.SHOW_MACARON_ON_REWARD_DETAILS
      ? process.env.SHOW_MACARON_ON_REWARD_DETAILS
      : false
  },
  "showCampaignLandingPage": ${
    process.env.SHOW_CAMPAIGN_LANDING_PAGE
      ? process.env.SHOW_CAMPAIGN_LANDING_PAGE
      : false
  },
  "showPopupCampaign": ${
    process.env.SHOW_POPUP_HOMEPAGE ? process.env.SHOW_POPUP_HOMEPAGE : false
  },

  "showQrPageSubtitle": ${
    process.env.SHOW_QRPAGE_SUBTITLE ? process.env.SHOW_QRPAGE_SUBTITLE : false
  },
  "showUserQR": ${process.env.SHOW_USER_QR ? process.env.SHOW_USER_QR : true},
  "showExpiryOnRewardDetail": ${
    process.env.SHOW_EXPIRY_REWARD_DETAIL
      ? process.env.SHOW_EXPIRY_REWARD_DETAIL
      : true
  },
  "showUserInfoOnAccountsPage": ${
    process.env.SHOW_USERINFO_ACCOUNTS
      ? process.env.SHOW_USERINFO_ACCOUNTS
      : false
  },
  "showTransactionHistoryOnAccountsPage": ${
    process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS
      ? process.env.SHOW_TRANSANCTION_HISTORY_ACCOUNTS
      : false
  },
  "showReferralDetails": ${
    process.env.SHOW_REFERRAL_DETAILS
      ? process.env.SHOW_REFERRAL_DETAILS
      : false
  },
  "showVoucherBookingFromRewardsPage":  ${
    process.env.SHOW_VOUCHER_BOOKING_FROM_REWARDS
      ? process.env.SHOW_VOUCHER_BOOKING_FROM_REWARDS
      : false
  },
  "showNearMePage": ${
    process.env.SHOW_NEAR_ME_PAGE ? process.env.SHOW_NEAR_ME_PAGE : false
  },
  "enableLeaderBoard": ${
    process.env.ENABLE_LEADER_BOARD ? process.env.ENABLE_LEADER_BOARD : false
  },
  "enablePointTransfer": ${
    process.env.ENABLE_POINT_TRANSFER ? process.env.ENABLE_POINT_TRANSFER : false
  },
  "custom": {
    "stampsType": "${
      process.env.STAMPS_TYPE ? process.env.STAMPS_TYPE : 'stamp_card'
    }",
    "redirectAfterLogin": "${
      process.env.REDIRECT_AFTER_LOGIN
        ? process.env.REDIRECT_AFTER_LOGIN
        : '/wallet'
    }",
    "redirectBeforeLogin": "${
      process.env.REDIRECT_BEFORE_LOGIN
        ? process.env.REDIRECT_BEFORE_LOGIN
        : '/login'
    }",
    "loginMethod": "${
      process.env.LOGIN_METHOD ? process.env.LOGIN_METHOD : 'phone'
    }",
    "languageOptions": [
      "en", "${process.env.EXTRA_LANGUAGE}"
    ],
    "showSurveyFirstOnHomePageCampaignList": "${
      process.env.SHOW_SURVEY_FIRST_ON_HOMEPAGE_CAMPAIGN_LIST ? process.env.SHOW_SURVEY_FIRST_ON_HOMEPAGE_CAMPAIGN_LIST : false
    }"
  },
  "homeAsProgressPage": ${
    process.env.PROGRESS_PAGE_HOME ? process.env.PROGRESS_PAGE_HOME : false
  },
  "showExtraLoyaltyOnHomePage": ${
    process.env.SHOW_EXTRA_LOYALTY_ON_HOMEPAGE ? process.env.SHOW_EXTRA_LOYALTY_ON_HOMEPAGE : true
  },
  "showLeaderboardLinkOnHomePage": ${
    process.env.SHOW_LEADERBOARD_LINK_ON_HOME_PAGE ? process.env.SHOW_LEADERBOARD_LINK_ON_HOME_PAGE : false
  },
  "displayProperties" : ${
    process.env.APP === 'hsbcvn' ? displayPropertiesWithoutFaq : displayProperties
  },
  "showLogo":  ${
    process.env.SHOW_LOGO ? process.env.SHOW_LOGO : false
  },
  "showQuestCampaignsOnHomePage" : ${process.env.SHOW_QUEST_CAMPAIGNS_ON_HOMEPAGE ? process.env.SHOW_QUEST_CAMPAIGNS_ON_HOMEPAGE
    : false
  },
  "showProgressBarCampaignsOnHomePage" : ${process.env.SHOW_PROGRESSBAR_CAMPAIGNS_ON_HOMEPAGE ? process.env.SHOW_PROGRESSBAR_CAMPAIGNS_ON_HOMEPAGE
    : false
  },
  "showGameTriesOnCampaignCard": ${
    process.env.SHOW_GAME_TRIES_ON_CAMPAIGN_CARD ? process.env.SHOW_GAME_TRIES_ON_CAMPAIGN_CARD : false
  },
  "showPasswordToggleOnSignUpPage": ${
    process.env.SHOW_PASSWORD_TOGGLE_ON_SIGN_UP_PAGE ? process.env.SHOW_PASSWORD_TOGGLE_ON_SIGN_UP_PAGE : false
  },
  "showPrizeSetOutcome": ${
    process.env.SHOW_PRIZE_SET_OUTCOME ? process.env.SHOW_PRIZE_SET_OUTCOME : false
  },
  "showBadgesButton": ${ process.env.SHOW_BADGES_BUTTON || false },
  "showPersonaliseRewards": ${ process.env.SHOW_PERSONALISE_REWARDS || false },
  "showPointTransfer": ${ process.env.SHOW_POINT_TRANSFER || false }
}
`;

async.each(
  [
    [targetPath, envConfigFile],
    [appConfigPath, appConfigFile],
    [rssFeedsPath, rssFeeds],
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
