import {Component, Input} from '@angular/core';
import {IReward} from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-catalog-reward-card',
  templateUrl: './catalog-reward-card.component.html',
  styleUrls: ['./catalog-reward-card.component.scss']
})
export class CatalogRewardCardComponent  {
  @Input() public reward: IReward;

}
