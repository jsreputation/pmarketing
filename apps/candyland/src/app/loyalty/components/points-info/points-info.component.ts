import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-points-info',
  templateUrl: './points-info.component.html',
  styleUrls: ['./points-info.component.scss']
})
export class PointsInfoComponent implements OnInit {
  @Input() public group: FormGroup;
  // constructor() { }

  public get pointsName(): AbstractControl {
    return this.group.get('pointsName');
  }
  ngOnInit() {
  }

}
