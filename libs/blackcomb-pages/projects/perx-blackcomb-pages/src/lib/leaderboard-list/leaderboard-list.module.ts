import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RankModule } from '@perxtech/core';
import { LeaderboardListComponent } from './leaderboard-list.component';
import { ProfileModule } from '@perxtech/core';

@NgModule({
  declarations: [LeaderboardListComponent],
  exports: [],
  imports: [
    TranslateModule.forChild(),
    RouterModule,
    ProfileModule,
    RankModule
  ]
})
export class LeaderboardListModule { }
