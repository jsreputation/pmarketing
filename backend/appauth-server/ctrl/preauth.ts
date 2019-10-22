import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { ApiConfig } from '../types/apiConfig';

export const preauth = (apiConfig: ApiConfig) => async (req: Request, res: Response, next: NextFunction) => {
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
};
