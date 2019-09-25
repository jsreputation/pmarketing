import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngagementItemComponent } from './engagement-item.component';
import { PipesModule } from '@cl-shared/pipes/pipes.module';

@NgModule({
  declarations: [EngagementItemComponent],
  exports: [EngagementItemComponent],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class EngagementItemModule { }
