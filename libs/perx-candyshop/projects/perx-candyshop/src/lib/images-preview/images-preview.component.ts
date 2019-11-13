import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGraphic } from '../../models/graphic.interface';

@Component({
  selector: 'cs-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.scss']
})
export class ImagesPreviewComponent {
  @Input() public img: IGraphic;
  @Input() public selected: IGraphic;
  @Output() public selectPreview: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();

  public handlerClick(): void {
    this.selectPreview.emit(this.img);
  }

}
