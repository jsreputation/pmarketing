import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatSelectModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [GeneralComponent],
  exports: [GeneralComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatCardModule,
    TranslateModule,
  ]
})
export class GeneralModule { }
