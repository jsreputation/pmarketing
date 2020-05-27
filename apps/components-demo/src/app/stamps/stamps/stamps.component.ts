import { Component } from '@angular/core';
import { INavLink } from '../../navlink.model';

@Component({
  selector: 'app-stamps',
  templateUrl: './stamps.component.html',
  styleUrls: ['./stamps.component.scss']
})
export class StampsComponent {
  public navLinks: INavLink[] = [
    { path: 'list', label: 'List' },
    { path: 'card', label: 'Card' }
  ];
}
