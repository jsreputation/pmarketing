import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
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
  RewardPopupComponent,
  SettingsService,
  IFlags
} from '@perxtech/core';
import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import {
  catchError,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  combineLatest,
  iif,
  of
} from 'rxjs';
import { IdataLayerSH } from '../../app.component';
import { MatExpansionPanel } from '@angular/material/expansion';


declare var dataLayerSH: IdataLayerSH; // eslint-disable-line

export interface IStarhubConfig {
  hubclubCR: boolean;
  showAllSnappingSaturdayItems: boolean;
  mobileIdCR: boolean;
  UXCR: boolean;
  starsCR: boolean;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatToolbar)
  private toolBar: MatToolbar;
  public top: number = 0;
  public previousDelta: number = 0;
  public lastOffset: number = 0;
  @ViewChild('contentScrolled')
  public contentScrolled: ElementRef;
  public loyalty: ILoyalty | undefined;
  public starsLoyalty: ILoyalty | undefined;
  public profile: IProfile;
  private firstComefirstServeCampaign: ICampaign;
  private token: string;
  public game?: IGame;
  public hubclubCR: boolean;
  public starsCR: boolean;
  public hubClubDisplay: string = '';
  public appConfig: IConfig<IStarhubConfig>;
  public uxcr: boolean = false;
  public showLeaderboardLinkOnHomePage: boolean = false;
  @ViewChild('expansionPanel')
  public expansionPanel: MatExpansionPanel;

  constructor(
    private noRenewalePipe: NoRenewaleInNamePipe,
    private loyaltyService: LoyaltyService,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService,
    private campaignService: ICampaignService,
    private instantOutcomeService: InstantOutcomeService,
    private configService: ConfigService,
    private settingsService: SettingsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig<IStarhubConfig>().pipe(
      tap((config: IConfig<IStarhubConfig>) => {
        this.hubclubCR = config.custom ? config.custom.hubclubCR : false;
        this.starsCR = config.custom ? config.custom.starsCR : false;
        this.appConfig = config;
        this.uxcr = config.custom ? config.custom.UXCR : false;
      }),
      switchMap(() => this.authenticationService.getAccessToken()),
      tap((token: string) => {
        this.token = token;
        this.data.perxID = this.token;
      }),
      switchMap((token: string) => iif(() => token !== null, this.authenticationService.isAuthorized(), of(false))),
      map((isAuth: boolean) => {
        if (isAuth && !this.configService.readAppStarted()) {
          this.configService.setAppStarted();
          if (this.appConfig.showPopupCampaign) {
            this.fetchPopupCampaigns();
          }
        }
      })
    ).subscribe(
      () => {
        this.loyaltyService
          .getLoyalties()
          .subscribe((loyalties: ILoyalty[]) => {
            this.loyalty = loyalties.find((item: ILoyalty) => item.name === 'StarHub Post-paid Loyalty');
            this.starsLoyalty = loyalties.find((item: ILoyalty) => item.name === 'Stars loyalty');
          });
        if (this.hubclubCR) {
          this.profileService
            .whoAmI()
            .subscribe((p: IProfile) => {
              this.profile = p;
              const customProperties = p.customProperties;
              if (customProperties) {
                this.hubClubDisplay = customProperties.sub_membership_type &&
                  customProperties.sub_membership_type.toString().toLowerCase() === 'nominee' &&
                  customProperties.membership &&
                  customProperties.membership.toString().toLowerCase() !== 'hubclub' ?
                  customProperties.sub_membership_display.toString() :
                  customProperties.membership_display ? customProperties.membership_display.toString() : '';
              }
            });
        }
      }
    );

    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.showLeaderboardLinkOnHomePage = flags.showLeaderboardLinkOnHomePage ? flags.showLeaderboardLinkOnHomePage : false;
      }
    );
  }

  private get data(): Partial<IdataLayerSH> {
    // tslint:disable-next-line: no-use-before-declare
    if (dataLayerSH === undefined) {
      return {};
    }
    return dataLayerSH;
  }

  public getBadge(tier: string | undefined): string {
    tier =
      tier ? this.noRenewalePipe.transform(tier.toLowerCase()) : undefined;

    switch (tier) {
      case 'gold':
        return this.uxcr ? 'assets/gold-icon.svg' : 'assets/gold-icon_old.svg';

      case 'platinum':
        return this.uxcr ? 'assets/plat-icon.svg' : 'assets/plat-icon_old.svg';

      case 'green':
      default:
        return this.uxcr ? 'assets/green-icon.svg' : 'assets/green-icon_old.svg';
    }
  }
  public onScrollCall(): void {
    if (this.expansionPanel?.expanded) {
      this.expansionPanel.close();
    }
    requestAnimationFrame(() => {
      const offset = this.showLeaderboardLinkOnHomePage ? -240 : -184;
      const delta =
        this.previousDelta - this.contentScrolled.nativeElement.scrollTop;
      this.previousDelta = this.contentScrolled.nativeElement.scrollTop;
      if (this.top + delta > 0) {
        this.top = 0;
      } else if (this.top + delta <= offset) {
        this.top = offset;
      } else {
        this.top = this.top + delta;
      }
      this.toolBar._elementRef.nativeElement.style.transform = `translateY(${this.top}px)`;
    });
  }

  public onPanelExpansion(): void {
    this.toolBar._elementRef.nativeElement.style.transform = 'translateY(0)';
    this.toolBar._elementRef.nativeElement.classList.add('accordion-expanded');
    this.contentScrolled.nativeElement.classList.add('accordion-expanded');
  }

  public onPanelCollapse(): void {
    this.toolBar._elementRef.nativeElement.classList.remove('accordion-expanded');
    this.contentScrolled.nativeElement.classList.remove('accordion-expanded');
    this.contentScrolled.nativeElement.scrollTop = '230px';
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
      const membershipType = userCustomProps.membership ? userCustomProps.membership : '';
      const subMembershipType = userCustomProps.sub_membership_type ? userCustomProps.sub_membership_type : '';
      document.location.href = `https://membershipclicked/?Membership=${membershipType}&SubMembershipType=${subMembershipType}`;
    }
  }
}
