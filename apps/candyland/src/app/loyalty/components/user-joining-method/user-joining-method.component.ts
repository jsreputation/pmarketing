import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-user-joining-method',
  templateUrl: './user-joining-method.component.html',
  styleUrls: ['./user-joining-method.component.scss']
})
export class UserJoiningMethodComponent implements OnInit, OnDestroy {
  @Input() public group: FormGroup;

  public get joiningMethodGroup(): AbstractControl {
    return this.group.get('joiningMethod');
  }

  public get transactionAmount(): AbstractControl {
    return this.group.get('joiningMethod.transactionAmount');
  }

  public get amount(): AbstractControl {
    return this.joiningMethodGroup.get('amount');
  }

  public subscribeGroupValueChanges(): void {
    this.joiningMethodGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.switchStatusAmount(value.transactionAmount);
      });
  }

  public switchStatusAmount(status: boolean): void {
    if (!status) {
      this.amount.disable({onlySelf: true, emitEvent: false});
      return;
    }
    this.amount.enable({onlySelf: true, emitEvent: false});
  }

  public ngOnInit(): void {
    this.switchStatusAmount(this.transactionAmount.value);
    this.subscribeGroupValueChanges();
  }

  public ngOnDestroy(): void {
  }
}
