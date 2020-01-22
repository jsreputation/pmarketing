
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltySummaryComponent } from './loyalty-summary.component';

import { ProfileModule } from '../../profile/profile.module';
import { LoyaltyModule } from '../loyalty.module';
import { LoyaltyService } from '../loyalty.service';
import { of } from 'rxjs';
import { ProfileService } from '../../profile/profile.service';
import { MatProgressSpinnerModule } from '@angular/material';
import { ILoyalty } from '../models/loyalty.model';

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
    getLoyalty: () => of(mockLoyalty)
  };
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of({
      id: 1,
      state: '',
      firstName: '',
      lastName: ''
    })
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ProfileModule,
        LoyaltyModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
