import { ICredentials } from '../types/apiConfig';
import axios from 'axios';

export const tenantsList = async (endpointCredential: ICredentials) => axios.get(
  `${endpointCredential.target_url}/cognito/tenants`,
  {
    headers: {
      Authorization: endpointCredential.basic_token,
      'Content-Type': 'text/plain'
    }
  }
);
