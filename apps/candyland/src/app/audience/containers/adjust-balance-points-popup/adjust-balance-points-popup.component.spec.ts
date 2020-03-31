import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdjustBalancePointsPopupComponent } from './adjust-balance-points-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatIconModule, MatDatepickerModule } from '@angular/material';
import { DatePickerModule } from '@cl-shared';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@perxtech/candyshop';

describe('AdjustBalancePointsPopupComponent', () => {
  let component: AdjustBalancePointsPopupComponent;
  let fixture: ComponentFixture<AdjustBalancePointsPopupComponent>;

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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [AdjustBalancePointsPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustBalancePointsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
