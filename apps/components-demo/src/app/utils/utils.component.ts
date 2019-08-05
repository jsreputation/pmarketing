import { Component } from '@angular/core';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent {
  public navLinks = [
    { path: 'pin-input', label: 'Pin Input' },
    { path: 'popup', label: 'Popup' }
  ];
}
