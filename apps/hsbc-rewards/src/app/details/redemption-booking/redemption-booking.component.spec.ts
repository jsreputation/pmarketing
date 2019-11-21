import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatRadioModule,
  MatCheckboxModule,
  MatSelectModule,
} from '@angular/material';

import { RedemptionBookingComponent } from './redemption-booking.component';
import { DetailHeaderModule } from '../detail-header/detail-header.module';
import {
  RewardsModule,
  LocationModule,
  VouchersModule,
  ILoyalty,
  LoyaltyService,
  LocationsService,
  RewardsService,
  IReward,
  IVoucherService
} from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialog } from '@angular/material/dialog';

describe('RedemptionBookingComponent', () => {
  let component: RedemptionBookingComponent;
  let fixture: ComponentFixture<RedemptionBookingComponent>;

  const locationsServiceStub = {};

  const loyaltyServiceStub = {
    getLoyalty: (): Observable<ILoyalty> => of({} as ILoyalty),
    getLoyalties: (): Observable<ILoyalty[]> => of([])
  };
  const mockReward: IReward = {
    id: 1,
    name: '',
    description: '',
    subtitle: '',
    validFrom: new Date(),
    validTo: new Date(),
    rewardBanner: '',
    merchantImg: '',
    termsAndConditions: '',
    howToRedeem: '',
  };
  const rewardsServiceStub = {
    getReward: () => of(mockReward)
  };

  const vouchersServiceStub = {
    reserveReward: () => of()
  };

  const dialogServiceStub = {
    open: (componentRef: any, config: any) => of({componentRef, config})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionBookingComponent],
      imports: [
        BrowserDynamicTestingModule,
        DetailHeaderModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule,
        RewardsModule,
        VouchersModule,
        LocationModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        FormsModule
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: LocationsService, useValue: locationsServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: MatDialog, useValue: dialogServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
