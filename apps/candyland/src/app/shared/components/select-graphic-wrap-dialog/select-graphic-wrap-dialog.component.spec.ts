import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGraphicWrapDialogComponent } from './select-graphic-wrap-dialog.component';
import {ImagesPreviewModule} from '@cl-shared/components/images-preview/images-preview.module';
import {UploadGraphicModule} from '@cl-shared/components/upload-graphic/upload-graphic.module';
import {SelectGraphicModule} from '@cl-shared/components/select-graphic/select-graphic.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiUploadDialogModule} from '@cl-shared/components/multi-upload-dialog/multi-upload-dialog.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material';

describe('SelectGraphicWrapDialogComponent', () => {
  let component: SelectGraphicWrapDialogComponent;
  let fixture: ComponentFixture<SelectGraphicWrapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGraphicWrapDialogComponent ],
      imports: [
        ImagesPreviewModule,
        UploadGraphicModule,
        SelectGraphicModule,
        ReactiveFormsModule,
        MultiUploadDialogModule,
        TranslateModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGraphicWrapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
