import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { V4TransactionsService } from './v4-transactions.service';
import { TransactionsService } from './transactions.service';

export function transactionServiceFactory(http: HttpClient, configService: ConfigService): any {
  // Make decision on what to instantiate base on config
  return new V4TransactionsService(http, configService);
}

@NgModule({
})
export class TransactionsServiceModule {
  public static forRoot(): ModuleWithProviders<TransactionsServiceModule> {
    return {
      ngModule: TransactionsServiceModule,
      providers: [
        {
          provide: TransactionsService,
          useFactory: transactionServiceFactory,
          deps: [HttpClient, ConfigService]
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders<TransactionsServiceModule> {
    return {
      ngModule: TransactionsServiceModule
    };
  }
}
