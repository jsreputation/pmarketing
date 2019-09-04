import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';
import { NavigateToolbarModule } from '../navigate-toolbar/navigate-toolbar.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    NavigateToolbarModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
