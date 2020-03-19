import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap, map } from 'rxjs/operators';

import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';
import { CardType } from '@perxtech/chart';
import { DashboardService } from '@cl-core-services';

@Component({
  selector: 'cl-dashboard-rewards-page',
  templateUrl: './dashboard-rewards-page.component.html',
  styleUrls: ['./dashboard-rewards-page.component.scss']
})
export class DashboardRewardsPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public rewardTabValue: number | null = null;
  public params: { [key: string]: string };
  public ct: typeof CardType = CardType;

  constructor(private dashboardService: DashboardService, private chartsParametersService: DashboardChartsParametersService) {
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
      tap(params => this.params = params),
      switchMap(params => this.dashboardService.getTabValues('rewards_total_rewards', params)),
      map(value => value.flat()
        .filter(v => typeof v === 'number')
        .reduce((acc: number, curr: number) => acc + curr, 0)
      ),
      takeUntil(this.destroy$)
    ).subscribe((value: number) => this.rewardTabValue = value);
  }

}
