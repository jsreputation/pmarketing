import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import {
  PopupComponent,
  NotificationService,
  IPopupConfig,
  ITheme,
  AuthenticationService,
  ConfigService,
  ICampaign, CampaignType, ICampaignService, TokenStorage
} from '@perx/core';
import {
  HomeComponent,
  HistoryComponent,
  AccountComponent,
  SignIn2Component,
  WalletComponent
} from '@perx/blackcomb-pages';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event } from '@angular/router';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import {combineLatest, of} from 'rxjs';
import {RewardPopupComponent} from './reward-popup/reward-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showHeader: boolean;
  public showToolbar: boolean;
  public leftIcon: string = '';
  public preAuth: boolean;
  public theme: ITheme;
  public translationLoaded: boolean = false;
  private firstComefirstServeCampaign: ICampaign;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private authService: AuthenticationService,
    private cd: ChangeDetectorRef,
    private snack: MatSnackBar,
    private config: ConfigService,
    private campaignService: ICampaignService,
    private tokenStorage: TokenStorage,
    private translate: TranslateService
  ) {
    this.preAuth = environment.preAuth;
  }

  public ngOnInit(): void {
    this.config.readAppConfig()
      .pipe(switchMap((conf) => this.translate.getTranslation(conf.defaultLang as string)))
      .subscribe(() => {
        this.translationLoaded = true;
      });
    this.authService.$failedAuth.subscribe(
      res => {
        if (res) {
          this.router.navigate(['/login']);
        }
      }
    );

    this.notificationService.$popup
      .subscribe(
        (data: IPopupConfig) => this.dialog.open(PopupComponent, { data }),
        (err) => console.error(err)
      );
    this.notificationService.$snack
      .subscribe(
        (msg: string) => this.snack.open(msg, 'x', { duration: 2000 }),
        (err) => console.error(err)
      );

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe((url: string) => {
        const urlsWithBack: string[] = [
          '/voucher-detail',
          '/redeem',
          '/tnc',
          '/contact-us',
          '/reward-detail',
          '/c'
        ];
        // if current url starts with any of the above segments, use arrow_backward
        this.leftIcon = urlsWithBack.some(test => url.startsWith(test)) ? 'arrow_backward' : '';
      });

    this.authService.isAuthorized().subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.fetchPopupCampaigns();
      }
    });
  }
  public onActivate(ref: any): void {
    this.showHeader = !(ref instanceof SignIn2Component);
    this.showToolbar = ref instanceof HomeComponent ||
      ref instanceof HistoryComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent;
    this.cd.detectChanges();
  }

  public leftClick(): void {
    if (this.leftIcon !== '') {
      this.location.back();
    }
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

  public dialogClosed(): void {
    this.campaignService.issueAll(this.firstComefirstServeCampaign.id).subscribe(
      () => {
        this.router.navigate([`/wallet`]);
      },
      (err) => {
        if (err.error && err.error.code === 4103) {
          // user has already been issued voucher
          this.router.navigate([`/home/vouchers`]);
        }
        console.error('Something fishy, we should not be here, without any reward or game. ERR print: ' + err.error.message);
      }
    );
  }
}
