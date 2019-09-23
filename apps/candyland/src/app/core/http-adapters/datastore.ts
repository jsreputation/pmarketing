import { MerchantBranch, Merchant } from '@cl-core/http-adapters/merchant';
import { IamUser } from '@cl-core/http-adapters/iam-user';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Groups } from '@cl-core/http-adapters/iam-groups';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { ApiConfig } from '@cl-core/api-config';

const config: DatastoreConfig = {
  baseUrl: ApiConfig.baseAPIPath,
  models: {
    groups: Groups,
    users: IamUser,
    orgs: Merchant,
    branches: MerchantBranch,
    tenants: Tenants,
  }
};

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class DataStore extends JsonApiDatastore {

  constructor(http: HttpClient) {
    super(http);
  }

}
