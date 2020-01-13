import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { FormBuilder, FormGroup } from '@angular/forms';
import { TenantService } from '@cl-core/services/tenant.service';

@Component({
  selector: 'cl-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public timeZones$: Observable<ITimeZone[]>;
  public currency$: Observable<Currency[]>;
  public formGeneral: FormGroup;
  public tenants: ITenant;
  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService
  ) { }

  public ngOnInit(): void {
    this.createFormGeneral();
    this.getTimeZone();
    this.getCurrency();
    this.initTenantSettings();
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
        switchMap((value => {
          this.tenants  = {
            ...this.tenants,
            ...value
          };
          return this.tenantService.updateTenant(this.tenants);
        })),
        takeUntil(this.destroy$),
      )
      .subscribe(() => { });
  }

  private getTimeZone(): void {
    this.timeZones$ = this.tenantService.getTimeZone();
  }

  private getCurrency(): void {
    this.currency$ = this.tenantService.getCurrency();
  }

  private initTenantSettings(): void {
    this.tenantService.findTenant()
      .subscribe((res: ITenant) => {
        this.tenants = res;
        this.patchValue(res);
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
