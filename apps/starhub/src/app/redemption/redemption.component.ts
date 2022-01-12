import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ConfigService,
  ICategoryTags,
  IConfig,
  IReward,
  isEmptyArray,
  IVoucherService,
  NotificationService,
  PinInputComponent,
  Voucher,
  VoucherState,
} from '@perxtech/core';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  filter,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { Location } from '@angular/common';
import {
  AnalyticsService,
  PageType
} from '../analytics.service';
import {
  IMacaron,
  MacaronService
} from '../services/macaron.service';
import { IStarhubConfig } from '../home/home/home.component';
import { oc } from 'ts-optchain';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {
  public pinInputError: boolean = false;
  public reward: IReward;
  public voucher: Voucher;
  public showEnterPinComponent: boolean = false;
  public isPinEntered: boolean = false;
  public isPinCorrect: boolean;
  public macaron: IMacaron | null;
  @ViewChild('pinInput')
  private pinInputComponent: PinInputComponent;

  private appConfig: IConfig<IStarhubConfig>;
  public isVoucherValid: boolean = false;

  constructor(
    private vouchersService: IVoucherService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private notficationService: NotificationService,
    private configService: ConfigService,
    private analytics: AnalyticsService,
    private macaronService: MacaronService
  ) {
  }

  public ngOnInit(): void {
    this.configService.readAppConfig<IStarhubConfig>().subscribe(
      (appConfig: IConfig<IStarhubConfig>) => {
        this.appConfig = appConfig;
      }
    );
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => !!params.id),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id)),
        tap((voucher: Voucher) => {
          this.voucher = voucher;
          this.isVoucherValid = this.voucher.vaildFrom ?  new Date().getTime() > this.voucher.vaildFrom.getTime()  : false;
          const categories: ICategoryTags[] = voucher.reward && voucher.reward.categoryTags ? voucher.reward.categoryTags : [];
          const category: string | undefined = !isEmptyArray(categories) ? categories[0].title : undefined;
          if (category !== undefined) {
            const pageName: string = `rewards:vouchers:redemption:${category}:
            ${voucher.reward && voucher.reward.name ? voucher.reward.name : ''}`;
            this.analytics.addEvent({
              pageName,
              pageType: PageType.detailPage,
              siteSectionLevel2: 'rewards:vouchers',
              siteSectionLevel3: 'rewards:vouchers:redemption'
            });
          }
        }),
        map((voucher: Voucher) => voucher.reward)
      )
      .subscribe((reward: IReward) => {
        this.reward = reward;
        this.macaron = this.macaronService.getMacaron(reward);
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
          this.pinInputError = true;
          // hide the snackbar if the CR is active
          if (!oc(this.appConfig).custom.UXCR(false)) {
            this.notficationService.addSnack('Sorry! Voucher redemption failed.');
          }
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
    this.notficationService.addSnack('Copied to your clipboard!');
  }

  public updatePin(): void {
    this.pinInputComponent.error = false;
  }
}
