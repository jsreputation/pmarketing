import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { InkListenerDirective } from '../../../components/ink/directives/ink-listener.directive';
import { IInkBarHost } from '../../../components/ink/models/ink-bar-host';
import { IGraphic } from '../../../models/graphick.model';

@Component({
  selector: 'cl-engagement-type',
  templateUrl: './engagement-type.component.html',
  styleUrls: ['./engagement-type.component.scss']
})
export class EngagementTypeComponent implements OnInit, IInkBarHost {
  @Output() selectType = new EventEmitter<IGraphic>();
  @Input() public graphicList: IGraphic[];

  @ViewChildren(InkListenerDirective) public inkListener: QueryList<InkListenerDirective>;
  public selectedType: IGraphic;
  constructor() { }

  ngOnInit() {
  }

  public setTypeEngagement(type: IGraphic): void {
     this.selectedType = type;
     this.selectType.emit(type);
  }

  public getInkListeners(): any {
    return this.inkListener;
  }

}
