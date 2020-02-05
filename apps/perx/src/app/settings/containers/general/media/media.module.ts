import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [MediaComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
    UnderConstructionModule
  ]
})
export class MediaModule { }
