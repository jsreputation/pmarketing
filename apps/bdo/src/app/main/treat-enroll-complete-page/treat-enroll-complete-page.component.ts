import { Component, OnInit } from '@angular/core';
import { LIST_SIMILAR_DEALS } from '../../mock-data/similar-deals.mock';
import { NotificationService } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bdo-treat-enroll-complete-page',
  templateUrl: './treat-enroll-complete-page.component.html',
  styleUrls: ['./treat-enroll-complete-page.component.scss']
})
export class TreatEnrollCompletePageComponent implements OnInit{
  similarDeals = LIST_SIMILAR_DEALS;
  promoId:string;
  public promoName: string;
  public promoTNC: string;
  public shareTitle:string;
  public shareText: string;
  public shareUrl = `${window.location.protocol}//${window.location.host}/treat-welcome/`;
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;

  constructor(
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {}

  dealDetail = {
    id: 1,
    image: './assets/images/Group_10985@2x.png',
    title: '40% OFF at New World Makati Hotel',
    description: 'Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card.',
  };
  ngOnInit(){
    this.promoId = history.state.promoId;
    this.promoName = history.state.promoName;
    this.promoTNC = history.state.promoTNC;
    this.initTranslate();
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

  public copy(): void {
    navigator.clipboard
      .writeText(`${this.shareTitle}`)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }

  private initTranslate(): void {
    this.shareUrl = this.shareUrl.concat(this.promoId);
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
