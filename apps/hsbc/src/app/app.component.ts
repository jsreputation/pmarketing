import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { AuthenticationService, PopupComponent, NotificationService, ConfigService, IConfig } from '@perx/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatSidenav } from '@angular/material';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { VoucherComponent } from './voucher/voucher.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SoundService } from './sound/sound.service';
import { FaqComponent } from './faq/faq.component';
import { TncComponent } from './tnc/tnc.component';
import { environment } from '../environments/environment';
import { AccountComponent } from './account/account.component';
import { WalletComponent } from './wallet/wallet.component';
import { Title } from '@angular/platform-browser';

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
  private soundToggleSubscription: Subscription;
  @ViewChild('drawer', { static: false }) public drawer: MatSidenav;

  public onLeftActionClick: () => void = () => { };
  public onRightActionClick: () => void = () => { };

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private location: Location,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private soundService: SoundService,
    private titleService: Title,
    private configService: ConfigService,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  public ngOnInit(): void {
    const bases = this.document.getElementsByTagName('base');

    if (bases.length > 0) {
      bases[0].setAttribute('href', environment.baseHref);

    }

    this.authService.$failedAuth.subscribe(
      (didFailAuth) => {
        if (didFailAuth) {
          this.router.navigateByUrl('login');
        }
      }
    );

    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });

    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
        let title = '';
        const sourceType = config.sourceType as string;
        if (sourceType === 'hsbc-xmas') {
          title = 'HSBC Xmas';
        } else {
          title = 'HSBC Collect 2.0';
        }
        this.titleService.setTitle(title);
      }
    );
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

    this.drawer.close();

    this.showHeader =
      ref instanceof PuzzleComponent ||
      ref instanceof PuzzlesComponent ||
      ref instanceof RedemptionComponent ||
      ref instanceof VoucherComponent ||
      ref instanceof HomeComponent ||
      ref instanceof FaqComponent ||
      ref instanceof TncComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent;

    this.currentPage =
      ref instanceof LoginComponent ? 'Login' :
        ref instanceof PuzzleComponent ? 'Puzzle' :
          ref instanceof PuzzlesComponent ? 'My Puzzles' :
            ref instanceof RedemptionComponent ? 'eGift Redeem' :
              ref instanceof VoucherComponent ? 'Reward' :
                ref instanceof HomeComponent ? 'Home' :
                  ref instanceof TncComponent ? 'Terms and Conditions' :
                    ref instanceof FaqComponent ? 'FAQ' :
                      ref instanceof AccountComponent ? 'Account' :
                        ref instanceof WalletComponent ? 'Wallet' : '';

    this.leftIconToShow =
      ref instanceof PuzzlesComponent ? 'home' :
        ref instanceof PuzzleComponent ? 'arrow_back_ios' :
          ref instanceof RedemptionComponent ? 'arrow_back_ios' :
            ref instanceof VoucherComponent ? 'arrow_back_ios' :
              ref instanceof FaqComponent ? 'arrow_back_ios' :
                ref instanceof TncComponent ? 'arrow_back_ios' :
                  ref instanceof AccountComponent ? 'arrow_back_ios' :
                    ref instanceof WalletComponent ? 'arrow_back_ios' : '';

    this.onLeftActionClick = ref instanceof PuzzlesComponent ? this.goHome :
      ref instanceof PuzzleComponent ? this.goHome :
        ref instanceof RedemptionComponent ? this.goBack :
          ref instanceof VoucherComponent ? this.goWallet :
            ref instanceof FaqComponent ? this.goBack :
              ref instanceof TncComponent ? this.goBack :
                ref instanceof AccountComponent ? this.goBack :
                  ref instanceof WalletComponent ? this.goBack : dummy;

    if (ref instanceof PuzzleComponent) {
      this.soundToggleSubscription = this.soundService.onToggle.subscribe(() => {
        this.rightIconToShow = this.soundService.icon;
      });
    }

    this.rightIconToShow = ref instanceof PuzzleComponent ? this.soundService.icon :
      ref instanceof HomeComponent ? 'account_circle' : '';

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
