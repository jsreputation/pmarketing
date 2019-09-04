import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {
  IReward,
  LoyaltyModule,
  LoyaltyService,
  ProfileService,
  RewardsModule,
  VouchersModule,
  ILoyalty,
  RewardsService
} from '@perx/core';
import { MatButtonModule } from '@angular/material';
import { QRCodeModule } from 'angularx-qrcode';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { mockLoyalty } from '../loyalty.mock';
import { Type } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let rewardsService: RewardsService;
  let translateService: TranslateService;
  const loyaltyServiceStub = {
    getLoyalty: (): Observable<ILoyalty> => of(mockLoyalty),
    getLoyalties: (): Observable<ILoyalty[]> => of([mockLoyalty])
  };
  const rewardServiceStub = {
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
        { provide: ProfileService, useValue: { whoAmI: () => of(null) } },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: RewardsService, useValue: rewardServiceStub }
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    translateService = TestBed.get(TranslateService);
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

  it('should call translate service', fakeAsync(() => {
    const spy = spyOn(translateService, 'get');
    spy.and.returnValue(of({ YOU_HAVE: 'YOU_HAVE', HELLO: 'HELLO', POINTS_EXPITING: 'POINTS_EXPITING' }));
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(['YOU_HAVE', 'HELLO', 'POINTS_EXPITING']);
    tick();
    expect(component.titleFn(null)).toBe('HELLO');
  }));
});
