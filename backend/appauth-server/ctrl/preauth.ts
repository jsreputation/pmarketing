import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { ICredentials } from '../types/apiConfig';
import { getQueryHost } from '../utils/utils';

export const preauth = (getCredentials: ((url: string) => Promise<ICredentials>)) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check query parameter 'url'
    const url = getQueryHost(req);

    const endpointCredential: ICredentials = await getCredentials(url);

    const endpointRequest = await axios(
      endpointCredential.target_url,
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
