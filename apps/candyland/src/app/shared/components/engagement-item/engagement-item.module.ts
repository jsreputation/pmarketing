import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngagementItemComponent } from './engagement-item.component';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { MatIconModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EngagementItemComponent],
  exports: [EngagementItemComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    PipesModule,
    TranslateModule,
  ]
})
export class EngagementItemModule { }
