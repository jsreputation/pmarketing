import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-multiple-choice-graphic',
  templateUrl: './multiple-choice-graphic.component.html',
  styleUrls: ['./multiple-choice-graphic.component.scss']
})
export class MultipleChoiceGraphicComponent implements OnInit {
  @Input() public data: any;

  public ngOnInit(): void {
    console.log('MultipleChoiceGraphicComponent', this.data);
  }

}
