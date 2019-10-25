
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltySummaryComponent } from './loyalty-summary.component';

import { ProfileModule } from '../../profile/profile.module';
import { LoyaltyModule } from '../loyalty.module';
import { LoyaltyService } from '../loyalty.service';
import { of } from 'rxjs';
import { ProfileService } from '../../profile/profile.service';

describe('LoyaltySummaryComponent', () => {
  let component: LoyaltySummaryComponent;
  let fixture: ComponentFixture<LoyaltySummaryComponent>;
  const loyaltyServiceStub = {
    getLoyalties: () => of({})
  };
  const profileServiceStub = {
    whoAmI: () => of({
      id: 1,
      state: '',
      firstName: '',
      lastName: ''})
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ProfileModule,
        LoyaltyModule,
      ],
      providers: [
        { provide: LoyaltyService , useValue: loyaltyServiceStub },
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
