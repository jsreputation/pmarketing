import { Component } from '@angular/core';
import { IMenu } from '@perxtech/candyshop';

@Component({
  selector: 'app-candyshop-menu',
  templateUrl: './candyshop-menu.component.html',
  styleUrls: ['./candyshop-menu.component.scss']
})
export class CandyshopMenuComponent {
  public menus: IMenu[] = [
    {
      name: 'First Menu Item',
      icon: 'dashboard',
      link: '',
      open: false,
    }, {
      name: 'Second Menu Item',
      icon: 'rewards',
      link: '',
      open: false,
    },
    {
      name: 'Third Menu Item',
      link: '',
      icon: 'engagement',
      open: false,
    }
  ];

}
