import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduledRoutingModule } from './scheduled-routing.module';
import { ScheduledComponent } from './scheduled.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [ScheduledComponent],
  imports: [
    CommonModule,
    ScheduledRoutingModule,
    UnderConstructionModule
  ]
})
export class ScheduledModule { }
