import { ICredentials } from '../types/apiConfig';
import axios from 'axios';

export const createToken = async (endpointCredential: ICredentials, accountId: string) => axios.post(
  `${endpointCredential.target_url}/iam/blackcomb_credentials`,
  {
    data: {
      type: 'credentials',
      attributes: {
        account_id: accountId
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
