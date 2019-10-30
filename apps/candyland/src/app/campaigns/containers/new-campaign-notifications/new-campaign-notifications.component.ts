import { Component } from '@angular/core';
import { NotificationsMenu } from '../../models/notifications-menu-enum';

@Component({
  selector: 'cl-new-campaign-notifications',
  templateUrl: './new-campaign-notifications.component.html',
  styleUrls: ['./new-campaign-notifications.component.scss']
})
export class NewCampaignNotificationsComponent {
  public subMenu: ISubMenu[] = [
    {
      titleGroup: 'Launch',
      groupMenu: [
        {
          name: 'On Campaign Launch',
          count: 2,
          active: false
        }
      ]
    },
    {
      titleGroup: 'Reminders',
      groupMenu: [
        {
          name: 'Campaign not completed',
          count: 1,
          active: false
        },
        {
          name: 'Before Campaign ends',
          count: 2,
          active: false
        },
        {
          name: 'Before Reward expires',
          count: 2,
          active: false
        },
        {
          name: 'No. of Stamps to Next Reward',
          count: 2,
          active: false
        }
      ]
    },
    {
      titleGroup: 'Thank You',
      groupMenu: [
        {
          name: 'Earned a Stamp',
          count: 2,
          active: false
        },
        {
          name: 'Earned a Reward',
          count: 2,
          active: false
        }
      ]
    }
  ];
  public selectedMenu: typeof NotificationsMenu = NotificationsMenu.onCampaignLaunch;

  public selectMenu(currentItem: string): void {
    this.selectedMenu = currentItem;
  }

}
