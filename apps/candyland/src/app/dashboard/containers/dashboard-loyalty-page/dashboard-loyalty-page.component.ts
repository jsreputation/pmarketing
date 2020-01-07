import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { switchMap, tap, takeUntil, filter } from 'rxjs/operators';

import { DashboardService } from '@cl-core/services';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';
import { CardType } from '@perx/chart';
import { ITotal } from '@cl-core/models/dashboard/total-active-interface';

@Component({
  selector: 'cl-dashboard-loyalty-page',
  templateUrl: './dashboard-loyalty-page.component.html',
  styleUrls: ['./dashboard-loyalty-page.component.scss']
})
export class DashboardLoyaltyPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public params: { [key: string]: string };
  public activeTab: string = 'points';
  public tabs: ITotal[] = [
    { id: 'loyalty_programs_points', name: 'points', title: 'Points' },
    { id: 'loyalty_programs_views', name: 'views', title: 'Views' },
    { id: 'loyalty_programs_purchases', name: 'purchases', title: 'Purchases' },
    { id: 'loyalty_programs_revenue', name: 'revenue', title: 'Revenue' },
    { id: 'loyalty_programs_new_members', name: 'new_members', title: 'New Members' }
  ];
  public tabsValue: any;
  public loyaltyTabValue: number | null;
  public ct: typeof CardType = CardType;

  public get tabsIds(): string[] {
    return this.tabs.map(tab => tab.id);
  }

  public getTabValue(index: number): number {
    return this.tabsValue ? this.tabsValue[index] : null;
  }

  constructor(
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef,
    private chartsParametersService: DashboardChartsParametersService
  ) { }

  public ngOnInit(): void {
    this.handelChartsParamsChanges();
    this.handleActiveCampaigns();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public selectedTab(tab: any): void {
    this.activeTab = tab;
  }

  public get LoyaltyValue(): number | null {
    return this.loyaltyTabValue || null;
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$.pipe(
      tap(params => {
        this.params = params;
      }),
      switchMap(params => this.dashboardService.getTabValues('loyalty_total_loyalty', params)),
      tap(value => {
        /* tslint:disable-next-line */
        this.loyaltyTabValue = value.flat().filter(v => typeof v === 'number').reduce(
          (acc, curr) => acc + curr
          , 0);
      }),
      takeUntil(this.destroy$)
      /* tslint:disable-next-line */
    ).subscribe();
  }

  private handleActiveCampaigns(): void {
    this.chartsParametersService.params$
      .pipe(
        switchMap(params => this.dashboardService.getTabValue('campaigns_total_running_campaigns', params)),
        filter(value => typeof value === 'number'),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.cd.detectChanges());
  }
}
