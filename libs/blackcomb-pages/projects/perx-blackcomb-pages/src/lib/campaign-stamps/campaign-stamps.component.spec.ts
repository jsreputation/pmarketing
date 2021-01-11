import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignStampsComponent } from './campaign-stamps.component';
import { ConfigService, PuzzlesModule, StampService, UtilsModule, ICampaignService } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

const stampServiceStub: Partial<StampService> = {
  getCards: () => of(),
  getCurrentCard: () => of()
};
const campaignServiceStub: Partial<ICampaignService> = {
  getCampaign: () => of(),
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of({
    apiHost: '',
    production: false,
    preAuth: false,
    isWhistler: false,
    baseHref: '',
  })
};

describe('CampaignStampsComponent', () => {
  let component: CampaignStampsComponent;
  let fixture: ComponentFixture<CampaignStampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignStampsComponent],
      imports: [
        UtilsModule,
        RouterTestingModule,
        PuzzlesModule,
        InfiniteScrollModule,
      ],
      providers: [
        { provide: StampService, useValue: stampServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: TranslateService, useValue: { get: () => of() }}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignStampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // todo: fix this test by stubbing activatedroute properly
  // it('should call getCardsSpy, stampServiceSpy onInit', fakeAsync(() => {
  //   const stampCard: IStampCard = {
  //     id: 1,
  //     state: StampCardState.active,
  //     title: 'Test',
  //     campaignConfig: null,
  //     displayProperties: {
  //       numberOfCols: undefined,
  //       numberOfRows: undefined,
  //       cardImage: undefined,
  //       preStampImg: undefined,
  //       postStampImg: undefined,
  //       rewardPreStamp: undefined,
  //       rewardPostStamp: undefined,
  //       bgImage: undefined,
  //       cardBgImage: undefined,
  //       totalSlots: undefined,
  //       displayCampaignAs: '',
  //       backgroundImg: undefined,
  //       rewardPositions: undefined,
  //       thumbnailImg: undefined,
  //       noRewardsPopUp: undefined,
  //       successPopUp: undefined
  //     }
  //   };
  //
  //   const stampService: StampService = fixture.debugElement.injector.get<StampService>(
  //     StampService as Type<StampService>
  //   );
  //   const getCardsSpy = spyOn(stampService, 'getCards').and.returnValue(of([stampCard]));
  //   // const getCurrentCardSpy = spyOn(stampService, 'getCurrentCard').and.returnValue(of(stampCard));
  //
  //   component.ngOnInit();
  //   tick();
  //   fixture.detectChanges();
  //   expect(getCardsSpy).toHaveBeenCalled();
  //   // expect(getCurrentCardSpy).toHaveBeenCalled();
  // }));
});
