import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngagementItemComponent } from './engagement-item.component';

@NgModule({
  declarations: [EngagementItemComponent],
  exports: [EngagementItemComponent],
  imports: [
    CommonModule
  ]
})
export class EngagementItemModule { }
