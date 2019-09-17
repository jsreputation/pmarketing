import { Branch, Merchant } from '@cl-core/http-adapters/merchant';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';

const config: DatastoreConfig = {
  baseUrl: ApiConfig.merchantsPath,
  models: {
    merchant: Merchant,
    branches: Branch,
    // users: User
  }
};

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class MerchantsDatastore extends JsonApiDatastore {

  constructor(http: HttpClient) {
    super(http);
  }

}
