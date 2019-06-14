import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shake-the-tree';
  showBack = false;
  defaultBackLocation = '/vouchers';

  constructor(
    private location: Location
  ) { }

  goBack() {
    this.location.back();
  }

  onActivate(ref: any) {
    if (!ref.constructor) {
      return;
    }

    switch (ref.constructor.name) {
      case 'TncComponent': {
        this.showBack = true;
        break;
      }
      case 'ContactUsComponent': {
        this.showBack = true;
        break;
      }
      case 'VoucherComponent': {
        this.showBack = true;
        break;
      }
      default: {
        this.showBack = false;
        break;
      }
    }
  }

  replaceUrl(): boolean {
    const path = this.location.path();
    if (path === '/tnc' || path === '/contact-us') {
      return true;
    }

    return false;
  }
}
