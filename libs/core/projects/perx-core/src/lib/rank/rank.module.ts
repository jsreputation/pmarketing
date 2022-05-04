import {
  NgModule
} from '@angular/core';
import {
  LeaderboardComponent
} from './leaderboard/leaderboard.component';
import {
  MiniRankComponent
} from './mini-rank/mini-rank.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { V4RankService } from './v4-rank.service';
import { ConfigService } from '../config/config.service';
import { IRankService } from './irank.service';
import { LeaderboardListComponent } from './leaderboard-list/leaderboard-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { LeaderboardAboutComponent } from './leaderboard-about/leaderboard-about.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { PipeUtilsModule } from '../utils/pipe-utils.module';

export function rankServiceFactory(http: HttpClient, configService: ConfigService): V4RankService {
  // Make decision on what to instantiate base on config
  return new V4RankService(http, configService);
}

const componentsAndPipes = [
  LeaderboardComponent,
  LeaderboardListComponent,
  LeaderboardAboutComponent,
  MiniRankComponent
];

@NgModule({
  declarations: [...componentsAndPipes],
  exports: [...componentsAndPipes],
  imports: [
    CommonModule,
    MatTableModule,
    MatDividerModule,
    MatRippleModule,
    MatCardModule,
    TranslateModule,
    RouterModule,
    UtilsModule,
    PipeUtilsModule
  ],
  providers: [
    {
      provide: IRankService,
      useFactory: rankServiceFactory,
      deps: [HttpClient, ConfigService]
    }
  ],
})
export class RankModule {
}
