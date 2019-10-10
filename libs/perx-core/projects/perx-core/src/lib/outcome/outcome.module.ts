import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WhistlerInstantOutcomeService } from './whistler-instant-outcome.service';
import { Config } from '../config/config';
import { InstantOutcomeService } from './instant-outcome.service';
import { RewardsService } from '../rewards/rewards.service';

export function instantRewardsSvcFactory(http: HttpClient, config: Config, rewardService: RewardsService): InstantOutcomeService {
  // Make decision on what to instantiate base on config
  return new WhistlerInstantOutcomeService(http, config, rewardService);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: InstantOutcomeService,
      useFactory: instantRewardsSvcFactory,
      deps: [HttpClient, Config, RewardsService]
    }
  ]
})
export class OutcomeModule { }
