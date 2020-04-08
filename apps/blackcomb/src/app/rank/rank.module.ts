import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '@perxtech/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LeaderboardPageComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: LeaderboardPageComponent
}];

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    MatDividerModule,
    MatButtonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class RankModule { }
