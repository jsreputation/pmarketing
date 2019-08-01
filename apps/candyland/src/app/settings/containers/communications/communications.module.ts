import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationsComponent } from './communications.component';

@NgModule({
  declarations: [CommunicationsComponent],
  exports: [CommunicationsComponent],
  imports: [
    CommonModule
  ]
})
export class CommunicationsModule { }
