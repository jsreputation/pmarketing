import { Type } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
  AuthenticationService,
  ConfigModule,
  ICampaignService,
  IPopupConfig,
  ISurvey,
  SurveyModule as PerxSurveyModule,
  SurveyQuestionType,
  SurveyService
} from '@perxtech/core';
import { WInformationCollectionSettingType } from '@perxtech/whistler';
import { of } from 'rxjs';
import { SurveyComponent } from './survey.component';

interface IAnswer {
  questionId: string;
  content: any;
}

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  const iCampaignServiceStub: Partial<ICampaignService> = {};
  const survey: ISurvey = {
    id: '1',
    title: 'Survey Test',
    subTitle: 'Test',
    results: {},
    questions: [
      {
        id: '1',
        question: 'Password',
        required: false,
        payload: {
          type: SurveyQuestionType.password,
          // test: 'test'
        }
      }
    ],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should call getAnonymous, getSurveyFromCampaign', fakeAsync(() => {
      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
        AuthenticationService as Type<AuthenticationService>
      );

      const surveyService: SurveyService = fixture.debugElement.injector.get<SurveyService>(
        SurveyService as Type<SurveyService>
      );
      const authSpy = spyOn(authenticationService, 'getAnonymous').and.returnValue(true);
      const surveySpy = spyOn(surveyService, 'getSurveyFromCampaign').and.returnValue(of(survey));
      component.ngOnInit();
      tick();
      expect(authSpy).toHaveBeenCalled();
      expect(surveySpy).toHaveBeenCalled();
    }));

    it('should make survey.displayProperties undefined', fakeAsync(() => {
      const popupConfig: IPopupConfig = {
        title: undefined,
        text: undefined,
        imageUrl: undefined,
        buttonTxt: undefined,
      };
      component.successPopUp = popupConfig;
      component.noRewardsPopUp = popupConfig;
      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
        AuthenticationService as Type<AuthenticationService>
      );

      const surveyService: SurveyService = fixture.debugElement.injector.get<SurveyService>(
        SurveyService as Type<SurveyService>
      );
      spyOn(authenticationService, 'getAnonymous').and.returnValue(true);
      spyOn(surveyService, 'getSurveyFromCampaign').and.returnValue(of({
        id: '1',
        title: 'Survey Test',
        subTitle: 'Test',
        results: {},
        questions: [
          {
            id: '1',
            question: 'Password',
            required: false,
            payload: {
              type: SurveyQuestionType.password,
              test: 'test'
            }
          }
        ]
      }));
      component.ngOnInit();
      tick();
      expect(component.survey.displayProperties).toBe(undefined);
    }));

    it('should set totalLength', () => {
      component.setTotalLength(1);
      expect(component.totalLength).toBe(1);
    });

    it('should set currentPointer', () => {
      component.setCurrentPointer(1);
      expect(component.currentPointer).toBe(1);
    });

    it('should updateSurveyStatus', () => {
      const answers: IAnswer[] = [
        {
          questionId: '1',
          content: 'test'
        }
      ];
      component.updateSurveyStatus(answers);
      expect(component.answers.length).toBe(1);
      expect(component.answers[0].questionId).toBe('1');
      expect(component.answers[0].content).toBe('test');
    });

    describe('onSubmit', () => {
      it('should navigate to signup if informationCollectionSetting is signup_required', fakeAsync(() => {
        component.survey = survey;
        const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
          AuthenticationService as Type<AuthenticationService>
        );

        const surveyService: SurveyService = fixture.debugElement.injector.get<SurveyService>(
          SurveyService as Type<SurveyService>
        );
        const routerStub: Router = fixture.debugElement.injector.get(Router);
        spyOn(authenticationService, 'getAnonymous').and.returnValue(true);
        spyOn(surveyService, 'getSurveyFromCampaign').and.returnValue(of(survey));
        const routerSpy = spyOn(routerStub, 'navigate').and.callThrough();

        const state = {
          popupData: {
            title: 'SURVEY_SUCCESS_TITLE',
            text: 'SURVEY_SUCCESS_TEXT',
            imageUrl: 'assets/congrats_image.png',
            buttonTxt: 'CLOSE'
          },
          engagementType: 'survey',
          surveyId: 1,
          collectInfo: true,
          campaignId: 1,
          answers: []
        };

        component.ngOnInit();
        component.onSubmit();
        tick();
        expect(routerSpy).toHaveBeenCalledWith(['/signup'], { state });
      }));

      it('should navigate to pi if informationCollectionSetting is pi_required', fakeAsync(() => {
        component.survey = survey;
        const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>(
          AuthenticationService as Type<AuthenticationService>
        );

        const surveyService: SurveyService = fixture.debugElement.injector.get<SurveyService>(
          SurveyService as Type<SurveyService>
        );
        const routerStub: Router = fixture.debugElement.injector.get(Router);
        spyOn(authenticationService, 'getAnonymous').and.returnValue(true);

        const piSurvey = {
          ...survey,
          displayProperties: {
            informationCollectionSetting: WInformationCollectionSettingType.pi_required
          }
        };
        spyOn(surveyService, 'getSurveyFromCampaign').and.returnValue(of(piSurvey));
        const routerSpy = spyOn(routerStub, 'navigate').and.callThrough();

        const state = {
          popupData: {
            title: 'SURVEY_SUCCESS_TITLE',
            text: 'SURVEY_SUCCESS_TEXT',
            imageUrl: 'assets/congrats_image.png',
            buttonTxt: 'CLOSE'
          },
          engagementType: 'survey',
          surveyId: 1,
          collectInfo: true,
          campaignId: 1,
          answers: []
        };

        component.ngOnInit();
        component.onSubmit();
        tick();
        expect(routerSpy).toHaveBeenCalledWith(['/pi'], { state });
      }));
    });
  });
});