import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { DynamicCreateService } from '../../shared/service/dynamic-create.service';
import { FaqRoutingModule } from './faq-routing.module';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule
  ],
  providers: [
    DynamicCreateService
  ]
})
export class FaqModule { }
