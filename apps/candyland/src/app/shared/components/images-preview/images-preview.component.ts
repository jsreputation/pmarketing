import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cl-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.scss']
})
export class ImagesPreviewComponent implements OnInit {
  @Input() img: any;
  @Input() basePath: string;
  @Input() selected: any;
  @Output() selectPreview = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  public handlerClick() {
    this.selectPreview.emit(this.img);
  }

}
