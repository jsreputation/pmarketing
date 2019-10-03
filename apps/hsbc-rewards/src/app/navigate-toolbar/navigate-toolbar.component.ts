import { Component } from '@angular/core';

interface IRoute {
  title: string;
  img: string;
  route: string;
}

@Component({
  selector: 'app-navigate-toolbar',
  templateUrl: './navigate-toolbar.component.html',
  styleUrls: ['./navigate-toolbar.component.scss']
})

export class NavigateToolbarComponent {
  public navigatePanel: IRoute[] = [{
    title: 'Home',
    img: 'assets/img/home',
    route: '/home'
  }, {
    title: 'My Rewards',
    img: 'assets/img/rewards',
    route: '/wallet'
  }, {
    title: 'Account',
    img: 'assets/img/account',
    route: '/account'
  }];
}
