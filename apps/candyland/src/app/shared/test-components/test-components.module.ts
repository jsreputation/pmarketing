import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestUploadGraphicComponent } from './test-upload-graphic/test-upload-graphic.component';
import { TestSelectGraphicWrapComponent } from './test-select-graphic-wrap/test-select-graphic-wrap.component';

@NgModule({
  declarations: [TestUploadGraphicComponent, TestSelectGraphicWrapComponent],
  exports: [
    TestUploadGraphicComponent,
    TestSelectGraphicWrapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestComponentsModule { }
