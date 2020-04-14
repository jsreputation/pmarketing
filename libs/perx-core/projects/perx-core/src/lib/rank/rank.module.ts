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

const componentsAndPipes = [
  LeaderboardComponent,
  MiniRankComponent
];

@NgModule({
  declarations: [...componentsAndPipes],
  exports: [...componentsAndPipes],
  imports: [
    MatTableModule,
    MatDividerModule
  ]
})
export class RankModule {
}
