import { Component } from '@angular/core';
import { ICampaign, CAMPAIGN_STATE, CAMPAIGN_TYPE } from '@perx/core';
import { Router } from '@angular/router';
import { IVoucher } from '@perx/core/dist/perx-core/lib/stamp/models/stamp.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public campaigns: ICampaign[] = [
    {
      id: 1,
      name: 'Smash that Pinata',
      description: '',
      type: CAMPAIGN_TYPE.stamp,
      state: CAMPAIGN_STATE.active
    }
  ];  // test Array

  constructor(private router: Router) { }

  public onCampaignSelect(campaign: ICampaign): void {
    this.router.navigate([`/game-play/${campaign.id}`]);
  }

  public voucherSelected(voucher: IVoucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
