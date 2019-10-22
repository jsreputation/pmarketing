import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-points-info',
  templateUrl: './points-info.component.html',
  styleUrls: ['./points-info.component.scss']
})
export class PointsInfoComponent {
  @Input() public group: FormGroup;

  public get pointsName(): AbstractControl {
    return this.group.get('pointsName');
  }

}
