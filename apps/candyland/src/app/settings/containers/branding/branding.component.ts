import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from '@cl-core/services';

@Component({
  selector: 'cl-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit, OnDestroy {
  public styles: ISimpleValue[] = [{
    id: 1, value: 'Light'
  }, {
    id: 2, value: 'Dark'
  }];
  public fonts: ISimpleValue[] = [{
    id: 1, value: 'Roboto'
  }, {
    id: 2, value: 'Lato'
  }];
  public formBranding: FormGroup;
  public listColors;
  private destroy$ = new Subject<void>();
  constructor(private settingsService: SettingsService) {
  }

  public get headerNavbarColor(): AbstractControl {
    return this.formBranding.get('headerNavbarColor');
  }

  public get primaryColor(): AbstractControl {
    return this.formBranding.get('primaryColor');
  }

  public get secondaryColor(): AbstractControl {
    return this.formBranding.get('secondaryColor');
  }

  public get logoType(): AbstractControl {
    return this.formBranding.get('logoType');
  }

  public get logo(): AbstractControl {
    return this.formBranding.get('logo');
  }

  public get button(): AbstractControl {
    return this.formBranding.get('button');
  }

  public resetLogo(data: any): void {
    this.logo.reset();
    if (data.value === 'text') {
      this.logo.setValidators([Validators.required, Validators.minLength(2),
      Validators.maxLength(20)]);
    } else {
      this.logo.setValidators([Validators.required]);
    }
    this.formBranding.updateValueAndValidity();
    this.logo.markAsUntouched({onlySelf: true});
  }

  public ngOnInit(): void {
    this.createFormBranding();
    this.listColors = [{
      labelView: 'Primary Color', color: this.primaryColor.value
    },
    {
      labelView: 'Secondary Color', color: this.secondaryColor.value
    }];
    this.patchValue({
      headerNavbarColor: this.listColors[0],
      button: this.listColors[0],
    });
    this.subscribeChangeColors();
  }

  private createFormBranding(): void {
    this.formBranding = this.settingsService.getFormBranding();
  }

  private patchValue(data): void {
    this.formBranding.patchValue(data);
  }

  private subscribeChangeColors(): void {
    this.primaryColor
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.listColors[0].color = val;
      });
    this.secondaryColor
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.listColors[1].color = val;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
