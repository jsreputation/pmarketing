import {Component, OnInit, OnDestroy} from '@angular/core';

import { Subject } from 'rxjs';
import {switchMap, takeUntil, tap} from 'rxjs/operators';

import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';
import { CardType } from '@perx/chart';
import {DashboardService} from '@cl-core-services';

@Component({
  selector: 'cl-dashboard-rewards-page',
  templateUrl: './dashboard-rewards-page.component.html',
  styleUrls: ['./dashboard-rewards-page.component.scss']
})
export class DashboardRewardsPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public rewardTabValue: number | null;
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

  public get RewardValue(): number | null {
    return this.rewardTabValue || null;
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$.pipe(
      tap(params => {
        this.params = params;
      }),
      switchMap(params => this.dashboardService.getTabValues('rewards_total_rewards', params)),
      tap(value => {
        /* tslint:disable-next-line */
        this.rewardTabValue = value.flat().filter(v => typeof v === 'number').reduce(
          (acc, curr) => acc + curr
          , 0);
      }),
      takeUntil(this.destroy$)
      /* tslint:disable-next-line */
    ).subscribe();
  }

}
