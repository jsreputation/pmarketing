import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@cl-core/services/settings.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public timeZones$: Observable<ITimeZone[]>;
  public currency$: Observable<Currency[]>;
  public formGeneral: FormGroup;
  constructor(private settingsService: SettingsService,
              private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.createFormGeneral();
    this.getTimeZone();
    this.getCurrency();
  }

  private createFormGeneral(): void {
    this.formGeneral = this.fb.group({
      timeZone: [null],
      currency: [null]
    });
  }

  private getTimeZone(): void {
    this.timeZones$ = this.settingsService.getTimeZone();
  }

  private getCurrency(): void {
    this.currency$ = this.settingsService.getCurrency();
  }

}
