import axios from 'axios';
import { ApiConfig } from '../types/apiConfig';
import { Request, Response } from 'express';
import { NextFunction } from 'express';

export const login = (apiConfig: ApiConfig) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check body parameter 'url'
    const url = req.body.url;
    const userId = req.body.identifier;

    if (url === undefined) {
      throw new Error('No body parameter "url" specified');
    }
    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${url}`);
    }

    const endpointCredential = apiConfig.credentials[endpoint.account_id];
    const endpointRequest = await axios.post(
      `${endpoint.target_url}/cognito/login`,
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
};

export const users = (apiConfig: ApiConfig) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check body parameter 'url'
    const url = req.body.url;
    const userId = req.body.identifier;

    if (url === undefined) {
      throw new Error('No body parameter "url" specified');
    }
    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${url}`);
    }

    const endpointCredential = apiConfig.credentials[endpoint.account_id];
    const endpointRequest = await axios.post(
      `${endpoint.target_url}/cognito/users`,
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
          jwt: endpointRequest.headers.authorization.split(' ')[1]
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
};
