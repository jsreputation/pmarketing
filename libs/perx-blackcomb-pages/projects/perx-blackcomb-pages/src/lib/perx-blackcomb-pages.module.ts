import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { ContentComponent } from './content/content.component';
import { MatProgressBarModule, MatCardModule, MatIconModule, MatButtonModule, MatRippleModule, MatGridListModule, MatTabsModule } from '@angular/material';
import { GameModule } from './game/game.module';
import { HistoryComponent } from './history/history.component';
import { VouchersComponent } from '@perx/core';
import { RepeatTimesDirective } from '@perx/core';
const comps: any[] = [
  AccountComponent,
  ContentComponent,
  HistoryComponent,
  VouchersComponent,
  RepeatTimesDirective
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatProgressBarModule,
    GameModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatGridListModule,
    MatTabsModule
  ],
  exports: [
    ...comps
  ],
  declarations: [
    ...comps
  ]
})
export class PerxBlackcombPagesModule {

}
