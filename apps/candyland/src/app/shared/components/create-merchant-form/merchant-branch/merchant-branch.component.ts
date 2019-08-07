import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-merchant-branch',
  templateUrl: './merchant-branch.component.html',
  styleUrls: ['./merchant-branch.component.scss']
})
export class MerchantBranchComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public index: number;
  @Output() public removeGroup = new EventEmitter<number>();
  constructor() { }

  public ngOnInit() {
  }

  public get name(): AbstractControl {
    return this.group.get('name');
  }

  public get address(): AbstractControl {
    return this.group.get('address');
  }

  public get contactNumber(): AbstractControl {
    return this.group.get('contactNumber');
  }

  public remove(): void {
    this.removeGroup.emit(this.index);
  }
}
