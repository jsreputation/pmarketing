import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InkComponent } from './ink.component';
import { InkBarDirective } from './directives/ink-bar.directive';
import { InkHostDirective } from './directives/ink-host.directive';
import { InkListenerDirective } from './directives/ink-listener.directive';

@NgModule({
  declarations: [
    InkComponent,
    InkBarDirective,
    InkHostDirective,
    InkListenerDirective
  ],
  exports: [
    InkComponent,
    InkHostDirective,
    InkListenerDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class InkModule { }
