import { NgModule } from '@angular/core';

import { MatCardModule, MatRippleModule, MatButtonModule, MatIconModule, MatGridListModule } from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatRippleModule,
  MatGridListModule
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
