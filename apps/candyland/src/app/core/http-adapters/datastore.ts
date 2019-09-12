import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Groups } from '@cl-core/http-adapters/iam-groups';

const config: DatastoreConfig = {
  baseUrl: ApiConfig.basePath,
  models: {
    groups: Groups,
    // comments: Comment,
    // users: User
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
