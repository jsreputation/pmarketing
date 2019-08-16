import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailAgreementComponent } from './detail-agreement.component';
import { DynamicCreateService } from 'src/app/shared/service/dynamic-create.service';

@NgModule({
  declarations: [
    DetailAgreementComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    DetailAgreementComponent
  ],
  providers: [
    DynamicCreateService
  ],
  exports: [
    DetailAgreementComponent
  ]
})
export class DetailAgreementModule { }
