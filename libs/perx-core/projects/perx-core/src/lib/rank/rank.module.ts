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
import { RankService } from './rank.service';
import { ConfigService } from '../config/config.service';

export function rankServiceFactory(http: HttpClient, configService: ConfigService): RankService {
  // Make decision on what to instantiate base on config
  return new RankService(http, configService);
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
      deps: [HttpClient, ConfigService]
    }
  ],
})
export class RankModule {
}
