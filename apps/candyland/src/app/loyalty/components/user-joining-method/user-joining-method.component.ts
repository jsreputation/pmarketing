import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cl-user-joining-method',
  templateUrl: './user-joining-method.component.html',
  styleUrls: ['./user-joining-method.component.scss']
})
export class UserJoinMethodComponent implements OnInit, OnDestroy {
  @Input() public group: FormGroup;
  protected destroy$: Subject<void> = new Subject();

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
      .pipe(takeUntil(this.destroy$))
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
