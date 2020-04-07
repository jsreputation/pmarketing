import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { PopupComponent, NotificationService, ConfigService, IConfig, ThemesService, ITheme } from '@perxtech/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatSidenav } from '@angular/material';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { VoucherComponent } from './voucher/voucher.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SoundService } from './sound/sound.service';
import { environment } from '../environments/environment';
import { AccountComponent } from './account/account.component';
import { WalletComponent } from './wallet/wallet.component';
import { Title } from '@angular/platform-browser';
import { ContentComponent } from './content/content.component';
import { flatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'HSBC Win A Treat';
  public showHeader: boolean;
  public leftIconToShow: string = '';
  public rightIconToShow: string = '';
  public currentPage: string;
  public failedAuthSubscriber: Subscription;
  private soundToggleSubscription: Subscription | undefined;
  private sourceType: string;
  @ViewChild('drawer', { static: false }) public drawer: MatSidenav;

  public onLeftActionClick: () => void = () => { };
  public onRightActionClick: () => void = () => { };

  constructor(
    private router: Router,
    private location: Location,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private soundService: SoundService,
    private titleService: Title,
    private configService: ConfigService,
    private themesService: ThemesService,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  public ngOnInit(): void {
    const bases = this.document.getElementsByTagName('base');

    if (bases.length > 0) {
      bases[0].setAttribute('href', environment.baseHref);

    }

    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });
  }

  private goHome(): void {
    this.router.navigate(['/home']);
  }

  private goWallet(): void {
    this.router.navigate(['/wallet']);
  }

  private goBack(): void {
    this.location.back();
  }

  public onActivate(ref: any): void {
    const dummy = () => { };

    this.configService.readAppConfig<ITheme>()
      .pipe(
        tap((config: IConfig<ITheme>) => {
          this.sourceType = config.sourceType as string;
          this.rightIconToShow = ref instanceof PuzzleComponent ? this.soundService.icon :
            ref instanceof HomeComponent && this.sourceType === 'hsbc-collect2' ? 'account_circle' : '';
        }),
        flatMap((config: IConfig<ITheme>) => this.themesService.getThemeSetting(config))
      ).subscribe((res: ITheme) => {
        const title: string = res.properties['--title'] ? res.properties['--title'] : 'HSBC Collect 2.0';
        this.titleService.setTitle(title);
      });

    this.drawer.close();

    this.showHeader =
      ref instanceof PuzzleComponent ||
      ref instanceof PuzzlesComponent ||
      ref instanceof RedemptionComponent ||
      ref instanceof VoucherComponent ||
      ref instanceof HomeComponent ||
      ref instanceof ContentComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent;

    this.currentPage =
      ref instanceof LoginComponent ? 'Login' :
        ref instanceof PuzzleComponent ? 'Puzzle' :
          ref instanceof PuzzlesComponent ? 'My Puzzles' :
            ref instanceof RedemptionComponent ? 'eGift Redeem' :
              ref instanceof VoucherComponent ? 'Reward' :
                ref instanceof HomeComponent ? 'Home' :
                  ref instanceof ContentComponent ? 'Content' :
                    ref instanceof AccountComponent ? 'Account' :
                      ref instanceof WalletComponent ? 'Wallet' : '';

    this.leftIconToShow =
      ref instanceof PuzzlesComponent ? 'home' :
        ref instanceof PuzzleComponent ? 'arrow_back_ios' :
          ref instanceof RedemptionComponent ? 'arrow_back_ios' :
            ref instanceof VoucherComponent ? 'arrow_back_ios' :
              ref instanceof ContentComponent ? 'arrow_back_ios' :
                // ref instanceof AccountComponent ? 'arrow_back_ios' :
                // ref instanceof WalletComponent ? 'arrow_back_ios' :
                '';

    this.onLeftActionClick = ref instanceof PuzzlesComponent ? this.goHome :
      ref instanceof PuzzleComponent ? this.goHome :
        ref instanceof RedemptionComponent ? this.goBack :
          ref instanceof VoucherComponent ? this.goWallet :
            ref instanceof ContentComponent ? this.goBack :
              ref instanceof AccountComponent ? this.goBack :
                ref instanceof WalletComponent ? this.goBack : dummy;

    if (ref instanceof PuzzleComponent) {
      this.soundToggleSubscription = this.soundService.onToggle.subscribe(() => {
        this.rightIconToShow = this.soundService.icon;
      });
    }

    const soundToggle = () => {
      this.soundService.toggle();
      this.rightIconToShow = this.soundService.icon;
    };

    const sideNavToggle = () => this.drawer.toggle();
    this.onRightActionClick = ref instanceof PuzzleComponent ? soundToggle :
      ref instanceof HomeComponent ? sideNavToggle : dummy;
  }

  public onDeactivate(ref: any): void {
    if (ref instanceof PuzzleComponent && this.soundToggleSubscription) {
      this.soundToggleSubscription.unsubscribe();
      this.soundToggleSubscription = undefined;
    }
  }
}
