import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy, OnInit
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
import { IEngagementType } from '@cl-core/models/engagement/engagement.interface';
import { OptionConfig } from '@perx/candyshop';

@Component({
  selector: 'cl-engagements-list-page',
  templateUrl: './engagements-list-page.component.html',
  styleUrls: ['./engagements-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementsListPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private static CAMPAIGN_ACTION: string = 'campaign';
  private destroy$: Subject<void> = new Subject();

  public dataSource: MatTableDataSource<IEngagementType> = new MatTableDataSource<IEngagementType>();
  public tabsFilterConfig: OptionConfig[];
  public hasData: boolean;
  public noData: boolean;
  public isGridMode: boolean = true;
  public options: IEngagementItemMenuOption[] = [
    { action: EngagementsListPageComponent.CAMPAIGN_ACTION, label: 'LAUNCH_AS_A_CAMPAIGN' }
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

  public ngOnInit(): void {
    if (this.availableNewEngagementService.isAvailable) {
      this.showLaunchDialog();
    }
    this.initData();
  }

  public ngAfterViewInit(): void {
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

  private initData(): void {
    this.engagementsService.getEngagements()
      .pipe(
        tap(data => {
          const counterObject = PrepareTableFilters.countFieldValue(data, 'attributes_type');
          this.tabsFilterConfig = PrepareTableFilters.prepareTabsFilterConfig(counterObject, data);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((res: IEngagementType[]) => {
        this.hasData = res && res.length > 0;
        this.noData = res && res.length === 0;
        this.dataSource.data = res;
        this.cd.detectChanges();
        this.dataSource.filterPredicate = PrepareTableFilters.getClientSideFilterFunction();
        this.dataSource.paginator = this.paginator;
      });
  }

  public menuOptionTapped(event: { engagement: IEngagementType, action: string }): void {
    switch (event.action) {
      case EngagementsListPageComponent.CAMPAIGN_ACTION:
        this.launchCampaign(event.engagement);
    }
  }

  private launchCampaign(e?: IEngagementType): void {
    if (e !== undefined) {
      this.availableNewEngagementService.setNewEngagement(e);
    }
    this.router.navigateByUrl('/campaigns/new-campaign');
  }
}
