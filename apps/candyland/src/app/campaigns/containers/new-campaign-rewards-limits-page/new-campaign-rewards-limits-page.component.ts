import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

@Component({
  selector: 'cl-new-campaign-rewards-limits-page',
  templateUrl: './new-campaign-rewards-limits-page.component.html',
  styleUrls: ['./new-campaign-rewards-limits-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsLimitsPageComponent implements OnInit {
  @Input() public tenantSettings: ITenantsProperties;
  public form: FormGroup;
  public campaignEngagementType: string;
  // Slot 0 for those outcomes not caterorized, -1 for those outcomes need to be deleted
  public slots: number[] = [0];

  constructor(
    public store: CampaignCreationStoreService,
    public cd: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    if (!this.form) {
      return;
    }
    this.store.currentCampaign$
      .asObservable()
      .subscribe((data: ICampaign) => {
        const hasTemplate = data && data.template;
        if (hasTemplate) {
          this.slots = this.store.currentCampaign.template.slots || [0];
        }
        this.campaignEngagementType = hasTemplate ? data.template.attributes_type : '';
        this.cd.detectChanges();
      });
  }


  public get limits(): FormGroup {
    return this.form.get('limits') as FormGroup;
  }

}
