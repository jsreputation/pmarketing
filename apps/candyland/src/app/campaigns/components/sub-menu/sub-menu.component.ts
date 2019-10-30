import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsMenu } from '../../models/notifications-menu-enum';

@Component({
  selector: 'cl-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent {
  @Input() public subMenu: ISubMenu[];
  @Input() public activeItem: string;
  @Output() public selectMenu: string = new EventEmitter();
  public menuType: typeof NotificationsMenu = NotificationsMenu;

  public clickOnMenu(menuItem: string): void {
    this.selectMenu.emit(menuItem);
  }

  public checkActiveMenu(menuItem: string): boolean {
    return this.activeItem && this.activeItem === menuItem;
  }

  public getCount(menuType: string): number {
    console.log(menuType);
    return 1;
  }
}
