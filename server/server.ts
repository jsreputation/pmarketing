// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import express from 'express';
import { readFileSync } from 'fs';
import axios from 'axios';

// Express server
const app = express();

const PORT = process.env.PORT || 4000;

const apiConfigPath = process.env.API_CONFIG_PATH || 'config.json';
const apiConfig = JSON.parse(readFileSync(apiConfigPath).toString());

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

// app.get('*', (req, res, next) => {
//   if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === 'http') {
//     res.redirect('https://' + req.headers.host + req.url);
//   } else {
//     next();
//   }
// });

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
