import { Component } from '@angular/core';
import { IGraphic } from '@perx/candyshop';

@Component({
  selector: 'app-candyshop-graphic-uploader',
  templateUrl: './candyshop-graphic-uploader.component.html',
  styleUrls: ['./candyshop-graphic-uploader.component.scss']
})
export class CandyshopGraphicUploaderComponent {
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

  public log(message: any): void {
    alert(message);
  }
}
