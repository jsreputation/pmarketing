import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemComponent } from './redeem.component';
import { DynamicCreateService } from 'src/app/shared/service/dynamic-create.service';

@NgModule({
  declarations: [RedeemComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [RedeemComponent],
  providers: [
    DynamicCreateService
  ]
})
export class RedeemModule { }
