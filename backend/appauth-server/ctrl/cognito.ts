import axios from 'axios';
import { ICredentials } from '../types/apiConfig';
import { Request, Response } from 'express';
import { NextFunction } from 'express';
import { IWProfileAttributes } from '@perx/whistler';
import { getQueryHost } from '../utils/utils';

export const login = (getCredentials: ((url: string) => Promise<ICredentials>)) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url: string = getQueryHost(req);
    const endpointCredential: ICredentials = await getCredentials(url);

    const userId = req.body.identifier;
    const endpointRequest = await axios.post(
      `${endpointCredential.target_url}/cognito/login`,
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

export const users = (getCredentials: ((url: string) => Promise<ICredentials>)) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check body parameter 'url'
    const url = req.body.url;
    const endpointCredential: ICredentials = await getCredentials(url);
    const userId = req.body.identifier;
    // should just be the attributesObj
    const userObj: IWProfileAttributes = req.body.profile ? req.body.profile : { primary_identifier: userId };

    const endpointCreateUserRequest = await axios.post(
      `${endpointCredential.target_url}/cognito/users`,
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
        `${endpointCredential.target_url}/cognito/login`,
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
