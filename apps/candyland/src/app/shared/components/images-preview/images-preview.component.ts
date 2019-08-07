import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cl-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.scss']
})
export class ImagesPreviewComponent {
  @Input() public img: IGraphic;
  @Input() public selected: any;
  @Output() public selectPreview = new EventEmitter<IGraphic>();

  public handlerClick(): void {
    this.selectPreview.emit(this.img);
  }

}
