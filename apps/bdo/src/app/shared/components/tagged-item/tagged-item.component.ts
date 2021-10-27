import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { IReward } from '@perxtech/core';
import { ScrollToItemDirective } from '../../directives/scroll-to-item.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'bdo-tagged-item',
  templateUrl: './tagged-item.component.html',
  styleUrls: ['./tagged-item.component.scss'],
})
export class TaggedItemComponent extends ScrollToItemDirective{
  @Input() deals: IReward[] = [];
  @Output() eventItemClick: EventEmitter<IReward> = new EventEmitter<IReward>();
  @ViewChild("taggetContainer") public taggetContainer: ElementRef;
  urlImageDefault  = "assets/images/light-gray-color-default-image.png"

  constructor(private router: Router) {
    super();
  }
  selectedItem(item:IReward) {
    this.router.navigate(['/deal-welcome', item.id]);
    this.eventItemClick.emit(item);
  }
  
  public goToItemIndex(index:number) {
    super.goToItem(index, this.taggetContainer);
  }
}
