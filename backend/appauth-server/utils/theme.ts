import { ICredentials } from '../types/apiConfig';
import axios from 'axios';

export const fetchTheme = async (endpointCredential: ICredentials, pageNumber: number = 1) => {
  return axios.get(
    `${endpointCredential.target_url}/iam/tenants?page[number]=${pageNumber}`,
    {
      headers: {
        Authorization: endpointCredential.basic_token,
        'Content-Type': 'text/plain'
      }
    }
  )
};
