import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RoutingStateService, StampsService, CsvReportService } from '@cl-core-services';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'cl-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.scss']
})
export class StampComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public params: { start_date: string, end_date: string } = {
    start_date: '2019-07-01',
    end_date: '2019-08-31'
  };
  public data: StampsGraphicData;
  private id: string;

  constructor(
    private stampsService: StampsService,
    private route: ActivatedRoute,
    private routingState: RoutingStateService,
    private csvReportService: CsvReportService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        this.id = id;
        this.getData(id);
      });
  }

  public downloadReport(): void {
    this.csvReportService.downloadReport('report_stamp_campaigns_summary', { campaign_id: this.id });
  }

  public onClose(): void {
    this.routingState.comeBackPreviousUrl();
  }

  private getData(id: string): void {
    this.stampsService.getStampsReport(id)
      .subscribe((res) => this.data = res);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
