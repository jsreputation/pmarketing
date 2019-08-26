import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DashboardService } from '@cl-core/services';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';

export enum DictionaryTotal {
  activeCustomers = 'activeCustomers',
  issuedRewards = 'issuedRewards',
  activeCampaigns = 'activeCampaigns',
}

@Component({
  selector: 'cl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public dateRange = new FormControl();
  public gameCard$: Observable<DashboardGameCard[]>;
  public navLinks = [
    {
      path: 'overview',
      label: 'Overview'
    },
    {
      path: 'rewards',
      label: 'Rewards'
    },
    {
      path: 'campaigns',
      label: 'Campaigns'
    }
  ];

  constructor(private dashboardService: DashboardService,
              private chartsParametersService: DashboardChartsParametersService) {
  }

  public ngOnInit(): void {
    this.getGameCard();
    this.handelDateRangeChanges();
    this.dateRange.patchValue(this.defaultDateRange);
  }

  public ngOnDestroy(): void {
  }

  private handelDateRangeChanges(): void {
    this.dateRange.valueChanges.pipe(
      untilDestroyed(this),
      map((data: DatepickerRangeValue<Date>) => new Object({
          start_date: this.dateToString(data.begin),
          end_date: this.dateToString(data.end)
        })
      )
    ).subscribe(value => this.chartsParametersService.params = value);
  }

  private dateToString(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  private get defaultDateRange(): DatepickerRangeValue<Date> {
    return {
      begin: this.dateMountsAgo,
      end: new Date()
    };
  }

  private get dateMountsAgo(): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  }

  private getGameCard(): void {
    this.gameCard$ = this.dashboardService.getDashboardGameCard();
  }
}
