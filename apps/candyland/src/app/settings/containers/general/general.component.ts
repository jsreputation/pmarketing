import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '@cl-core/services';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { debounceTime, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
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
        untilDestroyed(this),
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
        this.patchValue(res.properties);
        this.subscribeFormChanges();
      });
  }

  private patchValue(data: any): void {
    this.formGeneral.patchValue(data);
  }

  public ngOnDestroy(): void {
  }

}
