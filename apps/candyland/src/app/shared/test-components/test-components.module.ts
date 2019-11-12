import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestUploadGraphicComponent } from './test-upload-graphic/test-upload-graphic.component';

@NgModule({
  declarations: [TestUploadGraphicComponent],
  exports: [
    TestUploadGraphicComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestComponentsModule { }
