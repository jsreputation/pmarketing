import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    UnderConstructionModule
  ]
})
export class TagsModule { }
