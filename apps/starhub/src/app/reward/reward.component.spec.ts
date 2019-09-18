import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RewardsService, IVoucherService } from '@perx/core';
import { LocationShortFormatComponent } from '../location-short-format/location-short-format.component';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { ExpireTimerComponent } from './expire-timer/expire-timer.component';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Type } from '@angular/core';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;
  const rewardsServiceStub = {
    getReward: () => of()
  };

  const vouchersServiceStub = {
    issueReward: () => of()
  };
  const locationStub = {
    back: () => { }
  };
  const routerStub = { navigate: () => ({}) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent, LocationShortFormatComponent, RewardDetailComponent, ExpireTimerComponent],
      imports: [
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ id: '1' })
          }
        },
        { provide: Location, useValue: locationStub },
        { provide: Router, useValue: routerStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(location, 'back');
    component.back();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should save reward', () => {
    const vouchersService: IVoucherService = fixture.debugElement.injector
      .get<IVoucherService>(IVoucherService as Type<IVoucherService>);
    const vouchersServiceSpy = spyOn(vouchersService, 'issueReward').and.returnValue(
      of()
    );
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate');
    component.save();
    expect(vouchersServiceSpy).toHaveBeenCalled();
  });
});
