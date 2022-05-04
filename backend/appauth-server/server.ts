// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'regenerator-runtime'; // import required by node-cache due callback-based updateand wp polyfill step

import express from 'express';
import { join } from 'path';
import compression from 'compression';

import { preauth } from './ctrl/preauth';
import { login, users } from './ctrl/cognito';
import { v4Token, v4ExchangeToken } from './ctrl/v4-token';
import { v2Token } from './ctrl/v2-token';
import { themes } from './ctrl/themes';
import { manifest } from './ctrl/manifest';
import { language } from './ctrl/language';
import { merchantAcceptInvitation, merchantForgotPassword, merchantInvitedSetPassword } from './ctrl/merchantAdmin';
import { getCredentials } from './utils/credentials';
import { getCredential } from './utils/autoGenerateTenantToken';

// import * as Sentry from '@sentry/node';
// Express server
const app = express();
// Sentry.init({ dsn: 'https://394598311c2749ea9114efb557297005@sentry.io/1857840' });
// app.use(Sentry.Handlers.requestHandler());
import { expressCspHeader, NONE, SELF, INLINE } from 'express-csp-header';

app.use(compression());
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/static', express.static('static'));

const PORT = process.env.PORT || 4000;
const EXPRESS_DIST_FOLDER = join(__dirname, 'dist');
const appPath = join(EXPRESS_DIST_FOLDER, '../../perx-microsite');

const BASE_HREF = process.env.BASE_HREF || '/';
const IS_WHISTLER: boolean = !!(process.env.IS_WHISTLER && process.env.IS_WHISTLER === 'true');
const getTokens = IS_WHISTLER ? getCredential : getCredentials;
app.options('*', cors());
app.use('/assets', express.static('assets'));

// verified for BC sites, but unverified against custom microsites, specify feature flag when sure
if (process.env.PRODUCTION && process.env.CSP_ON) {
  app.use(expressCspHeader({
    directives: {
      'default-src': [SELF, 'api.perxtech.io', 'api.perxtech.net', 'sentry.io', 'maps.googleapis.com', 'www.google-analytics.com'],
      'img-src': ['data:', '*'],
      'child-src': ['none'],
      'script-src': [SELF, INLINE, 'sentry.io', '*.googletagmanager.com', 'maps.googleapis.com', 'www.google-analytics.com'],
      'object-src': [NONE],
      'font-src': [SELF, 'fonts.gstatic.com', 'fonts.googleapis.com'],
      'style-src': [SELF, INLINE, 'fonts.googleapis.com', 'api.perxtech.io', 'api.perxtech.net'],
      'trusted-types': ['google-maps-api#html', 'goog#html', 'angular']
    }
  }));
} else if (process.env.CSP_ON){
  app.use(expressCspHeader({
    directives: {
      'default-src': [SELF, 'api.perxtech.io', 'api.perxtech.net', 'sentry.io', 'maps.googleapis.com', 'www.google-analytics.com', 'localhost:4000'],
      'img-src': ['data:', '*'],
      'child-src': ['none'],
      'script-src': [SELF, INLINE, 'sentry.io', '*.googletagmanager.com', 'maps.googleapis.com', 'www.google-analytics.com'],
      'object-src': [NONE],
      'font-src': [SELF, 'fonts.gstatic.com', 'fonts.googleapis.com'],
      'style-src': [SELF, INLINE, 'fonts.googleapis.com', 'api.perxtech.io', 'api.perxtech.net', 'localhost:4000'],
      'trusted-types': ['google-maps-api#html', 'goog#html', 'angular', 'angular#unsafe-jit']
    }
  }));
}

app.get('/preauth', preauth(getTokens));

app.post(`${BASE_HREF}v4/oauth/token`, v4Token(getTokens));

app.post(`${BASE_HREF}v2/oauth/token`, v2Token(getTokens));

app.post(`${BASE_HREF}cognito/login`, login(getTokens));

app.post(`${BASE_HREF}cognito/users`, users(getTokens));

app.post(`${BASE_HREF}themes`, themes(getTokens));

app.post(`${BASE_HREF}v4/oauth/exchange_token`, v4ExchangeToken(getTokens));

// temporary intercept until v4 backend migrates away from using client secrets.
// the way this query performs the API call is the v4 way forward and will be moved to the core service.
app.post(`${BASE_HREF}v4/merchant_admin/forgot_password`, merchantForgotPassword(getTokens));
app.get(`${BASE_HREF}v4/merchant_admin/merchant_user_account_invitations/accept`, merchantAcceptInvitation(getTokens));
app.put(`${BASE_HREF}v4/merchant_admin/merchant_user_account_invitations`, merchantInvitedSetPassword(getTokens));

app.get(`${BASE_HREF}manifest.webmanifest`, manifest(getTokens, appPath));

app.get(`${BASE_HREF}lang`, language());

if (process.env.PRODUCTION) {
  console.log('production mode ON', appPath);
  app.set('view engine', 'html');
  app.set('views', appPath);

  // Serve static files from /../../perx-microsite
  app.use(BASE_HREF, express.static(appPath));
  app.get('*.*', express.static(appPath, { maxAge: '1y' }));

  // All regular routes use the index.html
  app.get('*', (req, res) => {
    res.sendFile(join(appPath, 'index.html'), { req });
  });
}

// app.use(Sentry.Handlers.errorHandler());
if (IS_WHISTLER) {
  getTokens('').then(() => console.log('Init token list table.'));
}
// Start up the Node server
const server = app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
  console.log(`Node server is whistler: ${IS_WHISTLER}`);
});

const processInterruption = (signals: NodeJS.Signals) => {
  server.close(err => {
    console.log('Server terminated', err, signals);
  });
};

process.on('SIGTERM', processInterruption);
process.on('SIGINT', processInterruption);
