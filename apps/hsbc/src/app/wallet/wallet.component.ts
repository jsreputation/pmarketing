import {Component, OnInit} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {ICampaignService, NotificationService, CampaignType, IConfig, ConfigService} from '@perx/core';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public campaignId: number;
  public selectedTab: number = 0;
  public sourceType: string | null = null;
  public voucherFilter: string[];
  public canSelectRedeemed: boolean;

  constructor(
    private router: Router,
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {
  }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
        this.sourceType = config.sourceType.toString();
        this.voucherFilter = this.setVoucherFilter();
        this.canSelectRedeemed = this.setCanSelectRedeemed();
      }
    );

    this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp).slice(0, 1))
      )
      .subscribe(
        campaigns => {
          this.campaignId = campaigns[0].id;
        },
        () => {
          this.notificationService.addPopup(
            {
              title: 'Sorry, something went wrong'
            }
          );
        }
      );

    this.activeRoute.queryParamMap.subscribe(ps => {
      const tab: string = ps.get('tab');
      if (tab === 'history') {
        this.selectedTab = 1;
      }
    });
  }

  public onRoute(id: string): void {
    this.router.navigate([`/voucher/${id}`]);
  }

  private setCanSelectRedeemed(): boolean {
    if (this.sourceType === 'hsbc-xmas') {
      return true;
    }
    return false;
  }

  private setVoucherFilter(): string[] {
    if (this.sourceType === 'hsbc-xmas') {
      return ['issued', 'redeemed'];
    }
    return ['issued'];
  }
}
