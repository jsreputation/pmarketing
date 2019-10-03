import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleMobileViewComponent } from './simple-mobile-view.component';
import { DirectivesModule } from '@cl-shared/directives/directives.module';

@NgModule({
  declarations: [SimpleMobileViewComponent],
  exports: [SimpleMobileViewComponent],
  imports: [
    CommonModule,
    DirectivesModule,
  ]
})
export class SimpleMobileViewModule { }
