import {ICredentials} from '../types/apiConfig';
import {NextFunction, Request, Response} from 'express';
import {getQueryHost} from '../utils/utils';
import axios from 'axios';

export const merchantForgotPassword = (getCredentials: ((url: string) => Promise<ICredentials>)) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url: string = getQueryHost(req);
    const endpointCredential: ICredentials = await getCredentials(url);

    const email = req.body.email;
    const endpointRequest = await axios.post(
      `${endpointCredential.target_url}/v4/merchant_admin/forgot_password`,
      {
        email,
        client_id: endpointCredential.perx_access_key_id
      },
      {
        headers: {
          'Content-Type': 'application/json'
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
      res.status(400).json(e.response.data);
    } else {
      next(e);
    }
  }
};


export const merchantAcceptInvitation = (getCredentials: ((url: string) => Promise<ICredentials>)) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url: string = getQueryHost(req);
    const endpointCredential: ICredentials = await getCredentials(url);
    const endpointRequest = await axios.get(
      `${endpointCredential.target_url}/v4/merchant_user_account_invitations/accept`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          invitation_token: req.query.invitation_token,
          client_id: endpointCredential.perx_access_key_id.replace(/\W/, ''),
          client_secret: endpointCredential.perx_secret_access_key.replace(/\W/, ''),
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

export const merchantInvitedSetPassword = (getCredentials: ((url: string) => Promise<ICredentials>)) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url: string = getQueryHost(req);
    const endpointCredential: ICredentials = await getCredentials(url);
    const endpointRequest = await axios.put(
      `${endpointCredential.target_url}/v4/merchant_user_account_invitations`,
      {
        invitation_token: req.body.invitation_token,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          client_id: endpointCredential.perx_access_key_id.replace(/\W/, ''),
          client_secret: endpointCredential.perx_secret_access_key.replace(/\W/, ''),
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
