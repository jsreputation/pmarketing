import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleMobileViewComponent } from './simple-mobile-view.component';

@NgModule({
  declarations: [SimpleMobileViewComponent],
  exports: [SimpleMobileViewComponent],
  imports: [
    CommonModule
  ]
})
export class SimpleMobileViewModule { }
