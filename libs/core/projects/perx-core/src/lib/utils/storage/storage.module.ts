import { NgModule } from '@angular/core';
import { Config } from '../../config/config';
import { TokenStorage } from './token-storage.service';
import { LocalTokenStorage } from './local-token-storage.service';
import { SessionTokenStorageService } from './session-token-storage.service';
import { HttpClient } from '@angular/common/http';
import { TokenType } from './models/token-storage.model';

export function TokenStorageServiceFactory(
  http: HttpClient,
  config: Config
): TokenStorage {
  switch (config.storageType) {
    case TokenType.local:
      return new LocalTokenStorage(config);
    case TokenType.session:
      return new SessionTokenStorageService(http);
    default:
      return new LocalTokenStorage(null);
  }
}

@NgModule({
  providers: [{
    provide: TokenStorage,
    useFactory: TokenStorageServiceFactory,
    deps: [HttpClient, Config]
  }]
})
export class StorageModule { }
