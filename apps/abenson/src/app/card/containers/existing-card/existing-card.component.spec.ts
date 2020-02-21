import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Type } from '@angular/core';

import { of } from 'rxjs';

import {
  LoyaltyService,
  ProfileService
} from '@perx/core';

import { ExistingCardComponent } from './existing-card.component';

import { SharedModule } from '../../../shared/shared.module';

describe('ExistingCardComponent', () => {
  let component: ExistingCardComponent;
  let profileService: ProfileService;
  let fixture: ComponentFixture<ExistingCardComponent>;
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([]),
  };
  const profileServiceStub: Partial<ProfileService> = {
    setCardNumber: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExistingCardComponent,
      ],
      imports: [
        SharedModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingCardComponent);
    component = fixture.componentInstance;
    profileService = TestBed.get<ProfileService>(ProfileService as Type<ProfileService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setCardNumber after onSubmit', () => {
    const setCardNumberSpy = spyOn(profileService, 'setCardNumber').and.callThrough();
    component.onSubmit();
    expect(setCardNumberSpy).toHaveBeenCalled();
  });
});
