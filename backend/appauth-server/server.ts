// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import express from 'express';
import { readFileSync } from 'fs';
import axios from 'axios';
import { join } from 'path';
import { colors } from '@angular-devkit/core/src/terminal';

// Express server
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 4000;
const EXPRESS_DIST_FOLDER = join(process.cwd(), 'dist');

const apiConfigPath = process.env.API_CONFIG_PATH || 'config.json';
const apiConfig = JSON.parse(readFileSync(apiConfigPath).toString());

app.options('*', cors());

app.get('/preauth', async (req, res, next) => {
  try {
    // check query parameter 'url'
    const url = req.query.url;
    if (url === undefined) {
      throw new Error('No query parameter "url" specified');
    }
    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${ url }`);
    }

    const endpointCredential = apiConfig.credentials[endpoint.account_id];

    const endpointRequest = await axios(
      endpoint.target_url,
      {
        headers: {
          Authorization: `Basic ${ endpointCredential.perx_access_key_id }:${ endpointCredential.perx_secret_access_key }`
        },
        timeout: 10000
      }
    );

    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Expose-Headers': 'Authorization',
      Authorization: endpointRequest.headers.authorization

    });
    res.json(endpointRequest.data);
  } catch (e) {
    next(e);
  }
});

app.get('/v4/preauth', async (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Expose-Headers': 'Authorization',
    // Authorization: endpointRequest.headers.authorization

  });
  res.json({
    'access_token': '',
    'token_type': 'bearer',
    'expires_in': 2629746,
    'created_at': 1560408357
  });
});

app.post('/v4/oauth/token', async (req, res, next) => {
  try {
    const url = req.query.url;
    if (url === undefined) {
      throw new Error('No query parameter "url" specified');
    }

    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found: ${ url }`);
    }

    const endpointCredential = apiConfig.credentials[endpoint.account_id];

    const username = req.query.username;
    const password = req.query.password;
    const mechId = req.query.mech_id;
    const campaignId = req.query.campaign_id;
    const userId = req.query.identifier;

    const endpointRequest = await axios.post(
      endpoint.target_url + '/v4/oauth/token',
      {
        'username': username,
        'password': password,
        'mech_id': mechId,
        'campaign_id': campaignId
      },
      {
        params: {
          'client_id': endpointCredential.perx_access_key_id,
          'client_secret': endpointCredential.perx_secret_access_key,
          'identifier': userId
        }
      }
    );

    res.json(endpointRequest.data);
  } catch (e) {
    next(e);
  }
});

if (process.env.PRODUCTION) {
  app.set('view engine', 'html');
  app.set('views', join(EXPRESS_DIST_FOLDER, '../../perx-microsite'));

// Serve static files from /../../perx-microsite
  app.use(express.static(join(EXPRESS_DIST_FOLDER, '../../perx-microsite')));

// All regular routes use the index.html
  app.get('*', (req, res) => {
    res.sendFile(join(EXPRESS_DIST_FOLDER, '../../perx-microsite', 'index.html'), { req });
  });
}

// Start up the Node server
const server = app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${ PORT }`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server terminated');
  });
});
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server terminated');
  });
});
