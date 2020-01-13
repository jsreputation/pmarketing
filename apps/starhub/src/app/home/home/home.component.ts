import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  ILoyalty,
  LoyaltyService,
  ProfileService,
  IProfile,
  AuthenticationService,
  ICampaignService,
  ICampaign,
  TokenStorage,
  CampaignType,
  IGame,
  RewardPopupComponent
} from '@perx/core';
import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';
import { MatToolbar, MatDialog } from '@angular/material';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, combineLatest } from 'rxjs';
import { IdataLayerSH } from 'src/app/app.component';

declare var dataLayerSH: IdataLayerSH; // eslint-disable-line
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
  constructor(
    private noRenewalePipe: NoRenewaleInNamePipe,
    private loyaltyService: LoyaltyService,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService,
    private campaignService: ICampaignService,
    private router: Router,
    private dialog: MatDialog,
    private tokenStorage: TokenStorage
  ) { }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalty().subscribe((loyalty: ILoyalty) => this.loyalty = loyalty);
    this.profileService.whoAmI().subscribe((p: IProfile) => this.profile = p);
    this.getAccessToken();
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
    tier = tier !== null ? this.noRenewalePipe.transform(tier.toLowerCase()) : null;

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
      const delta = this.previousDelta - this.contentScrolled.nativeElement.scrollTop;
      this.previousDelta = this.contentScrolled.nativeElement.scrollTop;
      if (this.top + delta > 0) {
        this.top = 0;
      } else if (this.top + delta <= -170) {
        this.top = - 170;
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
    this.campaignService.getCampaigns()
      .pipe(
        catchError(() => {
          this.router.navigateByUrl('error');
          return of([]);
        })
      )
      .pipe(
        // for each campaign, get detailed version
        switchMap((campaigns: ICampaign[]) => combineLatest(...campaigns.map(campaign => this.campaignService.getCampaign(campaign.id)))),
        map((campaigns: ICampaign[]) => campaigns.filter(c => !this.idExistsInStorage(c.id)))
      )
      .subscribe(
        (campaigns: ICampaign[]) => {
          const firstComeFirstServed: ICampaign[] = campaigns
            .filter(campaign => campaign.type === CampaignType.give_reward);
          // if there is a 1st come 1st served campaign, display the popup
          if (firstComeFirstServed.length > 0) {
            this.firstComefirstServeCampaign = firstComeFirstServed[0];
            const data = {
              text: this.firstComefirstServeCampaign.description,
              imageUrl: 'assets/bd-campaign.svg',
              buttonTxt: 'Check it out',
              afterClosedCallBack: this,
              // @ts-ignore
              validTo: new Date(this.firstComefirstServeCampaign.endsAt)
            };
            this.putIdInStorage(this.firstComefirstServeCampaign.id);
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
      this.router.navigate([`/game`], { queryParams: { id: this.game.id } });
    } else {
      this.campaignService.issueAll(this.firstComefirstServeCampaign.id).subscribe(
        () => {
          this.router.navigate([`/home/vouchers`]);
        },
        (err) => {
          if (err.error && err.error.code === 4103) {
            // user has already been issued voucher
            this.router.navigate([`/home/vouchers`]);
          }
          console.error(`Something fishy, we should not be here, without any reward or game. ERR print: ${err.error.message}`);
        }
      );
    }
  }

  private idExistsInStorage(id: number): boolean {
    return this.idsInStorage.includes(id);
  }

  private putIdInStorage(id: number): void {
    const ids: number[] = this.idsInStorage;
    ids.push(id);
    this.tokenStorage.setAppInfoProperty(JSON.stringify(ids), 'campaignIdsPopup');
  }

  private get idsInStorage(): number[] {
    const campaignIdsInLocalStorage = this.tokenStorage.getAppInfoProperty('campaignIdsPopup');
    return campaignIdsInLocalStorage ? JSON.parse(campaignIdsInLocalStorage) : [];
  }
}
