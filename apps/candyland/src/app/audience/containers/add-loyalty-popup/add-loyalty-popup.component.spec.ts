import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoyaltyPopupComponent } from './add-loyalty-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatIconModule, MatDatepickerModule } from '@angular/material';
import { DatePickerModule, ButtonModule } from '@cl-shared';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

describe('ChangeExpiryDatePopupComponent', () => {
  let component: AddLoyaltyPopupComponent;
  let fixture: ComponentFixture<AddLoyaltyPopupComponent>;

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
          {provide: MAT_DIALOG_DATA, useValue: {}}
        ],
        declarations: [AddLoyaltyPopupComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoyaltyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
