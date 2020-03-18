import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { getQueryHost } from '../utils/utils';
import { ICredentials } from '../types/apiConfig';

export const v2Token = (getCredentials: ((url: string) => Promise<ICredentials>)) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = getQueryHost(req);
    const endpointCredential: ICredentials = await getCredentials(url);

    const endpointRequest = await axios.post(
      `${endpointCredential.target_url}/v2/oauth/token`,
      null,
      {
        params: {
          client_id: endpointCredential.perx_access_key_id.replace(/\W/, ''),
          client_secret: endpointCredential.perx_secret_access_key.replace(/\W/, ''),
          grant_type: 'client_credentials'
        }
      }
    );
    res.json(endpointRequest.data);
  } catch (e) {
    if (e.response && e.response && e.response.status) {
      res.status(400).json(e.response.data);
    } else {
      next(e);
    }
  }
};
