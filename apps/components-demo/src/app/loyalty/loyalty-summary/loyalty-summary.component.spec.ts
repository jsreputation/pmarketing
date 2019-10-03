import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltySummaryComponent } from './loyalty-summary.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import {
  ProfileModule as PerxProfileModule,
  LoyaltyModule as PerxLoyaltyModule,
  LoyaltyService,
  ProfileService,
  IProfile
} from '@perx/core';
import { of } from 'rxjs';

describe('SummaryComponent', () => {
  let component: LoyaltySummaryComponent;
  let fixture: ComponentFixture<LoyaltySummaryComponent>;
  const loyaltyServiceStub = {
    getLoyalties: () => of([])
  };
  const mockProfile: IProfile = {
    id: 1,
    state: 'active',
    firstName: '',
    lastName: ''
  };
  const profileServiceStub = {
    whoAmI: () => of(mockProfile)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoyaltySummaryComponent],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatTabsModule,
        PerxProfileModule,
        PerxLoyaltyModule
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
