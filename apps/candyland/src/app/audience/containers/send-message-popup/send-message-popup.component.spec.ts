import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessagePopupComponent } from './send-message-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatIconModule, MatDatepickerModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePickerModule, ButtonModule } from '@cl-shared';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { WINDOW } from '@cl-core/services/window.service';

describe('SendMessagePopupComponent', () => {
  let component: SendMessagePopupComponent;
  let fixture: ComponentFixture<SendMessagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          MatDialogModule,
          DatePickerModule,
          ButtonModule,
          MatIconModule,
          BrowserDynamicTestingModule,
          MatDatepickerModule,
          FormsModule,
          ReactiveFormsModule,
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
          {provide: MAT_DIALOG_DATA, useValue: {}},
          { provide: WINDOW, useValue: {
              scrollTo(a: any, b: any): any { return {a, b}; }
            }
          }
        ],
        declarations: [SendMessagePopupComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
