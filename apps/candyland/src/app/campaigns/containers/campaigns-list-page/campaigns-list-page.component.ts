import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  CustomDataSource,
  DataSourceStates, DataSourceUpdateSchema
} from '@cl-shared/table/data-source/custom-data-source';
import { CampaignsService, ConfigService, MessageService } from '@cl-core/services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ICampaignTableData, ICampaign } from '@cl-core/models/campaign/campaign';
import { StatusLabelConfig } from '@cl-shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { CampaignAction } from '../../model/campaign-action.enum';
import { CampaignStatus } from '@cl-core/models/campaign/campaign-status.enum';
import { EngagementType } from '@cl-core/models/engagement/engagement-type.enum';
import { DataService } from '@perx/chart';

@Component({
  selector: 'cl-campaigns-list-page',
  templateUrl: './campaigns-list-page.component.html',
  styleUrls: ['./campaigns-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsListPageComponent implements OnInit, OnDestroy {
  public dataSource: CustomDataSource<ICampaignTableData>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;
  public displayedColumns: string[] = ['name', 'status', 'begin', 'end', 'audience', 'engagementType', 'actions'];
  public statusLabel: { [key: string]: StatusLabelConfig };
  private destroy$: Subject<void> = new Subject();

  constructor(
    private campaignsService: CampaignsService,
    private router: Router,
    private snack: MatSnackBar,
    private configService: ConfigService,
    private cd: ChangeDetectorRef,
    private dataService: DataService,
    private messageService: MessageService
  ) {
    this.dataSource = new CustomDataSource<ICampaignTableData>(this.campaignsService, 5, { include: 'pool' });
  }

  public editCampaign(campaign: ICampaignTableData): void {
    this.router.navigateByUrl('/campaigns/edit/' + campaign.id);
  }

  public duplicateCampaign(campaign: ICampaignTableData): void {
    this.campaignsService.duplicateCampaign(campaign.id)
      .subscribe(
        () => this.dataSource.updateData(),
        () => {
          this.snack.open('Duplication failed, please try again.', 'x', { duration: 2000 });
        });
  }

  public activateCampaign(campaign: ICampaign): void {
    this.updateCampaignStatus(campaign.id, CampaignStatus.active);
  }

  public pauseCampaign(campaign: ICampaign): void {
    this.updateCampaignStatus(campaign.id, CampaignStatus.paused);
  }

  private updateCampaignStatus(campaignId: string, newStatus: CampaignStatus): void {
    this.campaignsService.updateCampaignStatus(campaignId, newStatus)
      .subscribe(() => {
        this.dataSource.updateData(DataSourceUpdateSchema.currentPage);
        this.cd.detectChanges();
      });
  }

  public openReport(url: string): void {
    const segments: string[] = url.split('/');
    // for reports with a dedicated page
    const hasPage: boolean = [
      EngagementType.survey,
      EngagementType.stamp
    ].some(typ => segments.some(s => s === typ));
    if (hasPage) {
      this.router.navigateByUrl(url);
    } else {
      this.dataService.getReport('campaign_report', { cid: segments[segments.length - 1] })
        .subscribe(
          (res: string) => console.log(res),
          () => this.messageService.show('Could not download report', 'danger')
        );
    }
  }

  public ngOnInit(): void {
    this.getStatusesLabel();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getStatusesLabel(): void {
    this.configService.prepareStatusesLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((statuses) => {
        this.statusLabel = statuses;
      });
  }
}
