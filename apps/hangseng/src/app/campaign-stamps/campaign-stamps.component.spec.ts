import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignStampsComponent } from './campaign-stamps.component';
import {
  ConfigService,
  PuzzlesModule,
  StampService,
  UtilsModule,
  ICampaignService,
  ConfigModule,
  ThemesService,
  ITheme,
  SettingsService, NotificationService,
} from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {
  TranslateModule,
} from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { StampCardModule } from '../stamp/stamp-card/stamp-card.module';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';

const stampServiceStub: Partial<StampService> = {
  getCards: () => of(),
  getCurrentCard: () => of(),
};
const campaignServiceStub: Partial<ICampaignService> = {
  getCampaign: () => of(),
  enrolIntoCampaign: () => of()
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () =>
    of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: '',
    }),
};
const notificationServiceStub: Partial<NotificationService> = {
  addSnack: () => void 0
};
const settingsServiceStub: Partial<SettingsService> = {
  getRemoteFlagsSettings: () =>
    of({
      showPrizeSetOutcome: true,
    }),
};

describe('CampaignStampsComponent', () => {
  let component: CampaignStampsComponent;
  let fixture: ComponentFixture<CampaignStampsComponent>;

  const mockTheme: ITheme = {
    name: 'theme',
    properties: {
      '--background': 'red',
      '--font_color': 'black',
    },
  };
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(mockTheme),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignStampsComponent],
      imports: [
        UtilsModule,
        RouterTestingModule,
        PuzzlesModule,
        InfiniteScrollModule,
        SharedModule,
        MatCardModule,
        MatChipsModule,
        MatDividerModule,
        StampCardModule,
        HttpClientModule,
        ConfigModule.forRoot({}),
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: StampService, useValue: stampServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub }
      ],
    }).compileComponents();
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
