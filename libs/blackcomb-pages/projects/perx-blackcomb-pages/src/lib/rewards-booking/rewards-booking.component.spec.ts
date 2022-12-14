import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsBookingComponent } from './rewards-booking.component';
import {
  LocationModule,
  RewardsService,
  LocationsService,
  IVoucherService,
  LoyaltyService,
  SettingsService
} from '@perxtech/core';

import { of } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

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
    open: (componentRef: any, config: any) => of({ componentRef, config })
  };

  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsBookingComponent],
      imports: [
        LocationModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule,
        MatButtonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: RewardsService, useValue: rewardServiceStub },
        { provide: LocationsService, useValue: locationServiceStub },
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
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
