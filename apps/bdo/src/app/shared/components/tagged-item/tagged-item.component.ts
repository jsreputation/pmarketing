import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Deal } from '../../../models/deal.model';

@Component({
  selector: 'bdo-tagged-item',
  templateUrl: './tagged-item.component.html',
  styleUrls: ['./tagged-item.component.scss'],
})
export class TaggedItemComponent {
  @Input() deals: Deal[] = [];
  @Output() eventItemClick: EventEmitter<Deal> = new EventEmitter<Deal>();
  
  selectedItem(item:Deal) {
    this.eventItemClick.emit(item);
  }
  getUrlImage(image:string|[{url:string,type:string}]){
    return typeof(image) == "string"?image: image[0].hasOwnProperty("url")?image[0].url:""
  }
}
