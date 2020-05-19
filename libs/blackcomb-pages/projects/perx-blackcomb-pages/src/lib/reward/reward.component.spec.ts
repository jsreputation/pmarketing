import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import {
  GameModule,
  RewardsModule,
  RewardsService,
  InstantOutcomeService,
  AuthenticationService,
  NotificationService,
  ThemesService,
  IOutcome,
  UtilsModule,
  SettingsService
} from '@perxtech/core';
import { WInformationCollectionSettingType } from '@perxtech/whistler';
import { RewardComponent } from './reward.component';
import { Type } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

const mockOutcome: IOutcome = {
  title: 'title',
  button: 'btnTxt',
  subTitle: 'subTitle',
  banner: 'banner',
  backgroundImgUrl: '',
  cardBackgroundImgUrl: '',
  results: {},
  displayProperties: {
    informationCollectionSetting: WInformationCollectionSettingType.not_required,
    noRewardsPopUp: {
      headLine: 'test headline',
      subHeadLine: 'test subHeadline',
      buttonTxt: 'btnText',
    },
    successPopUp: {
      headLine: 'test headline',
      subHeadLine: 'test subHeadline',
      buttonTxt: 'btnText',
    }
  }
};

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => of(),
  };

  const instantOutStub: Partial<InstantOutcomeService> = {
    getFromCampaign: () => of(mockOutcome),
    prePlayConfirm: () => of(),
    prePlay: () => of({ id: 3, voucherIds: [1, 2, 3] })
  };

  const authServiceStub: Partial<AuthenticationService> = {
    getAnonymous: () => true,
  };

  const notificationServiceStub: Partial<NotificationService> = {
    addPopup: () => { }
  };

  const settingsServiceStub: Partial<SettingsService> = {
    getRssFeeds: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
          { path: 'pi', redirectTo: '/' },
        ]),
        GameModule,
        UtilsModule,
        RewardsModule,
        HttpClientModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: RewardsService,
          useValue: rewardsServiceStub,
        },
        {
          provide: InstantOutcomeService,
          useValue: instantOutStub,
        },
        {
          provide: AuthenticationService,
          useValue: authServiceStub,
        },
        {
          provide: NotificationService,
          useValue: notificationServiceStub,
        },
        {
          provide: ThemesService,
          useValue: themesServiceStub,
        },
        { provide: SettingsService, useValue: settingsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    component.title = 'title';
    component.subTitle = 'subTitle';
    component.button = 'btnTxt';
    component.background = '';
    component.cardBackground = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call outcomeService.prePlayConfirm', () => {
    const outcomeService: InstantOutcomeService = fixture.debugElement.injector.get<InstantOutcomeService>(
      InstantOutcomeService as Type<InstantOutcomeService>);
    spyOn(outcomeService, 'prePlayConfirm').and.returnValue(of(void 0));
    component.rewardClickedHandler();
    expect(outcomeService.prePlayConfirm).toHaveBeenCalled();
  });

});
