import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { DashboardService } from '@cl-core/services';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';
import { UserService } from '@cl-core/services/user.service';
import { DashboardGameCard } from '@cl-shared/models/dashboard/dashboard-game-car.interface';
import { DateTimeParser } from '@cl-helpers/date-time-parser';

@Component({
  selector: 'cl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public dateRange: FormControl = new FormControl();
  public gameCard$: Observable<DashboardGameCard[]>;
  public userName$: string;
  public isOpen: boolean = true;
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
    },
    // {
    //   path: 'loyalty',
    //   label: 'NAV_LINK_LOYALTY'
    // }
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
    if (!localStorage.getItem('hideIntro')) {
      this.isOpen = this.isOpen;
    } else if (localStorage.getItem('hideIntro') === 'true') {
      this.isOpen = !this.isOpen;
    }
    localStorage.setItem('hideIntro', 'true');
  }

  public ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'no-cta');
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handelDateRangeChanges(): void {
    this.dateRange.valueChanges.pipe(
      map((data: DatepickerRangeValue<Date>) => new Object({
        start_date: DateTimeParser.dateToString(data.begin),
        end_date: DateTimeParser.dateToString(data.end)
      })
      ),
      takeUntil(this.destroy$),
    ).subscribe(value => this.chartsParametersService.params = value);
  }

  private get defaultDateRange(): DatepickerRangeValue<Date> {
    return {
      begin: DateTimeParser.getDateMountsAgo(3),
      end: new Date()
    };
  }

  private getGameCard(): void {
    debugger
    this.gameCard$ = this.dashboardService.getDashboardGameCard();
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
