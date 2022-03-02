import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltySummaryComponent } from './loyalty-summary.component';

import { ProfileModule } from '../../profile/profile.module';
import { LoyaltyModule } from '../loyalty.module';
import { LoyaltyService } from '../loyalty.service';
import { of } from 'rxjs';
import { ProfileService } from '../../profile/profile.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ILoyalty } from '../models/loyalty.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('LoyaltySummaryComponent', () => {
  let component: LoyaltySummaryComponent;
  let fixture: ComponentFixture<LoyaltySummaryComponent>;
  const mockLoyalty: ILoyalty = {
    id: 42,
    name: 'joe',
    pointsBalance: 42
  };
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([mockLoyalty]),
    getLoyalty: () => of(mockLoyalty),
    getTransactionHistory: () => of()
  };
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of({
      id: 1,
      state: '',
      firstName: '',
      lastName: ''
    })
  };
  const translateServiceStub: Partial<TranslateService> = {
    get: () => of()
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ProfileModule,
        LoyaltyModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: TranslateService, useValue: translateServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltySummaryComponent);
    component = fixture.componentInstance;
    component.subTitleFn = () => of('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
