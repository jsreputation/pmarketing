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
import { Config } from '../config/config';
import { RankService } from './rank.service';

export function rankServiceFactory(http: HttpClient, config: Config): RankService {
  // Make decision on what to instantiate base on config
  return new RankService(http, config);
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
      provide: RankService,
      useFactory: rankServiceFactory,
      deps: [HttpClient, Config]
    }
  ],
})
export class RankModule {
}
