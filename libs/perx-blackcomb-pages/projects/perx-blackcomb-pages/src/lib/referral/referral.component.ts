import { Component } from '@angular/core';
import {
  CampaignType,
  ICampaign,
  ICampaignService,
  NotificationService
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import {
  map,
  switchMap,
  takeLast,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent {
  // todo to be replaced with the proper content when api is available
  public tnc: string;
  // todo to be replaced with the proper content when api is available
  public code: string = '';
  // todo to be replaced with the proper content when api is available
  public shareText: string;
  // todo to be replaced with the proper content when api is available
  public shareTitle: string;
  // todo to be replaced with the proper content when api is available
  public shareUrl: string = 'https://retailbank.hsbc.com.hk/ins/';
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;

  constructor(
    private campaignService: ICampaignService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.initTranslate();
    this.campaignService.getCampaigns({ type: CampaignType.invite })
      .pipe(
        map((campaigns: ICampaign[]) => campaigns[0].id),
        switchMap((cid: number) => this.campaignService.getCampaign(cid)),
        tap((campaign: ICampaign) => {
          if (campaign) {
            this.code = campaign.referralCodes ? campaign.referralCodes[0] : this.code;
            this.shareText = this.shareText.replace('{{code}}', this.code);
          }
        }),
        takeLast(1)
      ).subscribe();
  }

  public share(): void {
    // @ts-ignore
    if (navigator.share) {
      const data = {
        url: this.shareUrl,
        text: this.shareText,
        title: this.shareTitle
      };
      // @ts-ignore
      navigator.share(data)
        .then(() => { })
        .catch(() => {
          console.log('failed to use share, falling back to clipboard');
          this.copy();
        });
    } else {
      console.log('no access to share api, falling back to clipboard');
      this.copy();
    }
  }

  public copy(): void {
    navigator.clipboard.writeText(this.shareText)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }

  private initTranslate(): void {
    this.translate.get([
      'REFERRAL.SHARE_COPY_TITLE',
      'REFERRAL.CONTENT',
      'REFERRAL.SHARE_COPY_TXT',
      'REFERRAL.COPY_TO_CLIPBOARD',
      'REFERRAL.CLIPBOARD_ERROR_TXT'
    ]).subscribe((res: any) => {
      this.tnc = res['REFERRAL.CONTENT'];
      this.shareTitle = res['REFERRAL.SHARE_COPY_TITLE'];
      this.shareText = res['REFERRAL.SHARE_COPY_TXT'].replace('[URL]', this.shareUrl);
      this.copyToClipboardTxt = res['REFERRAL.COPY_TO_CLIPBOARD'];
      this.clipboardErrorTxt = res['REFERRAL.CLIPBOARD_ERROR_TXT'];
    });
  }
}
