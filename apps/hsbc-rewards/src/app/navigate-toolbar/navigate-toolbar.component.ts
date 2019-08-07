import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface IRoute {
  activated: boolean;
  title: string;
  img: string;
  route: string;
}

@Component({
  selector: 'app-navigate-toolbar',
  templateUrl: './navigate-toolbar.component.html',
  styleUrls: ['./navigate-toolbar.component.scss']
})
export class NavigateToolbarComponent implements OnInit {
  public navigatePanel: IRoute[] = [{
    activated: false,
    title: 'Home',
    img: 'assets/img/home',
    route: '/home'
  }, {
    activated: false,
    title: 'My Rewards',
    img: 'assets/img/rewards',
    route: '/rewards'
  }, {
    activated: false,
    title: 'Account',
    img: 'assets/img/account',
    route: '/account'
  }];

  constructor(
    private router: Router
  ) { }

  public ngOnInit(): void {
    const url = this.router.url;
    this.navigatePanel.forEach((nav) => nav.route === url ? nav.activated = true : nav.activated = false);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const nextUrl = event.url;
        this.navigatePanel.forEach((nav) => nav.route === nextUrl ? nav.activated = true : nav.activated = false);
      }
    });
  }

}
