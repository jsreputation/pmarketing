import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RankModule } from '@perxtech/core';
import { LeaderboardPageComponent } from './leaderboard-page.component';
import { ProfileModule } from '@perxtech/core';

@NgModule({
  declarations: [LeaderboardPageComponent],
  exports: [],
  imports: [
    TranslateModule.forChild(),
    RouterModule,
    ProfileModule,
    RankModule
  ]
})
export class ContentModule { }
