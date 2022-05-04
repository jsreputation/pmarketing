import { Component, Input} from '@angular/core';
import { IListItemModel } from '../../models/list-item.model';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../utilities/fade-animations';
import { Router } from '@angular/router';
@Component({
  selector: 'bdo-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn())
  ],
})
export class SearchResultComponent {
  @Input() result: IListItemModel[] = [];
  @Input() isLoaded = false;
  public ghostRewards= new Array(1);
  catalogImage = {
    default: "assets/images/catalog-default.svg",
    selected: "assets/images/catalog-selected.svg"
  };
  listImage = {
    default: "assets/images/view_all_list-default.svg",
    selected: "assets/images/view_all_list-selected.svg"
  };

  constructor(private router: Router) {}
  selectedItem(item: IListItemModel) {
    this.router.navigate([ `${item.documentType === 'reward' ? 'deal-welcome' : 'treat-welcome' }/${item.id}`])
  }
}
