import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCampaignHomeComponent } from './progress-campaign-home.component';
import { PageComponentsModule } from '../page-components/page-components.module';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CampaignServiceModule,
  ConfigService,
  ICampaignService,
  IGameService, LoyaltyService,
  QuizService,
  SettingsService, StampService,
  SurveyService
} from '@perxtech/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { RazAdaptedCampaignsCollectionModule } from '@perxtech/blackcomb-pages';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const campaignServiceStub: Partial<ICampaignService> = {
  getCampaigns: () => of()
};
const settingsServiceStub: Partial<SettingsService> = {
  getRemoteFlagsSettings: () => of()
};
const gameServiceStub: Partial<IGameService> = {
  getActiveGames: () => of([])
};
const quizServiceStub: Partial<QuizService> = {
  getQuizFromCampaign: () => of()
};
const surveyServiceStub: Partial<SurveyService> = {
  getSurveyFromCampaign: () => of()
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};

describe('ProgressCampaignHomeComponent', () => {
  let component: ProgressCampaignHomeComponent;
  let fixture: ComponentFixture<ProgressCampaignHomeComponent>;
  const stampServiceStub: Partial<StampService> = {
    getCards: () => of()
  };
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressCampaignHomeComponent ],
      imports: [
        PageComponentsModule,
        RouterTestingModule,
        RazAdaptedCampaignsCollectionModule,
        HttpClientTestingModule,
        CampaignServiceModule.forChild(),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: QuizService, useValue: quizServiceStub },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: SurveyService, useValue: surveyServiceStub },
        { provide: StampService, value: stampServiceStub },
        { provide: LoyaltyService, value: loyaltyServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCampaignHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
