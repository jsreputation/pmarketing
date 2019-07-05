import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEngagementType } from '../models/engagement-type.model';

@Component({
  selector: 'cl-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.scss']
})
export class TypeItemComponent implements OnInit {
  @Input() public typeItem: IEngagementType;
  @Input() public checkedType: IEngagementType;

  @Output() public selectType = new EventEmitter<IEngagementType>();

  public basePath = '/assets/images/engagement-type/';
  constructor() { }

  ngOnInit() {
  }

  public onSelectType(): void {
    this.selectType.emit(this.typeItem);
  }

}
