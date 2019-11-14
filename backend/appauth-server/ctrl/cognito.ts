import axios from 'axios';
import { ApiConfig } from '../types/apiConfig';
import { Request, Response } from 'express';
import { NextFunction } from 'express';
import { IWProfileAttributes } from '@perx/whistler';

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
    const anonymous = req.body.anonymous;
    // should just be the attributesObj
    const userObj: IWProfileAttributes = req.body.profile ? req.body.profile : { primary_identifier: userId, anonymous };

    if (url === undefined) {
      throw new Error('No body parameter "url" specified');
    }
    const endpoint = apiConfig.endpoints[url];
    if (endpoint === undefined) {
      throw new Error(`No endpoints found for ${url}`);
    }

    const endpointCredential = apiConfig.credentials[endpoint.account_id];
    const endpointCreateUserRequest = await axios.post(
      `${endpoint.target_url}/cognito/users`,
      {
        data: {
          type: 'users',
          attributes: userObj // {...,}
        }
      },
      {
        headers: {
          Authorization: endpointCredential.basic_token,
          'Content-Type': 'application/vnd.api+json'
        }
      }
    );
    if (endpointCreateUserRequest.data) {
      const endpointLoginRequest = await axios.post(
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
        Authorization: endpointLoginRequest.headers.authorization

      });

      res.json(endpointLoginRequest.data);
    }

  } catch (e) {
    if (e.response && e.response.data && e.response.status) {
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
};
