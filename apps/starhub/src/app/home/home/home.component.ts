import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AuthenticationService,
  CampaignType,
  ConfigService,
  ICampaign,
  ICampaignService,
  IConfig,
  IGame,
  ILoyalty,
  InstantOutcomeService,
  IProfile,
  LoyaltyService,
  ProfileService,
  RewardPopupComponent
} from '@perxtech/core';
import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';
import { MatDialog, MatToolbar } from '@angular/material';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { IdataLayerSH } from '../../app.component';

declare var dataLayerSH: IdataLayerSH; // eslint-disable-line

export interface IStarhubConfig {
  hubclubCR: boolean;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatToolbar, { static: false })
  private toolBar: MatToolbar;
  public top: number = 0;
  public previousDelta: number = 0;
  public lastOffset: number = 0;
  @ViewChild('contentScrolled', { static: false })
  public contentScrolled: ElementRef;
  public loyalty: ILoyalty;
  public profile: IProfile;
  private firstComefirstServeCampaign: ICampaign;
  private token: string;
  public game?: IGame;
  public hubclubCR: boolean;
  public hubClubDisplay: string = ''

  constructor(
    private noRenewalePipe: NoRenewaleInNamePipe,
    private loyaltyService: LoyaltyService,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService,
    private campaignService: ICampaignService,
    private instantOutcomeService: InstantOutcomeService,
    private configService: ConfigService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig<IStarhubConfig>().subscribe(
      (config: IConfig<IStarhubConfig>) => {
        this.hubclubCR = config.custom ? config.custom.hubclubCR : false;
        this.loyaltyService
          .getLoyalty()
          .subscribe((loyalty: ILoyalty) => (this.loyalty = loyalty));
        this.profileService
          .whoAmI()
          .subscribe((p: IProfile) => {
            this.profile = p;
            const customProperties = p.customProperties;
            if (customProperties){
              this.hubClubDisplay = customProperties.sub_membership_type.toString().toLowerCase() === 'nominee' &&
                customProperties.membership_type.toString().toLowerCase() !== 'hubclub' ?
                customProperties.sub_membership_display.toString() : customProperties.membership_display.toString();
            }
          });
        this.getAccessToken();
      }
    );
  }

  private getAccessToken(): void {
    this.authenticationService.getAccessToken().subscribe((token: string) => {
      this.token = token;
      if (this.token) {
        this.checkAuth();
      }
      this.data.perxID = this.token;
    });
  }

  private get data(): Partial<IdataLayerSH> {
    // tslint:disable-next-line: no-use-before-declare
    if (dataLayerSH === undefined) {
      return {};
    }
    return dataLayerSH;
  }

  public getBadge(tier: string | null): string {
    tier =
      tier !== null ? this.noRenewalePipe.transform(tier.toLowerCase()) : null;

    switch (tier) {
      case 'gold':
        return 'assets/gold-icon.svg';

      case 'platinum':
        return 'assets/plat-icon.svg';

      case 'green':
      default:
        return 'assets/green-icon.svg';
    }
  }
  public onScrollCall(): void {
    requestAnimationFrame(() => {
      const delta =
        this.previousDelta - this.contentScrolled.nativeElement.scrollTop;
      this.previousDelta = this.contentScrolled.nativeElement.scrollTop;
      if (this.top + delta > 0) {
        this.top = 0;
      } else if (this.top + delta <= -170) {
        this.top = -170;
      } else {
        this.top = this.top + delta;
      }
      this.toolBar._elementRef.nativeElement.style.transform = `translateY(${this.top}px)`;
    });
  }

  private checkAuth(): void {
    this.authenticationService.isAuthorized().subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.fetchPopupCampaigns();
      }
    });
  }

  private fetchPopupCampaigns(): void {
    this.campaignService
      .getCampaigns({ type: CampaignType.give_reward })
      .pipe(catchError(() => of([])))
      .pipe(
        // for each campaign, get detailed version
        switchMap((campaigns: ICampaign[]) =>
          combineLatest(
            ...campaigns.map((campaign) =>
              this.campaignService.getCampaign(campaign.id)
            )
          )
        )
      )
      .subscribe(
        (campaigns: ICampaign[]) => {
          const firstComeFirstServed: ICampaign[] = campaigns.filter(
            (campaign) => campaign.type === CampaignType.give_reward
          );
          // if there is a 1st come 1st served campaign, display the popup
          if (firstComeFirstServed.length > 0) {
            this.firstComefirstServeCampaign = firstComeFirstServed[0];
            const popupImageURL = this.firstComefirstServeCampaign
              .campaignBannerUrl
              ? this.firstComefirstServeCampaign.campaignBannerUrl
              : 'assets/reward.png';
            const data = {
              text: this.firstComefirstServeCampaign.description,
              imageUrl: popupImageURL,
              buttonTxt: 'Check it out',
              afterClosedCallBack: this,
              // @ts-ignore
              validTo: new Date(this.firstComefirstServeCampaign.endsAt)
            };
            this.dialog.open(RewardPopupComponent, { data });
            return;
          }
        },
        () => {
          // no campaign that is popup eligible. fail silently.
        }
      );
  }

  public dialogClosed(): void {
    if (this.game) {
      this.router.navigate(['/game'], { queryParams: { id: this.game.id } });
    } else {
      this.instantOutcomeService
        .claim(this.firstComefirstServeCampaign.id)
        .subscribe(
          () => {
            this.router.navigate(['/home/vouchers']);
          },
          (err) => {
            if (err.error && err.error.code === 4103) {
              // user has already been issued voucher
              this.router.navigate(['/home/vouchers']);
            }
            console.error(
              `Something fishy, we should not be here, without any reward or game. ERR print: ${err.error.message}`
            );
          }
        );
    }
  }

  public membershipClicked(): void {
    const userCustomProps = this.profile.customProperties;
    if (userCustomProps) {
      const membershipType = userCustomProps.MembershipType ? userCustomProps.MembershipType : '';
      const subMembershipType = userCustomProps.SubMemberShipType ? userCustomProps.SubMemberShipType : '';
      document.location.href = `https://membershipclicked/?MembershipType=${membershipType}&SubMembershipType=${subMembershipType}`;
    }
  }
}
