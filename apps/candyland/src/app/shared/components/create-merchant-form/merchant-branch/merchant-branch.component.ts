import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-merchant-branch',
  templateUrl: './merchant-branch.component.html',
  styleUrls: ['./merchant-branch.component.scss']
})
export class MerchantBranchComponent {
  @Input() public group: FormGroup;
  @Input() public index: number;
  @Output() public removeGroup: EventEmitter<number> = new EventEmitter<number>();

  public get name(): AbstractControl {
    return this.group.get('name');
  }

  public get address(): AbstractControl {
    return this.group.get('address');
  }

  public get phone(): AbstractControl {
    return this.group.get('phone');
  }

  public remove(): void {
    this.removeGroup.emit(this.index);
  }
}
