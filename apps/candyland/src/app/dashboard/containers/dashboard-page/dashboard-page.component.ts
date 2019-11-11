import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { DashboardService } from '@cl-core/services';
import { FormControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';
import { UserService } from '@cl-core/services/user.service';

@Component({
  selector: 'cl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();

  public dateRange: FormControl = new FormControl();
  public gameCard$: Observable<DashboardGameCard[]>;
  public userName$: string;
  public navLinks: { path: string, label: string }[] = [
    {
      path: 'overview',
      label: 'NAV_LINK_OVERVIEW'
    },
    {
      path: 'rewards',
      label: 'NAV_LINK_REWARD'
    },
    {
      path: 'campaigns',
      label: 'NAV_LINK_CAMPAIGNS'
    }
  ];

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    private chartsParametersService: DashboardChartsParametersService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
  }

  public ngOnInit(): void {
    this.userName$ = this.userService.userName$;
    this.getGameCard();
    this.handelDateRangeChanges();
    this.dateRange.patchValue(this.defaultDateRange);
    this.renderer.addClass(this.document.body, 'no-cta');
  }

  public ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'no-cta');
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handelDateRangeChanges(): void {
    this.dateRange.valueChanges.pipe(
      map((data: DatepickerRangeValue<Date>) => new Object({
        start_date: this.dateToString(data.begin),
        end_date: this.dateToString(data.end)
      })
      ),
      takeUntil(this.destroy$),
    ).subscribe(value => this.chartsParametersService.params = value);
  }

  private dateToString(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  private get defaultDateRange(): DatepickerRangeValue<Date> {
    return {
      begin: this.getDateMountsAgo(3),
      end: new Date()
    };
  }

  private getDateMountsAgo(numberMonth: number = 1): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - numberMonth);
    return date;
  }

  private getGameCard(): void {
    this.gameCard$ = this.dashboardService.getDashboardGameCard();
  }
}
