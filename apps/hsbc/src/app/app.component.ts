import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService, PopupComponent } from '@perx/core/dist/perx-core';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { MatDialog } from '@angular/material';

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
  ) { }

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
    if (!ref.constructor) {
      return;
    }
    this.currentPage = ref.constructor.name;
    switch (ref.constructor.name) {
      case 'LoginComponent':
        this.currentPage = 'Login';
        this.showHeader = false;
        this.iconToShow = '';
        break;
      case 'CongratsComponent':
        this.currentPage = '';
        this.showHeader = false;
        this.iconToShow = '';
        break;
      case 'PuzzleComponent':
        this.currentPage = 'Puzzle';
        this.showHeader = true;
        this.iconToShow = 'home';
        break;
      case 'PuzzlesComponent':
        this.currentPage = 'My Puzzles';
        this.showHeader = true;
        this.iconToShow = 'back';
        break;
      case 'RedemptionComponent':
        this.currentPage = 'eGift Redeem';
        this.showHeader = true;
        this.iconToShow = 'back';
        break;
      case 'VoucherComponent':
        this.currentPage = 'eGift Code';
        this.showHeader = true;
        this.iconToShow = 'back';
        break;
      case 'HomeComponent':
        this.currentPage = 'Home';
        this.showHeader = true;
        this.iconToShow = '';
        break;
      default: {
        this.showHeader = false;
        this.iconToShow = '';
        break;
      }
    }
  }
}
