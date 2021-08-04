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

const mockLoyalty = [
  {
    id: 270,
    name: 'test tier reset',
    description: 'dasadads',
    beginDate: '2021-07-01T04:21:53.112Z',
    endDate: null,
    membershipTierName: 'Gold',
    membershipIdentifier: '34096277531-1622715521',
    pointsBalance: 26,
    currencyBalance: null,
    pointsToCurrencyRate: null,
    currency: null,
    nextTierPoints: 10,
    nextTierPointsDiff: 10,
    nextTierName: 'Green',
    tierPoints: 0,
    highestTier: 'Gold',
    expiringPoints: [
      {
        expireDate: null,
        points: null
      }
    ],
    membershipExpiry: null,
    tiers: [
      {
        id: 346,
        name: 'Base Tier',
        attained: false,
        pointsRequirement: 0,
        pointsDifference: 0,
        images: []
      },
      {
        id: 347,
        name: 'Green',
        attained: false,
        pointsRequirement: 10,
        pointsDifference: 10,
        images: []
      },
      {
        id: 348,
        name: 'Gold',
        attained: true,
        pointsRequirement: 20,
        pointsDifference: 20,
        images: []
      }
    ],
    membershipState: 'active',
    images: {}
  },
  {
    id: 203,
    name: 'VIP Loyalty program',
    description: 'Subscription based loyalty program',
    beginDate: '2021-05-12T07:45:58.473Z',
    endDate: null,
    membershipTierName: 'Base Tier',
    membershipIdentifier: '8701102578116934',
    pointsBalance: 0,
    currencyBalance: null,
    pointsToCurrencyRate: null,
    currency: null,
    nextTierPoints: 10,
    nextTierPointsDiff: 10,
    nextTierName: 'Silver Tier',
    tierPoints: 0,
    highestTier: 'Silver Tier',
    expiringPoints: [
      {
        expireDate: null,
        points: null
      }
    ],
    membershipExpiry: null,
    tiers: [
      {
        id: 278,
        name: 'Base Tier',
        attained: true,
        pointsRequirement: 0,
        pointsDifference: 0,
        images: []
      },
      {
        id: 279,
        name: 'Silver Tier',
        attained: false,
        pointsRequirement: 10,
        pointsDifference: 10,
        images: []
      }
    ],
    membershipState: 'active',
    images: {
      thumbnailUrl: 'https://cdn.perxtech.io/stored_value/campaign/images/203/alfred-quartey-exaigxml9wm-unsplash-7e968506-8acb-4199-83d0-26d4ffe0b4d5.jpg'
    }
  },
];

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
  it('To field should list all available loyalty programs except for selected program', () => {
    expect(1).toEqual(true);
  });

});
