import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { CampaignsService } from '@cl-core/services';

@Component({
  selector: 'cl-campaigns-list-page',
  templateUrl: './campaigns-list-page.component.html',
  styleUrls: ['./campaigns-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsListPageComponent {
  public dataSource: CustomDataSource<ICampaign>;
  public displayedColumns: string[] = ['name', 'status', 'begin', 'end', 'audience', 'engagementType', 'actions'];

  constructor(private campaignsService: CampaignsService) {
    this.dataSource = new CustomDataSource<ICampaign>(this.campaignsService);
  }

  public editCampaign(): void {
  }

  public duplicateCampaign(campaign: ICampaign): void {
    this.campaignsService.duplicateCampaign(campaign.id)
      .subscribe(() => this.dataSource.updateData());
  }

  public deleteCampaign(campaign: ICampaign): void {
    this.campaignsService.deleteCampaign(campaign.id)
      .subscribe(() => this.dataSource.updateData());
  }
}
