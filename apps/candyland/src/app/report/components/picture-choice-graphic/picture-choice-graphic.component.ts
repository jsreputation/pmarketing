import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-picture-choice-graphic',
  templateUrl: './picture-choice-graphic.component.html',
  styleUrls: ['./picture-choice-graphic.component.scss']
})
export class PictureChoiceGraphicComponent implements OnInit {
  @Input() public data: any;

  public ngOnInit(): void {
    console.log('PictureChoiceGraphicComponent', this.data);
  }

}
