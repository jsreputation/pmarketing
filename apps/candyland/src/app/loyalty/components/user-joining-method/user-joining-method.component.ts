import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-user-joining-method',
  templateUrl: './user-joining-method.component.html',
  styleUrls: ['./user-joining-method.component.scss']
})
export class UserJoiningMethodComponent implements OnInit {
  @Input() public group: FormGroup;

  public get joiningMethodGroup(): AbstractControl {
    return this.group.get('joiningMethod');
  }

  public get transactionAmount(): AbstractControl {
    console.log(this.group.get('joiningMethod.transactionAmount').value);
    return this.group.get('joiningMethod.transactionAmount');
  }

  public ngOnInit(): void {
  }

}
