import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cl-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.scss']
})
export class TypeItemComponent {
  @Input() public typeItem: IGraphic;
  @Input() public checkedType: IGraphic;

  @Output() public selectType: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();

  public onSelectType(): void {
    this.selectType.emit(this.typeItem);
  }
}
