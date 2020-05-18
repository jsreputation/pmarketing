import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsModule, UtilsModule } from '@perxtech/core';
import { ContentComponent } from './content.component';

@NgModule({
  declarations: [ContentComponent],
  exports: [ContentComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    UtilsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    SettingsModule,
  ]
})
export class ContentModule { }
