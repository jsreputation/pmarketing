import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentContainerComponent } from './content-container.component';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContentContainerComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule
  ],
  exports: [ContentContainerComponent]
})
export class ContentContainerModule {
}
