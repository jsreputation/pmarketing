import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign } from '@perx/core';

@Component({
  selector: 'app-games-collection',
  templateUrl: './games-collection.component.html',
  styleUrls: ['./games-collection.component.scss']
})
export class GamesCollectionComponent implements OnInit {
  @Input('campaing') campaing$: Observable<ICampaign[]>;
  campaign = {
    name: 'hola',
    description: 'holla'
  }
  constructor() { }

  ngOnInit() {
    
  }

}
