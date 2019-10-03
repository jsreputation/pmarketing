import { NgModule } from '@angular/core';

import { MatCardModule, MatRippleModule, MatButtonModule, MatIconModule, MatGridListModule, MatTabsModule } from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatRippleModule,
  MatGridListModule,
  MatTabsModule
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
