import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    route: '/wallet'
  }, {
    activated: false,
    title: 'Account',
    img: 'assets/img/account',
    route: '/account'
  }];

  constructor(
    private router: Router,
  ) { }

  public ngOnInit(): void {
    const url = `/${this.router.url.split('/')[1]}`;
    this.navigatePanel.forEach((nav) => nav.route === url ? nav.activated = true : nav.activated = false);
  }

}
