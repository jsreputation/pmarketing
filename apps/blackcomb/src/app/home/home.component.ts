import { Component } from '@angular/core';
import { ICampaign, CampaignState, CampaignType } from '@perx/core';
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
      type: CampaignType.stamp,
      state: CampaignState.active
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
