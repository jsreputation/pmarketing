import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable, of } from 'rxjs';
import { GeneralStaticDataService } from '@perx/core';
import { WSurveyQuestionType } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SurveyHttpService {

  constructor(
    private http: HttpClient,
    private generalStaticDataService: GeneralStaticDataService
  ) { }

  public getQuestionType(): Observable<any> {
    return this.http.get('assets/actives/engagement-question/question-type.json');
  }

  public getCountriesList(): Observable<any> {
    // return this.http.get('assets/actives/apac-phone-prefix-list/phone-list.json');
    return this.generalStaticDataService.getCountriesList();
  }

  public getDefaultCountryCode(): Observable<any> {
    return this.http.get('assets/actives/common/default-coutry-code.json');
    // return this.generalStaticDataService.getCountriesList();
  }

  public getSurveyData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.http.get<any>('assets/actives/survey/survey-data.json');
  }

  public getSurvey(id: string): Observable<IResponseApi<IEngagementApi>> {
    return this.http.get<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/survey/' + id);
  }

  public createSurvey(data: IJsonApiPayload<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.post<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateSurvey(id: string, data: IJsonApiPayload<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.patch<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/survey/' + id, data);
  }

  public getSurveyReport(id: string): Observable<IBaseQuestionReport> {
    return of({
      title: 'Welcome Survey Responses',
      summaryInfo: [
        {
          title: 'Responses',
          value: id,
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
              amount: 350,
            },
            {
              amount: 150,
            },
            {
              amount: 50,
            },
            {
              amount: 10,
            },
            {
              amount: 0,
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
              amount: 350,
            },
            {
              choices: {
                img_url: 'global/assets/stamps/pre-stamp-1.png',
                text: 'B',
              },
              amount: 200,
            },
            {
              choices: {
                img_url: 'global/assets/stamps/pre-stamp-1.png',
                text: 'C',
              },
              amount: 150,
            },
            {
              choices: {
                img_url: 'global/assets/stamps/pre-stamp-1.png',
                text: 'D',
              },
              amount: 50,
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
              amount: 350,
            },
            {
              choices: {
                text: 'Choice B',
              },
              amount: 200,
            },
            {
              choices: {
                text: 'Choice C',
              },
              amount: 150,
            },
            {
              choices: {
                text: 'Choice D',
              },
              amount: 50,
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
              amount: 350,
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
              },
              amount: 200,
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
              },
              amount: 150,
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
              },
              amount: 150,
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
              },
              amount: 150,
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
              },
              amount: 150,
            },
            {
              choices: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
              },
              amount: 50,
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
                  amount: 350,
                },
                {
                  amount: 150,
                },
                {
                  amount: 50,
                },
                {
                  amount: 10,
                },
                {
                  amount: 0,
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
                  amount: 350,
                },
                {
                  choices: {
                    img_url: 'global/assets/stamps/pre-stamp-1.png',
                    text: 'B',
                  },
                  amount: 200,
                },
                {
                  choices: {
                    img_url: 'global/assets/stamps/pre-stamp-1.png',
                    text: 'C',
                  },
                  amount: 150,
                },
                {
                  choices: {
                    img_url: 'global/assets/stamps/pre-stamp-1.png',
                    text: 'D',
                  },
                  amount: 50,
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
                  amount: 350,
                },
                {
                  choices: {
                    text: 'Choice B',
                  },
                  amount: 200,
                },
                {
                  choices: {
                    text: 'Choice C',
                  },
                  amount: 150,
                },
                {
                  choices: {
                    text: 'Choice D',
                  },
                  amount: 50,
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
                  amount: 350,
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
                  },
                  amount: 200,
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
                  },
                  amount: 150,
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
                  },
                  amount: 150,
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
                  },
                  amount: 150,
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
                  },
                  amount: 150,
                },
                {
                  choices: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corporis deserunt incidunt laudantium magnam modi natus quos saepe ullam voluptatem! Consectetur esse explicabo illum incidunt minima, odit repellat similique sit!',
                  },
                  amount: 50,
                }
              ]
            },
          ]
        }
      ]
    });
  }
}
