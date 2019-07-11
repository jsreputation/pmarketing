import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cl-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.scss']
})
export class TypeItemComponent implements OnInit {
  @Input() public typeItem: IGraphic;
  @Input() public checkedType: IGraphic;

  @Output() public selectType = new EventEmitter<IGraphic>();

  constructor() { }

  ngOnInit() {
  }

  public onSelectType(): void {
    this.selectType.emit(this.typeItem);
  }

}
