import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMobilePreviewComponent } from './game-mobile-preview.component';
import { MatTabsModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GameMobilePreviewComponent
  ],
  exports: [
    GameMobilePreviewComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateModule,
  ]
})
export class GameMobilePreviewModule { }
