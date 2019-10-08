import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { ContentComponent } from './content/content.component';
import { MatProgressBarModule } from '@angular/material';
import { GameModule } from './game/game.module';
const comps: any[] = [
  AccountComponent,
  ContentComponent,
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatProgressBarModule,
    GameModule
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
