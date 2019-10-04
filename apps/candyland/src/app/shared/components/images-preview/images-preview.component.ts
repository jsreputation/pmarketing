import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiConfig } from '@cl-core/api-config';

@Component({
  selector: 'cl-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.scss']
})
export class ImagesPreviewComponent {
  @Input() public img: IGraphic;
  @Input() public selected: any;
  @Output() public selectPreview: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();
  public apiCdnPath: string = ApiConfig.apiCdnPath;

  public handlerClick(): void {
    this.selectPreview.emit(this.img);
  }

}
