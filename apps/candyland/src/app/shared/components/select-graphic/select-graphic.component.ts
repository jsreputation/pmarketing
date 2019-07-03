import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGraphic } from '@cl-shared/models/graphick.model';

@Component({
  selector: 'cl-select-graphic',
  templateUrl: './select-graphic.component.html',
  styleUrls: ['./select-graphic.component.scss']
})
export class SelectGraphicComponent implements OnInit {
  @Input() public graphicList: IGraphic[];
  @Input() public basePath: string;
  @Output() private selectGraphic = new EventEmitter<IGraphic>();
  public selectedGraphic: IGraphic;
  constructor() { }

  ngOnInit() {
  }

  public setSelectedGraphic(graphic: IGraphic): void {
    this.selectedGraphic = graphic;
    this.selectGraphic.emit(graphic);
  }

}
