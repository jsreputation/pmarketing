import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import {LoyaltyService, ProfileService} from '@perx/core';

import { ExistingCardComponent } from './existing-card.component';

import { SharedModule } from '../../../shared/shared.module';

describe('ExistingCardComponent', () => {
  let component: ExistingCardComponent;
  let fixture: ComponentFixture<ExistingCardComponent>;
  const loyaltyServiceStub = {
    getLoyalties: () => of([]),
  };
  const profileServiceStub = {
    setCardNumber: () => of({})
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
