import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerDirective } from './error-handler.directive';

@NgModule({
  declarations: [
    ErrorHandlerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorHandlerDirective
  ]
})
export class ErrorHandlerModule {
}
