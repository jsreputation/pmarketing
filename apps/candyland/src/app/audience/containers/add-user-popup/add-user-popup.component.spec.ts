import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPopupComponent } from './add-user-popup.component';
import {
  MatDialogRef, MAT_DIALOG_DATA, MatIconModule, MatOptionModule,
  MatSelectModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatTabsModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePickerModule, ButtonModule, UploadFileModule } from '@cl-shared';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

describe('AddUserPopupComponent', () => {
  let component: AddUserPopupComponent;
  let fixture: ComponentFixture<AddUserPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          MatIconModule,
          BrowserDynamicTestingModule,
          FormsModule,
          ReactiveFormsModule,
          MatOptionModule,
          MatSelectModule,
          MatInputModule,
          MatFormFieldModule,
          MatDialogModule,
          DatePickerModule,
          MatTabsModule,
          ButtonModule,
          UploadFileModule,
          BrowserAnimationsModule,
          NoopAnimationsModule,
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: MatDialogRef, useValue: {
              close: () => {
              }
            }
          },
          {provide: MAT_DIALOG_DATA, useValue: {}}
        ],
        declarations: [AddUserPopupComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
