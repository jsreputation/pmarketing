import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomDataSource, DataSourceStates } from '@cl-shared/table/data-source/custom-data-source';
import { CampaignsService } from '@cl-core/services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ICampaignTableData } from '@cl-core/models/campaign/campaign.interface';

@Component({
  selector: 'cl-campaigns-list-page',
  templateUrl: './campaigns-list-page.component.html',
  styleUrls: ['./campaigns-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsListPageComponent {
  public dataSource: CustomDataSource<ICampaignTableData>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;
  public displayedColumns: string[] = ['name', 'status', 'begin', 'end', 'audience', 'engagementType', 'actions'];

  constructor(private campaignsService: CampaignsService, private router: Router, private snack: MatSnackBar) {
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

  public openReport(url: string): void {
    this.router.navigateByUrl(url);
  }

}
