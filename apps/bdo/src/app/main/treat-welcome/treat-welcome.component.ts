import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ICampaign,
  ICampaignService
} from '@perxtech/core';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bdo-treat-welcome',
  templateUrl: './treat-welcome.component.html',
  styleUrls: ['./treat-welcome.component.scss'],
})
export class TreatWelcomeComponent implements OnInit {
  defaultImageUrl = 'assets/images/light-gray-color-default-image.png';
  campaign: ICampaign;
  public shareTitle:string;
  public shareText: string;
  public shareUrl = `${window.location.protocol}//${window.location.host}/treat-welcome/`;
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;

  constructor(
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {}
  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((param: Params) => this.campaignService.getCampaign(param.id))
      )
      .subscribe((campaign) => {
        this.campaign = campaign;
        this.initTranslate();
      }); 
  }
  navigateEnrollPage() {
    this.route.navigate([`treat-enroll/${this.campaign.id}`]);
  }

  sharePromo(){   
    if (navigator.share) {
      const data = {
        url: this.shareUrl,
        text:this.shareText,
        title:this.shareTitle
      };
      (navigator as any)
        .share(data)
        .catch(() => {
          console.log('failed to use share, falling back to clipboard');
          this.copy();
        });
    } else {
      console.log('no access to share api, falling back to clipboard');
      this.copy();
    }
  }

  public navigateLocationPage(): void {
    this.route.navigate([`treat-welcome/${this.campaign.id}/location`], { queryParams: { mode: 'campaign'}});
  }

  public copy(): void {
    navigator.clipboard
      .writeText(`${this.shareTitle}`)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }

  private initTranslate(): void {
    this.shareUrl = this.shareUrl.concat(this.campaign.id?.toString());
    this.translate
      .get([
        'TREAT_PAGE.SHARE_COPY_TITLE',
        'TREAT_PAGE.SHARE_COPY_TXT',
        'TREAT_PAGE.COPY_TO_CLIPBOARD',
        'TREAT_PAGE.CLIPBOARD_ERROR_TXT',
      ])
      .subscribe((res: any) => {
        this.shareTitle = res['TREAT_PAGE.SHARE_COPY_TITLE'].replace(
          '{{url}}',
          this.shareUrl
        );
        this.shareText = res['TREAT_PAGE.SHARE_COPY_TXT'];
        this.copyToClipboardTxt = res['TREAT_PAGE.COPY_TO_CLIPBOARD'];
        this.clipboardErrorTxt = res['TREAT_PAGE.CLIPBOARD_ERROR_TXT'];
      });
  }
}
