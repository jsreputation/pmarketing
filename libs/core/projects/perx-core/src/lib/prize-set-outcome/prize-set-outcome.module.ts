import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { V4PrizeSetOutcomeService } from './v4-prize-set-outcome.service';
import { IPrizeSetOutcomeService } from './prize-set-outcome.service';
import { ConfigService } from '../config/config.service';

export function prizeSetOutcomeServiceFactory(http: HttpClient, configService: ConfigService): IPrizeSetOutcomeService {
  return new V4PrizeSetOutcomeService(http, configService);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: IPrizeSetOutcomeService,
      useFactory: prizeSetOutcomeServiceFactory,
      deps: [HttpClient, ConfigService]
    }
  ],
})
export class PrizeSetOutcomeModule {
}
