import { NgModule } from '@angular/core';

import { MatCardModule, MatRippleModule } from '@angular/material';

const modules = [
  MatCardModule,
  MatRippleModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class MaterialModule { }
