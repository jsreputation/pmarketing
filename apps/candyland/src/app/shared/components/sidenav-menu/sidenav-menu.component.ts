import { Component, Input } from '@angular/core';
import { menus } from './menu-elements';
@Component({
  selector: 'cl-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent {
  @Input() public isOpen: boolean;
  public menus = menus;

}
