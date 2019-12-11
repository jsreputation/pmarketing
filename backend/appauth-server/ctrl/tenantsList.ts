import { IJsonApiListPayload } from './../../../libs/perx-whistler/dist/whistler/lib/jsonapi.payload.d';
import { fetchTheme } from './../utils/theme';
import { ICredentials } from '../types/apiConfig';
import { IJsonApiItem, IWTenant } from '@perx/whistler';

export interface ITenantListData {
  id: string;
  accountId: string;
}

export const getTenantsList = async (endpointCredential: ICredentials) => {
  let tenantsListData: ITenantListData[];
  let pageNumber = 1;
  // console.log('get tenants list fetch theme token', endpointCredential);
  const page1RawData = await fetchTheme(endpointCredential, pageNumber);
  const totalPage = page1RawData.data.meta.page_count;
  // console.log('page1RawData ', page1RawData.data);
  tenantsListData = await updateTenantsList([], page1RawData.data);
  while (pageNumber < totalPage) {
    pageNumber++;
    const pageRawData = await fetchTheme(endpointCredential, pageNumber);
    tenantsListData = await updateTenantsList(tenantsListData, pageRawData.data);
  }
  return tenantsListData;
};

const updateTenantsList = async (tenantsListData: ITenantListData[] | [], pageRawData: IJsonApiListPayload<IWTenant>) => {
  const pageData = pageRawData.data
    .filter((tenant: IJsonApiItem<IWTenant>) => tenant.attributes.account_id !== 0 && tenant.attributes.alias !== 'owner')
    .map((tenant: IJsonApiItem<IWTenant>) => transformToTenantListData(tenant));
  // console.log('pageData ', pageData);
  return [...tenantsListData, ...pageData];
}

const transformToTenantListData = (tenantsRawData: IJsonApiItem<IWTenant>): ITenantListData => {
  // console.log('tenantsRawData ', tenantsRawData);
  return {
    id: tenantsRawData.id,
    accountId: tenantsRawData.attributes.alias
  };
}
