import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'digi';

  preAuth: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.preAuth = environment.preAuth;
  }

  ngOnInit(): void {
    if (this.preAuth) {
      if (isPlatformBrowser(this.platformId)) {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          const param = location.search;
          (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
        }
      }
    }
  }
}
