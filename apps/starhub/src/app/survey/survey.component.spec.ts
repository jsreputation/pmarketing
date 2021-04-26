import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
  AuthenticationService,
  ConfigModule,
  ICampaignService,
  ISurvey,
  SurveyModule as PerxSurveyModule,
  SurveyService
} from '@perxtech/core';
import { WInformationCollectionSettingType } from '@perxtech/whistler';
import { of } from 'rxjs';
import { SurveyComponent } from './survey.component';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  const iCampaignServiceStub: Partial<ICampaignService> = {};
  const survey: ISurvey = {
    id: 1,
    title: {text: 'Survey Test'},
    subTitle: {text: 'Test'},
    results: {},
    displayProperties: {
      informationCollectionSetting: WInformationCollectionSettingType.signup_required,
      noRewardsPopUp: {
        headLine: '',
        subHeadLine: '',
        imageURL: '',
        buttonTxt: ''
      },
      successPopUp: {
        headLine: '',
        subHeadLine: '',
        imageURL: '',
        buttonTxt: ''
      }
    }
  };
  const surveyServiceStub: Partial<SurveyService> = {
    getSurveyFromCampaign: () => of(),
    postSurveyAnswer: () => of()
  };

  const authServiceStub: Partial<AuthenticationService> = {
    getAnonymous: () => true,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyComponent],
      imports: [
        ConfigModule.forRoot({}),
        MatCardModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        MatProgressBarModule,
        MatToolbarModule,
        PerxSurveyModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ICampaignService,
          useValue: iCampaignServiceStub
        },
        {
          provide: SurveyService, useValue: surveyServiceStub
        },
        { provide: AuthenticationService, useValue: authServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 1 })),
            snapshot: {
              params: { id: 1 }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => { }
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    component.survey = survey;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
