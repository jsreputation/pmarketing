// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'regenerator-runtime'; // import required by node-cache due callback-based updateand wp polyfill step

import express from 'express';
import { join } from 'path';
import compression from 'compression';

import { preauth } from './ctrl/preauth';
import { login, users } from './ctrl/cognito';
import { v4Token } from './ctrl/v4-token';
import { v2Token } from './ctrl/v2-token';
import { themes } from './ctrl/themes';
import { manifest } from './ctrl/manifest';
import { language } from './ctrl/language';
import { getCredentials } from './utils/credentials';
import { getCredential, removeCredentialCache } from './ctrl/autoGenerateTenantToken';

import * as Sentry from '@sentry/node';
// Express server
const app = express();
Sentry.init({ dsn: 'https://394598311c2749ea9114efb557297005@sentry.io/1857840' });
app.use(Sentry.Handlers.requestHandler());
app.use(compression());
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/static', express.static('static'));

const PORT = process.env.PORT || 4000;
const EXPRESS_DIST_FOLDER = join(process.cwd(), 'dist');
const BASE_HREF = process.env.BASE_HREF || '/';
const IS_WHISTLER = process.env.IS_WHISTLER;
const getTokens = IS_WHISTLER ? getCredential : getCredentials;
app.options('*', cors());

app.get('/preauth', preauth(getTokens));

app.post(`${BASE_HREF}v4/oauth/token`, v4Token(getTokens));

app.post(`${BASE_HREF}v2/oauth/token`, v2Token(getTokens));

app.post(`${BASE_HREF}cognito/login`, login(getTokens));

app.post(`${BASE_HREF}cognito/users`, users(getTokens));

app.post(`${BASE_HREF}themes`, themes(getTokens));

app.post(`${BASE_HREF}delete_cache`, removeCredentialCache());

app.get(`${BASE_HREF}manifest.webmanifest`, manifest(getTokens));

app.get(`${BASE_HREF}lang`, language());

if (process.env.PRODUCTION) {
  const appPath = join(EXPRESS_DIST_FOLDER, '../../perx-microsite');
  console.log('production mode ON');
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
app.use('/assets', express.static('assets'));
app.use(Sentry.Handlers.errorHandler());
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
