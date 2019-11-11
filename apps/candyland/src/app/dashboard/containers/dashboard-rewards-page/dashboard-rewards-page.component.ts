import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';

@Component({
  selector: 'cl-dashboard-rewards-page',
  templateUrl: './dashboard-rewards-page.component.html',
  styleUrls: ['./dashboard-rewards-page.component.scss']
})
export class DashboardRewardsPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public params: { [key: string]: string };

  constructor(private chartsParametersService: DashboardChartsParametersService) {
  }

  public ngOnInit(): void {
    this.handelChartsParamsChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.params = value;
    });
  }

}
