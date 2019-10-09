import { Component, OnInit, ViewChild } from '@angular/core';
import { Voucher, VoucherState, IVoucherService, PinInputComponent, NotificationService, IReward, RewardsService } from '@perx/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AnalyticsService, PageType } from '../analytics.service';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {
  public reward: IReward;
  public voucher: Voucher;
  public showEnterPinComponent: boolean = false;
  public isPinEntered: boolean = false;
  public isPinCorrect: boolean;

  @ViewChild('pinInput', { static: false })
  private pinInputComponent: PinInputComponent;

  constructor(
    private vouchersService: IVoucherService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private notficationService: NotificationService,
    private analytics: AnalyticsService,
    private rewardService: RewardsService
  ) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id)),
        tap((voucher: Voucher) => {
          this.voucher = voucher;
          const category: string = voucher.categories && voucher.categories.length > 0 ? voucher.categories[0] : undefined;
          if (category !== undefined) {
            const pageName: string = `rewards:vouchers:redemption:${category}:${voucher.name}`;
            this.analytics.addEvent({
              pageName,
              pageType: PageType.detailPage,
              siteSectionLevel2: 'rewards:vouchers',
              siteSectionLevel3: 'rewards:vouchers:redemption'
            });
          }
        }),
        mergeMap((voucher: Voucher)=> this.rewardService.getReward(voucher.rewardId))
      )
      .subscribe((reward: IReward) => this.reward = reward);
  }

  public back(): void {
    this.location.back();
  }

  public showPinComponent(): void {
    this.showEnterPinComponent = true;
  }

  public full(pin: string): void {
    this.vouchersService.redeemVoucher(this.voucher.id, { pin })
      .subscribe(
        () => this.voucher.state = VoucherState.redeemed,
        () => {
          this.pinInputComponent.error = true;
          this.notficationService.addSnack('Sorry! Voucher redemption failed.');
        }
      );
  }

  public tryAgainClicked(): void {
    this.isPinEntered = false;
    this.pinInputComponent.resetAll();
  }

  public cancelClicked(): void {
    this.location.back();
  }

  public backMyRewardsClicked(): void {
    this.router.navigateByUrl('home/vouchers');
  }

  public copyCode(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
  }

  public updatePin(): void {
    this.pinInputComponent.error = false;
  }
}
