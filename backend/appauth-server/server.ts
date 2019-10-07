// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import express from 'express';
import {readFileSync} from 'fs';
import axios from 'axios';
import {join} from 'path';

// Express server
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const EXPRESS_DIST_FOLDER = join(process.cwd(), 'dist');
const BASE_HREF = process.env.BASE_HREF || '/';

const apiConfigPath = process.env.API_CONFIG_PATH || 'config.json';
const apiConfig = JSON.parse(readFileSync(apiConfigPath).toString());
// console.log(apiConfig);

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
      throw new Error(`No endpoints found for ${url}`);
    }

    const endpointCredential = apiConfig.credentials[endpoint.account_id];

    const endpointRequest = await axios(
      endpoint.target_url,
      {
        headers: {
          Authorization: `Basic ${endpointCredential.perx_access_key_id}:${endpointCredential.perx_secret_access_key}`
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

app.post(BASE_HREF + 'v4/oauth/token', async (req, res, next) => {
  try {
    const url = req.body.url;
    if (url === undefined) {
      throw new Error('No query parameter "url" specified');
    }

    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found: ${url}`);
    }

    const endpointCredential = apiConfig.credentials[endpoint.account_id];

    const username = req.body.username;
    const password = req.body.password;
    const mechId = req.body.mech_id;
    const campaignId = req.body.campaign_id;
    const userId = req.body.identifier;
    const scope = req.body.scope;

    const endpointRequest = await axios.post(
      endpoint.target_url + '/v4/oauth/token',
      {
        username,
        password,
        mech_id: mechId,
        campaign_id: campaignId,
        scope
      },
      {
        params: {
          client_id: endpointCredential.perx_access_key_id,
          client_secret: endpointCredential.perx_secret_access_key,
          identifier: userId
        }
      }
    );

    res.json(endpointRequest.data);
  } catch (e) {
    if (e.response && e.response.data && e.response.status) {
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
});

app.post(BASE_HREF + 'v2/oauth/token', async (req, res, next) => {
  try {
    const url = req.query.url;
    if (url === undefined) {
      throw new Error('No query parameter "url" specified');
    }

    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found: ${url}`);
    }
    const endpointCredential = apiConfig.credentials[endpoint.account_id];
    const endpointRequest = await axios.post(
      endpoint.target_url + '/v2/oauth/token',
      null,
      {
        params: {
          client_id: endpointCredential.perx_access_key_id,
          client_secret: endpointCredential.perx_secret_access_key,
          grant_type: 'client_credentials'
        }
      }
    );
    res.json(endpointRequest.data);
  } catch (e) {
    if (e.response && e.response && e.response.status) {
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
});

app.post(BASE_HREF + 'cognito/login', async (req, res, next) => {
  try {
    // check query parameter 'url'
    const url = req.body.url;
    const userId = req.body.identifier;

    if (url === undefined) {
      throw new Error('No query parameter "url" specified');
    }
    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${url}`);
    }

    const endpointCredential = apiConfig.credentials[endpoint.account_id];
    const endpointRequest = await axios.post(
      endpoint.target_url + '/cognito/login',
      {
        data: {
          attributes: {
            primary_identifier: userId
          }
        }
      },
      {
        headers: {
          Authorization: endpointCredential.basic_token,
          'Content-Type': 'text/plain'
        }
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
    if (e.response && e.response.data && e.response.status) {
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
});

app.post(BASE_HREF + 'cognito/users', async (req, res, next) => {
  try {
    // check query parameter 'url'
    const url = req.query.url;
    const userId = req.query.identifier;

    if (url === undefined) {
      throw new Error('No query parameter "url" specified');
    }
    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${url}`);
    }

    const endpointCredential = apiConfig.credentials[endpoint.account_id];
    const endpointRequest = await axios.post(
      endpoint.target_url + '/cognito/users',
      {
        data: {
          type: 'users',
          attributes: {
            primary_identifier: userId
          }
        }
      },
      {
        headers: {
          Authorization: endpointCredential.basic_token,
          'Content-Type': 'application/vnd.api+json'
        }
      }
    );

    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Expose-Headers': 'Authorization',
      Authorization: endpointRequest.headers.authorization

    });
    endpointRequest.data = {
      ...endpointRequest.data, data: {
        attributes: {
          jwt: endpointRequest.headers.authorization
        }
      }
    };
    res.json(endpointRequest.data);
  } catch (e) {
    if (e.response && e.response.data && e.response.status) {
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
});

app.post(BASE_HREF + 'themes', async (req, res, next) => {
  try {
    // check query parameter 'url'
    const url = req.query.url;

    if (url === undefined) {
      throw new Error('No query parameter "url" specified');
    }
    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${url}`);
    }
    const endpointCredential = apiConfig.credentials[endpoint.account_id];
    const endpointRequest = await axios.get(
      endpoint.target_url + '/iam/tenants',
      {
        headers: {
          Authorization: endpointCredential.basic_token,
          'Content-Type': 'text/plain'
        }
      }
    );
    res.json(endpointRequest.data);
  } catch (e) {
    if (e.response && e.response.data && e.response.status) {
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
});

if (process.env.PRODUCTION) {
  console.log('production mode ON');
  app.set('view engine', 'html');
  app.set('views', join(EXPRESS_DIST_FOLDER, '../../perx-microsite'));

  // Serve static files from /../../perx-microsite
  app.use(BASE_HREF, express.static(join(EXPRESS_DIST_FOLDER, '../../perx-microsite')));
  app.get('*.*', express.static(join(EXPRESS_DIST_FOLDER, '../../perx-microsite'), {maxAge: '1y'}));

  // All regular routes use the index.html
  app.get('*', (req, res) => {
    res.sendFile(join(EXPRESS_DIST_FOLDER, '../../perx-microsite', 'index.html'), {req});
  });
}

// Start up the Node server
const server = app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
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
