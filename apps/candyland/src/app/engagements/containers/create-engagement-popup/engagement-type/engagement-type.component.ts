import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { EngagementType } from './engagement-types';
import { IEngagementType } from './models/engagement-type.model';
import { InkListenerDirective } from '@cl-shared/components/ink/directives/ink-listener.directive';
import { IInkBarHost } from '@cl-shared/components/ink/models/ink-bar-host';

@Component({
  selector: 'cl-engagement-type',
  templateUrl: './engagement-type.component.html',
  styleUrls: ['./engagement-type.component.scss']
})
export class EngagementTypeComponent implements OnInit, IInkBarHost {
  @Output() onSelectedType = new EventEmitter<IEngagementType>();

  @ViewChildren(InkListenerDirective) public _inkListener: QueryList<InkListenerDirective>;
  public selectedType: IEngagementType;
  public engagementType: IEngagementType[] = EngagementType;
  constructor() { }

  ngOnInit() {
  }

  public setTypeEngagement(type: IEngagementType): void {
     this.selectedType = type;
     this.onSelectedType.emit(type);
  }

  public getInkListeners(): any {
    return this._inkListener;
  }

}
