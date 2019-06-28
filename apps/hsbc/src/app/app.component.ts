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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hsbc';
  showHeader: boolean;
  iconToShow = 'home';
  currentPage: string;
  failedAuthSubscriber: Subscription;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private location: Location,
    private notificationService: NotificationService,
    private dialog: MatDialog,
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

    this.iconToShow =
      ref instanceof PuzzlesComponent ? 'home' :
        ref instanceof PuzzlesComponent ? 'back' :
          ref instanceof RedemptionComponent ? 'back' :
            ref instanceof VoucherComponent ? 'back' : '';
  }
}
