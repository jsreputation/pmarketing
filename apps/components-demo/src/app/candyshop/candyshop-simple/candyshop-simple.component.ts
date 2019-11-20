import { Component } from '@angular/core';
import { IGraphic } from '@perx/candyshop';

@Component({
  selector: 'app-candyshop-simple',
  templateUrl: './candyshop-simple.component.html',
  styleUrls: ['./candyshop-simple.component.scss']
})
export class CandyshopSimpleComponent {
  public imagesExample: IGraphic[] = [
    {
      id: 1,
      type: 'bg1',
      title: 'icon',
      img: 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/examples.png',
      fullImg: 'global/assets/background/full_bg_7.jpg',
      format: '.png',
      active: false
    },
    {
      id: 2,
      type: 'bg2',
      title: 'icon',
      img: 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/examples.png',
      fullImg: 'global/assets/background/full_bg_8.jpg',
      format: '.png',
      active: false
    },
    {
      id: 3,
      type: 'bg3',
      title: 'icon',
      img: 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/examples.png',
      fullImg: 'global/assets/background/full_bg_9.jpg',
      format: '.png',
      active: false
    }
  ];

  public statistics: { type: string, value: number }[] = [
    {type: 'first', value: 200},
    {type: 'second', value: 500},
    {type: 'third', value: 34534},
  ];

  public shortcodes: any[] = [
    {title: 'Campaign Url', value: '[campaignUrl]'},
    {title: 'User ID', value: '[userId]'},
    {title: 'First name', value: '[userFirstName]'},
    {title: 'Last name', value: '[userLastName]'},
    {title: 'Salutation', value: '[salutation]'},
  ];

  public log(message: any): void {
    alert(message);
  }

}
