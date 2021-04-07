import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
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
