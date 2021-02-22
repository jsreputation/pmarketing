import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RankModule } from '@perxtech/core';
import { LeaderboardsComponent } from './leaderboards.component';

@NgModule({
  declarations: [LeaderboardsComponent],
  exports: [],
  imports: [
    TranslateModule.forChild(),
    RouterModule,
    RankModule
  ]
})
export class LeaderboardsModule { }
