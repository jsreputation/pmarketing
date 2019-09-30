import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateImageDirective } from '@cl-shared/directives/create-image.directive';
const DIRECTIVES = [
  CreateImageDirective
];
@NgModule({
  imports: [CommonModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES]
})
export class DirectivesModule {
}
