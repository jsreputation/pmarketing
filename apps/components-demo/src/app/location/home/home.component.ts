import { Component } from '@angular/core';
import { INavLink } from 'src/app/navlink.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public navLinks: INavLink[] = [
    { path: 'map', label: 'Map' },
    { path: 'list', label: 'List' }
  ];
}
