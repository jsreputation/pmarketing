import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMobilePreviewComponent } from './game-mobile-preview.component';
import { MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [
    GameMobilePreviewComponent
  ],
  exports: [
    GameMobilePreviewComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ]
})
export class GameMobilePreviewModule { }
