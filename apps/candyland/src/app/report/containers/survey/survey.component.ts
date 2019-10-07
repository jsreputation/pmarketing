import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SurveyService } from '@cl-core-services';

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
        question_title: 'test',
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
