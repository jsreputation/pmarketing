import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { V4InstantOutcomeTransactionService } from './v4-instant-outcome-transaction.service';
import { IInstantOutcomeTransactionService } from './instant-outcome-transaction.service';
import { ConfigService } from '../config/config.service';

export function instantOutcomeTransactionFactory(http: HttpClient, configService: ConfigService): IInstantOutcomeTransactionService {
  return new V4InstantOutcomeTransactionService(http, configService);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class InstantOutcomeTransactionServiceModule {
  public static forRoot(): ModuleWithProviders<InstantOutcomeTransactionServiceModule> {
    return {
      ngModule: InstantOutcomeTransactionServiceModule,
      providers: [
        {
          provide: IInstantOutcomeTransactionService,
          useFactory: instantOutcomeTransactionFactory,
          deps: [HttpClient, ConfigService]
        }
      ],
    };
  }

  public static forChild(): ModuleWithProviders<InstantOutcomeTransactionServiceModule> {
    return {
      ngModule: InstantOutcomeTransactionServiceModule
    };
  }
}
