import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionComponent } from './redemption.component';
import { MatCardModule } from '@angular/material';
import { VouchersModule, ConfigModule, RewardsService, IMerchantsService } from '@perx/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;

  const rewardsServiceStub = {
    getReward: () => of()
  };

  const merchantsServiceStub = {
    getMerchant: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionComponent],
      imports: [
        ConfigModule.forRoot({}),
        MatCardModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        VouchersModule,
      ],
      providers: [
        {
          provide: RewardsService, useValue: rewardsServiceStub
        },
        {
          provide: IMerchantsService, useValue: merchantsServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
