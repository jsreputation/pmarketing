import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-user-joining-method',
  templateUrl: './user-joining-method.component.html',
  styleUrls: ['./user-joining-method.component.scss']
})
export class UserJoinMethodComponent implements OnInit, OnDestroy {
  @Input() public group: FormGroup;

  public get joinMethod(): FormGroup {
    return this.group.get('joinMethod') as FormGroup;
  }

  public get transactionAmount(): AbstractControl {
    return this.group.get('joinMethod.transactionAmount');
  }

  public get amount(): AbstractControl {
    return this.joinMethod.get('amount');
  }

  public subscribeGroupValueChanges(): void {
    this.joinMethod.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.switchStatusAmount(value.transactionAmount);
      });
  }

  public switchStatusAmount(status: boolean): void {
    if (!status) {
      this.amount.reset(null, {onlySelf: true, emitEvent: false});
      this.amount.disable({onlySelf: true, emitEvent: false});
    } else {
      this.amount.enable({onlySelf: true, emitEvent: false});
    }
    this.amount.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  public ngOnInit(): void {
    this.switchStatusAmount(this.transactionAmount.value);
    this.subscribeGroupValueChanges();
  }

  public ngOnDestroy(): void {
  }
}
