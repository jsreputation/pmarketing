import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import {
  ICampaignService,
  IPrizeSetOutcomeService,
  LoyaltyService,
  PrizeSetState,
  RewardsService,
  UtilsModule
} from '@perxtech/core';
import { PrizeSetOutcomeComponent } from './prize-set-outcome.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';

const campaignServiceStub: Partial<ICampaignService> = {};
const loyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalty: () => of()
};
const rewardServiceStub: Partial<RewardsService> = {
  getReward: () => of(),
};
const prizeSetOutcomeServiceStub: Partial<IPrizeSetOutcomeService> = {
  getPrizeSetState: () => of(),
  getPrizeSetDetails: () => of(),
  getPrizeSetIssuedOutcomes: () => of()
};

interface RouterWithQueryParam extends Router {
  queryParams: Observable<{ transactionId: number }>;
  params: Observable<{ id: number}>;
}

const routerStub: Partial<RouterWithQueryParam> = {
  navigate: () => Promise.resolve(true),
  queryParams: of({ transactionId: 1 }),
  params: of({ id: 3 }),
};

const prizeSetDetailMock = {
  id: 4,
  outcomes: [
    {
      campaignPrizeType: 'Reward::Campaign',
      campaignPrizeId: 1,
      actualOutcomeId: 10
    },
    {
      campaignPrizeType: 'StoredValue::Campaign',
      campaignPrizeId: 4,
      actualOutcomeId: 5
    }
  ]
};

describe('PrizeSetOutcomeComponent', () => {
  let component: PrizeSetOutcomeComponent;
  let fixture: ComponentFixture<PrizeSetOutcomeComponent>;
  let prizeSetOutcomeService: IPrizeSetOutcomeService;
  let routerService: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeSetOutcomeComponent],
      imports: [
        MatToolbarModule,
        MatCardModule,
        RouterTestingModule,
        MatProgressBarModule,
        MatListModule,
        UtilsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routerStub,
        },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: RewardsService, useValue: rewardServiceStub },
        { provide: IPrizeSetOutcomeService, useValue: prizeSetOutcomeServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeSetOutcomeComponent);
    prizeSetOutcomeService = TestBed.get<IPrizeSetOutcomeService>(IPrizeSetOutcomeService as Type<IPrizeSetOutcomeService>);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routerService = fixture.debugElement.injector.get<Router>(Router as Type<Router>);  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component should call prizeSetOutcomeService.getPrizeSetState when has transactionId in query param', fakeAsync(() => {
    const spyGetPrizeSetDetail = spyOn(prizeSetOutcomeService, 'getPrizeSetDetails').and.returnValue(of(prizeSetDetailMock));
    const spyGetDetailPrize = spyOn(prizeSetOutcomeService, 'getPrizeSetState').and.returnValue(of(PrizeSetState.completed));

    component.ngOnInit();

    fixture.detectChanges();
    expect(spyGetPrizeSetDetail).toHaveBeenCalled();
    expect(spyGetDetailPrize).toHaveBeenCalled();
  }));

  it('Should call api to get issued outcomes only when prize set state returned is completed', fakeAsync(() => {
    spyOn(prizeSetOutcomeService, 'getPrizeSetDetails').and.returnValue(of(prizeSetDetailMock));

    spyOn(prizeSetOutcomeService, 'getPrizeSetState').and.returnValue(of(PrizeSetState.completed));
    const spyGetIssueOutCome = spyOn(prizeSetOutcomeService, 'getPrizeSetIssuedOutcomes').and.returnValue(of([prizeSetDetailMock]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(spyGetIssueOutCome).toHaveBeenCalled();
  }));

  it('Should display error when when prize set state api returns failed', fakeAsync(() => {

    spyOn(prizeSetOutcomeService, 'getPrizeSetDetails').and.returnValue(of(prizeSetDetailMock));
    spyOn(prizeSetOutcomeService, 'getPrizeSetState').and.returnValue(of(PrizeSetState.failed));
    component.ngOnInit();
    fixture.detectChanges();
    const marker = fixture.debugElement.query(By.css('.marker'));
    expect(marker.nativeElement.textContent.trim()).toBe('PRIZE_SET.FAILED_STATE');
  }));

  it('should check navigate to the voucher detail page when clicking on issued reward outcome card', fakeAsync(() => {
    spyOn(prizeSetOutcomeService, 'getPrizeSetDetails').and.returnValue(of(prizeSetDetailMock));
    spyOn(prizeSetOutcomeService, 'getPrizeSetState').and.returnValue(of(PrizeSetState.completed));
    const routerSpy = spyOn(routerService, 'navigate');

    component.ngOnInit();
    fixture.detectChanges();
    const navigateRewardButton = fixture.debugElement.query(By.css('.navigate-to-reward-btn'));
    navigateRewardButton.triggerEventHandler('click', {});
    expect(routerSpy).toHaveBeenCalledWith(['/voucher-detail', prizeSetDetailMock.outcomes[0].actualOutcomeId]);
  }));

});
