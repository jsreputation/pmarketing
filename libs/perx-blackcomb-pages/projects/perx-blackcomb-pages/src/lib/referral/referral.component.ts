import { Component } from '@angular/core';
import { NotificationService } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-pages-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent {
  // todo to be replaced with the proper content when api is available
  public tnc: string;
  // todo to be replaced with the proper content when api is available
  public code: string = 'LASTNAME1234';
  // todo to be replaced with the proper content when api is available
  public shareText: string;
  // todo to be replaced with the proper content when api is available
  public shareTitle: string;
  // todo to be replaced with the proper content when api is available
  public shareUrl: string = 'http://www.linktothiscampaign.com';
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;

  constructor(private notificationService: NotificationService, private translate: TranslateService) { 
    this.initTranslate();
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
      this.shareText = res['REFERRAL.SHARE_COPY_TXT'];
      this.copyToClipboardTxt = res['REFERRAL.COPY_TO_CLIPBOARD'];
      this.clipboardErrorTxt = res['REFERRAL.CLIPBOARD_ERROR_TXT'];
    });
  }
}
