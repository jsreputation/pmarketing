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
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Type } from '@angular/core';

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

const prizeSetDetailMock = {
  id: 4,
  outcomes: [
    {
      campaignPrizeType: 'Reward::Campaign',
      campaignPrizeId: 1
    },
    {
      campaignPrizeType: 'StoredValue::Campaign',
      campaignPrizeId: 4
    }
  ]
};

describe('PrizeSetOutcomeComponent', () => {
  let component: PrizeSetOutcomeComponent;
  let fixture: ComponentFixture<PrizeSetOutcomeComponent>;
  let prizeSetOutcomeService: IPrizeSetOutcomeService;

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
          // useClass: ActivatedRouteMock,
          useValue: {
            queryParams: of({ transactionId: 1 }),
            params: of({ id: 3 }),
          },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component should call prizeSetOutcomeService.getPrizeSetState when has transactionId in query param', fakeAsync(() => {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);

    const spyGetPrizeSetDetail = spyOn(prizeSetOutcomeService, 'getPrizeSetDetails').and.returnValue(of(prizeSetDetailMock));

    const spyGetDetailPrize = spyOn(prizeSetOutcomeService, 'getPrizeSetState').and.returnValue(of(PrizeSetState.completed));

    activatedRoute.params.subscribe((param) => console.log('activatedRoute.param', param));
    activatedRoute.queryParams.subscribe((queryParams) => console.log('activatedRoute.queryParams', queryParams));
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
});
