import { NgModule } from '@angular/core';

import { MatCardModule, MatRippleModule, MatButtonModule } from '@angular/material';

const modules = [
  MatButtonModule,
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
