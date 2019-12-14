import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsBookingComponent } from './rewards-booking.component';
import {
  LocationModule,
  RewardsService,
  LocationsService,
  IVoucherService,
  LoyaltyService
} from '@perx/core';

import { of } from 'rxjs';
import {
  MatRadioModule,
  MatCheckboxModule,
  MatSelectModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';

describe('RewardsBookingComponent', () => {
  let component: RewardsBookingComponent;
  let fixture: ComponentFixture<RewardsBookingComponent>;

  const rewardServiceStub: Partial<RewardsService> = {
    getReward: () => of(),
    getRewardPricesOptions: () => of()
  };

  const locationServiceStub: Partial<LocationsService> = {
    getFromMerchant: () => of()
  };

  const voucherServiceStub: Partial<IVoucherService> = {
    reserveReward: () => of()
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of()
  };

  const dialogServiceStub = {
    open: (componentRef: any, config: any) => of({componentRef, config})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsBookingComponent ],
      imports: [
        LocationModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardServiceStub },
        { provide: LocationsService, useValue: locationServiceStub },
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: MatDialog, useValue: dialogServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
