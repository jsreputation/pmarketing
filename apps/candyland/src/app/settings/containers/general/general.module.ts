import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [GeneralComponent],
  exports: [GeneralComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatCardModule
  ]
})
export class GeneralModule { }
