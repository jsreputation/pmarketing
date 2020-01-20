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
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
};
