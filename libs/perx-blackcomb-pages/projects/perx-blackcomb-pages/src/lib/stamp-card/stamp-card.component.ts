import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  StampService,
  IStampCard,
  IPopupConfig,
  NotificationService,
  PuzzleCollectReward,
  IStamp,
  StampState
} from '@perx/core';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {filter, switchMap, takeUntil, map, distinctUntilChanged} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {oc} from 'ts-optchain';

export interface IRewardPopupConfig extends IPopupConfig {
  afterClosedCallBackRedirect?: PopUpClosedCallBack;
  url?: string;
}

export interface PopUpClosedCallBack {
  closeAndRedirect(url: string): void;
}

@Component({
  selector: 'perx-blackcomb-stamp-card',
  templateUrl: './stamp-card.component.html',
  styleUrls: ['./stamp-card.component.scss']
})

export class StampCardComponent implements OnInit, OnDestroy {
  public title: string; // = 'Scratch & Win!'
  public subTitle?: string; //  = 'Collect all 10 stickers and win a reward!'
  public background: string | undefined | null;
  public cardBackground: string;
  public isEnabled: boolean = false;
  public stamps: IStamp[] | undefined;
  public stampCard$: Observable<IStampCard>;
  public stampCard: IStampCard | null;
  private destroy$: Subject<any> = new Subject();
  private rewardSuccessPopUp: IPopupConfig = {
    title: 'STAMP_SUCCESS_TITLE',
    buttonTxt: 'VIEW_REWARD'
  };
  private errorPopUp: IPopupConfig = {
    title: 'STAMP_ERROR_TITLE',
    buttonTxt: 'TRY_AGAIN'
  };

  public v4Rewards(card: IStampCard): PuzzleCollectReward[] {
    if (!card || !card.displayProperties.rewardPositions) {
      throw new Error(`card or rewardPositions is required`);
    }
    return card.displayProperties.rewardPositions.map((el: number) => ({ rewardPosition: --el }));
  }

  constructor(
    private stampService: StampService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
  }

  private initTranslate(): void {
    if (this.rewardSuccessPopUp.title) {
      this.translate.get(this.rewardSuccessPopUp.title).subscribe((text) => this.rewardSuccessPopUp.title = text);
    }
    if (this.errorPopUp.title) {
      this.translate.get(this.errorPopUp.title).subscribe((text) => this.errorPopUp.title = text);
    }
    if (this.rewardSuccessPopUp.buttonTxt) {
      this.translate.get(this.rewardSuccessPopUp.buttonTxt).subscribe((text) => this.rewardSuccessPopUp.buttonTxt = text);
    }
    if (this.errorPopUp.buttonTxt) {
      this.translate.get(this.errorPopUp.buttonTxt).subscribe((text) => this.errorPopUp.buttonTxt = text);
    }
  }

  public ngOnInit(): void {
    this.initTranslate();

    this.stampCard$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => params.get('id')),
        switchMap((id: string) => {
          const idN = Number.parseInt(id, 10);
          return this.stampService.getCurrentCard(idN);
        }),
        switchMap((stampCard: IStampCard) => this.stampService.stampsChangedForStampCard(stampCard)),
        takeUntil(this.destroy$)
      );
    this.stampCard$.pipe(distinctUntilChanged()).subscribe(
      (stampCard: IStampCard) => {
        if (this.stamps && stampCard.stamps && this.stamps.length < stampCard.stamps.length) {
          this.notificationService.addSnack('You got a new stamp!');
        }
        // The initialization still needs to be here since the state references need to be updated after subscribed stampcard changes
        this.stampCard = stampCard;
        this.stamps = stampCard.stamps;
        this.title = stampCard.title || '';
        this.subTitle = stampCard.subTitle;
        this.background = oc(stampCard).displayProperties.backgroundImg.value.imageUrl('');
        this.cardBackground = stampCard.displayProperties.cardBgImage || '';
        if (stampCard.displayProperties.noRewardsPopUp) {
          this.errorPopUp.title = stampCard.displayProperties.noRewardsPopUp.headLine;
          this.errorPopUp.text = stampCard.displayProperties.noRewardsPopUp.subHeadLine;
          this.errorPopUp.buttonTxt = stampCard.displayProperties.noRewardsPopUp.buttonTxt || this.errorPopUp.buttonTxt;
          this.errorPopUp.imageUrl = stampCard.displayProperties.noRewardsPopUp.imageURL || this.errorPopUp.imageUrl;
        }

        if (stampCard.displayProperties.successPopUp) {
          this.rewardSuccessPopUp.title = stampCard.displayProperties.successPopUp.headLine;
          this.rewardSuccessPopUp.text = stampCard.displayProperties.successPopUp.subHeadLine;
          this.rewardSuccessPopUp.buttonTxt = stampCard.displayProperties.successPopUp.buttonTxt || this.rewardSuccessPopUp.buttonTxt;
          this.rewardSuccessPopUp.imageUrl = stampCard.displayProperties.successPopUp.imageURL || this.rewardSuccessPopUp.imageUrl;
        }
      },
      () => {
        this.router.navigate(['/wallet']);
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async handleStamp(stamp: IStamp): Promise<void> {
    if (!this.stampCard || !this.stampCard.stamps) {
      throw new Error(`card or stamps is required`);
    }

    // build ordered list of stamps to be stamped
    const stamps: IStamp[] = this.stampCard.stamps.filter(s => s.state === StampState.issued);
    for (const st of stamps) {
      await this.redeemStamp(st.id);
      if (st.id === stamp.id) {
        break;
      }
    }
  }

  private redeemStamp(stampId: number): Promise<void> {
    return this.stampService.putStamp(stampId)
      .toPromise()
      .then(
        (stamp: IStamp) => {
          if (stamp.state === StampState.redeemed) {
            if (!this.stampCard || !this.stampCard.stamps) {
              throw new Error(`card or stamps is required`);
            }

            // if (!this.cols || !this.rows) {
            //   throw new Error(`cols or rows is required`);
            // }

            const redeemedCard = this.stampCard.stamps.map((cardStamp: IStamp) => {
              if (cardStamp.id === stampId) {
                return { ...cardStamp, state: StampState.redeemed };
              }
              return cardStamp;
            });
            this.stampCard = { ...this.stampCard, stamps: redeemedCard };

            const redeemedTransactionsCount = this.stampCard.stamps &&
              this.stampCard.stamps.filter(s => s.state === StampState.redeemed).length;

            if (this.stampCard.displayProperties.displayCampaignAs === 'stamp_card'
              && redeemedTransactionsCount === (this.stampCard.campaignConfig && this.stampCard.campaignConfig.totalSlots)) {
              this.notificationService.addPopup({
                // tslint:disable-next-line: max-line-length
                text: 'Thank you for playing! You have already received the maximum number of stamps. Don\'t forget to redeem your earned rewards!'
              });
            }

            if (stamp.vouchers && stamp.vouchers.length > 0) {
              const voucherId = stamp.vouchers[0].id;
              const data: IRewardPopupConfig = {
                title: 'Congratulations!',
                text: 'Here is a reward for you.',
                imageUrl: 'assets/prize.png',
                disableOverlayClose: true,
                url: `/voucher/${voucherId}`,
                afterClosedCallBackRedirect: this,
                buttonTxt: 'View Reward',
              };
              this.notificationService.addPopup(data);
            }

          } else {
            if (!this.stampCard || !this.stampCard.stamps) {
              throw new Error(`card or stamps is required`);
            }

            const issuedLeft = this.stampCard.stamps.filter(s => s.state === StampState.issued);
            if (issuedLeft.length === 0) {
              // all redeemed but no voucher
              const data: IPopupConfig = {
                title: 'No Reward Received',
                text: 'Try again next time',
                disableOverlayClose: true,
                afterClosedCallBack: this,
                buttonTxt: 'Close',
              };
              this.notificationService.addPopup(data);
            }
          }
        })
      .catch(
        () => {
          this.notificationService.addPopup({
            title: 'Something went wrong, with our server',
            text: 'We notified our team. Sorry about the inconvenience.'
          });
          this.router.navigateByUrl('/home');
        }
      );
  }

  public dialogClosed(): void {
    this.router.navigate(['/home']);
  }

  public closeAndRedirect(url: string): void {
    this.router.navigateByUrl(url);
  }
}
