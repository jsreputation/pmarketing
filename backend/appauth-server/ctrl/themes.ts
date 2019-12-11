import { ICredentials } from '../types/apiConfig';
import { Request, Response, NextFunction } from 'express';
import { getQueryHost } from '../utils/utils';
import { fetchTheme } from '../utils/theme';

export const themes = (getCredentials: ((url: string) => Promise<ICredentials>)) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // check body parameter 'url'
    const url = getQueryHost(req);
    const credentials = await getCredentials(url);
    const endpointRequest = await fetchTheme(credentials);
    console.log('theme data ', endpointRequest.data);
    res.json(endpointRequest.data);
  } catch (e) {
    console.log('error ', e);
    if (e.response && e.response.data && e.response.status) {
      res.status(e.response.status).json(e.response.data);
    } else {
      next(e);
    }
  }
};
