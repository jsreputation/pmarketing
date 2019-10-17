import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '@cl-core/services';

import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';

@Component({
  selector: 'cl-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();

  public timeZones$: Observable<ITimeZone[]>;
  public currency$: Observable<Currency[]>;
  public formGeneral: FormGroup;
  public tenants: Tenants;
  constructor(private settingsService: SettingsService,
              private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.createFormGeneral();
    this.getTimeZone();
    this.getCurrency();
    this.getTenants();
  }

  private createFormGeneral(): void {
    this.formGeneral = this.fb.group({
      time_zone: [null],
      currency: [null]
    });
  }

  private subscribeFormChanges(): void {
    this.formGeneral
      .valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$),
        switchMap((value => this.settingsService.updateTenants(value))
        )
      )
      .subscribe(() => {
      });
  }

  private getTimeZone(): void {
    this.timeZones$ = this.settingsService.getTimeZone();
  }

  private getCurrency(): void {
    this.currency$ = this.settingsService.getCurrency();
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenants = res;
        this.patchValue(res.display_properties);
        this.subscribeFormChanges();
      });
  }

  private patchValue(data: any): void {
    this.formGeneral.patchValue(data);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
