import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationsComponent } from './communications.component';
import {
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatRadioModule, MatSlideToggleModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@perx/candyshop';

@NgModule({
  declarations: [CommunicationsComponent],
  exports: [CommunicationsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,

    MatCardModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatIconModule,
    MatExpansionModule,
  ]
})
export class CommunicationsModule { }
