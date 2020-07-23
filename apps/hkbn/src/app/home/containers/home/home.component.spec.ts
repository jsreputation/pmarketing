import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  of,
  Observable,
} from 'rxjs';
import {
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';

import {
  IReward,
  LoyaltyModule,
  LoyaltyService,
  ProfileService,
  RewardsModule,
  VouchersModule,
  ILoyalty,
  RewardsService, ThemesService
} from '@perxtech/core';

import { HomeComponent } from './home.component';

import { mockLoyalty } from '../loyalty.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let rewardsService: RewardsService;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: (): Observable<ILoyalty> => of(mockLoyalty),
    getLoyalties: (): Observable<ILoyalty[]> => of([mockLoyalty])
  };
  const rewardServiceStub: Partial<RewardsService> = {
    getAllRewards: (): Observable<IReward[]> => of([])
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoyaltyModule,
        QRCodeModule,
        MatButtonModule,
        RewardsModule,
        VouchersModule,
        RouterTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: { whoAmI: () => of(null) }
        },
        {
          provide: LoyaltyService,
          useValue: loyaltyServiceStub,
        },
        {
          provide: RewardsService,
          useValue: rewardServiceStub,
        },
        {
          provide: ThemesService,
          useValue: themesServiceStub,
        },
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    rewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to reward specific, when calling goToReward method', () => {
    const router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    component.goToReward({ id: 1 } as IReward);
    expect(routerSpy).toHaveBeenCalledWith(['/reward', 1]);
  });

  it('should call rewardsService', () => {
    const spy = spyOn(rewardsService, 'getAllRewards');
    spyOn(fixture.debugElement.injector.get(TranslateService), 'get').and.returnValue(of());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
