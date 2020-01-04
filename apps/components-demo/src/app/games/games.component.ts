import { Component } from '@angular/core';
import { INavLink } from '../navlink.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  public navLinks: INavLink[] = [
    { path: 'shake', label: 'Shake' },
    { path: 'tap', label: 'Tap' },
    { path: 'scratch', label: 'Scratch' },
    { path: 'spin', label: 'Spin' },
    { path: 'snake', label: 'Snake'},
    { path: 'sweep', label: 'Sweep'}
  ];
}
