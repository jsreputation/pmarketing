import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public navLinks = [
    { path: 'rewards', label: 'Rewards' },
    { path: 'utils', label: 'Utils' },
    { path: 'charts', label: 'Charts' },
    { path: 'games', label: 'Games' },
    { path: 'stamps', label: 'Stamps' },
    { path: 'login', label: 'Login' }
  ];
}
