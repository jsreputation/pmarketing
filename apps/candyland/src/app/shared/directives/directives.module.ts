import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateImageDirective } from '@cl-shared/directives/create-image.directive';
import { ScrollToDirective } from '@cl-shared/directives/scroll-to.directive';
const DIRECTIVES = [
  CreateImageDirective,
  ScrollToDirective,
];
@NgModule({
  imports: [CommonModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES]
})
export class DirectivesModule {
}
