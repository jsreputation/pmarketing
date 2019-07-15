import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMobilePreviewStampComponent } from './game-mobile-preview-stamp.component';
import { MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [
    GameMobilePreviewStampComponent
  ],
  exports: [
    GameMobilePreviewStampComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ]
})
export class GameMobilePreviewStampModule { }
