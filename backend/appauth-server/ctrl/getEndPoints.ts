import { ICredentials } from '../types/apiConfig';
import axios from 'axios';

export const getEndPoints = async (endpointCredential: ICredentials) => axios.get(
  `${endpointCredential.target_url}/cognito/endpoints`,
  {
    headers: {
      Authorization: endpointCredential.basic_token,
      'Content-Type': 'text/plain'
    }
  }
);
