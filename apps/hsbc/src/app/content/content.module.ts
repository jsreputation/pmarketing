import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { TncComponent } from './tnc/tnc.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [ContentComponent, TncComponent, FaqComponent],
  imports: [
    CommonModule
  ],
  exports: [ContentComponent]
})
export class ContentModule { }
