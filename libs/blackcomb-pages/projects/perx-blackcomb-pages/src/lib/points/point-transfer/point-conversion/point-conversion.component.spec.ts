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
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { mockExchangeRate, mockLoyalty } from './mockData/point.mock-data';

describe('PointConversionComponent', () => {
  let component: PointConversionComponent;
  let fixture: ComponentFixture<PointConversionComponent>;
  let loyaltyService: LoyaltyService;
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
    loyaltyService = TestBed.get<LoyaltyService>(LoyaltyService as Type<LoyaltyService>);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loyalty program in the from field', () => {
    spyOn(loyaltyService, 'getLoyalties').and.returnValue(of(mockLoyalty));
    component.ngOnInit();
    fixture.detectChanges();

    const arrowSelectButton = fixture.debugElement.query(By.css('.mat-select-arrow-wrapper')).nativeElement;
    arrowSelectButton.click();
    fixture.detectChanges();

    const listLoyaltyOption = fixture.debugElement.queryAll(By.css('.mat-option-text'));
    expect(listLoyaltyOption.length).toEqual(mockLoyalty.length);
  });

  it('To field should list all available loyalty programs with supported exchange rate', () => {
    const loyaltyServiceCall =  spyOn(loyaltyService, 'getLoyalties').and.returnValue(of(mockLoyalty));
    const exchangeratesCall = spyOn(loyaltyService, 'getLoyaltyExchangerates').and.returnValue(of(mockExchangeRate));
    component.ngOnInit();
    expect(loyaltyServiceCall).toHaveBeenCalled();
    fixture.detectChanges();

    const arrowSelectButton = fixture.debugElement.query(By.css('.mat-select-arrow-wrapper')).nativeElement;
    arrowSelectButton.click();
    fixture.detectChanges();

    const listLoyaltyOption = fixture.debugElement.queryAll(By.css('.mat-option-text'));
    listLoyaltyOption[1].nativeElement.click();
    expect(exchangeratesCall).toHaveBeenCalled();
    fixture.detectChanges();

    const toArrowButton = fixture.debugElement.query(By.css('.destination-dropdown .mat-select-arrow-wrapper')).nativeElement;
    toArrowButton.click();
    fixture.detectChanges();

    const destintionLoyaltyPgmList = fixture.debugElement.queryAll(By.css('.mat-option-text'));
    expect(destintionLoyaltyPgmList.length).toBeTruthy();
  });

});
