import { DatePipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageService, LoyaltyService, NotificationService } from '@perxtech/core';
import { of } from 'rxjs';
import { PointConversionConfirmationComponent } from '../point-conversion-confirmation/point-conversion-confirmation.component';
import { PointConversionComponent } from './point-conversion.component';

describe('PointConversionComponent', () => {
  let component: PointConversionComponent;
  let fixture: ComponentFixture<PointConversionComponent>;
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([]),
    getLoyaltyExchangerates: () => of([])
  };

  const notificationServiceStub: Partial<NotificationService> = {
    addSnack: () => { }
  };

  const router = {
    navigate: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PointConversionComponent, PointConversionConfirmationComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        {
          provide: ErrorMessageService, useValue: { getErrorMessageByErrorCode: () => of('') }
        },
        { provide: Router, useValue: router },
        DatePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
