import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RoutingStateService, SurveyService } from '@cl-core-services';

@Component({
  selector: 'cl-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

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
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/dashboard/overview']);
        }
        this.getReportStamp(id);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
