import { NgModule } from '@angular/core';

import { MatCardModule, MatRippleModule, MatButtonModule, MatIconModule } from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
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
