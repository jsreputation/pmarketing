import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-points-info',
  templateUrl: './points-info.component.html',
  styleUrls: ['./points-info.component.scss']
})
export class PointsInfoComponent {
  @Input() public group: FormGroup;

  public get pointsName(): FormControl {
    return this.group.get('pointsName') as FormControl;
  }

}
