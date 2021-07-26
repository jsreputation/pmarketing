import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { ICampaignService, IPrizeSetOutcomeService, LoyaltyService, RewardsService, UtilsModule } from '@perxtech/core';
import { PrizeSetOutcomeComponent } from './prize-set-outcome.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Type } from '@angular/core';

const campaignServiceStub: Partial<ICampaignService> = {};
const loyaltyServiceStub: Partial<LoyaltyService> = {};
const rewardServiceStub: Partial<RewardsService> = {};
const prizeSetOutcomeServiceStub: Partial<IPrizeSetOutcomeService> = {
  getPrizeSetState: () => of(),
  getPrizeSetDetails: () => of(),
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

    const spyGetDetailPrize = spyOn(prizeSetOutcomeService, 'getPrizeSetDetails').and.returnValue(of([{
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
    }]));

    // fixture.detectChanges();
    activatedRoute.params.subscribe((param) => console.log('activatedRoute.param', param));
    activatedRoute.queryParams.subscribe((queryParams) => console.log('activatedRoute.queryParams', queryParams));

    spyOn(prizeSetOutcomeService, 'getPrizeSetState').and.returnValue(of([]));
    tick();
    expect(spyGetDetailPrize).toHaveBeenCalled();
  }));
});
