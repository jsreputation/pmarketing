import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService, PopupComponent } from '@perx/core/dist/perx-core';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { MatDialog } from '@angular/material';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { VoucherComponent } from './voucher/voucher.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SoundService } from './sound/sound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hsbc';
  showHeader: boolean;
  leftIconToShow = '';
  rightIconToShow = '';
  currentPage: string;
  failedAuthSubscriber: Subscription;
  private soundToggleSubscription: Subscription;

  onLeftActionClick: () => void = () => {};
  onRightActionClick: () => void = () => {};

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private location: Location,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private soundService: SoundService
  ) {
  }

  ngOnInit(): void {
    this.failedAuthSubscriber = this.authService.failedAuthObservable.subscribe(
      (didFailAuth) => {
        if (didFailAuth) {
          this.router.navigateByUrl('login');
        }
      }
    );
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goBack() {
    this.location.back();
  }

  onActivate(ref: any) {
    this.showHeader =
      ref instanceof PuzzleComponent ||
      ref instanceof PuzzlesComponent ||
      ref instanceof RedemptionComponent ||
      ref instanceof VoucherComponent ||
      ref instanceof HomeComponent;

    this.currentPage =
      ref instanceof LoginComponent ? 'Login' :
        ref instanceof PuzzleComponent ? 'Puzzle' :
          ref instanceof PuzzlesComponent ? 'My Puzzles' :
            ref instanceof RedemptionComponent ? 'eGift Redeem' :
              ref instanceof VoucherComponent ? 'eGiftCode' :
                ref instanceof HomeComponent ? 'Home' : '';

    this.leftIconToShow =
      ref instanceof PuzzlesComponent ? 'home' :
        ref instanceof PuzzleComponent ? 'arrow_back_ios' :
          ref instanceof RedemptionComponent ? 'arrow_back_ios' :
            ref instanceof VoucherComponent ? 'arrow_back_ios' : '';

    this.onLeftActionClick = ref instanceof PuzzlesComponent ? this.goHome :
      ref instanceof PuzzleComponent ? this.goBack :
      ref instanceof RedemptionComponent ? this.goBack :
      ref instanceof VoucherComponent ? this.goBack : () => {};

    if (ref instanceof PuzzleComponent) {
      this.soundToggleSubscription = this.soundService.onToggle.subscribe(() => {
        this.rightIconToShow = this.soundService.icon;
      });
    }

    this.rightIconToShow = ref instanceof PuzzleComponent ? this.soundService.icon : '';
    this.onRightActionClick = ref instanceof PuzzleComponent ? () => {
      this.soundService.toggle();
      this.rightIconToShow = this.soundService.icon;
    } : () => {};
  }

  onDeactivate(ref: any) {
    if (ref instanceof PuzzleComponent) {
      if (this.soundToggleSubscription) {
        this.soundToggleSubscription.unsubscribe();
        this.soundToggleSubscription = undefined;
      }
    }
  }
}
