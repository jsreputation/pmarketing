import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RoutingStateService, SurveyService } from '@cl-core-services';

@Component({
  selector: 'cl-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  public data: IBaseQuestionReport;
  constructor(private surveyService: SurveyService,
              private route: ActivatedRoute,
              private router: Router,
              private routingState: RoutingStateService) {}
  public ngOnInit(): void {
    this.subscribeToRoute();
  }

  public downloadReport(): void {
    // TODO: download implement here
  }
  public onClose(): void {
    this.routingState.comeBackPreviousUrl();
  }

  private getReportStamp(id: string): void {
    this.surveyService.getSurveyReport(id)
      .subscribe((res) => {
        this.data = res;
      });
  }

  private subscribeToRoute(): void {
    this.route.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/dashboard/overview']);
        }
        this.getReportStamp(id);
      });
  }

  public ngOnDestroy(): void {
  }
}
