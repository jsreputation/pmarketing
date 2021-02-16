import { Component } from '@angular/core';
import {
  ICampaign,
  ICampaignService,
  NotificationService,
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import {
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import { MatDialog } from '@angular/material';
import { ReferralPopupComponent } from './referral-popup/referral-popup.component';

@Component({
  selector: 'perx-blackcomb-pages-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
})
export class ReferralComponent {
  public campaignName: string = '';
  public campaignDescription: string = '';
  public campaignEndsAt: Date;
  public campaignId: number;
  public campaign: ICampaign;

  // todo to be replaced with the proper content when api is available
  public code: string = '';
  // todo to be replaced with the proper content when api is available
  public shareText: string;
  // todo to be replaced with the proper content when api is available
  public shareTitle: string;
  // todo to be replaced with the proper content when api is available
  public shareUrl: string = 'https://www.dbs.com.hk/treasures/emgm-poc/referee/en';
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;
  public popupTitle: string;
  public popupDescription: string;
  public popupButton: string;
  public addButtonTxt: string;
  public namePlaceholder: string;
  public inviteSuccessMessage: string;
  public inviteFailureMessage: string;

  constructor(
    private campaignService: ICampaignService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.initTranslate();
    this.activeRoute.params
      .pipe(
        filter((ps: Params) => ps.id),
        map((ps: Params) => Number.parseInt(ps.id, 10)),
        switchMap((id: number) => this.campaignService.getCampaign(id))
      ).subscribe(
      (campaign: ICampaign) => {
        if (campaign) {
          this.campaign = campaign;
          this.code = campaign.referralCodes
            ? campaign.referralCodes.find(code => code !== undefined)
            : this.code;
          // set to campaign or do nothing
          this.campaignDescription = campaign.description ? campaign.description : this.campaignDescription;
          this.campaignName = campaign.name ? campaign.name : this.campaignName;
          this.campaignEndsAt = campaign.endsAt ? campaign.endsAt : null;
          this.campaignId = campaign.id;

          this.shareText = campaign.customFields.shareContent ? `${(campaign.customFields.shareContent as string)
            .replace(/\\n/g, '\u000A')
            .replace(/<br[\ ]?[/]?>/g, '\u000A')
            // match possible <br> permutations for both html and xhtml styles
          }` : '';
          this.shareTitle = campaign.customFields.shareHeader;
          this.shareUrl = campaign.customFields.shareUrl;
          this.shareText = this.shareText.replace('{{code}}', this.code);
          this.shareText = this.shareText.replace('{{url}}', this.shareUrl);
        }
      }
    );
  }

  public addRecipients(): void {
    const data = {
      title: this.popupTitle,
      description: this.popupDescription,
      buttonTxt: this.popupButton,
      addButtonTxt: this.addButtonTxt,
      namePlaceholder: this.namePlaceholder,
      inviteSuccessMessage: this.inviteSuccessMessage,
      inviteFailureMessage: this.inviteFailureMessage,
      campaignId: this.campaignId,
      afterClosedCallBack: this
    };
    this.dialog.open(ReferralPopupComponent, { data, width: '80vw' });
  }

  public dialogClosed(): void {
    // @ts-ignore
    if (navigator.share) {
      const data = {
        // url: this.shareUrl,
        text: this.shareText,
        title: this.shareTitle,
      };
      // @ts-ignore
      (navigator as any)
        .share(data)
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
    this.addRecipients();
    navigator.clipboard
      .writeText(this.shareText)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }

  private initTranslate(): void {
    this.translate
      .get([
        // 'REFERRAL.SHARE_COPY_TITLE',
        // 'REFERRAL.SHARE_COPY_TXT',
        'REFERRAL.COPY_TO_CLIPBOARD',
        'REFERRAL.CLIPBOARD_ERROR_TXT',
        'REFERRAL_POPUP.TITLE',
        'REFERRAL_POPUP.DESCRIPTION',
        'REFERRAL_POPUP.CTA_BUTTON',
        'REFERRAL_POPUP.ADD_BUTTON',
        'REFERRAL_POPUP.NAME_PLACEHOLDER',
        'REFERRAL_POPUP.INVITE_SUCCESS',
        'REFERRAL_POPUP.INVITE_FAILURE'
      ])
      .subscribe((res: any) => {
        // this.shareTitle = res['REFERRAL.SHARE_COPY_TITLE'];
        // this.shareText = res['REFERRAL.SHARE_COPY_TXT'].replace(
        //   '{{url}}',
        //   this.shareUrl
        // );
        this.copyToClipboardTxt = res['REFERRAL.COPY_TO_CLIPBOARD'];
        this.clipboardErrorTxt = res['REFERRAL.CLIPBOARD_ERROR_TXT'];
        this.popupTitle = res['REFERRAL_POPUP.TITLE'];
        this.popupDescription = res['REFERRAL_POPUP.DESCRIPTION'];
        this.popupButton = res['REFERRAL_POPUP.CTA_BUTTON'];
        this.addButtonTxt = res['REFERRAL_POPUP.ADD_BUTTON'];
        this.namePlaceholder = res['REFERRAL_POPUP.NAME_PLACEHOLDER'];
        this.inviteSuccessMessage = res['REFERRAL_POPUP.INVITE_SUCCESS'];
        this.inviteFailureMessage = res['REFERRAL_POPUP.INVITE_FAILURE'];
      });
  }
}
