import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RedeemComponent } from './redeem.component';
import { HeaderComponent } from '../header/header.component';
import { MatToolbarModule } from '@angular/material';
import { Router } from '@angular/router';
import { RewardsService } from '../services/rewards.service';
import { of } from 'rxjs';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;
  const routerStub = {
    navigate: () => ({}),
    getCurrentNavigation: () =>  (
      {
        extras: {
          state: {
            data: '{"name": "name", "id": "0"}'
          }
        }
      }
    )
  };

  const rewardsServiceStub = {
    getReward: () => of({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemComponent, HeaderComponent ],
      imports: [ MatToolbarModule ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: RewardsService, useValue: rewardsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get reward on init', fakeAsync(() => {
    const rewardsService: RewardsService = fixture.debugElement.injector.get(
      RewardsService
    );
    const reward = {
      name: 'Glucophage 10% Discount',
      pointsPerUnit: 5,
    };
    const authSpy = spyOn(rewardsService, 'getReward').and.returnValue(of(reward));

    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(authSpy).toHaveBeenCalled();
    expect(component.gift).toBe(reward);
  }));

  it('should navigate to home onClose click', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate').and.callThrough();
    component.onClose();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

});
