import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';

@Component({
  selector: 'cl-dashboard-rewards-page',
  templateUrl: './dashboard-rewards-page.component.html',
  styleUrls: ['./dashboard-rewards-page.component.scss']
})
export class DashboardRewardsPageComponent implements OnInit, OnDestroy {
  public params: { [key: string]: string };

  constructor(private chartsParametersService: DashboardChartsParametersService) {
  }

  public ngOnInit(): void {
    this.handelChartsParamsChanges();
  }

  public ngOnDestroy(): void {
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$.pipe(
      untilDestroyed(this)
    ).subscribe(value => {
      this.params = value;
    });
  }

}
