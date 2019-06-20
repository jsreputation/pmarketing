import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hsbc';
  showHeader: boolean;
  iconToShow = 'home';
  currentPage: string;
  constructor(private router: Router, private location: Location) { }

  goHome() {
    this.router.navigate(['/']);
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
        this.iconToShow = 'back';
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
        this.showHeader = true;
        this.iconToShow = 'home';
        break;
      default: {
        this.showHeader = false;
        this.iconToShow = '';
        break;
      }
    }
  }
}
