import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IMenu } from '../menu.interface';

@Component({
  selector: 'cs-sidenave-menu-item',
  templateUrl: './sidenav-menu-item.component.html',
  styleUrls: ['./sidenav-menu-item.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: 'auto',
      })),
      state('closed', style({
        width: '0',
      })),
      transition('open <=> closed', [
        animate('.4s')
      ]),
      transition('open => *', [
        animate('.4s')
      ])
    ]),
  ]
})
export class SidenavMenuItemComponent {
  @Input() public menu: IMenu;
  @Input() public isOpen: boolean;
  @Input() public secondaryMenu: boolean = false;

  public openLink(): void {
    this.menu.open = !this.menu.open;
  }

  public checkForChildMenu(): boolean {
    return !!(this.menu && this.menu.sub);
  }

}
