import {Component, Input, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {ProgramMainImageComponent} from '../program-main-image/program-main-image.component';

@Component({
  selector: 'cl-loyalty-form-step-details',
  templateUrl: './loyalty-form-step-details.component.html',
  styleUrls: ['./loyalty-form-step-details.component.scss']
})
export class LoyaltyFormStepDetailsComponent {
  @Input() public group: FormGroup;
  @Input() public config: any;
  @ViewChild(ProgramMainImageComponent, { static: false}) public prgmImgComp: ProgramMainImageComponent;

}
