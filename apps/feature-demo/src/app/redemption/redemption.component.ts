import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Voucher,
  VoucherState,
  IVoucherService,
  PinInputComponent,
  NotificationService,
  ICategoryTags,
} from '@perx/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AnalyticsService, PageType } from '../analytics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {

  public voucher: Voucher;
  public voucher$: Observable<Voucher>;
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
    private analytics: AnalyticsService
  ) {
  }

  public ngOnInit(): void {
    this.voucher$ = this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id))
      );

    this.voucher$.subscribe((voucher: Voucher) => {
      this.voucher = voucher;
      const categories: ICategoryTags[] = voucher.reward.categoryTags;
      const category: string = categories && categories.length > 0 ? categories[0].title : undefined;
      if (category !== undefined) {
        const pageName: string = `rewards:vouchers:redemption:${category}:${voucher.reward.name}`;
        this.analytics.addEvent({
          pageName,
          pageType: PageType.detailPage,
          siteSectionLevel2: 'rewards:vouchers',
          siteSectionLevel3: 'rewards:vouchers:redemption'
        });
      }
    });
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
