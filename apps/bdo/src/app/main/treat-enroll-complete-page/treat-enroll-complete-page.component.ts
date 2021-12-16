import { Component, OnInit } from '@angular/core';
import { NotificationService, ICampaignService, ICampaign, RewardsService, IReward } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { mapRewardsToListItem } from '../../shared/utilities/mapping.util';
import { IListItemModel } from '../../shared/models/list-item.model';
import { Promo } from '../../models/promo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'bdo-treat-enroll-complete-page',
  templateUrl: './treat-enroll-complete-page.component.html',
  styleUrls: ['./treat-enroll-complete-page.component.scss']
})
export class TreatEnrollCompletePageComponent implements OnInit{
  
  similarDeals : IListItemModel[] = []
  public shareTitle:string;
  public shareText: string;
  public shareUrl = `${window.location.protocol}//${window.location.host}/treat-welcome/`;
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;
  public promo: Promo;

  constructor(
    private notificationService: NotificationService,
    private translate: TranslateService,
    private campaignService: ICampaignService,
    private rewardService: RewardsService,
    private router: Router
  ) {}

  dealDetail = {
    id: 1,
    image: './assets/images/Group_10985@2x.png',
    title: '40% OFF at New World Makati Hotel',
    description: 'Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card. Exclusive deals or dining, stays, and more with your BDO Credit or Debit Card.',
  };
  ngOnInit(){
    this.promo = history.state;
    this.initTranslate();
    this.campaignService.getCampaign(this.promo?.campaignId).pipe(
      switchMap((campaign: ICampaign) => 
        combineLatest(
          [...campaign.rewards.map((reward) =>
            this.rewardService.getRewardsRelated(reward.id, 5).pipe(catchError(() => of([])))
          )]
        )),
        map((rewards: IReward[][]) => [].concat(...(rewards as [])) as IReward[]),
        map((rewards: IReward[]) => {
          const ids = rewards.map(o => o.id);
          const filtered = rewards.filter(({id}, index) => !ids.includes(id, index + 1));
          return filtered?.slice(0,5);
        }        
        )
      ).subscribe((deals: IReward[]) => {
        this.similarDeals = mapRewardsToListItem(deals);
      }
      );
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
    this.shareUrl = this.shareUrl.concat(this.promo.campaignId?.toString());
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

  navigateTo(_selectedItem: IListItemModel) {
    this.router.navigate([ `deal-welcome/${_selectedItem.id}` ]);
  }
}
