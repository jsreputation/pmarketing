import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import {Router} from '@angular/router';
import {
  ILoyalty,
  UtilsModule,
  LoyaltyService
} from '@perxtech/core';
import { of } from 'rxjs';

const router = {
  navigate: jest.fn()
};

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  history.pushState({ merchantRebateData: '{"merchantId" : 0}'}, '', '');
  const mockLoyalty: ILoyalty = {
    id: 42,
    name: 'joe',
    pointsBalance: 42
  };
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([mockLoyalty]),
    getLoyalty: () => of(mockLoyalty)
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewComponent ],
      imports: [
        UtilsModule
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
