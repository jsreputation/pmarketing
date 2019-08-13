import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemComponent } from './redeem.component';
import { DinamicCreateService } from 'src/app/shared/service/dinamic-create.service';

@NgModule({
  declarations: [RedeemComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [RedeemComponent],
  providers: [
    DinamicCreateService
  ]
})
export class RedeemModule { }
