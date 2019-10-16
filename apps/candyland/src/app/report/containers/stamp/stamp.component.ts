import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingStateService, StampsService } from '@cl-core-services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.scss']
})
export class StampComponent implements OnInit, OnDestroy {
  public params: {start_date: string, end_date: string} = {
    start_date: '2019-07-01',
    end_date: '2019-08-31'
  };
  public data: StampsGraphicData;
  constructor(private stampsService: StampsService,
              private route: ActivatedRoute,
              private routingState: RoutingStateService) { }

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
    this.stampsService.getStampsReport(id)
      .subscribe((res) => this.data = res);
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
