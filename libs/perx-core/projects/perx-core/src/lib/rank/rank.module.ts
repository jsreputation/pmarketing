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
import {CommonModule} from '@angular/common';

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
  ]
})
export class RankModule {
  success: string;
}
