import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsMenu } from '../../models/notifications-menu-enum';
import { FormArray, FormGroup } from '@angular/forms';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

@Component({
  selector: 'cl-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent {
  @Input() public activeItem: string;
  @Input() public form: FormGroup;
  @Input() public campaign: ICampaign;
  @Output() public selectMenu: EventEmitter<string> = new EventEmitter<string>();
  public menuType: typeof NotificationsMenu = NotificationsMenu;

  public clickOnMenu(menuItem: string): void {
    this.selectMenu.emit(menuItem);
  }

  public checkActiveMenu(menuItem: string): boolean {
    return this.activeItem && this.activeItem === menuItem;
  }

  public getCount(menuType: string): number {
    if (this.form && this.form.get(menuType)) {
      return (this.form.get(menuType) as FormArray).length;
    }
    return 0;
  }

  public showSlotItem(): boolean {
    return this.campaign
      && this.campaign.template
      && this.campaign.template.attributes_type === 'stamps';
  }
}
