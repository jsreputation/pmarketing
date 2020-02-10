import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadsRoutingModule } from './uploads-routing.module';
import { UploadsComponent } from './uploads.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [UploadsComponent],
  imports: [
    CommonModule,
    UploadsRoutingModule,
    UnderConstructionModule
  ]
})
export class UploadsModule { }
