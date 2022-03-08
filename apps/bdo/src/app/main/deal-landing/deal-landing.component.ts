import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IReward, ITag, NotificationService, RewardsService, IVoucherService } from '@perxtech/core';
import { combineLatest, of } from 'rxjs';
import { IListItemModel } from '../../shared/models/list-item.model';
import { TranslateService } from '@ngx-translate/core';
import { mapRewardsToListItem } from '../../shared/utilities/mapping.util';
import { FILTER_DATA } from '../../shared/constants/filter-configuration.const';
import { catchError } from 'rxjs/operators';
import { CATALOG_CONFIGURATION } from '../../shared/constants/catalog-configuration.const';
@Component({
  selector: 'bdo-deal-landing',
  templateUrl: './deal-landing.component.html',
  styleUrls: ['./deal-landing.component.scss'],
})
export class DealLandingComponent implements OnInit {
  similarDeals: IListItemModel[];
  dealDetail: IReward;
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;
  public teamCodeShareText: string;
  public shareTitle: string;
  public shareText: string;
  public shareUrl = `${window.location.protocol}//${window.location.host}/deal-welcome/`;
  public showLocation = false;
  navigateTo(_selectedItem: IListItemModel) {
    this.route.navigate([`deal-welcome/${_selectedItem.id}`]);
  }
  constructor(
    private rewardService: RewardsService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private voucherService: IVoucherService
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      combineLatest([
        this.rewardService.getReward(param.rid),
        this.rewardService
          .getRewardsRelated(param.rid, 5)
          .pipe(catchError(() => of([]))),
        this.voucherService
          .getRewardLocations(param.rid)
          .pipe(catchError(() => of([]))),
      ]).subscribe(([dealDetail, similarDeals, locations]) => {
        this.showLocation = !!locations.length;
        this.dealDetail = dealDetail;
        this.similarDeals = mapRewardsToListItem(similarDeals);
        this.shareUrl.concat(dealDetail.id.toString());
        this.initTranslate();
      });
    });
  }
  navigateLocationPage() {
    this.route.navigate([`deal-welcome/${this.dealDetail.id}/location`]);
  }

  public navigatePhonePage(): void {
    this.route.navigate([`deal-welcome/${this.dealDetail.id}/location`], {
      queryParams: { display: 'phone' },
    });
  }

  shareDeal() {
    if (navigator.share) {
      const data = {
        url: this.shareUrl,
        text: this.shareText,
        title: this.shareText,
      };
      (navigator as any).share(data).catch(() => {
        console.log('failed to use share, falling back to clipboard');
        this.copy();
      });
      console.log('data: ', data);
    } else {
      console.log('no access to share api, falling back to clipboard');
      this.copy();
    }
  }
  public copy(): void {
    navigator.clipboard
      .writeText(`${this.shareText}`)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }
  private initTranslate(): void {
    this.shareUrl = this.shareUrl.concat(this.dealDetail.id.toString());
    this.translate
      .get([
        'DEAL_LANDING_PAGE.SHARE_COPY_TITLE',
        'DEAL_LANDING_PAGE.SHARE_COPY_TXT',
        'DEAL_LANDING_PAGE.COPY_TO_CLIPBOARD',
        'DEAL_LANDING_PAGE.CLIPBOARD_ERROR_TXT',
      ])
      .subscribe((res: any) => {
        this.shareTitle = res['DEAL_LANDING_PAGE.SHARE_COPY_TITLE'].replace(
          '{{url}}',
          this.shareUrl
        );
        this.shareText = res['DEAL_LANDING_PAGE.SHARE_COPY_TXT'].replace('{{url}}', this.shareUrl);
        this.copyToClipboardTxt = res['DEAL_LANDING_PAGE.COPY_TO_CLIPBOARD'];
        this.clipboardErrorTxt = res['DEAL_LANDING_PAGE.CLIPBOARD_ERROR_TXT'];
      });
  }

  public existsInFilters(tag: ITag): boolean {
    return !!FILTER_DATA.tags.find((element) => element.type === tag.name);
  }

  private getUniqueMainCategories(): string[] {
    const uniqueDealsCategories = [];
    const bdoMainCategories = [
      CATALOG_CONFIGURATION.bdo.name,
      CATALOG_CONFIGURATION.debit.name,
      CATALOG_CONFIGURATION.credit.name,
    ];
    for (const tag of this.dealDetail?.categoryTags) {
      const categoryTitle = tag.parent == null ? tag.title : tag.parent.title;
      if (
        bdoMainCategories.includes(categoryTitle) &&
        !uniqueDealsCategories.includes(categoryTitle)
      ) {
        uniqueDealsCategories.push(categoryTitle);
      }
    }
    return uniqueDealsCategories;
  }

  private navigateToCatalog(type: string) {
    const queryParams: Params = { type: type };
    this.route.navigate(['/catalog-page'], { queryParams });
  }

  public viewAll(): void {
    const dealsMainCategories = this.getUniqueMainCategories();
    if (dealsMainCategories?.length > 1) {
      this.route.navigate(['/home']);
    } else {
      if (dealsMainCategories?.includes(CATALOG_CONFIGURATION.bdo.name)) {
        this.navigateToCatalog(CATALOG_CONFIGURATION.bdo.type);
      } else if (
        dealsMainCategories?.includes(CATALOG_CONFIGURATION.debit.name)
      ) {
        this.navigateToCatalog(CATALOG_CONFIGURATION.debit.type);
      } else if (
        dealsMainCategories?.includes(CATALOG_CONFIGURATION.credit.name)
      ) {
        this.navigateToCatalog(CATALOG_CONFIGURATION.credit.type);
      } else {
        this.route.navigate(['/home']);
      }
    }
  }
}
