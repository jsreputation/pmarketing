import { IamUser } from '@cl-core/http-adapters/iam-user';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Groups } from '@cl-core/http-adapters/iam-groups';

const config: DatastoreConfig = {
  baseUrl: ApiConfig.baseAPIPath,
  models: {
    groups: Groups,
    // comments: Comment,
    users: IamUser
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
