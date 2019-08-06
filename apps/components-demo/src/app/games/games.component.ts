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
    { path: 'tap', label: 'Tap' }
  ];
}
