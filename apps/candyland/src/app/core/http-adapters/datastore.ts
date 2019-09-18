import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Groups } from '@cl-core/http-adapters/iam-groups';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { Vouchers } from '@cl-core/http-adapters/vouchers';

const config: DatastoreConfig = {
  models: {
    groups: Groups,
    tenants: Tenants,
    vouchers: Vouchers,
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
