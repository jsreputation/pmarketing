import { Component } from '@angular/core';
import { INavLink } from '../navlink.model';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent {
  public navLinks: INavLink[] = [
    { path: 'pin-input', label: 'Pin Input' },
    { path: 'popup', label: 'Popup' }
  ];
}
