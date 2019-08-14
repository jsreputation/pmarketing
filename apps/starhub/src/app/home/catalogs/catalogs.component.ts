import { Component, Output, EventEmitter } from '@angular/core';

export interface Catalog {
  image: string;
  title: string;
  description: string;
  nbRewards: number;
}
@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent {
  public catalogs: Catalog[];

  @Output()
  public tapped: EventEmitter<Catalog> = new EventEmitter<Catalog>();

  constructor() {
    this.catalogs = [
      {
        image: 'https://picsum.photos/300/200?random=3',
        title: 'Ramadan Exclusive',
        description: 'Here are deals for ramadan',
        nbRewards: 5
      },
      {
        image: 'https://picsum.photos/300/200?random=4',
        title: 'Christmas Specials',
        description: 'Santa-claus latest and greatest',
        nbRewards: 25
      }
    ];
  }

  public selected(catalog: Catalog): void {
    this.tapped.emit(catalog);
  }
}
