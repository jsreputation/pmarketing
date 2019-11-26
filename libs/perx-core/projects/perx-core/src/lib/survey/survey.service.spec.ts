import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { SurveyService } from './survey.service';
import { ISurvey } from './models/survey.model';

import {
  ICampaign,
  CampaignType,
  CampaignState,
} from '../campaign/models/campaign.model';
import { ICampaignService } from '../campaign/icampaign.service';

import {
  IWPostAnswerAttributes,
  IJsonApiItemPayload,
  IJsonApiItem,
  IWSurveyEngagementAttributes,
} from '@perx/whistler';
import { ConfigModule } from '../config/config.module';

fdescribe('SurveyService', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let service: SurveyService;
  const mockCampaign: ICampaign = {
    id: 1,
    name: 'Survey Campaign',
    description: '',
    type: CampaignType.survey,
    state: CampaignState.active,
    engagementId: 2,
    endsAt: new Date()
  };
  const iCampaignServiceStub = {
    getCampaign: () => of(mockCampaign)
  };
  const noQuestionMockSurvey: IJsonApiItem<IWSurveyEngagementAttributes> = {
    id: '',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      id: '1',
      title: 'yo',
      description: 'what are you here for',
      image_url: '',
      properties: {},
      display_properties: {
        title: '',
        sub_title: '',
        background_img_url: '',
        progress_bar_color: '',
        card_background_img_url: '',
        questions: []
      }
    }
  };
  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    TestBed.configureTestingModule({
      imports: [
        ConfigModule.forRoot({ ...environment })
      ],
      providers: [
        { provide: ICampaignService, useValue: iCampaignServiceStub },
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.get(SurveyService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a survey from a campaign id', (done: DoneFn) => {
    const res: IJsonApiItemPayload<IWSurveyEngagementAttributes> = {
      data: noQuestionMockSurvey,
    };
    httpClientSpy.get.and.returnValue(of(res));

    service.getSurveyFromCampaign(42)
      .subscribe(
        (s: ISurvey) => {
          expect(s.questions.length).toBe(0);
          expect(s.title).toBe(noQuestionMockSurvey.attributes.title);
          done();
        },
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.get.calls.argsFor(0)).toEqual(['https://blabla/survey/engagements/2?campaign_id=42']);

  });

  it('should post a survey answers', (done: DoneFn) => {
    const res: IJsonApiItemPayload<IWPostAnswerAttributes> = {
      data: {
        id: '',
        type: '',
        links: { self: '' },
        attributes: {
          urn: '',
          created_at: '',
          updated_at: '',
          engagement_id: 2,
          campaign_entity_id: 2,
          results: {
            id: '',
            attributes: {
              results: []
            },
            relationships: {},
            type: ''
          }
        }
      },
    };

    httpClientSpy.post.and.returnValue(of(res));

    service.postSurveyAnswer([], 3, 1)
      .subscribe(
        (s: { hasOutcomes: boolean }) => {
          expect(s.hasOutcomes).toBeFalsy();
          done();
        },
        fail
      );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.post.calls.argsFor(0)).toEqual([
      'https://blabla/survey/answers',
      { data: { type: 'answers', attributes: { engagement_id: 1, campaign_entity_id: 3, content: [] } } },
      { headers: { 'Content-Type': 'application/vnd.api+json' } }
    ]);
  });

});
