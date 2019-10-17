import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-program-main-image',
  templateUrl: './program-main-image.component.html',
  styleUrls: ['./program-main-image.component.scss']
})
export class ProgramMainImageComponent {
  @Input() public group: FormGroup;

  public get mainImage(): AbstractControl {
    return this.group.get('mainImage');
  }
}
