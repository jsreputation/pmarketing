import { fetchTheme } from './../utils/theme';
import { ICredentials } from '../types/apiConfig';
import { IJsonApiItem, IWTenant } from '@perx/whistler';

export interface ITenantListData {
  id: string;
  accountId: string;
}

export const getTenantsList = async (endpointCredential: ICredentials) => {
  let tenantsListData = [];
  let pageNumber = 1;

  const page1RawData = await fetchTheme(endpointCredential, pageNumber);
  const totalPage = page1RawData.data.meta.page_count;
  const page1Data = page1RawData.data.data.forEach((tenant: IJsonApiItem<IWTenant>) => transformToTenantListData(tenant));
  tenantsListData = [...page1Data];
  while (pageNumber < totalPage) {
    pageNumber++;
    const pageRawData = await fetchTheme(endpointCredential, pageNumber);
    const pageData = pageRawData.data.data.forEach((tenant: IJsonApiItem<IWTenant>) => transformToTenantListData(tenant));
    tenantsListData = [...tenantsListData, ...pageData];
  }
  return tenantsListData;
};

const transformToTenantListData = (tenantsRawData: IJsonApiItem<IWTenant>): ITenantListData => {
  return {
    id: tenantsRawData.id,
    accountId: tenantsRawData.attributes.account_id
  };
}
