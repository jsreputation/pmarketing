import { Component, Input } from '@angular/core';
import { IMenu } from './menu.interface';

@Component({
  selector: 'cs-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent {
  @Input() public isOpen: boolean;
  @Input() public menus: IMenu[];

}
