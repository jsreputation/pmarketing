import {
  NgModule
} from '@angular/core';
import {
  LeaderboardComponent
} from './leaderboard/leaderboard.component';
import {
  MiniRankComponent
} from './mini-rank/mini-rank.component';
import {
  MatDividerModule,
  MatTableModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { V4RankService } from './v4-rank.service';
import { ConfigService } from '../config/config.service';

export function rankServiceFactory(http: HttpClient, configService: ConfigService): V4RankService {
  // Make decision on what to instantiate base on config
  return new V4RankService(http, configService);
}

const componentsAndPipes = [
  LeaderboardComponent,
  MiniRankComponent
];

@NgModule({
  declarations: [...componentsAndPipes],
  exports: [...componentsAndPipes],
  imports: [
    CommonModule,
    MatTableModule,
    MatDividerModule
  ],
  providers: [
    {
      provide: V4RankService,
      useFactory: rankServiceFactory,
      deps: [HttpClient, ConfigService]
    }
  ],
})
export class RankModule {
}
