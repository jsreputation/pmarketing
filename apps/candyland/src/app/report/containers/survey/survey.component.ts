import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SurveyService } from '@cl-core-services';
import { SurveyQuestionType } from '../../../../../../../libs/perx-core/dist/perx-core';

@Component({
  selector: 'cl-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  public data: any = {
    title: 'Welcome Survey Responses',
    summaryInfo: [
      {
      title: 'Responses',
      value: 56,
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
        selectedType: SurveyQuestionType.pictureChoice,
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
        selectedType: SurveyQuestionType.multipleChoice,
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
        selectedType: SurveyQuestionType.longText,
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
        selectedType: SurveyQuestionType.questionGroup,
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
            selectedType: SurveyQuestionType.pictureChoice,
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
            selectedType: SurveyQuestionType.multipleChoice,
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
            selectedType: SurveyQuestionType.longText,
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

  };
  constructor(private surveyService: SurveyService,
              private route: ActivatedRoute) {}
  public ngOnInit(): void {
    this.subscribeToRoute();
  }

  public onClose(): void {
    // TODO: close page;
  }

  private getReportStamp(id: string): void {
    this.surveyService.getSurveyReport(id)
      .subscribe((res) => {
        console.log(res);
        // this.data = res;
      });
  }

  private subscribeToRoute(): void {
    this.route.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        this.getReportStamp(id);

        console.log(id);
      });
  }

  public ngOnDestroy(): void {
  }
}
const test = [{
  id: '0',
  selectedType: 'group',
  question: 'title group',
  required: true,
  payload: {
    type: 'group',
    questions: [{
      id: '0.0',
      selectedType: 'rating',
      question: 'raiting title',
      required: true,
      payload: {
        type: 'rating',
        scale: 5,
        shape: 'star',
        color: 'primary',
        left_label: 'Not Very',
        right_label: 'Very much'
      }
    },
      {
      id: '0.1',
        selectedType: 'select',
        question: 'title multiple choise',
        required: true,
      payload: {
        type: 'select',
        choices: ['asdfasdf', 'asdfasdf', 'asdfasdf'],
        multiple: false
      }
    }]
  }
}];
