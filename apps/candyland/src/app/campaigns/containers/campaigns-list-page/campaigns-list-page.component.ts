import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  CustomDataSource,
  DataSourceStates, DataSourceUpdateSchema
} from '@cl-shared/table/data-source/custom-data-source';
import { CampaignsService, ConfigService } from '@cl-core/services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ICampaignTableData } from '@cl-core/models/campaign/campaign.interface';
import { StatusLabelConfig } from '@cl-shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CampaignAction } from '../../model/campaign-action.enum';

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
  private campaignStatuses: typeof CampaignAction = CampaignAction;
  constructor(private campaignsService: CampaignsService,
              private router: Router,
              private snack: MatSnackBar,
              private configService: ConfigService,
              private cd: ChangeDetectorRef) {
    this.dataSource = new CustomDataSource<ICampaignTableData>(this.campaignsService);
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

  public activateCampaign(campaign: any): void {
    this.updateCampaignStatus(campaign.id, this.campaignStatuses.activate);
  }

  public pauseCampaign(campaign: any): void {
    this.updateCampaignStatus(campaign.id, this.campaignStatuses.pause);
  }

  private updateCampaignStatus(campaignId: string, newStatus: CampaignAction): void {
    this.campaignsService.updateCampaignStatus(campaignId, newStatus)
      .subscribe(() => {
        this.dataSource.updateData(DataSourceUpdateSchema.currentPage);
        this.cd.detectChanges();
      });
  }

  public openReport(url: string): void {
    this.router.navigateByUrl(url);
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
