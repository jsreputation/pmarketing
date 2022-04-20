import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ConfigService,
  ICampaignService,
  IPrizeSetOutcomeService,
  NotificationService,
  PipeUtilsModule,
  RewardsService,
  SettingsService,
  TeamsService,
  ThemesService,
  UtilsModule,
  TokenStorage,
} from '@perxtech/core';
import { CampaignLandingPageComponent } from './campaign-landing-page.component';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('CampaignLandingPageComponent', () => {
  let component: CampaignLandingPageComponent;
  let fixture: ComponentFixture<CampaignLandingPageComponent>;
  const campaignServiceStub: Partial<ICampaignService> = {};
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
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(),
  };
  const rewardServiceStub: Partial<RewardsService> = {};
  const prizeSetOutcomeService: Partial<IPrizeSetOutcomeService> = {};
  const settingsServiceStub: Partial<SettingsService> = {};
  const teamsServiceStub: Partial<TeamsService> = {
    createATeamforCampaign: () => of(),
  };
  const notificationStub: Partial<NotificationService> = {
    addPopup: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignLandingPageComponent],
      imports: [
        PipeUtilsModule,
        UtilsModule,
        MatToolbarModule,
        RouterTestingModule,
        MatListModule,
        MatIconModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: IPrizeSetOutcomeService, useValue: prizeSetOutcomeService },
        { provide: RewardsService, useValue: rewardServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: TeamsService, useValue: teamsServiceStub },
        { provide: NotificationService, useValue: notificationStub },
        {
          provide: TranslateService,
          useValue: {
            getTranslation: () => of()
          }
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
