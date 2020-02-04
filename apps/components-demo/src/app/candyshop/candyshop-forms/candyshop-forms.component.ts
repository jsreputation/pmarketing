import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-candyshop-forms',
  templateUrl: './candyshop-forms.component.html',
  styleUrls: ['./candyshop-forms.component.scss']
})
export class CandyshopFormsComponent implements OnInit, OnDestroy {
  public disabled: boolean = false;
  public appearance: string;
  public newFromControl: FormControl = new FormControl(null, [Validators.required, Validators.min(3)]);
  public newFromControl2: FormControl = new FormControl(null, [Validators.required, Validators.min(3)]);
  public newFromControl3: FormControl = new FormControl(null, [Validators.required, Validators.min(3)]);
  public rangeStart: FormControl = new FormControl();
  public rangeEnd: FormControl = new FormControl();
  private destroy$: Subject<void> = new Subject();

  public statistics: { type: string, value: number }[] = [
    {type: 'first', value: 200},
    {type: 'second', value: 500},
    {type: 'third', value: 34534},
  ];

  public shortcodes: any[] = [
    {title: 'Campaign Url', value: '[campaignUrl]'},
    {title: 'User ID', value: '[userId]'},
    {title: 'First name', value: '[userFirstName]'},
    {title: 'Last name', value: '[userLastName]'},
    {title: 'Salutation', value: '[salutation]'},
  ];

  public log(message: any): void {
    alert(message);
  }

  public ngOnInit(): void {
    this.newFromControl.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data =>
        console.log('wrapper:', data, this.newFromControl));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
