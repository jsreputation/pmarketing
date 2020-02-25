import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { InkListenerDirective } from '../../../components/ink/directives/ink-listener.directive';
import { IInkBarHost } from '../../../components/ink/models/ink-bar-host';
import { IGraphic } from '@cl-core/models/graphic.interface';

@Component({
  selector: 'cl-engagement-type',
  templateUrl: './engagement-type.component.html',
  styleUrls: ['./engagement-type.component.scss']
})
export class EngagementTypeComponent implements IInkBarHost {
  @Output() public selectType: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();
  @Input() public graphicList: IGraphic[];
  @Input() public selectedType: IGraphic;

  @ViewChildren(InkListenerDirective) public inkListener: QueryList<InkListenerDirective>;

  public setTypeEngagement(type: IGraphic): void {
    this.selectedType = type;
    this.selectType.emit(type);
  }

  public getInkListeners(): any {
    return this.inkListener;
  }

}
