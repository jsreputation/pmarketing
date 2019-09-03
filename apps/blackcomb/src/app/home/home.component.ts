import { Component, OnInit } from '@angular/core';
import { ICampaign, CampaignState, CampaignType, VouchersService, VoucherState } from '@perx/core';
import { Router } from '@angular/router';
import { Voucher } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public campaigns: ICampaign[] = [
    {
      id: 1,
      name: 'Smash that Pinata',
      description: '',
      type: CampaignType.stamp,
      state: CampaignState.active,
      endsAt: '2017-12-17T03:24:00'
    }
  ];  // test Array

  public vouchers$: Observable<Voucher[]>;

  constructor(private router: Router, private vouchersService: VouchersService) { }

  public ngOnInit(): void {
    this.vouchers$ = this.vouchersService.getAll()
      .pipe(map((vouchers: Voucher[]) => vouchers.filter((voucher: Voucher) => {
        return voucher.state === VoucherState.issued;
      })));
  }

  public onCampaignSelect(campaign: ICampaign): void {
    this.router.navigate([`/game-play/${campaign.id}`]);
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }
}
