import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUploadDialogComponent } from './multi-upload-dialog.component';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatIconModule} from '@angular/material';
import {UploadGraphicModule} from '@cl-shared/components/upload-graphic/upload-graphic.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from '@perx/candyshop';
import {PipesModule} from '@cl-shared/pipes/pipes.module';

describe('MultiUploadDialogComponent', () => {
  let component: MultiUploadDialogComponent;
  let fixture: ComponentFixture<MultiUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiUploadDialogComponent ],
      imports: [
        CommonModule,
        MatDialogModule,
        UploadGraphicModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatIconModule,
        ButtonModule,
        PipesModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
