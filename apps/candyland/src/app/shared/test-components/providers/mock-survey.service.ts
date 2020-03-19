import { Observable, of } from 'rxjs';
import { ICountries, ISurveyForm } from '@cl-core/models/survey/survey-common.interface';
import {
  IJsonApiItemPayload, IWSurveyEngagementAttributes, WSurveyQuestionType
} from '@perxtech/whistler';
import { IEngagementQuestionType } from '@cl-core/models/engagement-question/engagement-question-type.interface';
import { IGraphic } from '@cl-core/models/graphic.interface';
import { IBaseQuestionReport } from '@cl-core/models/reports/survey-report/survey-report.interface';

export class MockSurveyService {

  public getResponse(res: any): any {
    return {
      data: {
        id: res.id,
        type: 'engagement',
        attributes: {
          title: 'tews',
          display_properties: {
            title: 'test',
            sub_title: 'test',
            background_img_url: 'test',
            progress_bar_color: 'test',
            card_background_img_url: 'test',
            questions: []
          }
        }
      }
    };
  }

  public getSurveyQuestionType(): Observable<IEngagementQuestionType[]> {
    return of([{
      value: 'rating',
      viewValue: 'QUESTION_TYPE.RATING',
      img: 'assets/images/engagement-question/question-type-icon/rating.svg'
    }]);
  }

  public getCountriesList(): Observable<any> {
    return of([{
      id: 36,
      name: 'Singapore',
      phone: '+65'
    }]);
  }

  public getDefaultCountryCode(): Observable<ICountries[]> {
    return of([{
      name: 'Singapore',
      code: 'SG'
    }]);
  }

  public getSurveyData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return of({
      background: [
        {
          id: 1,
          type: 'bg-1',
          title: 'icon',
          img: 'global/assets/background/stamp-bg-1.png',
          fullImg: 'global/assets/background/full_bg_1.jpg',
          format: '.png',
          active: false
        }
      ],
      cardBackground: [
        {
          id: 1,
          type: 'card-bg-1',
          title: 'icon',
          img: 'global/assets/card-background/card-bg-1.png',
          fullImg: 'global/assets/card-background/card-bg-1.png',
          format: '.png',
          active: false
        }
      ]
    });
  }

  public getSurvey(id: string): Observable<ISurveyForm> {
    return of({
      id,
      type: 'data.attributes.type',
      created_at: 'data.attributes.created_at',
      updated_at: 'data.attributes.updated_at',
      name: 'data.attributes.title',
      attribute_type: 'data.attributes.type',
      headlineMessage: 'data.attributes.display_properties.title',
      subHeadlineMessage: 'data.attributes.display_properties.sub_title',
      questions: [],
      color: 'data.attributes.display_properties.progress_bar_color',
      cardBackground: 'data.attributes.display_properties.card_background_img_url',
      background: 'data.attributes.display_properties.background_img_url',
      buttonText: 'data.attributes.display_properties.button',
      description: 'data.attributes.description',
    });
  }

  public createSurvey(data: ISurveyForm): Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    const res: any = data;
    return of(this.getResponse(res));
  }

  public updateSurvey(id: string, data: ISurveyForm): Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    const res: any = {
      id,
      ...data
    };
    return of(this.getResponse(res));
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
