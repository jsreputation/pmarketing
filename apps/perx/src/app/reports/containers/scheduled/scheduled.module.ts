import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduledRoutingModule } from './scheduled-routing.module';
import { ScheduledComponent } from './scheduled.component';


@NgModule({
  declarations: [ScheduledComponent],
  imports: [
    CommonModule,
    ScheduledRoutingModule
  ]
})
export class ScheduledModule { }
