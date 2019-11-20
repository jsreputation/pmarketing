import { ICredentials } from '../types/apiConfig';
import axios from 'axios';

export const fetchTheme = async (endpointCredential: ICredentials) => axios.get(
  `${endpointCredential.target_url}/iam/tenants`,
  {
    headers: {
      Authorization: endpointCredential.basic_token,
      'Content-Type': 'text/plain'
    }
  }
);
