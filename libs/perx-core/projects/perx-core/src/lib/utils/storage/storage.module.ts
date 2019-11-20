import { NgModule } from '@angular/core';
import { Config } from '../../config/config';
import { TokenStorage } from './token-storage.service';
import { LocalTokenStorage } from './local-token-storage.service';

export function TokenStorageServiceFactory(
  config: Config
): TokenStorage {
  switch (config.storageType) {
    case 'local':
      return new LocalTokenStorage(config);
    default:
      return new LocalTokenStorage(null);
  }
}

@NgModule({
  providers: [{
    provide: TokenStorage,
    useFactory: TokenStorageServiceFactory,
    deps: [Config]
  }]
})
export class StorageModule { }
