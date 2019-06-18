import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hsbc';
  showHeader: boolean;
  currentPage: string;
  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/']);
  }

  onActivate(ref: any) {
    if (!ref.constructor) {
      return;
    }
    this.currentPage = ref.constructor.name;
    switch (ref.constructor.name) {
      case 'LoginComponent':
      case 'CongratsComponent':
        this.showHeader = false;
        break;
      default: {
        this.showHeader = true;
        break;
      }
    }
  }
}
