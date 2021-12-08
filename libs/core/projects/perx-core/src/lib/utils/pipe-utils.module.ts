import { NgModule } from '@angular/core';
import { DistancePipe } from './directives/distance-pipe';
import { SortRewardsPipe } from './directives/sort-rewards-pipe';
import { StripHtmlPipe } from './directives/striphtml-pipe';
import { ForceLengthPipe } from './timer/timer.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { PointsToCashPipe } from './directives/points-to-cash.pipe';
import { ProgressInfoPipe } from './progress-info/progress-info.pipe';
import { GettingStartedPipe } from './getting-started/getting-started.pipe';
import { GettingStartedNearPicPipe } from './getting-started-near-pic/getting-started-near-pic.pipe';

const pipes = [
  DistancePipe,
  SortRewardsPipe,
  StripHtmlPipe,
  SafeHtmlPipe,
  SafeUrlPipe,
  PointsToCashPipe,
  ProgressInfoPipe,
  GettingStartedPipe,
  GettingStartedNearPicPipe,
  ForceLengthPipe
];

@NgModule({
  declarations: [
    ...pipes
  ],
  exports: [
    ...pipes
  ]
})
export class PipeUtilsModule {
}
