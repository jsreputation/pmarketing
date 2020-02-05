import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationsRoutingModule } from './integrations-routing.module';
import { IntegrationsComponent } from './integrations.component';
import { UnderConstructionModule } from 'src/app/shared/under-construction/under-construction.module';


@NgModule({
  declarations: [IntegrationsComponent],
  imports: [
    CommonModule,
    IntegrationsRoutingModule,
    UnderConstructionModule
  ]
})
export class IntegrationsModule { }
