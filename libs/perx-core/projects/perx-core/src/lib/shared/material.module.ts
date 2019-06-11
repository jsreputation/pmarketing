import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

const modules = [
  MatCardModule
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
