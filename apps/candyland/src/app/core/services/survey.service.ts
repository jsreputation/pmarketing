import { Injectable } from '@angular/core';
import { SurveyHttpService } from '@perx/whistler-services';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurveyHttpAdapter } from '@cl-core/http-adapters/survey-http-adapter';
import {
  ICountries,
  ISurveyForm,
} from '@cl-core/models/survey/survey-common.interface';
import { IWSurveyEngagementAttributes, IJsonApiItemPayload, WSurveyQuestionType } from '@perx/whistler';
import { HttpClient } from '@angular/common/http';
import { GeneralStaticDataService } from '@perx/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private surveyHttp: SurveyHttpService,
    private http: HttpClient,
    private generalStaticDataService: GeneralStaticDataService) {
  }

  public getSurveyQuestionType(): Observable<IEngagementQuestionType[]> {
    return this.http.get('assets/actives/engagement-question/question-type.json')
      .pipe(
        map(res => (res as IEngagementQuestionType[]))
      );
  }

  public getCountriesList(): Observable<any> {
    return this.generalStaticDataService.getCountriesList()
      .pipe(
        map(res => (res as IApacCountries[]))
      );
  }

  public getDefaultCountryCode(): Observable<ICountries[]> {
    return this.http.get<ICountries[]>('assets/actives/common/default-coutry-code.json');
  }

  public getSurveyData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.http.get<any>('assets/actives/survey/survey-data.json');
  }

  public getSurvey(id: string): Observable<ISurveyForm> {
    return this.surveyHttp.getSurvey(id)
      .pipe(
        map(res => SurveyHttpAdapter.transformToSurveyForm(res.data))
      );
  }

  public createSurvey(data: ISurveyForm): Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    const sendData = SurveyHttpAdapter.transformSurvey(data);
    return this.surveyHttp.createSurvey({ data: sendData });
  }

  public updateSurvey(id: string, data: ISurveyForm): Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    const sendData = SurveyHttpAdapter.transformSurvey(data);
    sendData.id = id;
    return this.surveyHttp.updateSurvey(id, { data: sendData });
  }

  public getSurveyReport(id: string): Observable<IBaseQuestionReport> {
    return of({
      title: 'Welcome Survey Responses',
      summaryInfo: [
        {
          title: 'Responses',
          value: id
        },
        {
          title: 'Completion rate',
          value: '8%'
        }, {
          title: 'Average time to complete',
          value: '22.50'
        }],
      questions: [
        {
          total: 3000,
          selectedType: 'rating',
          question_title: 'How satisfied were you with the event?',
          left_label: 'Not Very',
          right_label: 'Very much',
          payload: [
            {
              amount: 350
            },
            {
              amount: 150
            },
            {
              amount: 50
            },
            {
              amount: 10
            },
            {
              amount: 0
            }
          ]
        },
        {
          total: 1000,
          selectedType: WSurveyQuestionType.pictureChoice,
          question_title: 'How satisfied were you with the event?',
          payload: [
            {
              choices: {
                img_url: 'global/assets/stamps/pre-stamp-1.png',
                text: 'A'
              },
              amount: 350
            },
            {
              choices: {
                img_url: 'global/assets/stamps/pre-stamp-1.png',
                text: 'B'
              },
              amount: 200
            },
            {
              choices: {
                img_url: 'global/assets/stamps/pre-stamp-1.png',
                text: 'C'
              },
              amount: 150
            },
            {
              choices: {
                img_url: 'global/assets/stamps/pre-stamp-1.png',
                text: 'D'
              },
              amount: 50
            }
          ]
        },
        {
          total: 1000,
          selectedType: WSurveyQuestionType.multipleChoice,
          question_title: 'How satisfied were you with the event?',
          payload: [
            {
              choices: {
                text: 'Choice A'
              },
              amount: 350
            },
            {
              choices: {
                text: 'Choice B'
              },
              amount: 200
            },
            {
              choices: {
                text: 'Choice C'
              },
              amount: 150
            },
            {
              choices: {
                text: 'Choice D'
              },
              amount: 50
            }
          ]
        },
        {
          total: 1000,
          selectedType: WSurveyQuestionType.longText,
          question_title: 'How satisfied were you with the event?',
          payload: [
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
              },
              amount: 350
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
              },
              amount: 200
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
              },
              amount: 150
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
              },
              amount: 150
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
              },
              amount: 150
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
              },
              amount: 150
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
              },
              amount: 50
            }
          ]
        },
        {
          total: 8000,
          selectedType: WSurveyQuestionType.questionGroup,
          question_title: 'How satisfied were you with the event?',
          payload: [
            {
              total: 3000,
              selectedType: 'rating',
              question_title: 'How satisfied were you with the event?',
              left_label: 'Not Very',
              right_label: 'Very much',
              payload: [
                {
                  amount: 350
                },
                {
                  amount: 150
                },
                {
                  amount: 50
                },
                {
                  amount: 10
                },
                {
                  amount: 0
                }
              ]
            },
            {
              total: 1000,
              selectedType: WSurveyQuestionType.pictureChoice,
              question_title: 'How satisfied were you with the event?',
              payload: [
                {
                  choices: {
                    img_url: 'global/assets/stamps/pre-stamp-1.png',
                    text: 'A'
                  },
                  amount: 350
                },
                {
                  choices: {
                    img_url: 'global/assets/stamps/pre-stamp-1.png',
                    text: 'B'
                  },
                  amount: 200
                },
                {
                  choices: {
                    img_url: 'global/assets/stamps/pre-stamp-1.png',
                    text: 'C'
                  },
                  amount: 150
                },
                {
                  choices: {
                    img_url: 'global/assets/stamps/pre-stamp-1.png',
                    text: 'D'
                  },
                  amount: 50
                }
              ]
            },
            {
              total: 1000,
              selectedType: WSurveyQuestionType.multipleChoice,
              question_title: 'How satisfied were you with the event?',
              payload: [
                {
                  choices: {
                    text: 'Choice A'
                  },
                  amount: 350
                },
                {
                  choices: {
                    text: 'Choice B'
                  },
                  amount: 200
                },
                {
                  choices: {
                    text: 'Choice C'
                  },
                  amount: 150
                },
                {
                  choices: {
                    text: 'Choice D'
                  },
                  amount: 50
                }
              ]
            },
            {
              total: 1000,
              selectedType: WSurveyQuestionType.longText,
              question_title: 'How satisfied were you with the event?',
              payload: [
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
                  },
                  amount: 350
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
                  },
                  amount: 200
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
                  },
                  amount: 150
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
                  },
                  amount: 150
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
                  },
                  amount: 150
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
                  },
                  amount: 150
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!'
                  },
                  amount: 50
                }
              ]
            }
          ]
        }
      ]
    });
  }
}
