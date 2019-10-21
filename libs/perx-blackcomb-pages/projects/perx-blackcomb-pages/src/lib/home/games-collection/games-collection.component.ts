import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign } from '@perx/core';

@Component({
  selector: 'perx-blackcomb-games-collection',
  templateUrl: './games-collection.component.html',
  styleUrls: ['./games-collection.component.scss']
})
export class GamesCollectionComponent {
  @Input('campaign')
  public campaign$: Observable<ICampaign[]>;
}
