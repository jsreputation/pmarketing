import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { CampaignsService } from '@cl-core/services';
import { Router } from '@angular/router';
import { ICampaignTableData } from '@perx/whistler';

@Component({
  selector: 'cl-campaigns-list-page',
  templateUrl: './campaigns-list-page.component.html',
  styleUrls: ['./campaigns-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsListPageComponent {
  public dataSource: CustomDataSource<ICampaignTableData>;
  public displayedColumns: string[] = ['name', 'status', 'begin', 'end', 'audience', 'engagementType', 'actions'];

  constructor(private campaignsService: CampaignsService, private router: Router) {
    this.dataSource = new CustomDataSource<ICampaignTableData>(this.campaignsService);
  }

  public editCampaign(campaign: ICampaignTableData): void {
    this.router.navigateByUrl('/campaigns/edit/' + campaign.id);
  }

  public duplicateCampaign(campaign: ICampaignTableData): void {
    this.campaignsService.duplicateCampaign(campaign.id)
      .subscribe(() => this.dataSource.updateData());
  }

}
