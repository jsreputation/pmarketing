import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cl-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.scss']
})
export class ImagesPreviewComponent implements OnInit {
  @Input() public img: IGraphic;
  @Input() public selected: any;
  @Output() public selectPreview = new EventEmitter<IGraphic>();

  public handlerClick() {
    this.selectPreview.emit(this.img);
  }

}
