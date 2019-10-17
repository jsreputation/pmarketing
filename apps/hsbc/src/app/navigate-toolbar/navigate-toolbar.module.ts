import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigateToolbarComponent } from './navigate-toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigateToolbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavigateToolbarComponent
  ]
})
export class NavigateToolbarModule { }
