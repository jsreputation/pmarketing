import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailAgreementComponent } from './detail-agreement.component';
import { DinamicCreateService } from 'src/app/shared/service/dinamic-create.service';

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
    DinamicCreateService
  ],
  exports: [
    DetailAgreementComponent
  ]
})
export class DetailAgreementModule { }
