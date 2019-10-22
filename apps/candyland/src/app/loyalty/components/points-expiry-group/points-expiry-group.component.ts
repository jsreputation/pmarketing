import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-points-expiry-group',
  templateUrl: './points-expiry-group.component.html',
  styleUrls: ['./points-expiry-group.component.scss']
})
export class PointsExpiryGroupComponent {
  @Input() public group: FormGroup;

  public get pointsExpiry(): FormGroup {
    return this.group.get('pointsExpiry') as FormGroup;
  }
}
