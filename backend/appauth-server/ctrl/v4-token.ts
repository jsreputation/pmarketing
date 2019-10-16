import { Request, Response, NextFunction } from 'express';
import { ApiConfig } from '../types/apiConfig';
import axios from 'axios';

export const v4Token = (apiConfig: ApiConfig) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = req.body.url;
    if (url === undefined) {
      throw new Error('No body parameter "url" specified');
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
      `${endpoint.target_url}/v4/oauth/token`,
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
};
