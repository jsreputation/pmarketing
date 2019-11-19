import { Request, Response, NextFunction } from 'express';
import { ICredentials } from '../types/apiConfig';
import axios from 'axios';
import { getQueryHost } from '../utils/utils';

export const v4Token = (getCredentials: ((url: string) => Promise<ICredentials>)) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = getQueryHost(req);
    const endpointCredential: ICredentials = await getCredentials(url);

    const username = req.body.username;
    const password = req.body.password;
    const mechId = req.body.mech_id;
    const campaignId = req.body.campaign_id;
    const userId = req.body.identifier;
    const scope = req.body.scope;

    const endpointRequest = await axios.post(
      `${endpointCredential.target_url}/v4/oauth/token`,
      {
        username,
        password,
        mech_id: mechId,
        campaign_id: campaignId,
        scope
      },
      {
        params: {
          client_id: endpointCredential.perx_access_key_id,
          client_secret: endpointCredential.perx_secret_access_key,
          identifier: userId
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
