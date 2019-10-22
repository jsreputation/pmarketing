import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '@cl-shared/containers/confirm-modal/confirm-modal.component';

import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { PrepareTableFilters } from '@cl-helpers/prepare-table-filters';
import { AvailableNewEngagementService, EngagementsService } from '@cl-core/services';
import { CreateEngagementPopupComponent } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';
import { IEngagementItemMenuOption } from '@cl-shared/components/engagement-item/engagement-item.component';

@Component({
  selector: 'cl-engagements-list-page',
  templateUrl: './engagements-list-page.component.html',
  styleUrls: ['./engagements-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementsListPageComponent implements AfterViewInit, OnDestroy {
  private static CAMPAIGN_ACTION: string = 'campaign';
  private destroy$: Subject<any> = new Subject();

  public dataSource: MatTableDataSource<IEngagement> = new MatTableDataSource<IEngagement>();
  public tabsFilterConfig: OptionConfig[];
  public hasData: boolean = true;
  public isGridMode: boolean = true;
  public options: IEngagementItemMenuOption[] = [
    { action: EngagementsListPageComponent.CAMPAIGN_ACTION, label: 'Launch as a campaign' }
  ];

  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;

  constructor(
    private engagementsService: EngagementsService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private router: Router,
    public cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
  }

  public ngAfterViewInit(): void {
    if (this.availableNewEngagementService.isAvailable) {
      this.showLaunchDialog();
    }
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilters.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
    this.cd.detach();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showLaunchDialog(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {});

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result && result !== 'isCloseButtonTrigger') {
          this.launchCampaign();
        } else {
          this.availableNewEngagementService.remove();
        }
      });
  }

  public openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  private getData(): void {
    this.engagementsService.getEngagements()
      .pipe(
        takeUntil(this.destroy$),
        tap(data => {
          const counterObject = PrepareTableFilters.countFieldValue(data, 'attributes_type');
          this.tabsFilterConfig = PrepareTableFilters.prepareTabsFilterConfig(counterObject, data);
        })
      )
      .subscribe((res: IEngagement[]) => {
        this.dataSource.data = res;
        this.hasData = !!res && res.length > 0;
        this.cd.detectChanges();
      });
  }

  public menuOptionTapped(event: { engagement: IEngagement, action: string }): void {
    switch (event.action) {
      case EngagementsListPageComponent.CAMPAIGN_ACTION:
        this.launchCampaign(event.engagement);
    }
  }

  private launchCampaign(e?: IEngagement): void {
    if (e !== undefined) {
      this.availableNewEngagementService.setNewEngagement(e);
    }
    this.router.navigateByUrl('/campaigns/new-campaign');
  }
}
