import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [CheckboxGroupComponent],
  exports:  [CheckboxGroupComponent],
  imports: [
    CommonModule,
    MatCheckboxModule
  ]
})
export class CheckboxGroupModule { }
