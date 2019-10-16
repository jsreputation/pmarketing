import { ApiConfig } from '../types/apiConfig';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const themes = (apiConfig: ApiConfig) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check body parameter 'url'
    const url = req.body.url;

    if (url === undefined) {
      throw new Error('No body parameter "url" specified');
    }
    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${url}`);
    }
    const endpointCredential = apiConfig.credentials[endpoint.account_id];
    const endpointRequest = await axios.get(
      `${endpoint.target_url}/iam/tenants`,
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
};
