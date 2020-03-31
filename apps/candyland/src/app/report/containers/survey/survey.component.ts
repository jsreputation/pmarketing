import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RoutingStateService, SurveyService, CsvReportService } from '@cl-core-services';
import { IBaseQuestionReport } from '@cl-core/models/reports/survey-report/survey-report.interface';

@Component({
  selector: 'cl-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public data: IBaseQuestionReport;
  private id: string;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private routingState: RoutingStateService,
    private csvReportService: CsvReportService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/dashboard/overview']);
        }
        this.id = id;
        this.getData(id);
      });
  }

  public downloadReport(): void {
    this.csvReportService.downloadReport('report_survey_result_summary', { campaign_id: this.id });
  }
  public onClose(): void {
    this.routingState.comeBackPreviousUrl();
  }

  private getData(id: string): void {
    this.surveyService.getSurveyReport(id)
      .subscribe((res) => {
        this.data = res;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
