import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { IReward } from '@perxtech/core';

@Component({
  selector: 'bdo-tagged-item',
  templateUrl: './tagged-item.component.html',
  styleUrls: ['./tagged-item.component.scss'],
})
export class TaggedItemComponent {
  @Input() deals: IReward[] = [];
  @Output() eventItemClick: EventEmitter<IReward> = new EventEmitter<IReward>();
  urlImageDefault  = "assets/images/light-gray-color-default-image.png"
  selectedItem(item:IReward) {
    this.eventItemClick.emit(item);
  }
  
}
