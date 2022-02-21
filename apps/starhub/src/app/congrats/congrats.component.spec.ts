import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CongratsComponent } from './congrats.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { IGameService, IPrizeSetOutcomeService, LoyaltyService, OutcomeType, RewardsService } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GameOutcomeService } from './game-outcome/game-outcome.service';
import { vouchers } from '../vouchers.mock';
import { Type } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

describe('CongratsComponent', () => {
  let component: CongratsComponent;
  let fixture: ComponentFixture<CongratsComponent>;

  const gameServiceStub: Partial<IGameService> = {
    play: () => of()
  };

  const gameOutcomeServiceStub: Partial<GameOutcomeService> = {
    getVouchersRewarded: () => [],
    clearVoucherList: () => {
    },
    getPrizeSetOutcome: () => ({
        transactionId: 1,
        prizeSetId: 1,
        outcomeType: OutcomeType.prizeSet,
        state: 'issued'
    }),
    getOutcome: () => ({} as any)
  };

  const analyticsServiceStub: Partial<AnalyticsService> = {
    addEvent: () => { }
  };

  const routerStub: Partial<Router> = { navigateByUrl: () => Promise.resolve(true) };

  const prizeSetOutcomeService: Partial<IPrizeSetOutcomeService> = {
    getPrizeSetDetails: () => of(),
    getPrizeSetState: () => of(),
    getPrizeSetIssuedOutcomes: () => of()
  };

  const rewardServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: () => of()
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [CongratsComponent],
      imports: [MatToolbarModule, MatCardModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({ gameId: 1 }) } },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: GameOutcomeService, useValue: gameOutcomeServiceStub },
        { provide: AnalyticsService, useValue: analyticsServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: IPrizeSetOutcomeService, useValue: prizeSetOutcomeService },
        { provide: RewardsService, useValue: rewardServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoule call getVouchersRewarded and addEvent on ngOnInit', fakeAsync(() => {
    const gameOutcomeService: GameOutcomeService = fixture.debugElement.injector.get<GameOutcomeService>(
      GameOutcomeService as Type<GameOutcomeService>);
    const gameOutcomeServiceSpy = spyOn(gameOutcomeService, 'getVouchersRewarded').and.returnValue(vouchers);

    const analyticsService: AnalyticsService = fixture.debugElement.injector.get<AnalyticsService>(
      AnalyticsService as Type<AnalyticsService>);
    const analyticsServiceSpy = spyOn(analyticsService, 'addEvent');

    component.ngOnInit();
    tick();
    expect(gameOutcomeServiceSpy).toHaveBeenCalled();
    expect(component.vouchers).toEqual(vouchers);
    expect(analyticsServiceSpy).toHaveBeenCalled();
  }));

  it('', fakeAsync(() => {
    const gameOutcomeService: GameOutcomeService = fixture.debugElement.injector.get<GameOutcomeService>(
      GameOutcomeService as Type<GameOutcomeService>);
    const gameOutcomeServiceSpy = spyOn(gameOutcomeService, 'clearVoucherList');

    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    component.navigateToRewards();
    tick();
    expect(gameOutcomeServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/home/vouchers');
  }));

});
