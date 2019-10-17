import { ApiConfig } from '../types/apiConfig';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const v2Token = (apiConfig: ApiConfig) => async (req: Request, res: Response, next: NextFunction) => {
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
    const endpointRequest = await axios.post(
      `${endpoint.target_url}/v2/oauth/token`,
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
};
