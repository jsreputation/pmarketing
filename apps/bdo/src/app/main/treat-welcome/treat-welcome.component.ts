import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ICampaign,
  ICampaignService,
  ITag,
  LocationsService,
} from '@perxtech/core';
import { switchMap } from 'rxjs/operators';
import * as copyToClipboard from 'copy-to-clipboard';
import { NotificationService } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FILTER_DATA } from '../../shared/constants/filter-configuration.const';

@Component({
  selector: 'bdo-treat-welcome',
  templateUrl: './treat-welcome.component.html',
  styleUrls: ['./treat-welcome.component.scss'],
})
export class TreatWelcomeComponent implements OnInit {
  defaultImageUrl = 'assets/images/light-gray-color-default-image.png';
  campaign: ICampaign;
  public shareTitle: string;
  public shareText: string;
  public shareUrl = `${window.location.protocol}//${window.location.host}/treat-welcome/`;
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;
  public isShowLocationsAndPhone = false;

  constructor(
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private locationsService: LocationsService
  ) {}
  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((param: Params) =>
          combineLatest([
            this.campaignService.getCampaign(param.id),
            this.locationsService
              .getMerchantLocationsFromCampaign(param.id)
              .pipe(catchError(() => of([]))),
          ])
        )
      )
      .subscribe(([campaign, locations]) => {
        this.isShowLocationsAndPhone = !!locations.length;
        this.campaign = campaign;
        this.initTranslate();
      });
  }
  navigateEnrollPage() {
    this.route.navigate([`treat-enroll/${this.campaign.id}`]);
  }

  sharePromo() {
    try {
      if ((navigator as any).share) {
        const data = {
          url: this.shareUrl,
          text: this.shareText,
          title: this.shareText,
        };
        (navigator as any).share(data);
      } else {
        console.log('no access to share api, falling back to clipboard');
        this.copy();
      }
    } catch (error) {
      console.log('failed to use share, falling back to clipboard');
      this.copy();
    }
  }

  public navigateLocationPage(): void {
    this.route.navigate([`treat-welcome/${this.campaign.id}/location`], {
      queryParams: { mode: 'campaign' },
    });
  }

  public navigatePhonePage(): void {
    this.route.navigate([`treat-welcome/${this.campaign.id}/location`], {
      queryParams: {
        display: 'phone',
        mode: 'campaign',
      },
    });
  }

  public copy(): void {
    try {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(this.shareText)
          .then(() =>
            this.notificationService.addSnack(this.copyToClipboardTxt)
          );
      } else {
        // Added fallback option for clipboard when its not available
        copyToClipboard(this.shareTitle, {
          onCopy: () => {
            this.notificationService.addSnack(this.copyToClipboardTxt);
          },
        });
      }
    } catch (error) {
      this.notificationService.addSnack(this.clipboardErrorTxt);
    }
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
        this.shareText = res['TREAT_PAGE.SHARE_COPY_TXT'].replace(
          '{{url}}',
          this.shareUrl
        );
        this.copyToClipboardTxt = res['TREAT_PAGE.COPY_TO_CLIPBOARD'];
        this.clipboardErrorTxt = res['TREAT_PAGE.CLIPBOARD_ERROR_TXT'];
      });
  }

  public existsInFilters(tag: ITag): boolean {
    return !!FILTER_DATA.tags.find((element) => element.type === tag.name);
  }
}
